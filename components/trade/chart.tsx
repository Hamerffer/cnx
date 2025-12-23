import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    background: #000;
  }
  #chart {
    width: 100%;
    height: 100%;
  }
</style>
</head>
<body>
<div id="chart"></div>

<script src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
<script>
  const chart = LightweightCharts.createChart(
    document.getElementById('chart'),
    {
      width: window.innerWidth,
      height: 200,
      layout: {
        background: { color: '#000' },
        textColor: '#888',
      },
      grid: {
        vertLines: { color: '#222' },
        horzLines: { color: '#222' },
      },
      rightPriceScale: {
        borderColor: '#444',
      },
      timeScale: {
        borderColor: '#444',
      },
    }
  );

  // 🔵 BUY line
  const buy = chart.addLineSeries({
    color: '#2e86de',
    lineWidth: 2,
  });

  // 🔴 SELL line
  const sell = chart.addLineSeries({
    color: '#e74c3c',
    lineWidth: 2,
  });

  // ✅ DUMMY DATA (graph clearly visible)
  buy.setData([
    { time: '2024-01-01', value: 3687.2 },
    { time: '2024-01-02', value: 3687.6 },
    { time: '2024-01-03', value: 3687.3 },
    { time: '2024-01-04', value: 3687.8 },
    { time: '2024-01-05', value: 3687.5 },
  ]);

  sell.setData([
    { time: '2024-01-01', value: 3688.2 },
    { time: '2024-01-02', value: 3688.0 },
    { time: '2024-01-03', value: 3687.9 },
    { time: '2024-01-04', value: 3688.1 },
    { time: '2024-01-05', value: 3688.3 },
  ]);

  // Price lines
  buy.createPriceLine({
    price: 3687.51,
    color: '#2e86de',
    title: 'BUY',
    axisLabelVisible: true,
  });

  sell.createPriceLine({
    price: 3688.13,
    color: '#e74c3c',
    title: 'SELL',
    axisLabelVisible: true,
  });
</script>
</body>
</html>
`;

export default function Chart() {
  return (
    <View
      style={{
        height: 200, // ✅ FIXED HEIGHT (MOST IMPORTANT)
        marginHorizontal: 15,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <WebView
        source={{ html }}
        originWhitelist={["*"]}
        javaScriptEnabled
        scrollEnabled={false}
        style={{ flex: 1 }}
      />
    </View>
  );
}
