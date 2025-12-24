import AppHeader from "@/components/back-chevron";
import ScreenWrapper from "@/components/screen-Wrapper";
import { colors } from "@/constants/theme";
import * as React from "react";
import { StyleSheet } from "react-native";
import { List, TextInput } from "react-native-paper";

/* ---------------- DATA ---------------- */

const SYMBOLS = {
  forex: {
    title: "Forex",
    items: [
      { name: "EURUSD", desc: "Euro vs US Dollar" },
      { name: "GBPUSD", desc: "Pound vs US Dollar" },
      { name: "USDJPY", desc: "US Dollar vs Yen" },
    ],
  },
  metals: {
    title: "Metals",
    items: [
      { name: "XAUUSD", desc: "Gold | 1 Lot = 100 Troy Oz" },
      { name: "XAGUSD", desc: "Silver | 1 Lot = 5000 Troy Oz" },
    ],
  },
  crypto: {
    title: "Crypto",
    items: [
      { name: "BTCUSD", desc: "Bitcoin" },
      { name: "ETHUSD", desc: "Ethereum" },
    ],
  },
};

/* ---------------- SCREEN ---------------- */

export default function AddSymbolScreen() {
  const [search, setSearch] = React.useState("");
  const [expanded, setExpanded] = React.useState<string[]>([]);

  /* -------- SEARCH + AUTO EXPAND LOGIC -------- */

  const getFilteredData = () => {
    if (!search.trim()) {
      return { data: SYMBOLS, autoExpanded: [] };
    }

    const query = search.toLowerCase();
    const filtered: any = {};
    const autoExpanded: string[] = [];

    Object.entries(SYMBOLS).forEach(([key, category]: any) => {
      const matches = category.items.filter(
        (item: any) =>
          item.name.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        filtered[key] = { ...category, items: matches };
        autoExpanded.push(key);
      }
    });

    return { data: filtered, autoExpanded };
  };

  const { data, autoExpanded } = getFilteredData();

  /* ---------------- UI ---------------- */

  return (
    <ScreenWrapper>
      <AppHeader title="Add Symbol" />

      {/* Search Bar */}
      <TextInput
        mode="flat"
        placeholder="Find symbols"
        value={search}
        onChangeText={setSearch}
        left={<TextInput.Icon icon="magnify" />}
        style={styles.search}
      />

      <List.Section>
        {Object.entries(data).map(([key, category]: any) => {
          const isExpanded = search
            ? autoExpanded.includes(key)
            : expanded.includes(key);

          return (
            <List.Accordion
              key={key}
              title={category.title}
              expanded={isExpanded}
              onPress={() => {
                if (search) return;
                setExpanded((prev) =>
                  prev.includes(key)
                    ? prev.filter((k) => k !== key)
                    : [...prev, key]
                );
              }}
              left={(props) => <List.Icon {...props} icon="folder" />}
            >
              {category.items.map((item: any) => (
                <List.Item
                  key={item.name}
                  title={item.name}
                  description={item.desc}
                  right={(props) => (
                    <List.Icon {...props} icon="check-circle-outline" />
                  )}
                />
              ))}
            </List.Accordion>
          );
        })}
      </List.Section>
    </ScreenWrapper>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  search: {
    margin: 12,
    backgroundColor: colors.background,
  },
});
