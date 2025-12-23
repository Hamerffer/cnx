// import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import QuoteModal from "@/components/modals/quote-modal";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { QuoteItem, quotesData } from "@/data/quotes";
import { useState } from "react";

const QuotesScreen = () => {
  const [visible, setVisible] = useState(false);
  const [symbol, seSymbol] = useState("");
  const renderItem = ({ item }: { item: QuoteItem }) => {
    const isPositive = item.change.startsWith("+");

    return (
      <TouchableOpacity
        style={styles.row}
        activeOpacity={0.85}
        onPress={() => {
          seSymbol(item.symbol), setVisible(true);
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
            {item.change} {item.changePercent}
          </Text>

          <Text style={styles.symbol}>{item.symbol}</Text>

          <View style={styles.timeRow}>
            <Text style={styles.time}>{item.time}</Text>

            {!!item.arrow && (
              <View style={styles.tickRow}>
                <Text style={styles.tickArrow}>{item.arrow}</Text>
                <Text style={styles.tickCount}>{item.arrowCount}</Text>
              </View>
            )}
          </View>
        </View>

        {/* ================= RIGHT ================= */}
        <View style={styles.right}>
          {/* BID */}
          <View style={styles.priceLine}>
            <View style={styles.priceWrap}>
              <Text style={styles.bid}>{item.bid}</Text>
              <Text style={styles.sup}>{item.bidSup}</Text>
            </View>

            <View style={styles.hl}>
              <Text style={styles.hlLabel}>L:</Text>
              <Text style={styles.hlValue}>{item.low}</Text>
            </View>
          </View>

          {/* ASK */}
          <View style={styles.priceLine}>
            <View style={styles.priceWrap}>
              <Text style={styles.ask}>{item.ask}</Text>
              <Text style={styles.sup}>{item.askSup}</Text>
            </View>

            <View style={styles.hl}>
              <Text style={styles.hlLabel}>H:</Text>
              <Text style={styles.hlValue}>{item.high}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={quotesData}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  row: {
    flexDirection: "row",
    paddingVertical: spacingY._12,
    paddingHorizontal: spacingX._10,
    borderBottomWidth: 0.6,
    borderBottomColor: colors.border,
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
    marginBottom: spacingY._5,
  },

  timeRow: {
    flexDirection: "row",
    // justifyContent: "space-",
    alignItems: "center",
    gap: spacingX._10,
  },

  time: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  tickRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  tickArrow: {
    fontSize: 13,
    color: colors.primaryLight,
    marginRight: spacingX._3,
  },

  tickCount: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  /* RIGHT */
  right: {
    alignItems: "flex-end",
  },

  priceLine: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacingY._10,
  },

  priceWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    minWidth: 86,
    justifyContent: "flex-end",
  },

  bid: {
    fontSize: 21,
    fontWeight: "600",
    color: colors.buy,
    letterSpacing: 0.2,
  },

  ask: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.sell,
    letterSpacing: 0.2,
  },

  sup: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
    marginLeft: 1,
  },

  hl: {
    flexDirection: "row",
    minWidth: 65,
    justifyContent: "flex-end",
  },

  hlLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginRight: spacingX._3,
  },

  hlValue: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});
