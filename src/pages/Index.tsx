import { Link } from "react-router-dom";
import { RecipeCard } from "@/components/RecipeCard";
import { recipes } from "@/data/recipes";
import { ChefHat, Leaf, Utensils, Search } from "lucide-react";
import heroImage from "@/assets/hero-cooking.jpg";
import { NavLink } from "@/components/NavLink";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStickySearch, setShowStickySearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickySearch(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="relative border-b backdrop-blur-sm sticky top-0 z-50 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Navigation background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" />
        </div>
        <nav className="relative container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary-foreground hover:text-primary-foreground/80 transition-colors">
              🌳 Forest Kitchen
            </Link>
            <div className="flex gap-6">
              <NavLink to="/" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors" activeClassName="text-primary-foreground font-semibold">
                Recipes
              </NavLink>
              <NavLink to="/glossary" className="text-primary-foreground hover:text-primary-foreground/80 transition-colors" activeClassName="text-primary-foreground font-semibold">
                Glossary
              </NavLink>
            </div>
          </div>
        </nav>
        
        {/* Sticky Search Bar */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            showStickySearch ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="relative container mx-auto px-4 pb-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
              <Input
                type="text"
                placeholder="Buscar recetas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base bg-background/95 backdrop-blur-sm border-border focus:border-primary"
              />
            </div>
          </div>
        </div>
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
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 text-primary-foreground">
            🌳 Forest Kitchen
          </h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar recetas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg bg-background/90 backdrop-blur-sm border-border focus:border-primary"
            />
          </div>
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
          {filteredRecipes.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-muted-foreground text-xl">No se encontraron recetas</p>
            </div>
          ) : (
            filteredRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                style={{ animationDelay: `${index * 0.2}s` }}
                className="animate-scale-in"
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))
          )}
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
