import AppHeader from "@/components/back-chevron";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale } from "@/utils/styling";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function AboutCnxTradeScreen() {
  return (
    <ScreenWrapper style={styles.container}>
        <AppHeader title="About CNX Trade" />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- App Title ---------- */}
        <Text style={styles.title}>CNX Trade</Text>
        <Text style={styles.subtitle}>
          Next-Gen Multi-Asset Trading Platform
        </Text>

        {/* ---------- Description ---------- */}
        <Text style={styles.paragraph}>
          CNX Trade is a modern, high-performance trading platform that connects
          directly to your broker&apos;s MT5 server to deliver real-time prices,
          fast execution, and advanced charting.
        </Text>

        <Text style={styles.paragraph}>
          Traders can manage positions, analyze markets, and execute trades
          securely with a professional-grade interface.
        </Text>

        {/* ---------- Section: Features ---------- */}
        <Section title="Features">
          <Bullet text="Real-time quotes and advanced interactive charts" />
          <Bullet text="Buy/Sell execution with lightning-fast order processing" />
          <Bullet text="Secure login via encrypted MT5 server connection" />
          <Bullet text="Supports both Real and Demo accounts" />
          <Bullet text="Technical indicators and multiple timeframes" />
          <Bullet text="Margin, equity, and P/L tracking in real time" />
          <Bullet text="Push notifications for market alerts" />
          <Bullet text="Customizable dashboard and watch-lists" />
        </Section>

        {/* ---------- Section: Security ---------- */}
        <Section title="Security">
          <Label title="Encryption">
            End-to-end secure communication with broker servers
          </Label>

          <Label title="Privacy">
            CNX Trade never stores your trading passwords or funds
          </Label>

          <Label title="Authentication">
            Master password for full trading access, Investor password for
            view-only access
          </Label>
        </Section>

        {/* ---------- Note ---------- */}
        <Section title="Note">
          <Text style={styles.note}>
            CNX Trade does not provide brokerage services, does not handle
            deposits or withdrawals, and does not store real funds. All
            financial operations are handled solely by your broker.
          </Text>
        </Section>

        {/* ---------- Footer ---------- */}
        <Text style={styles.footer}>
          © 2025 CNX Trade. All rights reserved.
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ---------- Reusable Components ---------- */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Bullet = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletDot} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const Label = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <View style={styles.labelBlock}>
    <Text style={styles.labelTitle}>{title}</Text>
    <Text style={styles.labelText}>{children}</Text>
  </View>
);

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacingX._20,
    paddingVertical: spacingY._20,
  },

  title: {
    fontSize: scale(24),
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacingY._5,
    fontSize: scale(13),
    color: colors.textSecondary,
  },

  paragraph: {
    marginTop: spacingY._15,
    fontSize: scale(13),
    lineHeight: scale(18),
    color: colors.textSecondary,
  },

  section: {
    marginTop: spacingY._30,
  },
  sectionTitle: {
    fontSize: scale(15),
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacingY._12,
  },

  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: spacingY._10,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: scale(13),
    lineHeight: scale(18),
    color: colors.textSecondary,
  },

  labelBlock: {
    marginBottom: spacingY._12,
  },
  labelTitle: {
    fontSize: scale(13),
    fontWeight: "600",
    color: colors.textPrimary,
  },
  labelText: {
    marginTop: spacingY._5,
    fontSize: scale(13),
    color: colors.textSecondary,
    lineHeight: scale(18),
  },

  note: {
    fontSize: scale(12),
    lineHeight: scale(17),
    color: colors.textMuted,
  },

  footer: {
    marginTop: spacingY._40,
    textAlign: "center",
    fontSize: scale(11),
    color: colors.textMuted,
  },
});
