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
  
  const ingredients = ingredientsSection
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().replace(/^-\s*/, ''));
  
  const steps = elaborationSection
    .split('\n')
    .filter(line => line.trim().startsWith('-'))
    .map(line => line.trim().replace(/^-\s*/, ''));
  
  const recipeId = path.basename(filePath, '.md')
    .toLowerCase()
    .replace(/\s+/g, '-');
  
  const recipe = {
    id: recipeId,
    emoji: "🎃",
    title: path.basename(filePath, '.md'),
    description: "Recipe description",
    tags,
    ingredients,
    steps,
    image: `/nerea-s-recipe-grove/src/assets/${recipeId}.jpg`
  };
  
  const outputPath = filePath.replace(/\.md$/, '.json');
  fs.writeFileSync(outputPath, JSON.stringify(recipe, null, 2));
  console.log(`✅ Converted: ${filePath}`);
}

const recipesDir = process.argv[2] || './recipes';
if (fs.existsSync(recipesDir)) {
  fs.readdirSync(recipesDir)
    .filter(file => file.endsWith('.md'))
    .forEach(file => convertRecipe(path.join(recipesDir, file)));
  console.log('✨ Recipe conversion complete!');
} else {
  console.warn(`⚠️ Directory not found: ${recipesDir}`);
}
