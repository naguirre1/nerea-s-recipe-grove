import { useParams, Link } from "react-router-dom";
import { recipes, DEFAULT_RECIPE_IMAGE } from "@/data/recipes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChefHat, Clock, Users } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { StepWithLinks } from "@/components/StepWithLinks";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Receta no encontrada</h1>
          <Link to="/">
            <Button variant="default">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              🌳 Forest Kitchen
            </Link>
            <div className="flex gap-6">
              <NavLink to="/" className="text-foreground hover:text-primary transition-colors" activeClassName="text-primary font-semibold">
                Recipes
              </NavLink>
              <NavLink to="/glossary" className="text-foreground hover:text-primary transition-colors" activeClassName="text-primary font-semibold">
                Glossary
              </NavLink>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={recipe.image || DEFAULT_RECIPE_IMAGE}
          alt={recipe.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            console.warn(`Image failed to load for ${recipe.id}`);
            (e.target as HTMLImageElement).src = DEFAULT_RECIPE_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12 animate-fade-in">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4 text-primary-foreground hover:text-primary-foreground/80 hover:bg-primary-foreground/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-8xl">{recipe.emoji}</span>
              <div>
                <h1 className="text-5xl font-serif font-bold text-primary-foreground mb-2">
                  {recipe.title}
                </h1>
                <p className="text-xl text-primary-foreground/90">
                  {recipe.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 animate-slide-up">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-sm">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-3 gap-4 mb-12 animate-scale-in">
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Tiempo</p>
            <p className="text-lg font-semibold">45 min</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Porciones</p>
            <p className="text-lg font-semibold">4 personas</p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border text-center">
            <ChefHat className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-sm text-muted-foreground">Dificultad</p>
            <p className="text-lg font-semibold">Fácil</p>
          </div>
        </div>

        {/* Ingredients */}
        <div className="mb-12 animate-fade-in">
          <h2 className="text-3xl font-serif font-bold mb-6 text-foreground flex items-center gap-3">
            <span className="text-4xl">🥕</span>
            Ingredientes
          </h2>
          <div className="bg-card border border-border rounded-lg p-8">
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-lg"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-primary text-2xl">•</span>
                  <span className="text-foreground">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps */}
        <div className="animate-fade-in">
          <h2 className="text-3xl font-serif font-bold mb-6 text-foreground flex items-center gap-3">
            <span className="text-4xl">👨‍🍳</span>
            Elaboración
          </h2>
          <div className="space-y-6">
            {recipe.steps.map((step, index) => (
              <StepWithLinks
                key={index}
                text={step}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link to="/">
            <Button size="lg" className="bg-primary hover:bg-rust text-primary-foreground">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Ver todas las recetas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
