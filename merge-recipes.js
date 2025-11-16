import fs from 'fs';
import path from 'path';

// Mapeo explícito de IDs de recetas a nombres de imagen
const imageMapping = {
  'crema-de-calabaza': 'pumpkin-soup.jpg',
  'pisto': 'pisto-dish.jpg',
  'tarta-de-zanahoria-bizcocho': 'tarta-de-zanahoria.jpg',
  'buttercream': 'default-recipe.jpg'
};

// DEBUG: Mostrar el entorno
console.log('🔍 DEBUG INFO:');
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  Current directory:', process.cwd());

// IMPORTANTE: El base path debe coincidir con vite.config.ts
const BASE_URL = process.env.NODE_ENV === 'production' ? '/nerea-s-recipe-grove/' : '/';
console.log('  BASE_URL:', BASE_URL);

function escapeString(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

function mergeRecipes() {
  const recipesDir = './recipes-external/🌳 Forest/🕷️ Recipes';
  const recipesFile = './src/data/recipes.ts';
  const assetsDir = './src/assets';
  
  console.log(`\n📂 Directories:`);
  console.log(`  recipesDir exists: ${fs.existsSync(recipesDir)}`);
  console.log(`  assetsDir exists: ${fs.existsSync(assetsDir)}`);
  
  if (!fs.existsSync(recipesFile)) {
    console.warn('⚠️ recipes.ts not found');
    return;
  }
  
  const newRecipes = [];
  
  if (fs.existsSync(recipesDir)) {
    const jsonFiles = fs.readdirSync(recipesDir)
      .filter(file => file.endsWith('.json') && !file.endsWith('.term.json'));
    
    console.log(`\n📄 Found ${jsonFiles.length} recipe JSON files:`);
    jsonFiles.forEach(f => console.log(`  - ${f}`));
    
    jsonFiles.forEach(file => {
      try {
        const jsonContent = fs.readFileSync(path.join(recipesDir, file), 'utf8');
        const recipe = JSON.parse(jsonContent);
        
        console.log(`\n📖 Processing recipe: ${recipe.id}`);
        
        const imageName = imageMapping[recipe.id];
        console.log(`  imageName from mapping: ${imageName}`);
        
        if (imageName && fs.existsSync(`${assetsDir}/${imageName}`)) {
          recipe.imageUrl = `${BASE_URL}assets/${imageName}`;
          console.log(`  ✅ Image found: ${recipe.imageUrl}`);
        } else {
          console.log(`  ❌ Image NOT found, using default`);
          recipe.imageUrl = `${BASE_URL}assets/default-recipe.jpg`;
          console.log(`  Using: ${recipe.imageUrl}`);
        }
        
        newRecipes.push(recipe);
      } catch (err) {
        console.error(`❌ Error loading ${file}:`, err.message);
      }
    });
  }
  
  if (newRecipes.length === 0) {
    console.warn('⚠️ No recipes found to merge');
    return;
  }
  
  console.log(`\n✨ Generating recipes.ts with ${newRecipes.length} recipes using BASE_URL: ${BASE_URL}`);
  
  const recipesFormatted = newRecipes.map(recipe => {
    const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
    const steps = Array.isArray(recipe.steps) ? recipe.steps : [];
    const tags = Array.isArray(recipe.tags) ? recipe.tags : [];
    
    return `  {
    id: "${recipe.id}",
    emoji: "${recipe.emoji || '🍽️'}",
    title: "${escapeString(recipe.title)}",
    description: "${escapeString(recipe.description || '')}",
    tags: [${tags.map(tag => `"${escapeString(tag)}"`).join(', ')}],
    ingredients: [
      ${ingredients.map(ing => `"${escapeString(ing)}"`).join(',\n      ')}
    ],
    steps: [
      ${steps.map(step => `"${escapeString(step)}"`).join(',\n      ')}
    ],
    image: "${recipe.imageUrl}"
  }`;
  }).join(',\n');
  
  const interfaceAndDefault = `export interface Recipe {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  image: string;
}

export const DEFAULT_RECIPE_IMAGE = '${BASE_URL}assets/default-recipe.jpg';`;

  const newContent = `${interfaceAndDefault}

export const recipes: Recipe[] = [
${recipesFormatted}
];`;
  
  fs.writeFileSync(recipesFile, newContent);
  console.log(`\n✅ Successfully updated recipes.ts`);
  console.log(`   Total recipes: ${newRecipes.length}`);
}

mergeRecipes();
