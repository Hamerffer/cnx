import { HistoryItem } from "@/types";

export interface QuoteItem {
  id: string;
  symbol: string;
  name: string;
  change: string;
  changePercent: string;
  time: string;
  arrow: string;
  arrowCount: number;
  bid: string;
  bidSup: string;
  ask: string;
  askSup: string;
  low: string;
  high: string;
}

export const quotesData: QuoteItem[] = [
  {
    id: "1",
    symbol: "EURUSD",
    name: "EURUSD",
    change: "+72",
    changePercent: "0.06%",
    time: "13:40:48",
    arrow: "⇐",
    arrowCount: 3,
    bid: "1.1758",
    bidSup: "7",
    ask: "1.1759",
    askSup: "0",
    low: "1.17442",
    high: "1.17639",
  },
  {
    id: "2",
    symbol: "GBPUSD",
    name: "GBPUSD",
    change: "+502",
    changePercent: "0.38%",
    time: "13:40:48",
    arrow: "⇐",
    arrowCount: 2,
    bid: "1.3422",
    bidSup: "0",
    ask: "1.3422",
    askSup: "2",
    low: "1.33548",
    high: "1.34262",
  },
  {
    id: "3",
    symbol: "USDCHF",
    name: "USDCHF",
    change: "-49",
    changePercent: "-0.06%",
    time: "13:40:50",
    arrow: "⇐",
    arrowCount: 10,
    bid: "0.7958",
    bidSup: "4",
    ask: "0.7959",
    askSup: "4",
    low: "0.79484",
    high: "0.79704",
  },
  {
    id: "4",
    symbol: "USDJPY",
    name: "USDJPY",
    change: "-381",
    changePercent: "-0.25%",
    time: "13:40:51",
    arrow: "⇐",
    arrowCount: 4,
    bid: "154.84",
    bidSup: "9",
    ask: "154.85",
    askSup: "3",
    low: "154.681",
    high: "155.298",
  },
  {
    id: "5",
    symbol: "USDCNH",
    name: "USDCNH",
    change: "-612",
    changePercent: "-0.09%",
    time: "13:40:51",
    arrow: "⇐",
    arrowCount: 54,
    bid: "7.0372",
    bidSup: "1",
    ask: "7.0377",
    askSup: "5",
    low: "7.03601",
    high: "7.04370",
  },
  {
    id: "6",
    symbol: "USDRUB",
    name: "USDRUB",
    change: "+205",
    changePercent: "0.26%",
    time: "13:39:25",
    arrow: "⇐",
    arrowCount: 1363,
    bid: "78.68",
    bidSup: "4",
    ask: "80.04",
    askSup: "7",
    low: "78.219",
    high: "78.991",
  },
  {
    id: "7",
    symbol: "AUDUSD",
    name: "AUDUSD",
    change: "-20",
    changePercent: "-0.03%",
    time: "13:40:45",
    arrow: "⇐",
    arrowCount: 4,
    bid: "0.6637",
    bidSup: "0",
    ask: "0.6637",
    askSup: "4",
    low: "0.66177",
    high: "0.66478",
  },
  {
    id: "8",
    symbol: "NZDUSD",
    name: "NZDUSD",
    change: "+16",
    changePercent: "0.03%",
    time: "13:40:44",
    arrow: "⇐",
    arrowCount: 10,
    bid: "0.5783",
    bidSup: "6",
    ask: "0.5784",
    askSup: "6",
    low: "0.57579",
    high: "0.57909",
  },
];

/* ---------------- POSITIONS ---------------- */
export const positionsData: HistoryItem[] = [
  {
    id: "p1",
    symbol: "EURUSD",
    action: "buy",
    quantity: "0.10",
    openPrice: "1.07350",
    price: "1.07520",
    profit: "+17.00",
    date: "2025.01.10",
    time: "14:22",
  },
  {
    id: "p2",
    symbol: "GBPUSD",
    action: "sell",
    quantity: "0.20",
    openPrice: "1.26410",
    price: "1.26200",
    profit: "+42.00",
    date: "2025.01.10",
    time: "13:05",
  },
];

/* ---------------- ORDERS ---------------- */
export const ordersData: HistoryItem[] = [
  {
    id: "o1",
    symbol: "USDJPY",
    action: "buy",
    quantity: "0.50",
    price: "154.800",
    status: "filled",
    date: "2025.01.09",
    time: "11:40",
  },
  {
    id: "o2",
    symbol: "AUDUSD",
    action: "sell",
    quantity: "1.00",
    price: "0.66300",
    status: "canceled",
    date: "2025.01.08",
    time: "18:20",
  },
];

/* ---------------- DEALS ---------------- */
export const dealsData: HistoryItem[] = [
  {
    id: "d1",
    symbol: "EURUSD",
    action: "buy",
    quantity: "0.10",
    openPrice: "1.07000",
    price: "1.07400",
    profit: "+40.00",
    date: "2025.01.07",
    time: "16:30",
  },
  {
    id: "d2",
    symbol: "USDCHF",
    action: "sell",
    quantity: "0.30",
    openPrice: "0.88120",
    price: "0.88300",
    profit: "-54.00",
    date: "2025.01.06",
    time: "09:10",
  },
];
