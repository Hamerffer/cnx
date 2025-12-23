/* eslint-disable react/display-name */
import React, { memo, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { colors, radius, spacingX, spacingY } from "@/constants/theme";

/* ================= TYPES (BACKEND FRIENDLY) ================= */
export type HistoryTab = "positions" | "orders" | "deals";

export type HistoryItem = {
  id: string;
  symbol: string;
  side: "buy" | "sell";
  volume: string;
  openPrice?: string;
  closePrice?: string;
  profit?: string;
  date: string;
  time: string;

  dealId?: string;
  orderId?: string;
  positionId?: string;
  swap?: string;
  commission?: string;
};

/* ================= MOCK DATA (API READY) ================= */
const positions: HistoryItem[] = [
  {
    id: "1",
    symbol: "XAUUSD",
    side: "buy",
    volume: "0.01",
    openPrice: "2320.10",
    closePrice: "2324.60",
    profit: "+45.00",
    date: "2025.12.18",
    time: "09:10:12",
  },
];

const orders: HistoryItem[] = [
  {
    id: "29055359",
    symbol: "XAUEUR",
    side: "buy",
    volume: "0.01",
    date: "2025.12.18",
    time: "09:13:13",
  },
  {
    id: "29055360",
    symbol: "XAUEUR",
    side: "sell",
    volume: "0.01",
    date: "2025.12.18",
    time: "09:14:21",
  },
];

const deals: HistoryItem[] = [
  {
    id: "d1",
    symbol: "XAUEUR",
    side: "buy",
    volume: "0.01",
    closePrice: "3691.60",
    date: "2025.12.18",
    time: "09:13:13",
    dealId: "1145069",
    orderId: "29055359",
    positionId: "29055359",
    swap: "0.00",
    commission: "0.00",
  },
  {
    id: "d2",
    symbol: "XAUEUR",
    side: "buy",
    volume: "0.01",
    closePrice: "3691.60",
    date: "2025.12.18",
    time: "09:13:13",
    dealId: "1145069",
    orderId: "29055359",
    positionId: "29055359",
    swap: "0.00",
    commission: "0.00",
  },
];

/* ================= SCREEN ================= */
export default function HistoryScreen() {
  const [tab, setTab] = useState<HistoryTab>("orders");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const dataMap: Record<HistoryTab, HistoryItem[]> = {
    positions,
    orders,
    deals,
  };

  const summary = useMemo(() => {
    switch (tab) {
      case "orders":
        return [
          { label: "Filled", value: "2" },
          { label: "Canceled", value: "0" },
          { label: "Total", value: "2" },
        ];
      case "deals":
        return [
          { label: "Profit", value: "0.00" },
          { label: "Commission", value: "0.00" },
          { label: "Swap", value: "0.00" },
        ];
      default:
        return [
          { label: "Profit", value: "45.00" },
          { label: "Balance", value: "100 045.00" },
        ];
    }
  }, [tab]);

  return (
    <View style={styles.container}>
      <Tabs active={tab} onChange={setTab} />

      <FlatList
        data={dataMap[tab]}
        keyExtractor={(i) => i.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Summary rows={summary} />}
        renderItem={({ item }) => {
          if (tab === "positions") return <PositionRow item={item} />;
          if (tab === "orders") return <OrderRow item={item} />;
          return (
            <DealRow
              item={item}
              expanded={expandedId === item.id}
              onToggle={() =>
                setExpandedId(expandedId === item.id ? null : item.id)
              }
            />
          );
        }}
      />
    </View>
  );
}

/* ================= UI BLOCKS ================= */

const Tabs = memo(
  ({
    active,
    onChange,
  }: {
    active: HistoryTab;
    onChange: (t: HistoryTab) => void;
  }) => (
    <View style={styles.tabs}>
      {(["positions", "orders", "deals"] as HistoryTab[]).map((t) => (
        <TouchableOpacity
          key={t}
          onPress={() => onChange(t)}
          style={[styles.tab, active === t && styles.tabActive]}
        >
          <Text style={[styles.tabText, active === t && styles.tabTextActive]}>
            {t.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
);

const Summary = memo(
  ({ rows }: { rows: { label: string; value: string }[] }) => (
    <View style={styles.summary}>
      {rows.map((r) => (
        <View key={r.label} style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{r.label}</Text>
          <Text style={styles.summaryValue}>{r.value}</Text>
        </View>
      ))}
    </View>
  )
);

/* ================= ROW HELPERS ================= */

const Header = ({ item }: { item: HistoryItem }) => (
  <View style={styles.rowTop}>
    <Text style={styles.symbol}>{item.symbol}</Text>
    <Text style={[styles.side, item.side === "buy" ? styles.buy : styles.sell]}>
      {item.side.toUpperCase()}
    </Text>
  </View>
);

const Time = ({ item }: { item: HistoryItem }) => (
  <Text style={styles.time}>
    {item.date} · {item.time}
  </Text>
);

/* ================= ROWS ================= */

const PositionRow = memo(({ item }: { item: HistoryItem }) => {
  const profit = Number(item.profit);
  return (
    <View style={styles.row}>
      <Header item={item} />
      <Text style={styles.line}>
        {item.volume} @ {item.openPrice} → {item.closePrice}
      </Text>

      <View style={styles.footer}>
        <Time item={item} />
        <Text
          style={[
            styles.profit,
            profit >= 0 ? styles.positive : styles.negative,
          ]}
        >
          {item.profit}
        </Text>
      </View>
    </View>
  );
});

const OrderRow = memo(({ item }: { item: HistoryItem }) => (
  <View style={styles.row}>
    <Header item={item} />
    <Text style={styles.line}>{item.volume} · Market</Text>

    <View style={styles.footer}>
      <Time item={item} />
      <Text style={styles.status}>FILLED</Text>
    </View>
  </View>
));

const DealRow = memo(
  ({
    item,
    expanded,
    onToggle,
  }: {
    item: HistoryItem;
    expanded: boolean;
    onToggle: () => void;
  }) => (
    <TouchableOpacity activeOpacity={0.9} onPress={onToggle}>
      <View style={styles.row}>
        <Header item={item} />
        <Text style={styles.line}>
          {item.volume} at {item.closePrice}
        </Text>

        {expanded && (
          <View style={styles.expand}>
            <ExpandRow label="Deal" value={item.dealId} />
            <ExpandRow label="Order" value={item.orderId} />
            <ExpandRow label="Position" value={item.positionId} />
            <ExpandRow label="Swap" value={item.swap} />
            <ExpandRow label="Commission" value={item.commission} />
          </View>
        )}

        <Time item={item} />
      </View>
    </TouchableOpacity>
  )
);

const ExpandRow = ({ label, value }: { label: string; value?: string }) => (
  <View style={styles.expandRow}>
    <Text style={styles.expandLabel}>{label}</Text>
    <Text style={styles.expandValue}>{value ?? "-"}</Text>
  </View>
);

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* Tabs */
  tabs: {
    flexDirection: "row",
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacingY._12,
    alignItems: "center",
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    color: colors.textMuted,
    fontWeight: "600",
    fontSize: 13,
  },
  tabTextActive: {
    color: colors.primary,
  },

  /* Summary */
  summary: {
    padding: spacingX._15,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacingY._5,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  summaryValue: {
    color: colors.textPrimary,
    fontWeight: "600",
    fontSize: 12,
  },

  /* Rows */
  row: {
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._12,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.divider,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  symbol: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "600",
  },
  side: {
    fontSize: 12,
    fontWeight: "700",
  },
  buy: { color: colors.buy },
  sell: { color: colors.sell },

  line: {
    marginTop: spacingY._5,
    color: colors.textSecondary,
    fontSize: 13,
  },

  footer: {
    marginTop: spacingY._7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  time: {
    color: colors.textMuted,
    fontSize: 11,
  },

  profit: {
    fontSize: 14,
    fontWeight: "700",
  },
  positive: { color: colors.positive },
  negative: { color: colors.negative },

  status: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },

  /* Expand */
  expand: {
    marginTop: spacingY._10,
    padding: spacingX._10,
    backgroundColor: colors.surfaceLight,
    borderRadius: radius._6,
  },
  expandRow: {
    flexDirection: "row",
    paddingVertical: spacingY._5,
  },
  expandLabel: {
    width: 90,
    color: colors.textMuted,
    fontSize: 11,
  },
  expandValue: {
    color: colors.textSecondary,
    fontSize: 11,
  },
});
