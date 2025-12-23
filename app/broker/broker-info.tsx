import AppHeader from "@/components/back-chevron";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, spacingX, spacingY } from "@/constants/theme";
import * as Linking from "expo-linking";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function BrokerInformationScreen() {
  return (
    <ScreenWrapper>
      <View style={{ paddingHorizontal: spacingX._15 }}>
        <AppHeader
          title="Broker Information"
          backTo="/(drawer)/(tabs)/account-card"
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <InfoItem label="Registration Number" value="25925 BC 2020" />
        <InfoItem label="Company" value="Arakkal Markets Limited" />
        <InfoItem
          label="Registration Address"
          value="Suite 305, Griffith Corporate Centre
Beachmont, PO Box 1510,
Kingstown, St. Vincent and the Grenadines"
        />
        <InfoItem label="Status" value="Non-regulated" />
        <InfoItem label="Offices Location" value="UAE" />

        <LinkItem
          label="Website"
          value="www.arakkalmarkets.com"
          onPress={() => Linking.openURL("https://www.arakkalmarkets.com")}
        />

        <LinkItem
          label="Generic Email"
          value="support@arakkalmarkets.com"
          onPress={() => Linking.openURL("mailto:support@arakkalmarkets.com")}
        />

        <LinkItem
          label="Abuse Reporting Email"
          value="support@arakkalmarkets.com"
          onPress={() => Linking.openURL("mailto:support@arakkalmarkets.com")}
        />

        <LinkItem
          label="Phone"
          value="+971 48740400"
          onPress={() => Linking.openURL("tel:+9714xxxx4")}
        />
      </ScrollView>

      {/* Bottom Button */}
      <TouchableOpacity style={styles.reportButton}>
        <Text style={styles.reportText}>REPORT A PROBLEM TO THE BROKER</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.item}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

function LinkItem({
  label,
  value,
  onPress,
}: {
  label: string;
  value: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Text style={styles.link}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacingX._15,
    height: spacingY._50,
    backgroundColor: colors.background,
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: spacingX._15,
  },

  container: {
    paddingHorizontal: spacingX._10,
    paddingBottom: spacingY._60,
  },

  item: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: spacingY._15,
  },

  value: {
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 22,
  },

  label: {
    color: colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  link: {
    color: colors.primary,
    fontSize: 16,
  },

  reportButton: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: spacingY._15,
    alignItems: "center",
  },

  reportText: {
    color: colors.textPrimary,
    fontWeight: "600",
    fontSize: 14,
  },
});
