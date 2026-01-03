import ScreenWrapper from "@/components/screen-Wrapper";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import * as Clipboard from "expo-clipboard";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";

import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SuccessScreen() {
  const router = useRouter();
  const { payload } = useLocalSearchParams();

  const [alertText, setAlertText] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  if (!payload) return null;
  const data = JSON.parse(payload as string);

  const copyToClipboard = async (value: string, label: string) => {
    await Clipboard.setStringAsync(value);
    setAlertText(`${label} copied successfully`);
    setShowAlert(true);
  };

  return (
    <ScreenWrapper>
      <ScrollView style={{ flex: 1, backgroundColor: colors.surface }}>
        {/* HEADER */}
        <View
          style={{
            padding: spacingY._15,
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 16 }}>
            Open a demo account
          </Text>
        </View>

        {/* BROKER */}
        <View
          style={{
            padding: spacingY._15,
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 15 }}>
            {data.brokerName}
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 12 }}>
            {data.companyName}
          </Text>
        </View>

        {/* PERSONAL INFO */}
        <Section title="PERSONAL INFORMATION">
          <Row label="Name" value={data.name} />
          <Row label="Account type" value={data.accountType} />
          <Row label="Deposit" value={data.depositAmount} />
        </Section>

        {/* SUCCESS TEXT */}
        <View
          style={{
            backgroundColor: "#3b4252",
            paddingVertical: spacingY._12,
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.textSecondary, fontSize: 11 }}>
            NEW ACCOUNT SUCCESSFULLY CREATED
          </Text>
        </View>

        {/* ACCOUNT DETAILS */}
        <Section title="ACCOUNT DETAILS">
          <CopyRow
            label="Login"
            value={data.login}
            onCopy={() => copyToClipboard(data.login, "Login")}
          />
          <CopyRow
            label="Password"
            value={data.password}
            onCopy={() => copyToClipboard(data.password, "Password")}
          />
          <CopyRow
            label="Investor"
            value={data.investorPassword}
            onCopy={() =>
              copyToClipboard(data.investorPassword, "Investor Password")
            }
          />
        </Section>

        {/* DONE */}
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: "/broker/broker-login-screen",
              params: {
                brokerId: data.brokerId,
              },
            })
          }
          style={{
            margin: spacingX._20,
            backgroundColor: colors.primary,
            paddingVertical: spacingY._12,
            borderRadius: radius._10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: colors.white, fontWeight: "600" }}>DONE</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* BEAUTIFUL ALERT */}
      <Modal transparent visible={showAlert} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.surface,
              padding: spacingY._20,
              borderRadius: radius._12,
              width: "80%",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: 15,
                marginBottom: spacingY._10,
                fontWeight: "600",
              }}
            >
              ✅ Copied
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 13,
                textAlign: "center",
              }}
            >
              {alertText}
            </Text>

            <TouchableOpacity
              onPress={() => setShowAlert(false)}
              style={{
                marginTop: spacingY._15,
                backgroundColor: colors.primary,
                paddingVertical: spacingY._10,
                paddingHorizontal: spacingX._20,
                borderRadius: radius._10,
              }}
            >
              <Text style={{ color: colors.white }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

/* ---------- HELPERS ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ padding: spacingY._15 }}>
      <Text
        style={{
          color: colors.textSecondary,
          fontSize: 12,
          marginBottom: spacingY._7,
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: colors.border,
        paddingVertical: spacingY._10,
      }}
    >
      <Text style={{ color: colors.textSecondary }}>{label}</Text>
      <Text style={{ color: colors.textPrimary }}>{value}</Text>
    </View>
  );
}

function CopyRow({
  label,
  value,
  onCopy,
}: {
  label: string;
  value: string;
  onCopy: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onCopy}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: colors.border,
        paddingVertical: spacingY._10,
      }}
    >
      <Text style={{ color: colors.textSecondary }}>{label}</Text>
      <Text
        style={{
          color: colors.primary,
          fontWeight: "600",
        }}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );
}
