import fs from 'fs';
import path from 'path';

// Mapeo explícito de IDs de recetas a nombres de imagen
const imageMapping = {
  'crema-de-calabaza': 'pumpkin-soup.jpg',
  'pisto': 'pisto-dish.jpg',
  'tarta-de-zanahoria-bizcocho': 'tarta-de-zanahoria.jpg',
  'buttercream': 'default-recipe.jpg'
};

// HARDCODEADO: El base path de GitHub Pages
const BASE_URL = '/nerea-s-recipe-grove/';

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
  console.log('🍳 Starting merge-recipes.js');
  console.log(`BASE_URL will be: ${BASE_URL}`);
  
  const recipesDir = './recipes-external/🌳 Forest/🕷️ Recipes';
  const recipesFile = './src/data/recipes.ts';
  const assetsDir = './src/assets';
  
  if (!fs.existsSync(recipesFile)) {
    console.warn('⚠️ recipes.ts not found');
    return;
  }
  
  const newRecipes = [];
  
  if (fs.existsSync(recipesDir)) {
    const jsonFiles = fs.readdirSync(recipesDir)
      .filter(file => file.endsWith('.json') && !file.endsWith('.term.json'));
    
    console.log(`Found ${jsonFiles.length} recipe files`);
    
    jsonFiles.forEach(file => {
      try {
        const jsonContent = fs.readFileSync(path.join(recipesDir, file), 'utf8');
        const recipe = JSON.parse(jsonContent);
        
        const imageName = imageMapping[recipe.id];
        
        if (imageName && fs.existsSync(`${assetsDir}/${imageName}`)) {
          recipe.imageUrl = `${BASE_URL}assets/${imageName}`;
          console.log(`✅ ${recipe.id}: ${recipe.imageUrl}`);
        } else {
          recipe.imageUrl = `${BASE_URL}assets/default-recipe.jpg`;
          console.log(`⚠️ ${recipe.id}: using default → ${recipe.imageUrl}`);
        }
        
        newRecipes.push(recipe);
      } catch (err) {
        console.error(`❌ Error loading ${file}:`, err.message);
      }
    });
  }
  
  if (newRecipes.length === 0) {
    console.warn('⚠️ No recipes found');
    return;
  }
  
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
  
  // DEBUG: Mostrar lo que se va a escribir
  console.log('\n🔍 CONTENT TO BE WRITTEN:');
  console.log('First 500 chars:');
  console.log(newContent.substring(0, 500));
  console.log('...\n');
  
  fs.writeFileSync(recipesFile, newContent);
  console.log(`✅ Successfully wrote recipes.ts with ${newRecipes.length} recipes\n`);
}

mergeRecipes();
