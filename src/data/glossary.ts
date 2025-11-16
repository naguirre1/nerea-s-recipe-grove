export interface GlossaryTerm {
  id: string;
  title: string;
  description: string;
  tags: string[];
  relatedRecipes: string[];
}

export const glossaryTerms: GlossaryTerm[] = [];
