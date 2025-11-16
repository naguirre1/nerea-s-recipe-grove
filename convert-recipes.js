import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function convertRecipe(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parts = content.split('---').map(p => p.trim());
  
  const hashtagsLine = parts[2] || '';
  const ingredientsSection = parts[3] || '';
  const elaborationSection = parts[4] || '';
  
  const tags = hashtagsLine
    .split('#')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  // Skip if it's a term (handled by convert-terms.js)
  if (tags.includes('term')) {
    console.log(`⏭️ Skipping term (will be processed by convert-terms.js): ${filePath}`);
    return;
  }
  
  const ingredients = ingredientsSection
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().replace(/^-\s*/, ''));
  
  const steps = elaborationSection
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().replace(/^-\s*/, ''));
  
  // Extraer el nombre del archivo sin emojis
  const fileName = path.basename(filePath, '.md');
  const recipeId = fileName
    .replace(/^[\p{Emoji}]+\s*/, '') // Remover emoji del inicio
    .toLowerCase()
    .replace(/\s+/g, '-');
  
  // Extraer emoji del nombre del archivo
  const emojiMatch = fileName.match(/^([\p{Emoji}]+)/u);
  const emoji = emojiMatch ? emojiMatch[1] : "🍽️";
  
  const recipe = {
    id: recipeId,
    emoji: emoji,
    title: fileName,
    description: "Recipe description",
    tags,
    ingredients,
    steps,
    image: `/nerea-s-recipe-grove/src/assets/${recipeId}.jpg`
  };
  
  const outputPath = filePath.replace(/\.md$/, '.json');
  fs.writeFileSync(outputPath, JSON.stringify(recipe, null, 2));
  console.log(`✅ Converted RECIPE: ${filePath} → ID: ${recipeId}, Emoji: ${emoji}`);
}

const recipesDir = process.argv[2] || './recipes-external/🌳 Forest/🕷️ Recipes';
if (fs.existsSync(recipesDir)) {
  fs.readdirSync(recipesDir)
    .filter(file => file.endsWith('.md'))
    .forEach(file => convertRecipe(path.join(recipesDir, file)));
  console.log('✨ Recipe conversion complete!');
} else {
  console.warn(`⚠️ Directory not found: ${recipesDir}`);
}
