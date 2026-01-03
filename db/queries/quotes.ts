// db/queries/quotes.ts
import { db } from "@/db/db";
import { quotesTable } from "@/db/schema";
import { desc } from "drizzle-orm";

export const saveQuotes = async (quotes: any[]) => {
  await db.transaction(async (tx) => {
    for (const item of quotes) {
      await tx
        .insert(quotesTable)
        .values({
          id: item.id,
          symbol: item.symbol,
          bid: Number(item.lastQuote.bid.value),
          ask: Number(item.lastQuote.ask.value),
          change: item.session.change,
          changePercent: item.session.changePercent,
          low: item.session.low,
          high: item.session.high,
          updatedAt: Date.now(),
        })
        .onConflictDoUpdate({
          target: quotesTable.id,
          set: {
            bid: Number(item.lastQuote.bid.value),
            ask: Number(item.lastQuote.ask.value),
            updatedAt: Date.now(),
          },
        });
    }
  });
};

export const getCachedQuotes = async () => {
  return db.select().from(quotesTable).orderBy(desc(quotesTable.updatedAt));
};
