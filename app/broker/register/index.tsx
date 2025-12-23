import AppHeader from "@/components/back-chevron";
import ScreenWrapper from "@/components/screen-Wrapper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

/* ---------------- DATA ---------------- */

const serverOptions = [
  { label: "ArakkalMarkets-Server", value: "server1" },
  { label: "FTradeMarkets-Server", value: "server2" },
];

const accountTypes = [
  { label: "Gold", value: "gold" },
  { label: "Silver", value: "silver" },
];

const leverageOptions = [
  { label: "1:50", value: "50" },
  { label: "1:100", value: "100" },
  { label: "1:200", value: "200" },
];

const depositOptions = [
  { label: "10000 USD", value: "10000" },
  { label: "50000 USD", value: "50000" },
  { label: "100000 USD", value: "100000" },
];

/* ---------------- SCREEN ---------------- */

export default function OpenDemoAccountScreen() {
  const [server, setServer] = useState("server1");
  const [accountType, setAccountType] = useState("gold");
  const [leverage, setLeverage] = useState("100");
  const [deposit, setDeposit] = useState("100000");
  const [accept, setAccept] = useState(false);

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        {/* <Text style={styles.header}>Open a demo account</Text> */}
        <AppHeader title="Open a demo account" />
        <Text style={styles.subHeader}>Personal information</Text>

        {/* PERSONAL INFO */}
        <Section title="PERSONAL INFORMATION">
          <Input label="First name" />
          <Input label="Second name" />
          <Input label="Date of birth" />
          <Input label="Phone" />
          <Input label="E-Mail" />
        </Section>

        {/* ACCOUNT INFO */}
        <Section title="ACCOUNT INFORMATION">
          <Row>
            <Text style={styles.label}>Use hedge in trading</Text>
            <TouchableOpacity onPress={() => setAccept(!accept)}>
              <MaterialCommunityIcons
                name={accept ? "checkbox-marked" : "checkbox-blank-outline"}
                size={22}
                color="#3b82f6"
              />
            </TouchableOpacity>
          </Row>

          <DropdownField
            label="Server"
            value={server}
            data={serverOptions}
            onChange={setServer}
          />

          <DropdownField
            label="Account type"
            value={accountType}
            data={accountTypes}
            onChange={setAccountType}
          />

          <DropdownField
            label="Leverage"
            value={leverage}
            data={leverageOptions}
            onChange={setLeverage}
          />

          <DropdownField
            label="Deposit"
            value={deposit}
            data={depositOptions}
            onChange={setDeposit}
          />
        </Section>

        {/* AGREEMENTS */}
        <Section title="AGREEMENTS">
          <Row>
            <Text style={styles.label}>Accept</Text>
            <TouchableOpacity onPress={() => setAccept(!accept)}>
              <MaterialCommunityIcons
                name={accept ? "checkbox-marked" : "checkbox-blank-outline"}
                size={22}
                color="#3b82f6"
              />
            </TouchableOpacity>
          </Row>

          <Text style={styles.agreementText}>
            By enabling Accept you agree with the terms and conditions for
            opening an account and the data protection policy
          </Text>
        </Section>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children }: any) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Input({ label }: any) {
  return (
    <View style={styles.inputRow}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} />
    </View>
  );
}

function DropdownField({ label, value, data, onChange }: any) {
  return (
    <View style={styles.inputRow}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        placeholder={`Select ${label}`}
        placeholderStyle={{ color: "#aaa" }}
        selectedTextStyle={{ color: "#fff" }}
        onChange={(item) => onChange(item.value)}
        renderRightIcon={() => (
          <MaterialCommunityIcons name="chevron-down" size={20} color="#aaa" />
        )}
      />
    </View>
  );
}

function Row({ children }: any) {
  return <View style={styles.row}>{children}</View>;
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  subHeader: {
    color: "#aaa",
    marginBottom: 16,
  },
  sectionTitle: {
    backgroundColor: "#2a2a2a",
    color: "#aaa",
    padding: 8,
    marginTop: 20,
    fontSize: 12,
  },
  inputRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 10,
  },
  label: {
    color: "#aaa",
    marginBottom: 4,
  },
  input: {
    color: "#fff",
    padding: 0,
  },
  dropdown: {
    height: 45,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    borderColor: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  agreementText: {
    color: "#888",
    fontSize: 12,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#3b82f6",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
