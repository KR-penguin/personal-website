import type { KnowledgeCosmosConcept } from "@/types/content";

interface ConceptListProps {
  concepts: KnowledgeCosmosConcept[];
}

// Plain scannable list of concept titles shown as ExpandableExperience's
// collapsed-state content, so a summary-mode visitor still sees the scope of
// the graph without loading the interactive SVG.
export function ConceptList({ concepts }: ConceptListProps) {
  return (
    <ul className="flex flex-col gap-1.5 text-sm text-cosmos-text-muted">
      {concepts.map((concept) => (
        <li key={concept.id}>{concept.title}</li>
      ))}
    </ul>
  );
}
