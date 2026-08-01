import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors, space, typography } from "@materia/design-tokens";
import { listMolecules, searchMolecules } from "../lib/api";

interface MoleculeRow {
  slug: string;
  innName: string;
  className: string;
}

export default function HomeScreen() {
  const [molecules, setMolecules] = useState<MoleculeRow[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [area, setArea] = useState<string>("");
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<
    Array<{ moleculeSlug: string; moleculeName: string; brandName?: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const d = await listMolecules(area || undefined);
        if (cancelled) return;
        setMolecules(d.molecules ?? []);
        if (d.areas) setAreas(d.areas);
      } catch (e) {
        if (cancelled) return;
        setMolecules([]);
        setError(e instanceof Error ? e.message : "Could not load molecules");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [area]);

  async function search() {
    const query = q.trim();
    if (!query || searching) return;
    setSearching(true);
    setError(null);
    try {
      const data = await searchMolecules(query);
      setHits(data.hits ?? []);
    } catch (e) {
      setHits([]);
      setError(e instanceof Error ? e.message : "Search failed");
    } finally {
      setSearching(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Materia</Text>
      <Text style={styles.tag}>Every medicine, understood.</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Panado, Augmentin, amoxicillin…"
          placeholderTextColor={colors.slate}
          value={q}
          onChangeText={setQ}
          onSubmitEditing={() => void search()}
          editable={!searching}
        />
        <Pressable
          style={[styles.btn, searching && styles.btnDisabled]}
          onPress={() => void search()}
          disabled={searching}
        >
          <Text style={styles.btnText}>{searching ? "…" : "Search"}</Text>
        </Pressable>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {hits.map((h) => (
        <Link key={`${h.moleculeSlug}-${h.brandName}`} href={`/molecule/${h.moleculeSlug}`} asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>
              {h.brandName ? `${h.brandName} → ${h.moleculeName}` : h.moleculeName}
            </Text>
          </Pressable>
        </Link>
      ))}
      <View style={styles.chips}>
        <Pressable
          style={[styles.chip, !area && styles.chipOn]}
          onPress={() => setArea("")}
        >
          <Text style={!area ? styles.chipTextOn : styles.chipText}>All</Text>
        </Pressable>
        {areas.map((a) => (
          <Pressable
            key={a}
            style={[styles.chip, area === a && styles.chipOn]}
            onPress={() => setArea(a)}
          >
            <Text style={area === a ? styles.chipTextOn : styles.chipText}>{a}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.section}>{area || "All areas"}</Text>
      {loading ? (
        <ActivityIndicator color={colors.teal} />
      ) : (
        <FlatList
          data={molecules}
          keyExtractor={(item) => item.slug}
          ListEmptyComponent={
            error ? null : <Text style={styles.muted}>No molecules in this area yet.</Text>
          }
          renderItem={({ item }) => (
            <Link href={`/molecule/${item.slug}`} asChild>
              <Pressable style={styles.card}>
                <Text style={styles.cardTitle}>{item.innName}</Text>
                <Text style={styles.muted}>{item.className}</Text>
              </Pressable>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.mist, padding: space.lg },
  brand: { fontSize: typography.size.display, fontWeight: "700", color: colors.ink },
  tag: { color: colors.slate, marginBottom: space.md },
  searchRow: { flexDirection: "row", gap: space.sm, marginBottom: space.md },
  input: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: space.md,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    fontSize: typography.size.md,
    color: colors.ink,
  },
  btn: {
    backgroundColor: colors.teal,
    borderRadius: 8,
    paddingHorizontal: space.md,
    justifyContent: "center",
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: colors.white, fontWeight: "700" },
  error: { color: colors.danger, marginBottom: space.sm, fontWeight: "600" },
  section: {
    marginTop: space.md,
    marginBottom: space.sm,
    fontWeight: "700",
    color: colors.ink,
    fontSize: typography.size.lg,
  },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: space.sm },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  chipOn: { backgroundColor: colors.teal, borderColor: colors.teal },
  chipText: { color: colors.ink, fontWeight: "600", fontSize: 13 },
  chipTextOn: { color: colors.white, fontWeight: "600", fontSize: 13 },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: space.md,
    marginBottom: space.sm,
    borderWidth: 1,
    borderColor: "#DBE3EA",
  },
  cardTitle: { color: colors.ink, fontWeight: "700", fontSize: typography.size.md },
  muted: { color: colors.slate, marginTop: 4 },
});
