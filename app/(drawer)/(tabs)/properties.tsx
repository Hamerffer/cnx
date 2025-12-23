import AppHeader from "@/components/back-chevron";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Properties() {
  return (
    <ScreenWrapper>
      <View style={{ paddingHorizontal: spacingX._15 }}>
        <AppHeader title="Properties" />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* PROPERTIES */}
        <Section title="PROPERTIES">
          <InfoRow label="Sector" value="Basic Materials" />
          <InfoRow label="Industry" value="Gold" />
          <InfoRow label="Country" value="United States" />
          <InfoRow label="Digits" value="2" />
          <InfoRow label="Contract size" value="100" />
          <InfoRow label="Spread" value="120" />
          <InfoRow label="Stop levels" value="50" />
          <InfoRow label="Margin currency" value="USD" />
          <InfoRow label="Profit currency" value="USD" />
          <InfoRow label="Calculation" value="Contracts" />
          <InfoRow label="Tick size" value="0.01" />
          <InfoRow label="Tick value" value="1" />
          <InfoRow label="Trade" value="Full access" />
          <InfoRow label="Chart mode" value="By bid price" />
          <InfoRow label="Execution" value="Market Execution" />
          <InfoRow label="GTC mode" value="Good till cancelled" />
          <InfoRow
            label="Fill policy"
            value="Fill or Kill, Immediate or Cancel"
          />
        </Section>

        {/* SWAP RATES */}
        <Section title="SWAP RATES">
          <InfoRow label="Monday" value="1" />
          <InfoRow label="Tuesday" value="1" />
          <InfoRow label="Wednesday" value="3" />
          <InfoRow label="Thursday" value="1" />
          <InfoRow label="Friday" value="1" />
        </Section>

        {/* MARGIN RATE */}
        <Section title="MARGIN RATE: INITIAL / MAINTENANCE">
          <InfoRow label="Type" value="Notional value" />
          <InfoRow label="Market buy" value="~13237.08 / ~4412.36" />
          <InfoRow label="Market sell" value="~13233.48 / ~4411.16" />
        </Section>

        {/* QUOTES SESSIONS */}
        <Section title="QUOTES SESSIONS">
          <InfoRow label="Sunday" value="23:00 - 24:00" />
          <InfoRow label="Monday" value="00:00 - 21:59, 23:01 - 24:00" />
          <InfoRow label="Tuesday" value="00:00 - 21:59, 23:01 - 24:00" />
          <InfoRow label="Wednesday" value="00:00 - 21:59, 23:01 - 24:00" />
          <InfoRow label="Thursday" value="00:00 - 21:59, 23:01 - 24:00" />
          <InfoRow label="Friday" value="00:00 - 21:59" />
        </Section>

        {/* TRADES SESSIONS */}
        <Section title="TRADES SESSIONS">
          <InfoRow label="Sunday" value="23:00 - 24:00" />
          <InfoRow label="Monday" value="00:00 - 21:59, 23:01 - 24:00" />
          <InfoRow label="Tuesday" value="00:00 - 21:59, 23:01 - 24:00" />
          <InfoRow label="Wednesday" value="00:00 - 21:59, 23:01 - 24:00" />
          <InfoRow label="Thursday" value="00:00 - 21:59, 23:01 - 24:00" />
          <InfoRow label="Friday" value="00:00 - 21:59" />
        </Section>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }: any) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    paddingBottom: spacingY._40,
    // height: "100%",
  },

  subTitle: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
    marginLeft: 2,
  },

  section: {
    marginTop: spacingY._25,
    paddingHorizontal: spacingX._15,
  },

  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: spacingY._10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacingY._12,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  value: {
    color: colors.textPrimary,
    fontSize: 14,
    textAlign: "right",
    maxWidth: "55%",
  },
});
