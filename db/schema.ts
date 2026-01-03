import {
  sqliteTable,
  text,
  int,
  real,
} from "drizzle-orm/sqlite-core";

/* ================= USER TABLE ================= */
export const userTable = sqliteTable("user", {
  id: text().primaryKey(),

  name: text(),
  email: text(),
  login: text(),
  brokerId: text(),

  serverId: text(),
  serverName: text(),

  accountTypeId: text(),
  accountTypeName: text(),

  balance: text(),
  role: text(),        // JSON string
  updatedAt: text(),
});

/* ================= QUOTES TABLE ================= */
export const quotesTable = sqliteTable("quotes", {
  id: text().primaryKey(),

  symbol: text(),

  bid: real(),
  ask: real(),

  change: text(),
  changePercent: text(),

  low: real(),
  high: real(),

  updatedAt: int(),
});
