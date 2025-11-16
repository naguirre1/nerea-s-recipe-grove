import { Link } from "react-router-dom";
import { recipes } from "@/data/recipes";

interface StepWithLinksProps {
  text: string;
  index: number;
}

export const StepWithLinks = ({ text, index }: StepWithLinksProps) => {
  // Regex para encontrar [[emoji texto]] o [[texto]]
  const linkRegex = /\[\[([\p{Emoji}]*)?\s*([^\[\]]+)\]\]/gu;
  
  const parts: (string | { emoji?: string; text: string; recipeId: string })[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Añadir texto antes del link
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const emoji = match[1] || '';
    const linkText = match[2].trim();
    
    // Buscar la receta por nombre o emoji
    const recipe = recipes.find(
      r => 
        r.title.toLowerCase().includes(linkText.toLowerCase()) ||
        (emoji && r.emoji === emoji)
    );

    if (recipe) {
      parts.push({
        emoji,
        text: linkText,
        recipeId: recipe.id
      });
    } else {
      // Si no encuentra la receta, mantener el texto original
      parts.push(`[[${emoji} ${linkText}]]`);
    }

    lastIndex = linkRegex.lastIndex;
  }

  // Añadir el resto del texto
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 transition-all duration-300 hover:shadow-[var(--shadow-soft)] hover:border-primary/30">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
          {index + 1}
        </div>
        <p className="text-foreground text-lg leading-relaxed pt-1">
          {parts.map((part, i) => {
            if (typeof part === 'string') {
              return <span key={i}>{part}</span>;
            }
            
            return (
              <Link
                key={i}
                to={`/recipe/${part.recipeId}`}
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 hover:underline transition-colors font-semibold"
              >
                {part.emoji && <span>{part.emoji}</span>}
                <span>{part.text}</span>
              </Link>
            );
          })}
        </p>
      </div>
    </div>
  );
};
