import fs from 'fs';
import path from 'path';

function mergeRecipes() {
  const recipesDir = './recipes-external/🌳 Forest/🕷️ Recipes';
  const recipesFile = './src/data/recipes.ts';
  
  if (!fs.existsSync(recipesFile)) {
    console.warn('⚠️ recipes.ts not found');
    return;
  }
  
  // Leer el contenido actual de recipes.ts
  let currentContent = fs.readFileSync(recipesFile, 'utf8');
  
  // Extraer el array de recetas actual
  const arrayMatch = currentContent.match(/export const recipes: Recipe\[\] = \[([\s\S]*?)\];/);
  if (!arrayMatch) {
    console.warn('⚠️ Could not find recipes array in recipes.ts');
    return;
  }
  
  // Leer todos los JSON convertidos
  const newRecipes = [];
  if (fs.existsSync(recipesDir)) {
    fs.readdirSync(recipesDir)
      .filter(file => file.endsWith('.json'))
      .forEach(file => {
        try {
          const jsonContent = fs.readFileSync(path.join(recipesDir, file), 'utf8');
          const recipe = JSON.parse(jsonContent);
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
  
  // Formatear las nuevas recetas como objetos TypeScript
  const recipesFormatted = newRecipes.map(recipe => {
    return `  {
    id: "${recipe.id}",
    emoji: "${recipe.emoji}",
    title: "${recipe.title}",
    description: "${recipe.description}",
    tags: [${recipe.tags.map(tag => `"${tag}"`).join(', ')}],
    ingredients: [
      ${recipe.ingredients.map(ing => `"${ing.replace(/"/g, '\\"')}"`).join(',\n      ')}
    ],
    steps: [
      ${recipe.steps.map(step => `"${step.replace(/"/g, '\\"')}"`).join(',\n      ')}
    ]${recipe.image ? `,\n    image: "${recipe.image}"` : ''}
  }`;
  }).join(',\n');
  
  // Reemplazar el array de recetas
  const newContent = currentContent.replace(
    /export const recipes: Recipe\[\] = \[([\s\S]*?)\];/,
    `export const recipes: Recipe[] = [\n${recipesFormatted}\n];`
  );
  
  // Guardar el archivo actualizado
  fs.writeFileSync(recipesFile, newContent);
  console.log(`✨ Updated recipes.ts with ${newRecipes.length} new recipes`);
}

mergeRecipes();
