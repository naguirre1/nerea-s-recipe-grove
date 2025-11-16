import { Link } from "react-router-dom";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import { ChefHat, Leaf, Utensils } from "lucide-react";
import heroImage from "@/assets/hero-cooking.jpg";
import { NavLink } from "@/components/NavLink";

const Index = () => {
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
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/50 to-background" />
        </div>
        <div className="relative z-10 text-center px-4 animate-fade-in">
          <div className="flex justify-center gap-4 mb-6">
            <Leaf className="h-12 w-12 text-sage animate-scale-in" />
            <ChefHat className="h-16 w-16 text-primary animate-scale-in" style={{ animationDelay: "0.1s" }} />
            <Utensils className="h-12 w-12 text-accent animate-scale-in" style={{ animationDelay: "0.2s" }} />
          </div>
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4 text-primary-foreground">
            🌳 Forest Kitchen
          </h1>
          <p className="text-2xl md:text-3xl text-primary-foreground/90 font-light mb-2">
            Recetas de la huerta
          </p>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Descubre recetas caseras llenas de sabor y tradición
          </p>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-serif font-bold mb-4 text-foreground">
            Mis Recetas
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
          {recipes.map((recipe, index) => (
            <div
              key={recipe.id}
              style={{ animationDelay: `${index * 0.2}s` }}
              className="animate-scale-in"
            >
              <RecipeCard recipe={recipe} />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            Hecho con <span className="text-primary text-xl">❤️</span> desde mi cocina
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
