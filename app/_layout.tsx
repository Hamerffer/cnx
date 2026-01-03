// import { colors } from "@/constants/theme";
// import { AuthProvider } from "@/context/AuthContext";
// import { TradeProvider } from "@/context/trade-context";
// import { UserProvider } from "@/context/user-context";
// import "@/global.css";
// import { queryClient } from "@/services/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";

// import React from "react";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { PaperProvider } from "react-native-paper";
// import "react-native-reanimated";

// /* 🔹 DB MIGRATIONS */
// import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
// import { db } from "@/db/db";
// import migrations from "@/drizzle/migrations";

// import { Guard } from "@/utils/guard";

// /* ================= ROOT LAYOUT ================= */
// export default function RootLayout() {
//   const { success, error } = useMigrations(db, migrations);

//   /* 🔹 SIMPLE LOGS ONLY */
//   if (error) {
//     console.log("❌ DB migration error:", error);
//   }

//   if (!success) {
//     console.log("⏳ Running DB migrations...");
//     return null;
//   }

//   console.log("✅ DB ready");

//   return (
//     <GestureHandlerRootView
//       style={{ flex: 1, backgroundColor: colors.background }}
//     >
//       <QueryClientProvider client={queryClient}>
//         <PaperProvider>
//           <AuthProvider>
//             <UserProvider>
//               <TradeProvider>
//                 <Guard />
//               </TradeProvider>
//             </UserProvider>
//           </AuthProvider>
//         </PaperProvider>
//       </QueryClientProvider>
//     </GestureHandlerRootView>
//   );
// }

import { colors } from "@/constants/theme";
import { AuthProvider } from "@/context/AuthContext";
import { TradeProvider } from "@/context/trade-context";
import { UserProvider } from "@/context/user-context";
import "@/global.css";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "react-native-reanimated";

/* 🔹 SQLITE */
import { SQLiteProvider } from "expo-sqlite";

/* 🔹 DB MIGRATIONS */
import { db } from "@/db/db";
import migrations from "@/drizzle/migrations";
import { Guard } from "@/utils/guard";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";

export const DATABASE_NAME = "app.db";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.log("❌ DB migration error:", error);
  }

  if (!success) {
    console.log("⏳ Running DB migrations...");
    return null; // or splash / loader
  }

  console.log("✅ DB ready");

  return (
    <SQLiteProvider
      databaseName={DATABASE_NAME}
      options={{ enableChangeListener: true }}
    >
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: colors.background }}
      >
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <AuthProvider>
              <UserProvider>
                <TradeProvider>
                  <Guard />
                </TradeProvider>
              </UserProvider>
            </AuthProvider>
          </PaperProvider>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SQLiteProvider>
  );
}
