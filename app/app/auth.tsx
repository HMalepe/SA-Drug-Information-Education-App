import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { acceptConsent, stubRegister } from "../lib/api";
import { theme } from "../lib/theme";

const MODES = ["patient", "student", "pharmacist", "doctor"] as const;

export default function AuthScreen() {
  const [email, setEmail] = useState("pharmacist@example.co.za");
  const [mode, setMode] = useState<(typeof MODES)[number]>("pharmacist");
  const [userId, setUserId] = useState<string | null>(null);
  const [status, setStatus] = useState("Stub auth — configure Supabase keys for production.");
  const [popia, setPopia] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);

  async function register() {
    const res = await stubRegister(email, mode);
    setUserId(res.user.id);
    setStatus("Session created. Accept POPIA + medical disclaimer to ungated use.");
  }

  async function consent() {
    if (!userId || !popia || !disclaimer) {
      setStatus("Accept POPIA + medical disclaimer to continue.");
      return;
    }
    await acceptConsent(userId, "popia");
    await acceptConsent(userId, "medical_disclaimer");
    setStatus("Consents logged. Mode: " + mode);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts & mode</Text>
      <Text style={styles.meta}>{status}</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.modes}>
        {MODES.map((m) => (
          <Pressable
            key={m}
            onPress={() => setMode(m)}
            style={[styles.chip, mode === m && styles.chipActive]}
          >
            <Text style={[styles.chipText, mode === m && styles.chipTextActive]}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Create stub session</Text>
      </Pressable>

      <Pressable onPress={() => setPopia((v) => !v)}>
        <Text style={styles.check}>{popia ? "☑" : "☐"} POPIA consent (no offshore health data)</Text>
      </Pressable>
      <Pressable onPress={() => setDisclaimer((v) => !v)}>
        <Text style={styles.check}>
          {disclaimer ? "☑" : "☐"} Medical disclaimer (reference tool, not a device)
        </Text>
      </Pressable>

      <Pressable style={styles.button} onPress={consent}>
        <Text style={styles.buttonText}>Accept & continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.space.lg,
    gap: theme.space.md,
    backgroundColor: theme.colors.mist,
  },
  title: { fontSize: theme.typography.size.xl, fontWeight: "800", color: theme.colors.ink },
  meta: { color: theme.colors.slate },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.slate,
    borderRadius: 8,
    padding: theme.space.sm,
    color: theme.colors.ink,
  },
  modes: { flexDirection: "row", flexWrap: "wrap", gap: theme.space.sm },
  chip: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    borderRadius: 8,
  },
  chipActive: { backgroundColor: theme.colors.teal },
  chipText: { color: theme.colors.ink, fontWeight: "600", textTransform: "capitalize" },
  chipTextActive: { color: theme.colors.white },
  button: {
    backgroundColor: theme.colors.teal,
    padding: theme.space.md,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: theme.colors.white, fontWeight: "700" },
  check: { color: theme.colors.ink },
});
