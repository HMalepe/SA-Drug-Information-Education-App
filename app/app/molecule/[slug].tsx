import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { askAi, getMedicine360 } from "../../lib/api";
import { theme } from "../../lib/theme";

export default function Molecule360Screen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [tabOrder, setTabOrder] = useState<Array<{ id: string; label: string; index: number }>>(
    [],
  );
  const [tabs, setTabs] = useState<
    Record<string, { title: string; body: unknown; sources: unknown[] }>
  >({});
  const [activeId, setActiveId] = useState("chemistry");
  const [question, setQuestion] = useState("What is the mechanism of action?");
  const [aiOut, setAiOut] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await getMedicine360(String(slug));
        if (cancelled) return;
        setName(data.molecule.innName);
        setClassName(data.molecule.className);
        setTabOrder(data.tabOrder);
        setTabs(data.tabs);
        setActiveId(data.defaultTab ?? data.tabOrder[0]?.id ?? "chemistry");
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const tab = tabs[activeId];
  const sourcesNote = useMemo(() => {
    const src = tab?.sources ?? [];
    return src.length ? `${src.length} source(s)` : "empty / unsourced hidden";
  }, [tab]);

  async function onAsk() {
    setAiOut(null);
    try {
      const res = await askAi(String(slug), question);
      if (res.status === "answered") {
        setAiOut(
          `${res.answer}\n\nCitations:\n${res.citations
            .map((c) => `• ${c.fieldPath}: ${c.citation} (${c.lastReviewed})`)
            .join("\n")}`,
        );
      } else {
        setAiOut(`Refused: ${res.refusalReason}`);
      }
    } catch (e) {
      setAiOut(e instanceof Error ? e.message : "AI request failed");
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={theme.colors.teal} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>{className}</Text>
        <Text style={styles.trust}>
          Only published, sourced facts render. Reference tool — not a medical device.
        </Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {tabOrder.map((t) => (
          <Pressable
            key={t.id}
            onPress={() => setActiveId(t.id)}
            style={[styles.tabChip, t.id === activeId && styles.tabChipActive]}
          >
            <Text style={[styles.tabChipText, t.id === activeId && styles.tabChipTextActive]}>
              {t.index}. {t.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.body}>
        {tab ? (
          <>
            <Text style={styles.tabHeading}>
              {tab.title} <Text style={styles.badge}>{sourcesNote}</Text>
            </Text>
            <Text style={styles.bodyText}>{JSON.stringify(tab.body, null, 2)}</Text>
          </>
        ) : null}

        {activeId === "ai-tutor" ? (
          <View style={styles.aiBox}>
            <TextInput
              value={question}
              onChangeText={setQuestion}
              style={styles.input}
              placeholder="Ask about this molecule"
              placeholderTextColor={theme.colors.slate}
            />
            <Pressable style={styles.button} onPress={onAsk}>
              <Text style={styles.buttonText}>Ask (grounded)</Text>
            </Pressable>
            {aiOut ? <Text style={styles.bodyText}>{aiOut}</Text> : null}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: theme.colors.mist },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    padding: theme.space.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mist,
  },
  title: { fontSize: theme.typography.size.display, fontWeight: "800", color: theme.colors.ink },
  subtitle: { color: theme.colors.teal, fontWeight: "600" },
  trust: { marginTop: theme.space.sm, color: theme.colors.slate, fontSize: theme.typography.size.sm },
  tabBar: { maxHeight: 52, backgroundColor: theme.colors.white },
  tabChip: {
    paddingHorizontal: theme.space.md,
    paddingVertical: theme.space.sm,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: theme.colors.mist,
    alignSelf: "center",
  },
  tabChipActive: { backgroundColor: theme.colors.teal },
  tabChipText: { color: theme.colors.ink, fontSize: theme.typography.size.sm, fontWeight: "600" },
  tabChipTextActive: { color: theme.colors.white },
  body: { padding: theme.space.md, gap: theme.space.sm },
  tabHeading: { fontSize: theme.typography.size.xl, fontWeight: "700", color: theme.colors.ink },
  badge: { fontSize: theme.typography.size.sm, color: theme.colors.deepTeal },
  bodyText: {
    color: theme.colors.slate,
    fontFamily: theme.typography.fontFamily.mono,
    fontSize: theme.typography.size.sm,
  },
  error: { color: theme.colors.danger },
  aiBox: { gap: theme.space.sm, marginTop: theme.space.md },
  input: {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.slate,
    borderRadius: 8,
    padding: theme.space.sm,
    color: theme.colors.ink,
  },
  button: {
    backgroundColor: theme.colors.teal,
    padding: theme.space.sm,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: theme.colors.white, fontWeight: "700" },
});
