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

const API = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

interface MoleculeRow {
  slug: string;
  innName: string;
  className: string;
}

export default function HomeScreen() {
  const [molecules, setMolecules] = useState<MoleculeRow[]>([]);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<Array<{ moleculeSlug: string; moleculeName: string; brandName?: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/molecules`)
      .then((r) => r.json())
      .then((d) => setMolecules(d.molecules ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function search() {
    const res = await fetch(`${API}/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setHits(data.hits ?? []);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>Materia</Text>
      <Text style={styles.tag}>Every medicine, understood.</Text>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Augmentin, amoxicillin…"
          placeholderTextColor={colors.slate}
          value={q}
          onChangeText={setQ}
          onSubmitEditing={search}
        />
        <Pressable style={styles.btn} onPress={search}>
          <Text style={styles.btnText}>Search</Text>
        </Pressable>
      </View>
      {hits.map((h) => (
        <Link key={`${h.moleculeSlug}-${h.brandName}`} href={`/molecule/${h.moleculeSlug}`} asChild>
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>
              {h.brandName ? `${h.brandName} → ${h.moleculeName}` : h.moleculeName}
            </Text>
          </Pressable>
        </Link>
      ))}
      <Text style={styles.section}>Antibiotics</Text>
      {loading ? (
        <ActivityIndicator color={colors.teal} />
      ) : (
        <FlatList
          data={molecules}
          keyExtractor={(item) => item.slug}
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
  btnText: { color: colors.white, fontWeight: "700" },
  section: {
    marginTop: space.md,
    marginBottom: space.sm,
    fontWeight: "700",
    color: colors.ink,
    fontSize: typography.size.lg,
  },
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
