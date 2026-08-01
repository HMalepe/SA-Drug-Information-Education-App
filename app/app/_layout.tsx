import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "@materia/design-tokens";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.mist },
          headerTintColor: colors.ink,
          headerTitleStyle: { fontWeight: "700" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Materia" }} />
        <Stack.Screen name="auth" options={{ title: "Accounts & mode" }} />
        <Stack.Screen name="molecule/[slug]" options={{ title: "Medicine 360" }} />
        <Stack.Screen name="dosing/[slug]" options={{ title: "Dosing & overdose" }} />
      </Stack>
    </>
  );
}
