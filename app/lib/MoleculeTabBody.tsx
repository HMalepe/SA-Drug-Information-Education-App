import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { SourceTag } from "./api";
import { theme } from "./theme";

function asRecord(body: unknown): Record<string, unknown> {
  return body && typeof body === "object" ? (body as Record<string, unknown>) : {};
}

function SourceLine({ source }: { source: SourceTag | null | undefined }) {
  if (!source?.citation) return null;
  return (
    <Text style={styles.source}>
      source · {source.citation}
      {source.lastReviewed ? ` · reviewed ${source.lastReviewed}` : ""}
    </Text>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{label}</Text>
      {children}
    </View>
  );
}

/** Renders medicine-360 tab bodies without inventing clinical text. */
export function MoleculeTabBody({
  tabId,
  body,
  sources,
}: {
  tabId: string;
  body: unknown;
  sources: SourceTag[];
}) {
  const b = asRecord(body);

  if (tabId === "dosing") {
    return (
      <View style={styles.stack}>
        {(
          [
            ["Adult", "adult"],
            ["Paediatric", "paediatric"],
            ["Geriatric", "geriatric"],
            ["Renal adjustment", "renal"],
            ["Hepatic adjustment", "hepatic"],
          ] as const
        ).map(([label, key]) => (
          <Section key={key} label={label}>
            <Text style={styles.prose}>{String(b[key] ?? "")}</Text>
          </Section>
        ))}
        {typeof b.note === "string" && b.note ? <Text style={styles.muted}>{b.note}</Text> : null}
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  if (tabId === "chemistry") {
    return (
      <View style={styles.stack}>
        <Section label="Summary">
          <Text style={styles.prose}>{String(b.summary ?? "")}</Text>
        </Section>
        {b.discovery ? (
          <Section label="Discovery">
            <Text style={styles.prose}>{String(b.discovery)}</Text>
          </Section>
        ) : null}
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  if (tabId === "moa" || tabId === "food-lifestyle") {
    return (
      <View style={styles.stack}>
        <Text style={styles.prose}>{String(b.summary ?? "")}</Text>
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  if (tabId === "pregnancy") {
    return (
      <View style={styles.stack}>
        <Section label="Pregnancy">
          <Text style={styles.prose}>{String(b.pregnancy ?? "")}</Text>
        </Section>
        <Section label="Breastfeeding">
          <Text style={styles.prose}>{String(b.breastfeeding ?? "")}</Text>
        </Section>
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  if (
    tabId === "contraindications" ||
    tabId === "warnings" ||
    tabId === "pearls" ||
    tabId === "counselling"
  ) {
    const items = (Array.isArray(b.items) ? b.items : []) as Array<{
      text?: string;
      level?: string;
      source?: SourceTag | null;
    }>;
    return (
      <View style={styles.stack}>
        {items.length === 0 ? (
          <Text style={styles.muted}>
            {typeof b.empty === "string" ? b.empty : "No published items for this section yet."}
          </Text>
        ) : (
          items.map((row, i) => (
            <View key={`${row.text?.slice(0, 24) ?? i}-${i}`} style={styles.item}>
              <Text style={styles.prose}>
                {row.level ? `[${row.level}] ` : ""}
                {String(row.text ?? "")}
              </Text>
              <SourceLine source={row.source} />
            </View>
          ))
        )}
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  if (tabId === "interactions") {
    const items = (Array.isArray(b.items) ? b.items : []) as Array<{
      id?: string;
      otherMoleculeName?: string;
      otherMoleculeSlug?: string;
      severity?: string;
      mechanism?: string | null;
      action?: string | null;
      sources?: SourceTag[];
    }>;
    return (
      <View style={styles.stack}>
        {typeof b.note === "string" && b.note ? <Text style={styles.muted}>{b.note}</Text> : null}
        {items.length === 0 ? (
          <Text style={styles.muted}>
            {typeof b.empty === "string"
              ? b.empty
              : "No published pairwise interactions for this molecule yet."}
          </Text>
        ) : (
          items.map((row) => (
            <View key={row.id ?? row.otherMoleculeSlug} style={styles.item}>
              <Text style={styles.itemTitle}>
                {row.otherMoleculeName} ({row.severity})
              </Text>
              {row.mechanism ? (
                <Text style={styles.prose}>Mechanism: {row.mechanism}</Text>
              ) : null}
              {row.action ? <Text style={styles.prose}>Action: {row.action}</Text> : null}
              {(row.sources ?? []).map((s) => (
                <SourceLine key={`${row.id}-${s.citation}`} source={s} />
              ))}
            </View>
          ))
        )}
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  if (tabId === "overdose") {
    return (
      <View style={styles.stack}>
        <Text style={styles.itemTitle}>Call emergency / Poisons Centre</Text>
        <Text style={styles.prose}>{String(b.callEmergency ?? "")}</Text>
        <Section label="Early signs">
          <Text style={styles.prose}>{String(b.earlySigns ?? "")}</Text>
        </Section>
        <Section label="Severe signs">
          <Text style={styles.prose}>{String(b.severeSigns ?? "")}</Text>
        </Section>
        <Section label="Antidote / supportive">
          <Text style={styles.prose}>{String(b.antidoteOrSupportive ?? "")}</Text>
        </Section>
        {Array.isArray(b.whatToDo) ? (
          <Section label="What to do">
            {(b.whatToDo as unknown[]).map((step, i) => (
              <Text key={i} style={styles.prose}>
                {i + 1}. {String(step)}
              </Text>
            ))}
          </Section>
        ) : null}
        {typeof b.disclaimer === "string" && b.disclaimer ? (
          <Text style={styles.muted}>{b.disclaimer}</Text>
        ) : null}
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  if (tabId === "quiz") {
    const questions = (Array.isArray(b.questions) ? b.questions : []) as Array<{
      id?: string;
      prompt?: string;
    }>;
    return (
      <View style={styles.stack}>
        {questions.length === 0 ? (
          <Text style={styles.muted}>No published quiz questions for this molecule yet.</Text>
        ) : (
          questions.map((q, i) => (
            <Text key={q.id ?? i} style={styles.prose}>
              {i + 1}. {String(q.prompt ?? "Question")}
            </Text>
          ))
        )}
      </View>
    );
  }

  if (tabId === "ai-tutor") {
    return (
      <View style={styles.stack}>
        <Text style={styles.prose}>
          {String(
            b.hint ??
              "Ask below — answers are grounded on published, sourced molecule content only. Materia will not invent doses.",
          )}
        </Text>
      </View>
    );
  }

  if (tabId === "sa-products") {
    const products = (Array.isArray(b.lineage) ? b.lineage : []) as Array<{
      id?: string;
      brandName?: string;
      strength?: string;
      form?: string;
      schedule?: string;
      manufacturer?: { name?: string } | null;
    }>;
    return (
      <View style={styles.stack}>
        {typeof b.explainerNote === "string" ? (
          <Text style={styles.muted}>{b.explainerNote}</Text>
        ) : null}
        {products.length === 0 ? (
          <Text style={styles.muted}>No published SA products linked yet.</Text>
        ) : (
          products.map((p) => (
            <View key={p.id ?? p.brandName} style={styles.item}>
              <Text style={styles.itemTitle}>{p.brandName}</Text>
              <Text style={styles.muted}>
                {[p.strength, p.form, p.schedule, p.manufacturer?.name].filter(Boolean).join(" · ")}
              </Text>
            </View>
          ))
        )}
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  if (tabId === "animations") {
    const cards = (Array.isArray(b.cards) ? b.cards : []) as Array<{
      productId?: string;
      brandName?: string;
      form?: string;
      label?: string;
    }>;
    return (
      <View style={styles.stack}>
        {typeof b.note === "string" ? <Text style={styles.muted}>{b.note}</Text> : null}
        {typeof b.cameraNote === "string" ? <Text style={styles.muted}>{b.cameraNote}</Text> : null}
        {cards.length === 0 ? (
          <Text style={styles.muted}>No published products to silhouette yet.</Text>
        ) : (
          cards.map((c) => (
            <Text key={c.productId ?? c.brandName} style={styles.prose}>
              {c.brandName} · {c.form}
              {c.label ? ` · ${c.label}` : ""}
            </Text>
          ))
        )}
        <SourcesBlock sources={sources} />
      </View>
    );
  }

  // Fallback: never invent — show empty rather than raw clinical JSON dump.
  return (
    <View style={styles.stack}>
      <Text style={styles.muted}>
        This tab has no mobile layout yet. Open the web molecule page for the full sourced view.
      </Text>
      <SourcesBlock sources={sources} />
    </View>
  );
}

function SourcesBlock({ sources }: { sources: SourceTag[] }) {
  if (!sources.length) return null;
  return (
    <View style={styles.sourcesBlock}>
      {sources.map((s, i) => (
        <SourceLine key={`${s.id ?? s.citation ?? i}`} source={s} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: theme.space.sm },
  section: { gap: theme.space.xs },
  sectionLabel: {
    fontSize: theme.typography.size.sm,
    fontWeight: "700",
    color: theme.colors.ink,
  },
  prose: {
    color: theme.colors.ink,
    fontSize: theme.typography.size.md,
    lineHeight: 22,
  },
  muted: {
    color: theme.colors.slate,
    fontSize: theme.typography.size.sm,
    lineHeight: 20,
  },
  item: {
    gap: theme.space.xs,
    paddingBottom: theme.space.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mist,
  },
  itemTitle: {
    fontWeight: "700",
    color: theme.colors.ink,
    fontSize: theme.typography.size.md,
  },
  source: {
    color: theme.colors.deepTeal,
    fontSize: theme.typography.size.sm,
    marginTop: 2,
  },
  sourcesBlock: { marginTop: theme.space.sm, gap: theme.space.xs },
});
