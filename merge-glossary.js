import fs from 'fs';
import path from 'path';

function mergeGlossary() {
  const recipesDir = './recipes-external/🌳 Forest/🕷️ Recipes';
  const glossaryFile = './src/data/glossary.ts';
  
  const newTerms = [];
  
  if (fs.existsSync(recipesDir)) {
    fs.readdirSync(recipesDir)
      .filter(file => file.endsWith('.term.json'))
      .forEach(file => {
        try {
          const jsonContent = fs.readFileSync(path.join(recipesDir, file), 'utf8');
          const term = JSON.parse(jsonContent);
          newTerms.push(term);
          console.log(`✅ Loaded term: ${file}`);
        } catch (err) {
          console.error(`❌ Error loading ${file}:`, err.message);
        }
      });
  }
  
  if (newTerms.length === 0) {
    console.warn('⚠️ No terms found to merge');
    return;
  }
  
  const termsFormatted = newTerms.map(term => {
    return `  {
    id: "${term.id}",
    title: "${term.title}",
    description: \`${term.description.replace(/`/g, '\\`')}\`,
    tags: [${term.tags.map(tag => `"${tag}"`).join(', ')}],
    relatedRecipes: [${term.relatedRecipes.map(id => `"${id}"`).join(', ')}]
  }`;
  }).join(',\n');
  
  const newContent = `export interface GlossaryTerm {
  id: string;
  title: string;
  description: string;
  tags: string[];
  relatedRecipes: string[];
}

export const glossaryTerms: GlossaryTerm[] = [
${termsFormatted}
];`;
  
  fs.writeFileSync(glossaryFile, newContent);
  console.log(`✨ Updated glossary.ts with ${newTerms.length} terms`);
}

mergeGlossary();
