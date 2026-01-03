import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

/* ================= OPEN DB ================= */
export const getDb = async () => {
  if (db) return db;

  db = await SQLite.openDatabaseAsync("app.db");

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS user (
      id TEXT PRIMARY KEY,

      name TEXT,
      email TEXT,
      login TEXT,
      brokerId TEXT,

      serverId TEXT,
      serverName TEXT,

      accountTypeId TEXT,
      accountTypeName TEXT,

      balance TEXT,
      role TEXT,

      updatedAt TEXT
    );
  /* ---------- QUOTES TABLE ---------- */
    CREATE TABLE IF NOT EXISTS quotes (
      id TEXT PRIMARY KEY,
      symbol TEXT,

      bid REAL,
      ask REAL,

      change TEXT,
      changePercent TEXT,

      low REAL,
      high REAL,

      updatedAt INTEGER
    );

  `);

  return db;
};

/* ================= SAVE / UPDATE USER ================= */
export const saveUser = async (user: {
  id: string;
  name: string;
  email: string;
  login: string;
  brokerId: string;

  serverId: string | null;
  serverName: string | null;

  accountTypeId: string | null;
  accountTypeName: string | null;

  balance: string;
  role: string; // JSON string
  updatedAt: string;
}) => {
  const db = await getDb();

  await db.runAsync(
    `
    INSERT OR REPLACE INTO user (
      id,
      name,
      email,
      login,
      brokerId,
      serverId,
      serverName,
      accountTypeId,
      accountTypeName,
      balance,
      role,
      updatedAt
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    user.id,
    user.name,
    user.email,
    user.login,
    user.brokerId,
    user.serverId,
    user.serverName,
    user.accountTypeId,
    user.accountTypeName,
    user.balance,
    user.role,
    user.updatedAt
  );
};

/* ================= GET USER ================= */
export type LocalUser = {
  id: string;
  name: string;
  email: string;
  login: string;
  brokerId: string;

  serverId: string | null;
  serverName: string | null;

  accountTypeId: string | null;
  accountTypeName: string | null;

  balance: string;
  role: string; // JSON
  updatedAt: string;
};

export const getUser = async (): Promise<LocalUser | null> => {
  const db = await getDb();
  return db.getFirstAsync<LocalUser>("SELECT * FROM user LIMIT 1");
};

/* ================= CLEAR USER (LOGOUT) ================= */
export const clearUser = async () => {
  const db = await getDb();
  await db.runAsync("DELETE FROM user");
};

//quotes

/* ================= SAVE QUOTES ================= */
export const saveQuotes = async (quotes: any[]) => {
  const db = await getDb();

  await db.execAsync("BEGIN TRANSACTION");

  try {
    for (const item of quotes) {
      await db.runAsync(
        `
        INSERT OR REPLACE INTO quotes (
          id,
          symbol,
          bid,
          ask,
          change,
          changePercent,
          low,
          high,
          updatedAt
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        item.id,
        item.symbol,
        Number(item.lastQuote.bid.value),
        Number(item.lastQuote.ask.value),
        item.session.change,
        item.session.changePercent,
        item.session.low,
        item.session.high,
        Date.now()
      );
    }

    await db.execAsync("COMMIT");
  } catch (e) {
    await db.execAsync("ROLLBACK");
    throw e;
  }
};


/* ================= GET CACHED QUOTES ================= */
export type CachedQuote = {
  id: string;
  symbol: string;
  bid: number;
  ask: number;
  change: string;
  changePercent: string;
  low: number;
  high: number;
  updatedAt: number;
};

export const getCachedQuotes = async (): Promise<CachedQuote[]> => {
  const db = await getDb();
  return db.getAllAsync<CachedQuote>(
    "SELECT * FROM quotes ORDER BY updatedAt DESC"
  );
};
