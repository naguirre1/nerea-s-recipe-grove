export interface GlossaryTerm {
  id: string;
  title: string;
  description: string;
  tags: string[];
  relatedRecipes: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "brunoise",
    title: "brunoise",
    description: `## Definition
Brunoise es un ==corte de cocina de origen francés que consiste en cortar vegetales en cubos diminutos y uniformes, de aproximadamente 2 a 3 milímetros de lado==. Es una técnica que requiere precisión y se utiliza para mejorar la presentación de los platos, asegurar una cocción homogénea y añadir sabor de manera delicada a preparaciones como salsas, guarniciones y sofritos.

## Sources
![[Pasted image 20251115164012.png]]

## Uses`,
    tags: ["término/corte", "glosario"],
    relatedRecipes: ["glossary", "pasted-image-20251115164012.png"]
  }
];