import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 bg-card border-border">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute top-4 left-4 text-6xl animate-scale-in">
            {recipe.emoji}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-serif font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-2">
            {recipe.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
};
