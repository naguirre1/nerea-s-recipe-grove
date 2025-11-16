import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function convertTerm(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parts = content.split('---').map(p => p.trim());
  
  const hashtagsLine = parts[2] || '';
  const descriptionSection = parts[3] || '';
  
  const tags = hashtagsLine
    .split('#')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  // Only process if it has the #term tag
  if (!tags.includes('term')) {
    return null;
  }
  
  // Extract links to recipes using [[Recipe Name]] format
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  const relatedRecipes = [];
  let match;
  
  while ((match = linkRegex.exec(content)) !== null) {
    const linkedTitle = match[1];
    // Convert to recipe ID format
    const recipeId = linkedTitle
      .replace(/^[\p{Emoji}]+\s*/, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '');
    relatedRecipes.push(recipeId);
  }
  
  const fileName = path.basename(filePath, '.md');
  const termId = fileName
    .replace(/^[\p{Emoji}]+\s*/, '')
    .toLowerCase()
    .replace(/\s+/g, '-');
  
  const term = {
    id: termId,
    title: fileName.replace(/^[\p{Emoji}]+\s*/, ''),
    description: descriptionSection.trim(),
    tags: tags.filter(tag => tag !== 'term'),
    relatedRecipes
  };
  
  const outputPath = filePath.replace(/\.md$/, '.term.json');
  fs.writeFileSync(outputPath, JSON.stringify(term, null, 2));
  console.log(`✅ Converted term: ${filePath} → ID: ${termId}`);
  return term;
}

const recipesDir = process.argv[2] || './recipes-external/🌳 Forest/🕷️ Recipes';
if (fs.existsSync(recipesDir)) {
  const terms = [];
  fs.readdirSync(recipesDir)
    .filter(file => file.endsWith('.md'))
    .forEach(file => {
      const term = convertTerm(path.join(recipesDir, file));
      if (term) terms.push(term);
    });
  console.log(`✨ Term conversion complete! Processed ${terms.length} terms.`);
} else {
  console.warn(`⚠️ Directory not found: ${recipesDir}`);
}
