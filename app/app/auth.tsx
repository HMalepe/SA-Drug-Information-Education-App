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
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [popia, setPopia] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);

  async function register() {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const res = await stubRegister(email.trim(), mode);
      setUserId(res.user.id);
      setStatus("Session created. Accept POPIA + medical disclaimer to ungated use.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create session");
    } finally {
      setBusy(false);
    }
  }

  async function consent() {
    if (!userId || !popia || !disclaimer) {
      setStatus("Accept POPIA + medical disclaimer to continue.");
      return;
    }
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await acceptConsent(userId, "popia");
      await acceptConsent(userId, "medical_disclaimer");
      setStatus("Consents logged. Mode: " + mode);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not log consents");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts & mode</Text>
      <Text style={styles.meta}>{status}</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!busy}
      />

      <View style={styles.modes}>
        {MODES.map((m) => (
          <Pressable
            key={m}
            onPress={() => setMode(m)}
            style={[styles.chip, mode === m && styles.chipActive]}
            disabled={busy}
          >
            <Text style={[styles.chipText, mode === m && styles.chipTextActive]}>{m}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        style={[styles.button, busy && styles.buttonDisabled]}
        onPress={() => void register()}
        disabled={busy}
      >
        <Text style={styles.buttonText}>{busy ? "Working…" : "Create stub session"}</Text>
      </Pressable>

      <Pressable onPress={() => setPopia((v) => !v)} disabled={busy}>
        <Text style={styles.check}>{popia ? "☑" : "☐"} POPIA consent (no offshore health data)</Text>
      </Pressable>
      <Pressable onPress={() => setDisclaimer((v) => !v)} disabled={busy}>
        <Text style={styles.check}>
          {disclaimer ? "☑" : "☐"} Medical disclaimer (reference tool, not a device)
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, busy && styles.buttonDisabled]}
        onPress={() => void consent()}
        disabled={busy}
      >
        <Text style={styles.buttonText}>{busy ? "Working…" : "Accept & continue"}</Text>
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
  error: { color: theme.colors.danger, fontWeight: "600" },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.slate,
    borderRadius: theme.radius.md,
    padding: theme.space.sm,
    color: theme.colors.ink,
  },
  modes: { flexDirection: "row", flexWrap: "wrap", gap: theme.space.sm },
  chip: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    borderRadius: theme.radius.md,
  },
  chipActive: { backgroundColor: theme.colors.teal },
  chipText: { color: theme.colors.ink, fontWeight: "600", textTransform: "capitalize" },
  chipTextActive: { color: theme.colors.white },
  button: {
    backgroundColor: theme.colors.teal,
    padding: theme.space.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: theme.colors.white, fontWeight: "700" },
  check: { color: theme.colors.ink },
});
