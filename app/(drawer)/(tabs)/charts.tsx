import { colors } from "@/constants/theme";
import { useSocket } from "@/socket/use-sockets";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

/* ================= TYPES ================= */
type Candle = {
  o: number;
  h: number;
  l: number;
  c: number;
  s: number;
  e: number;
  pair: string;
  v: number;
};

const INTERVALS = [1, 5, 15];

export default function ChartScreen() {
  /* ================= ROUTE ================= */
  const { s } = useLocalSearchParams<{ s?: string }>();
  const symbol = s ? decodeURIComponent(s) : "USD/JPY";

  /* ================= STATE ================= */
  const webRef = useRef<WebView>(null);
  const chartReady = useRef(false);
  const [webViewKey, setWebViewKey] = useState(Date.now());

  const { isConnected, emit, subscribe } = useSocket();

  const [loading, setLoading] = useState(true);
  const [interval, setInterval] = useState(1);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  /* ================= RESET ON SYMBOL CHANGE ================= */
  useEffect(() => {
    console.log(`Symbol changed to: ${symbol}`);
    setLoading(true);
    setCurrentPrice(null);
    setPrevPrice(null);
    chartReady.current = false;
    setWebViewLoaded(false);
    // Force WebView remount
    setWebViewKey(Date.now());
  }, [symbol]);

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!isConnected || !chartReady.current) return;

    console.log(`Subscribing to: ${symbol}`);
    emit("subscribe", symbol);

    const unsubscribe = subscribe("marketData", (data: Candle) => {
      if (!chartReady.current || !webRef.current) return;
      console.log(data);
      webRef.current.postMessage(JSON.stringify({ type: "CANDLE", data }));

      setPrevPrice((prev) => currentPrice ?? prev);
      setCurrentPrice(+data.c);
    });

    return () => {
      console.log(`Unsubscribing from: ${symbol}`);
      emit("unsubscribe", symbol);
      unsubscribe();
    };
  }, [isConnected, symbol, chartReady.current]);

  /* ================= SEND INTERVAL ================= */
  useEffect(() => {
    if (!chartReady.current || !webRef.current) return;

    webRef.current.postMessage(
      JSON.stringify({ type: "INTERVAL", value: interval })
    );
  }, [interval, chartReady.current]);

  /* ================= HANDLE WEBVIEW LOAD ================= */
  const handleWebViewLoad = useCallback(() => {
    console.log("WebView loaded");
    setWebViewLoaded(true);
  }, []);

  const handleWebViewLoadEnd = useCallback(() => {
    console.log("WebView load ended");
    // Small delay to ensure WebView is fully ready
    setTimeout(() => {
      chartReady.current = true;
      setLoading(false);

      // Initialize chart
      if (webRef.current) {
        webRef.current.postMessage(JSON.stringify({ type: "INIT", symbol }));
        webRef.current.postMessage(
          JSON.stringify({ type: "INTERVAL", value: interval })
        );
      }
    }, 300);
  }, [interval, symbol]);

  const handleWebViewError = useCallback((syntheticEvent: any) => {
    const { nativeEvent } = syntheticEvent;
    console.warn("WebView error:", nativeEvent);
    setLoading(false);
  }, []);

  const handleWebViewMessage = useCallback((event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    console.log("Message from WebView:", message);

    if (message === "CHART_READY") {
      chartReady.current = true;
      setLoading(false);
    }
  }, []);

  /* ================= HTML TEMPLATE ================= */
  const getHtmlContent = useCallback(() => {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Chart</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: ${colors.background};
    }
    
    #container {
      width: 100%;
      height: 100%;
      position: relative;
    }
    
    #chart {
      width: 100%;
      height: 100%;
    }
    
    #status {
      position: absolute;
      top: 10px;
      left: 10px;
      color: white;
      font-family: Arial, sans-serif;
      font-size: 12px;
      z-index: 100;
      background: rgba(0,0,0,0.5);
      padding: 5px 10px;
      border-radius: 3px;
      display: none;
    }
  </style>
