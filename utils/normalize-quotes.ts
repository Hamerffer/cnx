export type QuoteItem = {
  id: string;
  symbol: string;

  change: string;
  changePercent: string;

  bid: string;
  ask: string;

  low: string;
  high: string;
};

export const normalizeQuotes = (items: any[]): QuoteItem[] => {
  return items.map((item) => ({
    id: item.id,
    symbol: item.symbol,

    change: item.session.change,
    changePercent: item.session.changePercent,

    bid: item.lastQuote.bid.value,
    ask: item.lastQuote.ask.value,

    low: item.session.low,
    high: item.session.high,
  }));
};
