import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { calculateDose, getMedicine360 } from "../../lib/api";
import { theme } from "../../lib/theme";

export default function DosingHubScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [hub, setHub] = useState("");
  const [moleculeId, setMoleculeId] = useState("");
  const [weight, setWeight] = useState("18");
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    (async () => {
      const page = await getMedicine360(String(slug));
      setMoleculeId(page.molecule.id);
      setHub(
        JSON.stringify(
          {
            dosing: page.tabs.dosing,
            overdose: page.tabs.overdose,
          },
          null,
          2,
        ),
      );
    })().catch((e) => setHub(String(e)));
  }, [slug]);

  async function onCalc() {
    const res = await calculateDose({
      moleculeId,
      weightKg: Number(weight),
      indicationKey: "scaffold",
      clinicallyConfirmed: confirmed,
    });
    setResult(JSON.stringify(res, null, 2));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dosing & overdose</Text>
      <Text style={styles.meta}>
        Fixed emergency template + governed calculator (show working, clinical confirmation).
      </Text>
      <Text style={styles.pre}>{hub}</Text>

      <Text style={styles.section}>Calculator</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholder="Weight kg"
      />
      <Pressable onPress={() => setConfirmed((v) => !v)}>
        <Text style={styles.check}>
          {confirmed ? "☑" : "☐"} I confirm this will be checked clinically before use
        </Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onCalc}>
        <Text style={styles.buttonText}>Calculate (sourced rules only)</Text>
      </Pressable>
      {result ? <Text style={styles.pre}>{result}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: theme.space.lg, gap: theme.space.md, backgroundColor: theme.colors.mist },
  title: { fontSize: theme.typography.size.xl, fontWeight: "800", color: theme.colors.ink },
  meta: { color: theme.colors.slate },
  section: { fontWeight: "700", color: theme.colors.teal },
  pre: {
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.size.xs,
    color: theme.colors.slate,
    backgroundColor: theme.colors.white,
    padding: theme.space.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.slate,
    borderRadius: 8,
    padding: theme.space.sm,
    color: theme.colors.ink,
  },
  check: { color: theme.colors.ink },
  button: {
    backgroundColor: theme.colors.teal,
    padding: theme.space.md,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: theme.colors.white, fontWeight: "700" },
});
