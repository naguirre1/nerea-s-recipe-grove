import fs from 'fs';
import path from 'path';

function escapeString(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

function mergeTerms() {
  const termsDir = './recipes-external/🌳 Forest/🕷️ Recipes';
  const termsFile = './src/data/terms.ts';
  
  console.log('📚 Starting merge-terms.js');
  
  // Leer todos los JSON de términos convertidos
  const terms = [];
  
  if (fs.existsSync(termsDir)) {
    const termFiles = fs.readdirSync(termsDir)
      .filter(file => file.endsWith('.term.json'));
    
    console.log(`Found ${termFiles.length} term files`);
    
    termFiles.forEach(file => {
      try {
        const jsonContent = fs.readFileSync(path.join(termsDir, file), 'utf8');
        const term = JSON.parse(jsonContent);
        
        console.log(`✅ Loaded term: ${term.id}`);
        terms.push(term);
      } catch (err) {
        console.error(`❌ Error loading ${file}:`, err.message);
      }
    });
  }
  
  if (terms.length === 0) {
    console.warn('⚠️ No terms found, skipping merge-terms');
    return;
  }
  
  // Generar objetos de términos
  const termsFormatted = terms.map(term => {
    const relatedRecipes = Array.isArray(term.relatedRecipes) ? term.relatedRecipes : [];
    const tags = Array.isArray(term.tags) ? term.tags : [];
    
    return `  {
    id: "${term.id}",
    title: "${escapeString(term.title)}",
    description: "${escapeString(term.description || '')}",
    tags: [${tags.map(tag => `"${escapeString(tag)}"`).join(', ')}],
    relatedRecipes: [${relatedRecipes.map(recipe => `"${escapeString(recipe)}"`).join(', ')}]
  }`;
  }).join(',\n');
  
  // Construir el nuevo contenido del archivo
  const interfaceAndDefault = `export interface Term {
  id: string;
  title: string;
  description: string;
  tags: string[];
  relatedRecipes: string[];
}`;

  const newContent = `${interfaceAndDefault}

export const terms: Term[] = [
${termsFormatted}
];`;
  
  // Crear directorio si no existe
  const dir = path.dirname(termsFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Guardar el archivo actualizado
  fs.writeFileSync(termsFile, newContent);
  console.log(`✅ Successfully wrote terms.ts with ${terms.length} terms\n`);
}

mergeTerms();