</head>
<body>
  <div id="container">
    <div id="status">Loading chart...</div>
    <div id="chart"></div>
  </div>

  <script src="https://unpkg.com/lightweight-charts@4.1.0/dist/lightweight-charts.standalone.production.js"></script>
  
  <script>
    (function() {
      console.log('Chart script loading...');
      
      let chart = null;
      let series = null;
      let currentInterval = 1;
      const candles = new Map();
      let isChartReady = false;
      let pendingMessages = [];
      
      function showStatus(text) {
        const statusEl = document.getElementById('status');
        if (statusEl) {
          statusEl.textContent = text;
          statusEl.style.display = 'block';
        }
      }
      
      function hideStatus() {
        const statusEl = document.getElementById('status');
        if (statusEl) {
          statusEl.style.display = 'none';
        }
      }
      
      function initChart() {
        console.log('Initializing chart...');
        showStatus('Initializing chart...');
        
        try {
          // Clean up existing chart
          if (chart) {
            chart.remove();
            chart = null;
            series = null;
          }
          
          const container = document.getElementById('chart');
          if (!container) {
            console.error('Chart container not found');
            return;
          }
          
          // Clear container
          container.innerHTML = '';
          
          chart = LightweightCharts.createChart(container, {
            width: container.clientWidth,
            height: container.clientHeight,
            layout: {
              background: { color: '${colors.background}' },
              textColor: '#d1d5db',
            },
            grid: {
              vertLines: { color: '#1e293b' },
              horzLines: { color: '#1e293b' },
            },
            timeScale: {
              timeVisible: true,
              secondsVisible: true,
              borderColor: '#1e293b',
            },
            crosshair: {
              mode: LightweightCharts.CrosshairMode.Normal,
            },
          });
          
          series = chart.addCandlestickSeries({
            upColor: '${colors.primary}',
            downColor: '#ef4444',
            borderUpColor: '${colors.primary}',
            borderDownColor: '#ef4444',
            wickUpColor: '${colors.primary}',
            wickDownColor: '#ef4444',
            borderVisible: false,
          });
          
          // Set empty data initially
          series.setData([]);
          
          // Handle resize
          window.addEventListener('resize', handleResize);
          
          isChartReady = true;
          hideStatus();
          console.log('Chart initialized successfully');
          
          // Notify React Native that chart is ready
          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage('CHART_READY');
          }
          
          // Process any pending messages
          processPendingMessages();
          
        } catch (error) {
          console.error('Error initializing chart:', error);
          showStatus('Error: ' + error.message);
        }
      }
      
      function handleResize() {
        if (chart && document.getElementById('chart')) {
          const container = document.getElementById('chart');
          chart.resize(container.clientWidth, container.clientHeight);
        }
      }
      
      function resetChart() {
        console.log('Resetting chart...');
        candles.clear();
        if (series) {
          series.setData([]);
        }
      }
      
      function setIntervalValue(interval) {
        console.log('Setting interval to:', interval);
        currentInterval = interval;
        resetChart();
      }
      
      function addCandle(data) {
        if (!series || !isChartReady) return;
        
        const bucket = Math.floor(data.s / 1000 / currentInterval) * currentInterval;
        const existingCandle = candles.get(bucket);
        
        if (existingCandle) {
          existingCandle.high = Math.max(existingCandle.high, +data.h);
          existingCandle.low = Math.min(existingCandle.low, +data.l);
          existingCandle.close = +data.c;
        } else {
          candles.set(bucket, {
            time: bucket,
            open: +data.o,
            high: +data.h,
            low: +data.l,
            close: +data.c,
          });
        }
        
        const candleArray = Array.from(candles.values()).sort((a, b) => a.time - b.time);
        series.setData(candleArray);
        
        // Auto-scroll to latest
        chart.timeScale().scrollToRealTime();
      }
      
      function processPendingMessages() {
        while (pendingMessages.length > 0) {
          const message = pendingMessages.shift();
          handleMessage(message);
        }
      }
      
      function handleMessage(message) {
        console.log('Received message:', message);
        
        try {
          const data = JSON.parse(message);
          
          if (!isChartReady) {
            pendingMessages.push(message);
            return;
          }
          
          switch (data.type) {
            case 'INIT':
              console.log('Init command received');
              initChart();
              break;
            case 'RESET':
              resetChart();
              break;
            case 'INTERVAL':
              setIntervalValue(data.value);
              break;
            case 'CANDLE':
              addCandle(data.data);
              break;
            default:
              console.warn('Unknown message type:', data.type);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      }
      
      // Message handlers
      function onMessage(event) {
        console.log('Message event received');
        handleMessage(event.data);
      }
      
      // Setup message listeners
      if (window.ReactNativeWebView) {
        // For React Native WebView
        document.addEventListener('message', function(e) {
          onMessage(e);
        });
      }
      
      window.addEventListener('message', onMessage);
      
      // Initialize on load
      window.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing chart...');
        // Small delay to ensure everything is ready
        setTimeout(initChart, 100);
      });
      
      // If DOM is already loaded
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(initChart, 100);
      }
      
      // Cleanup
      window.addEventListener('beforeunload', function() {
        if (chart) {
          chart.remove();
          chart = null;
          series = null;
        }
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('message', onMessage);
        document.removeEventListener('message', onMessage);
      });
      
    })();
  </script>
</body>
</html>
    `;
  }, []);

  /* ================= PRICE COLOR ================= */
  const priceColor =
    prevPrice === null || currentPrice === null
      ? "#9ca3af" // neutral
      : currentPrice > prevPrice
      ? colors.primary // price up
      : currentPrice < prevPrice
      ? colors.sell // price down
      : "#9ca3af";

  /* ================= UI ================= */

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.symbol}>{symbol}</Text>

        <Text style={[styles.price, { color: priceColor }]}>
          {currentPrice ? currentPrice.toFixed(2) : "--"}
        </Text>
      </View>

      {/* INTERVAL BAR */}
      <View style={styles.intervalBar}>
        {INTERVALS.map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setInterval(i)}
            style={[styles.intervalBtn, interval === i && styles.active]}
          >
            <Text style={styles.intervalText}>{i}s</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* CHART */}
      <View style={styles.chart}>
        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading chart...</Text>
          </View>
        )}

        <WebView
          key={`webview_${symbol}_${webViewKey}`}
          ref={webRef}
          source={{ html: getHtmlContent() }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          mixedContentMode="always"
          onLoad={handleWebViewLoad}
          onLoadEnd={handleWebViewLoadEnd}
          onError={handleWebViewError}
          onHttpError={handleWebViewError}
          onMessage={handleWebViewMessage}
          startInLoadingState={false}
          renderLoading={() => (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
          style={styles.webview}
          onContentProcessDidTerminate={() => {
            console.log("WebView crashed, reloading...");
            setWebViewKey(Date.now());
            setLoading(true);
          }}
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      </View>
    </View>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  symbol: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
  },
  intervalBar: {
    flexDirection: "row",
    padding: 8,
    gap: 8,
    backgroundColor: colors.background,
  },
  intervalBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#1e293b",
    borderRadius: 6,
  },
  active: {
    backgroundColor: colors.primary,
  },
  intervalText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  chart: {
    flex: 1,
    backgroundColor: colors.background,
  },
  webview: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    zIndex: 10,
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 14,
  },
});
