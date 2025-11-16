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
  
  // Leer el contenido actual de recipes.ts
  let currentContent = fs.readFileSync(recipesFile, 'utf8');
  
  // Extraer los imports existentes
  const importRegex = /import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;
  const existingImports = new Map();
  let match;
  
  while ((match = importRegex.exec(currentContent)) !== null) {
    existingImports.set(match[2], match[1]);
  }
  
  // Extraer el array de recetas actual
  const arrayMatch = currentContent.match(/export const recipes: Recipe\[\] = \[([\s\S]*?)\];/);
  if (!arrayMatch) {
    console.warn('⚠️ Could not find recipes array in recipes.ts');
    return;
  }
  
  // Leer todos los JSON convertidos (SOLO recetas, no términos)
  const newRecipes = [];
  const newImports = new Map();
  
  if (fs.existsSync(recipesDir)) {
    fs.readdirSync(recipesDir)
      .filter(file => file.endsWith('.json') && !file.endsWith('.term.json'))
      .forEach(file => {
        try {
          const jsonContent = fs.readFileSync(path.join(recipesDir, file), 'utf8');
          const recipe = JSON.parse(jsonContent);
          
          console.log(`📖 Processing recipe: ${recipe.id}`);
          
          // Generar nombre de variable para el import
          const varName = recipe.id
            .split('-')
            .map((word, index) => 
              index === 0 
                ? word.replace(/[^a-zA-Z0-9]/g, '')
                : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');
          
          // Buscar imagen usando el mapeo
          const imageName = imageMapping[recipe.id];
          
          if (imageName && fs.existsSync(`${assetsDir}/${imageName}`)) {
            const imagePath = `../assets/${imageName}`;
            newImports.set(imagePath, varName);
            recipe.imageVar = varName;
            console.log(`✅ Found image for ${recipe.id}: ${imageName}`);
          } else {
            console.warn(`⚠️ Image not found for recipe: ${recipe.id}`);
            recipe.imageVar = null;
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
  
  // Combinar imports (existentes + nuevos)
  const allImports = new Map([...existingImports, ...newImports]);
  
  // Generar líneas de import
  const importLines = Array.from(allImports.entries())
    .map(([imagePath, varName]) => `import ${varName} from '${imagePath}';`)
    .join('\n');
  
  // Generar objetos de recetas
  const recipesFormatted = newRecipes.map(recipe => {
    const imageProperty = recipe.imageVar ? `,\n    image: ${recipe.imageVar}` : '';
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
    ]${imageProperty}
  }`;
  }).join(',\n');
  
  // Construir el nuevo contenido del archivo
  const interfaceAndDefault = `export interface Recipe {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  image?: string;
}

export const DEFAULT_RECIPE_IMAGE = '/src/assets/default-recipe.jpg';`;

  const newContent = `${importLines}

${interfaceAndDefault}

export const recipes: Recipe[] = [
${recipesFormatted}
];`;
  
  // Guardar el archivo actualizado
  fs.writeFileSync(recipesFile, newContent);
  console.log(`✨ Updated recipes.ts with ${newRecipes.length} new recipes`);
}

mergeRecipes();
