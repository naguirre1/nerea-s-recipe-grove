import fs from 'fs';
import path from 'path';

// Mapeo explícito de IDs de recetas a nombres de imagen
const imageMapping = {
  'crema-de-calabaza': 'pumpkin-soup.jpg',
  'pisto': 'pisto-dish.jpg',
  'tarta-de-zanahoria-bizcocho': 'tarta-de-zanahoria.jpg',
  'buttercream': 'default-recipe.jpg'
};

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
  
  if (!fs.existsSync(recipesFile)) {
    console.warn('⚠️ recipes.ts not found');
    return;
  }
  
  const newRecipes = [];
  const imageImports = new Map(); // Almacenar imports de imágenes
  
  if (fs.existsSync(recipesDir)) {
    fs.readdirSync(recipesDir)
      .filter(file => file.endsWith('.json') && !file.endsWith('.term.json'))
      .forEach(file => {
        try {
          const jsonContent = fs.readFileSync(path.join(recipesDir, file), 'utf8');
          const recipe = JSON.parse(jsonContent);
          
          console.log(`📖 Processing recipe: ${recipe.id}`);
          
          const imageName = imageMapping[recipe.id];
          
          if (imageName && fs.existsSync(`${assetsDir}/${imageName}`)) {
            // Generar nombre de variable único para el import
            const varName = `img${recipe.id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}`;
            const importPath = `./assets/${imageName}`;
            
            imageImports.set(importPath, varName);
            recipe.imageVar = varName;
            console.log(`✅ Found image for ${recipe.id}: ${imageName}`);
          } else {
            console.warn(`⚠️ Image not found for recipe: ${recipe.id}, using default`);
            recipe.imageVar = 'defaultRecipeImage';
          }
          
          newRecipes.push(recipe);
          console.log(`✅ Loaded: ${file}`);
        } catch (err) {
          console.error(`❌ Error loading ${file}:`, err.message);
        }
      });
  }
  
  if (newRecipes.length === 0) {
    console.warn('⚠️ No recipes found to merge');
    return;
  }
  
  // Siempre importar la imagen por defecto
  imageImports.set('./assets/default-recipe.jpg', 'defaultRecipeImage');
  
  // Generar líneas de import
  const importLines = Array.from(imageImports.entries())
    .map(([importPath, varName]) => `import ${varName} from '${importPath}?url';`)
    .join('\n');
  
  // Generar objetos de recetas
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
    image: ${recipe.imageVar}
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

export const DEFAULT_RECIPE_IMAGE = defaultRecipeImage;`;

  const newContent = `${importLines}

${interfaceAndDefault}

export const recipes: Recipe[] = [
${recipesFormatted}
];`;
  
  fs.writeFileSync(recipesFile, newContent);
  console.log(`✨ Updated recipes.ts with ${newRecipes.length} new recipes`);
}

mergeRecipes();
