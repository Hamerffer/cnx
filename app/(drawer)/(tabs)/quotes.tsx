import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Network from "expo-network";

import QuoteModal from "@/components/modals/quote-modal";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { getQuotesApi } from "@/services/quotes.service";
import { normalizeQuotes, QuoteItem } from "@/utils/normalize-quotes";
import { useQuery } from "@tanstack/react-query";

const QuotesScreen = () => {
  const [visible, setVisible] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [page] = useState(1);

  /* ================= FETCH QUOTES ================= */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["quotes", page],
    queryFn: async () => {
      const res: any = await getQuotesApi({ page });
      return normalizeQuotes(res.json.items);
    },
    refetchInterval: 1500,
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

  /* ================= RENDER ITEM ================= */
  const renderItem = ({ item }: { item: QuoteItem }) => {
    const isPositive = Number(item.change) >= 0;

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.85}
        onPress={() => {
          setSymbol(item.symbol);
          setVisible(true);
        }}
      >
        {/* ================= LEFT ================= */}
        <View style={styles.left}>
          <Text
            style={[
              styles.change,
              isPositive ? styles.positive : styles.negative,
            ]}
          >
            {item.change} ({item.changePercent}%)
          </Text>

          <Text style={styles.symbol}>{item.symbol}</Text>
        </View>

        {/* ================= RIGHT ================= */}
        <View style={styles.right}>
          {/* BID / ASK */}
          <View style={styles.priceRow}>
            <Text style={styles.bid}>{item.bid}</Text>
            <Text style={styles.ask}>{item.ask}</Text>
          </View>

          {/* LOW / HIGH */}
          <View style={styles.hlRow}>
            <Text style={styles.hlText}>L: {item.low}</Text>
            <Text style={styles.hlText}>H: {item.high}</Text>
          </View>
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
        onClose={() => setVisible(false)}
        symbol={symbol}
      />
    </>
  );
};

export default QuotesScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  row: {
    flexDirection: "row",
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingX._10,
    // borderBottomWidth: 0.6,
    // borderBottomColor: colors.border,
  },

  /* LEFT */
  left: {
    flex: 1,
  },

  change: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: spacingY._5,
  },

  positive: {
    color: colors.positive,
  },

  negative: {
    color: colors.negative,
  },

  symbol: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  /* RIGHT */
  right: {
    alignItems: "flex-end", // no fixed width → tight layout
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10, // ✅ tighter BID–ASK gap
  },

  bid: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.buy,
  },

  ask: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.sell,
  },

  hlRow: {
    flexDirection: "row",
    gap: 12, // ✅ tighter L–H gap
    marginTop: 2,
  },

  hlText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
