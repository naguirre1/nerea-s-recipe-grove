import fs from 'fs';
import path from 'path';

function escapeString(str) {
  if (!str) return '';
  return str
    .replace(/\\/g, '\\\\')      // Escapar backslash
    .replace(/"/g, '\\"')        // Escapar comillas dobles
    .replace(/\n/g, '\\n')       // Escapar saltos de línea
    .replace(/\r/g, '\\r')       // Escapar retorno de carro
    .replace(/\t/g, '\\t');      // Escapar tabs
}

function mergeTerms() {
  const termsDir = './recipes-external/🌳 Forest/🕷️ Recipes';
  const termsFile = './src/data/terms.ts';
  
  // Leer todos los JSON de términos convertidos
  const terms = [];
  
  if (fs.existsSync(termsDir)) {
    fs.readdirSync(termsDir)
      .filter(file => file.endsWith('.term.json'))
      .forEach(file => {
        try {
          const jsonContent = fs.readFileSync(path.join(termsDir, file), 'utf8');
          const term = JSON.parse(jsonContent);
          
          console.log(`📚 Processing term: ${term.id}`);
          terms.push(term);
          console.log(`✅ Loaded: ${file}`);
        } catch (err) {
          console.error(`❌ Error loading ${file}:`, err.message);
        }
      });
  }
  
  if (terms.length === 0) {
    console.warn('⚠️ No terms found to merge');
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
  console.log(`✨ Updated terms.ts with ${terms.length} terms`);
}

mergeTerms();
