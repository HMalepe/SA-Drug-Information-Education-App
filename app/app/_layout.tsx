import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#EEF2F6" },
          headerTintColor: "#12283C",
          headerTitleStyle: { fontWeight: "700" },
        }}
      />
    </>
  );
}
