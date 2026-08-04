import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { MoleculeTabBody } from "../../lib/MoleculeTabBody";
import { calculateDose, getMedicine360, type SourceTag } from "../../lib/api";
import { theme } from "../../lib/theme";

type TabBody = { title: string; body: unknown; sources: SourceTag[] };

type DoseCalcView = {
  status: "ok" | "needs_confirmation" | "unavailable" | "refused" | string;
  working?: string[];
  suggestedDoseDisplay?: string;
  source?: SourceTag;
  message?: string;
  disclaimer: string;
};

export default function DosingHubScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [error, setError] = useState<string | null>(null);
  const [moleculeId, setMoleculeId] = useState("");
  const [dosingTab, setDosingTab] = useState<TabBody | null>(null);
  const [overdoseTab, setOverdoseTab] = useState<TabBody | null>(null);
  const [weight, setWeight] = useState("18");
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState<DoseCalcView | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setResult(null);
    setCalcError(null);
    (async () => {
      try {
        const page = await getMedicine360(String(slug));
        if (cancelled) return;
        setMoleculeId(page.molecule.id);
        setDosingTab(page.tabs.dosing as TabBody);
        setOverdoseTab(page.tabs.overdose as TabBody);
        setError(null);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function onCalc() {
    if (calculating || !moleculeId) return;
    const weightKg = Number(weight);
    if (!Number.isFinite(weightKg) || weightKg <= 0) {
      setCalcError("Enter a valid weight in kg.");
      return;
    }
    setCalculating(true);
    setCalcError(null);
    setResult(null);
    try {
      const res = await calculateDose({
        moleculeId,
        weightKg,
        indicationKey: "scaffold",
        clinicallyConfirmed: confirmed,
      });
      setResult(res);
    } catch (e) {
      setCalcError(e instanceof Error ? e.message : "Calculator request failed");
    } finally {
      setCalculating(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dosing & overdose</Text>
      <Text style={styles.meta}>
        Sourced panels + governed calculator (show working, clinical confirmation). Never invents
        mg.
      </Text>
      <Link href={`/molecule/${String(slug)}`} asChild>
        <Pressable style={styles.backLink}>
          <Text style={styles.backLinkText}>← Medicine 360</Text>
        </Pressable>
      </Link>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {dosingTab ? (
        <View style={styles.card}>
          <Text style={styles.section}>{dosingTab.title}</Text>
          <MoleculeTabBody
            tabId="dosing"
            body={dosingTab.body}
            sources={dosingTab.sources ?? []}
          />
        </View>
      ) : null}

      {overdoseTab ? (
        <View style={styles.card}>
          <Text style={styles.section}>{overdoseTab.title}</Text>
          <MoleculeTabBody
            tabId="overdose"
            body={overdoseTab.body}
            sources={overdoseTab.sources ?? []}
          />
        </View>
      ) : null}

      <Text style={styles.section}>Calculator</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
        placeholder="Weight kg"
        editable={!calculating}
      />
      <Pressable onPress={() => setConfirmed((v) => !v)} disabled={calculating}>
        <Text style={styles.check}>
          {confirmed ? "☑" : "☐"} I confirm this will be checked clinically before use
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, calculating && styles.buttonDisabled]}
        onPress={() => void onCalc()}
        disabled={calculating}
      >
        <Text style={styles.buttonText}>
          {calculating ? "Calculating…" : "Calculate (sourced rules only)"}
        </Text>
      </Pressable>

      {calcError ? <Text style={styles.error}>{calcError}</Text> : null}
      {result ? <DoseCalcResultPanel result={result} /> : null}
    </ScrollView>
  );
}

function DoseCalcResultPanel({ result }: { result: DoseCalcView }) {
  return (
    <View style={styles.card}>
      <Text style={styles.section}>Result · {result.status}</Text>
      {result.message ? <Text style={styles.prose}>{result.message}</Text> : null}
      {result.status === "ok" && result.suggestedDoseDisplay ? (
        <Text style={styles.dose}>{result.suggestedDoseDisplay}</Text>
      ) : null}
      {result.working && result.working.length > 0 ? (
        <View style={styles.working}>
          <Text style={styles.workingLabel}>Working</Text>
          {result.working.map((step, i) => (
            <Text key={`${i}-${step}`} style={styles.prose}>
              {i + 1}. {step}
            </Text>
          ))}
        </View>
      ) : null}
      {result.source?.citation ? (
        <Text style={styles.source}>
          source · {result.source.citation}
          {result.source.lastReviewed ? ` · reviewed ${result.source.lastReviewed}` : ""}
        </Text>
      ) : null}
      <Text style={styles.disclaimer}>{result.disclaimer}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: theme.space.lg, gap: theme.space.md, backgroundColor: theme.colors.mist },
  title: { fontSize: theme.typography.size.xl, fontWeight: "800", color: theme.colors.ink },
  meta: { color: theme.colors.slate },
  backLink: {
    alignSelf: "flex-start",
    paddingVertical: theme.space.chipY,
    paddingHorizontal: theme.space.chipX,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.mint,
  },
  backLinkText: {
    color: theme.colors.deepTeal,
    fontWeight: "700",
    fontSize: theme.typography.size.sm,
  },
  section: { fontWeight: "700", color: theme.colors.teal, fontSize: theme.typography.size.md },
  card: {
    backgroundColor: theme.colors.white,
    padding: theme.space.md,
    borderRadius: theme.radius.md,
    gap: theme.space.sm,
  },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: theme.radius.md,
    padding: theme.space.sm,
    color: theme.colors.ink,
  },
  check: { color: theme.colors.ink },
  button: {
    backgroundColor: theme.colors.teal,
    padding: theme.space.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: theme.colors.white, fontWeight: "700" },
  prose: {
    color: theme.colors.ink,
    fontSize: theme.typography.size.md,
    lineHeight: theme.typography.lineHeightPx.md,
  },
  dose: {
    fontWeight: "800",
    fontSize: theme.typography.size.lg,
    color: theme.colors.ink,
  },
  working: { gap: theme.space.xs },
  workingLabel: { fontWeight: "700", color: theme.colors.ink },
  source: {
    color: theme.colors.deepTeal,
    fontSize: theme.typography.size.sm,
  },
  disclaimer: {
    color: theme.colors.slate,
    fontSize: theme.typography.size.sm,
    lineHeight: theme.typography.lineHeightPx.sm,
  },
  error: { color: theme.colors.danger },
});
