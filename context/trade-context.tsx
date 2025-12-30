import React, { createContext, useContext, useState } from "react";

/* ================= TYPES ================= */
type TradeContextType = {
  showTradeForm: boolean;
  symbol: string;

  setShowTradeForm: (value: boolean) => void;
  setSymbol: (value: string) => void;
};

/* ================= CONTEXT ================= */
const TradeContext = createContext<TradeContextType | undefined>(undefined);

/* ================= PROVIDER ================= */
export const TradeProvider = ({ children }: { children: React.ReactNode }) => {
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [symbol, setSymbol] = useState("EURUSD");

  return (
    <TradeContext.Provider
      value={{
        showTradeForm,
        symbol,
        setShowTradeForm: setShowTradeForm,
        setSymbol,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};

/* ================= HOOK ================= */
export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) {
    throw new Error("useTrade must be used inside TradeProvider");
  }
  return context;
};
