import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

/* ================= DUMMY DATA ================= */
const ordersSummary = {
  filled: 2,
  canceled: 0,
  total: 2,
};

const ordersData = [
  {
    id: "29055359",
    symbol: "XAUEUR",
    side: "buy",
    volume: "0.01 / 0.01",
    type: "at market",
    time: "2025.12.18 09:13:13",
    status: "FILLED",
    sl: "-",
    tp: "-",
  },
  {
    id: "29055360",
    symbol: "XAUEUR",
    side: "sell",
    volume: "0.01 / 0.01",
    type: "at market",
    time: "2025.12.18 09:14:21",
    status: "FILLED",
    sl: "-",
    tp: "-",
  },
];

/* ================= SCREEN ================= */
const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ordersData}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Summary />}
        renderItem={({ item }) => <OrderRow item={item} />}
      />
    </View>
  );
};

export default OrdersScreen;

/* ================= SUMMARY ================= */
const Summary = () => (
  <View style={styles.summary}>
    <SummaryRow label="Filled:" value={ordersSummary.filled} />
    <SummaryRow label="Canceled:" value={ordersSummary.canceled} />
    <SummaryRow label="Total:" value={ordersSummary.total} />
  </View>
);

const SummaryRow = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <View style={styles.summaryRow}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <View style={styles.dots} />
    <Text style={styles.summaryValue}>{value}</Text>
  </View>
);

/* ================= ORDER ROW ================= */
const OrderRow = ({ item }: { item: any }) => {
  const isBuy = item.side === "buy";

  return (
    <View style={styles.row}>
      {/* TOP */}
      <View style={styles.rowTop}>
        <Text style={styles.symbol}>
          {item.symbol},{" "}
          <Text style={isBuy ? styles.buy : styles.sell}>
            {item.side}
          </Text>
        </Text>

        <Text style={styles.time}>{item.time}</Text>
      </View>

      {/* VOLUME */}
      <Text style={styles.volume}>
        {item.volume} {item.type}
      </Text>

      {/* ID */}
      <Text style={styles.orderId}>#{item.id}</Text>

      {/* SL / TP */}
      <View style={styles.slTpRow}>
        <Text style={styles.slTp}>S / L:</Text>
        <Text style={styles.slTpValue}>{item.sl}</Text>
      </View>

      <View style={styles.slTpRow}>
        <Text style={styles.slTp}>T / P:</Text>
        <Text style={styles.slTpValue}>{item.tp}</Text>
      </View>

      {/* STATUS */}
      <Text style={styles.status}>{item.status}</Text>
    </View>
  );
};

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  /* SUMMARY */
  summary: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },

  summaryLabel: {
    color: "#fff",
    fontSize: 14,
  },

  dots: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginHorizontal: 10,
  },

  summaryValue: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  /* ROW */
  row: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },

  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  symbol: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  buy: {
    color: "#3ea6ff",
    fontWeight: "600",
  },

  sell: {
    color: "#ff5b5b",
    fontWeight: "600",
  },

  time: {
    color: "#888",
    fontSize: 12,
  },

  volume: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 4,
  },

  orderId: {
    color: "#666",
    fontSize: 12,
    marginBottom: 6,
  },

  slTpRow: {
    flexDirection: "row",
    marginBottom: 2,
  },

  slTp: {
    color: "#666",
    width: 40,
    fontSize: 12,
  },

  slTpValue: {
    color: "#666",
    fontSize: 12,
  },

  status: {
    position: "absolute",
    right: 16,
    bottom: 14,
    color: "#aaa",
    fontSize: 12,
    fontWeight: "600",
  },
});
