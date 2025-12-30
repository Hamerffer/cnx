import ChartSkeleton from "@/components/skeletons/chart-skeleton";
import TradeBottomSheet from "@/components/trade/trade-form";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useTrade } from "@/context/trade-context";
import { scale, verticalScale } from "@/utils/styling";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import { WebView } from "react-native-webview";

const { width, height } = Dimensions.get("window");

// CONFIG
const SYMBOL = "EURUSDT";
const INTERVAL = "5m";
const REFRESH_MS = 1000;

export default function ChartScreen() {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: ${colors.background};
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: Arial, sans-serif;
    }

    #header {
      height: 56px;
      padding: 8px 12px;
      background: ${colors.surface};
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid ${colors.border};
    }

    #pair {
      color: ${colors.textPrimary};
      font-size: 14px;
      font-weight: bold;
    }

    #meta {
      display: flex;
      gap: 12px;
      font-size: 12px;
      color: ${colors.textSecondary};
    }

    #price {
      font-weight: bold;
    }

    #chart {
      width: 100%;
      height: ${height - 56}px;
    }
  </style>
</head>

<body>
  <!-- HEADER -->
  <div id="header" class=${colors.background}>
    <div id="pair">${SYMBOL} · M5</div>
    <div id="meta">
      <div id="price">--</div>
      <div id="change">--</div>
    </div>
  </div>

  <!-- CHART -->
  <div id="chart"></div>

  <script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>

  <script>
    let chart;
    let candleSeries;
    let lastCandleTime = 0;

    async function fetchCandles(limit = 200) {
      const res = await fetch(
        "https://api.binance.com/api/v3/klines?symbol=${SYMBOL}&interval=${INTERVAL}&limit=" + limit
      );
      const data = await res.json();
      return data.map(c => ({
        time: c[0] / 1000,
        open: +c[1],
        high: +c[2],
        low: +c[3],
        close: +c[4],
      }));
    }

    function updateHeader(candle, prev) {
      const priceEl = document.getElementById("price");
      const changeEl = document.getElementById("change");

      priceEl.textContent = candle.close.toFixed(2);

      if (prev) {
        const diff = candle.close - prev.close;
        const pct = (diff / prev.close) * 100;
        const color = diff >= 0 ? "${colors.positive}" : "${colors.negative}";

        changeEl.textContent =
          (diff >= 0 ? "+" : "") + diff.toFixed(2) +
          " (" + pct.toFixed(2) + "%)";

        changeEl.style.color = color;
        priceEl.style.color = color;
      }
    }

    async function initChart() {
      chart = LightweightCharts.createChart(
        document.getElementById("chart"),
        {
          width: window.innerWidth,
          height: ${height - 56},
          layout: {
            background: { color: "${colors.background}" },
            textColor: "${colors.textSecondary}",
          },
          grid: {
            vertLines: { color: "${colors.divider}" },
            horzLines: { color: "${colors.divider}" },
          },
          rightPriceScale: {
            borderColor: "${colors.border}",
          },
          timeScale: {
            borderColor: "${colors.border}",
            timeVisible: true,
            secondsVisible: false,
          },
          crosshair: {
            mode: LightweightCharts.CrosshairMode.Normal,
          },
        }
      );

      candleSeries = chart.addSeries(
        LightweightCharts.CandlestickSeries,
        {
          upColor: "${colors.primary}",
          downColor: "${colors.negative}",
          wickUpColor: "${colors.positive}",
          wickDownColor: "${colors.negative}",
          borderVisible: false,
        }
      );

      const candles = await fetchCandles();
     candleSeries.setData(candles);

// tell React Native chart is ready
window.ReactNativeWebView.postMessage("CHART_READY");


      lastCandleTime = candles[candles.length - 1].time;
      updateHeader(candles[candles.length - 1], candles[candles.length - 2]);

      startLiveUpdates();
    }

    async function startLiveUpdates() {
      setInterval(async () => {
        const latest = await fetchCandles(2);
        const candle = latest[latest.length - 1];
        const prev = latest[latest.length - 2];

        if (candle.time === lastCandleTime) {
          candleSeries.update(candle);
        } else {
          candleSeries.update(candle);
          lastCandleTime = candle.time;
        }

        updateHeader(candle, prev);
      }, ${REFRESH_MS});
    }

    window.onload = initChart;
  </script>
</body>
</html>
  `;
  // const [showTradeForm, setShowTradeForm] = React.useState(false);
  const { showTradeForm, setShowTradeForm } = useTrade();
  const [loading, setLoading] = React.useState(true);

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        mixedContentMode="always"
        allowFileAccess
        allowUniversalAccessFromFileURLs
        scrollEnabled={false}
        style={{ width, height }}
        onMessage={(event) => {
          if (event.nativeEvent.data === "CHART_READY") {
            setLoading(false);
          }
        }}
      />
      {loading && <ChartSkeleton />}

      <TradeBottomSheet
        visible={showTradeForm}
        onClose={() => setShowTradeForm(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  paperModal: {
    justifyContent: "flex-end",
    margin: 0,
  },

  sheet: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingY._20,
    borderTopLeftRadius: radius._20,
    borderTopRightRadius: radius._20,
  },

  formHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._15,
  },

  symbol: {
    fontSize: scale(16),
    fontWeight: "700",
    color: colors.textPrimary,
  },

  sub: {
    fontSize: scale(12),
    color: colors.textSecondary,
    marginTop: spacingY._5,
  },

  close: {
    fontSize: scale(18),
    color: colors.textSecondary,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._12,
  },

  label: {
    fontSize: scale(13),
    color: colors.textSecondary,
  },

  inputBox: {
    width: scale(120),
    height: verticalScale(36),
    borderRadius: radius._6,
    backgroundColor: colors.surfaceLight,
    justifyContent: "center",
    alignItems: "center",
  },

  inputText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: colors.textPrimary,
  },

  placeholder: {
    fontSize: scale(14),
    color: colors.textMuted,
  },

  actionRow: {
    flexDirection: "row",
    marginTop: spacingY._20,
  },

  actionBtn: {
    flex: 1,
  },

  sell: {
    backgroundColor: colors.sell,
    borderTopLeftRadius: radius._10,
    borderBottomLeftRadius: radius._10,
  },

  buy: {
    backgroundColor: colors.buy,
    borderTopRightRadius: radius._10,
    borderBottomRightRadius: radius._10,
  },

  // new css
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "90%",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
  },

  actionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  //new css
});
