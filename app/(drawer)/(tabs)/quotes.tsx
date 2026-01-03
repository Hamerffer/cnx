import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import QuoteModal from "@/components/modals/quote-modal";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { getCachedQuotes, saveQuotes } from "@/db/queries/quotes";
import { getQuotesApi } from "@/services/quotes.service";
import { isOnline } from "@/utils/network";

/* ================= HELPERS ================= */
const formatPrice = (value: number, decimals: number = 5) => {
  return Number(value).toFixed(decimals);
};

const splitPrice = (value: number, decimals: number = 5) => {
  const fixed = formatPrice(value, decimals);
  const [integer, fraction = ""] = fixed.split(".");
  const digits = fraction.split("");

  return {
    integer,
    first: digits.slice(0, 2).join(""),
    middle: digits.slice(2, digits.length - 1).join(""),
    last: digits[digits.length - 1] || "0",
  };
};

/* ================= PRICE COMPONENT ================= */
function Price({
  value,
  changeType,
  decimals = 5,
}: {
  value: number;
  changeType: "positive" | "negative" | "neutral";
  decimals?: number;
}) {
  const { integer, first, middle, last } = splitPrice(value, decimals);

  const colorStyle =
    changeType === "positive"
      ? styles.positive
      : changeType === "negative"
      ? styles.negative
      : styles.neutral;

  return (
    <View style={styles.priceContainer}>
      <Text style={[styles.priceMain, colorStyle]}>
        {integer}.{first}
      </Text>

      {middle ? (
        <Text style={[styles.priceMid, colorStyle]}>{middle}</Text>
      ) : null}

      <Text style={[styles.priceSup, colorStyle]}>{last}</Text>
    </View>
  );
}

/* ================= MAIN SCREEN ================= */
export default function QuotesScreen() {
  const [visible, setVisible] = useState(false);
  const [symbol, setSymbol] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quotes"],
    queryFn: async () => {
      const online = await isOnline();

      if (online) {
        const res: any = await getQuotesApi({ page: 1 });
        const items = res.json.items;
        await saveQuotes(items);
        return items;
      }

      // 📦 OFFLINE MODE
      const cached = await getCachedQuotes();

      return cached.map((q) => ({
        id: q.id,
        symbol: q.symbol,
        decimals: 5,
        lastQuote: {
          bid: { value: q.bid, changeType: "neutral" },
          ask: { value: q.ask, changeType: "neutral" },
          diff: 0,
        },
        session: {
          change: q.change,
          changePercent: q.changePercent,
          low: q.low,
          high: q.high,
        },
      }));
    },
    refetchInterval: 1500,
    refetchIntervalInBackground: true,
  });

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: colors.negative }}>Failed to load quotes</Text>
      </View>
    );
  }

  const renderItem = ({ item }: any) => {
    const bid = Number(item.lastQuote.bid.value);
    const ask = Number(item.lastQuote.ask.value);
    const isPositive = Number(item.session.changePercent) >= 0;
    const decimals = item.decimals || 5;

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.85}
        onPress={() => {
          setSymbol(item.symbol);
          setVisible(true);
        }}
      >
        {/* LEFT SIDE */}
        <View style={styles.left}>
          <View style={styles.changeRow}>
            <Text
              style={[
                styles.change,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              {item.session.change}
            </Text>
            <Text
              style={[
                styles.change,
                isPositive ? styles.positive : styles.negative,
              ]}
            >
              {item.session.changePercent}%
            </Text>
          </View>

          <Text style={styles.symbol}>{item.symbol.replace("/", "")}</Text>

          <View style={styles.diffRow}>
            <Text style={styles.diffIcon}>▮▮</Text>
            <Text style={styles.diffText}>
              {String(item.lastQuote.diff).replace(/[.0]/g, "").slice(0, 4)}
            </Text>
          </View>
        </View>

        {/* RIGHT SIDE */}
        <View style={styles.right}>
          <View style={styles.priceRow}>
            <Price
              value={bid}
              changeType={item.lastQuote.bid.changeType}
              decimals={decimals}
            />
            <Price
              value={ask}
              changeType={item.lastQuote.ask.changeType}
              decimals={decimals}
            />
          </View>

          <Text style={styles.hlText}>
            L: {formatPrice(item.session.low, decimals)} &nbsp; H:{" "}
            {formatPrice(item.session.high, decimals)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <QuoteModal
        visible={visible}
        symbol={symbol}
        onClose={() => setVisible(false)}
      />
    </>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loader: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingX._12,
  },

  /* LEFT */
  left: {
    flex: 1,
  },

  changeRow: {
    flexDirection: "row",
    gap: 8,
  },

  change: {
    fontSize: 12,
    fontWeight: "500",
  },

  symbol: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  diffRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },

  diffIcon: {
    fontSize: 12,
    color: colors.textMuted,
  },

  diffText: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  /* RIGHT */
  right: {
    alignItems: "flex-end",
  },

  priceRow: {
    flexDirection: "row",
    gap: 14,
    fontWeight: "900",
  },

  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  priceMain: {
    fontSize: 15,

    fontWeight: "900",
  },

  priceMid: {
    fontSize: 22,
    marginTop: -5,
  },

  priceSup: {
    fontSize: 12,
    marginTop: -6,
    fontFamily: "monospace",
  },

  hlText: {
    marginTop: 2,
    fontSize: 11,
    color: colors.textSecondary,
  },

  positive: {
    color: colors.primary,
  },

  negative: {
    color: colors.negative,
  },

  neutral: {
    color: colors.textPrimary,
  },
});
