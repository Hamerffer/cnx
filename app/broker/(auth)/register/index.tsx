import AppHeader from "@/components/back-chevron";
import ScreenWrapper from "@/components/screen-Wrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

import { registerFormApi, registerUserApi } from "@/services/register-api";

/* ================= SCREEN ================= */

export default function OpenDemoAccountScreen() {
  const { brokerId } = useLocalSearchParams<{ brokerId: string }>();

  /* ---------- FORM STATE ---------- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: null as Date | null,
    serverId: null as string | null,
    accountTypeId: null as string | null,
    leverageId: null as string | null,
    depositAmountId: null as string | null,
  });

  const [errors, setErrors] = useState<any>({});
  const [showDate, setShowDate] = useState(false);

  const set = (key: string, value: any) =>
    setForm((p) => ({ ...p, [key]: value }));

  /* ---------- DROPDOWNS ---------- */

  const fetchDropdown = (key: string, fn: any, labelKey = "name") =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: [key, brokerId],
      enabled: !!brokerId,
      queryFn: async () => {
        const res = await fn(brokerId!);
        return res.json.map((i: any) => ({
          label: i[labelKey],
          value: i.id,
        }));
      },
    });

  const { data: servers = [] } = fetchDropdown(
    "servers",
    registerFormApi.servers
  );

  const { data: accountTypes = [] } = fetchDropdown(
    "accountTypes",
    registerFormApi.accountTypes
  );

  const { data: leverages = [] } = fetchDropdown(
    "leverages",
    registerFormApi.leverages,
    "label"
  );

  const { data: deposits = [] } = fetchDropdown(
    "deposits",
    registerFormApi.deposits,
    "value"
  );

  const registerMutation = useMutation({
    mutationFn: registerUserApi,

    onSuccess: (res: any) => {
      console.log("REGISTER SUCCESS 👉", res);

      const user = res?.json;
      if (!user) return;

      router.replace({
        pathname: "/broker/(auth)/success",
        params: {
          payload: JSON.stringify({
            brokerId: user.brokerId,
            brokerName: user.broker.name,
            companyName: user.broker.companyName,
            name: user.name,
            accountType: user.accountType.name,
            depositAmount: user.depositAmount.value,
            login: user.login,
            password: user.password,
            investorPassword: user.investorPassword,
          }),
        },
      });
    },

    onError: (error: any) => {
      const err = error?.json;

      if (err?.data?.fieldErrors) {
        const fieldErrors: any = {};
        Object.entries(err.data.fieldErrors).forEach(
          ([field, messages]: any) => {
            if (messages?.length) fieldErrors[field] = messages[0];
          }
        );
        setErrors(fieldErrors);
        // Alert.alert("Validation Error", "Please fix the highlighted fields");
        return;
      }

      Alert.alert("Error", err?.message || "Something went wrong");
    },
  });

  const validate = () => {
    const e: any = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone || form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Invalid phone";
    if (!form.dob) e.dob = "Date of birth required";
    if (!form.serverId) e.serverId = "Select server";
    if (!form.accountTypeId) e.accountTypeId = "Select account type";
    if (!form.leverageId) e.leverageId = "Select leverage";
    if (!form.depositAmountId) e.depositAmountId = "Select deposit";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onRegister = () => {
    if (!brokerId || !validate()) return;

    registerMutation.mutate({
      brokerId,
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.replace(/\D/g, ""), // backend regex safe
      dob: new Date(form.dob!), // 🔥 CRITICAL FIX
      serverId: form.serverId!,
      accountTypeId: form.accountTypeId!,
      leverageId: form.leverageId!,
      depositAmountId: form.depositAmountId!,
    });
  };

  /* ---------- UI ---------- */

  return (
    <ScreenWrapper>
      <AppHeader title="Open Demo Account" />

      <ScrollView style={styles.container}>
        <Section title="PERSONAL INFORMATION">
          <Input
            label="Full name"
            value={form.name}
            onChange={(v: string) => set("name", v)}
            error={errors.name}
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(v: string) => set("email", v)}
            error={errors.email}
          />
          <DateField
            value={form.dob}
            error={errors.dob}
            onPress={() => setShowDate(true)}
          />
          <Input
            label="Phone"
            value={form.phone}
            onChange={(v: string) => set("phone", v)}
            error={errors.phone}
          />
        </Section>

        <Section title="ACCOUNT INFORMATION">
          <DropdownField
            label="Server"
            data={servers}
            value={form.serverId}
            onChange={(v: string) => set("serverId", v)}
            error={errors.serverId}
          />
          <DropdownField
            label="Account Type"
            data={accountTypes}
            value={form.accountTypeId}
            onChange={(v: string) => set("accountTypeId", v)}
            error={errors.accountTypeId}
          />
          <DropdownField
            label="Leverage"
            data={leverages}
            value={form.leverageId}
            onChange={(v: string) => set("leverageId", v)}
            error={errors.leverageId}
          />
          <DropdownField
            label="Deposit"
            data={deposits}
            value={form.depositAmountId}
            onChange={(v: string) => set("depositAmountId", v)}
            error={errors.depositAmountId}
          />
        </Section>

        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>
            {registerMutation.isPending ? "REGISTERING..." : "REGISTER"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {showDate && (
        <DateTimePicker
          value={form.dob || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, date) => {
            setShowDate(false);
            if (date) set("dob", date);
          }}
        />
      )}
    </ScreenWrapper>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

const Section = ({ title, children }: any) => (
  <View>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Input = ({ label, value, onChange, error }: any) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <TextInput value={value} onChangeText={onChange} style={styles.input} />
    {error && <ErrorText text={error} />}
  </View>
);

const DateField = ({ value, onPress, error }: any) => (
  <View style={styles.field}>
    <Text style={styles.label}>Date of birth</Text>
    <TouchableOpacity onPress={onPress} style={styles.input}>
      <Text style={{ color: value ? "#fff" : "#666" }}>
        {value ? value.toISOString().split("T")[0] : "Select date"}
      </Text>
    </TouchableOpacity>
    {error && <ErrorText text={error} />}
  </View>
);

const DropdownField = ({ label, value, data, onChange, error }: any) => (
  <View style={styles.field}>
    <Text style={styles.label}>{label}</Text>
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      value={value}
      onChange={(i: any) => onChange(i.value)}
      style={styles.dropdown}
    />
    {error && <ErrorText text={error} />}
  </View>
);

const ErrorText = ({ text }: any) => <Text style={styles.error}>{text}</Text>;

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { padding: 16 },
  sectionTitle: { marginTop: 24, marginBottom: 8, color: "#999" },
  field: { marginBottom: 14 },
  label: { color: "#aaa", marginBottom: 6 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    color: "#fff",
    paddingVertical: 6,
  },
  dropdown: { borderBottomWidth: 1, borderBottomColor: "#333" },
  error: { color: "#ef4444", fontSize: 12, marginTop: 4 },
  button: {
    backgroundColor: "#3b82f6",
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
