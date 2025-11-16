import { Link } from "react-router-dom";
import { glossaryTerms } from "@/data/glossary";
import { recipes } from "@/data/recipes";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "@/components/NavLink";

const Glossary = () => {
  const getRecipeTitle = (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    return recipe ? recipe.title : recipeId;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors">
              🌳 Forest Kitchen
            </Link>
            <div className="flex gap-6">
              <NavLink to="/">Recipes</NavLink>
              <NavLink to="/glossary">Glossary</NavLink>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Glossary</h1>
          <p className="text-muted-foreground mb-8">
            Essential cooking terms and ingredients
          </p>

          {glossaryTerms.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground text-center">
                  No glossary terms found. Add terms tagged with #term to your Obsidian vault.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {glossaryTerms.map((term) => (
                <Card key={term.id}>
                  <CardHeader>
                    <CardTitle>{term.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {term.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base whitespace-pre-wrap mb-4">
                      {term.description}
                    </CardDescription>
                    
                    {term.relatedRecipes.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h3 className="font-semibold text-sm mb-2">Used in recipes:</h3>
                        <div className="flex flex-wrap gap-2">
                          {term.relatedRecipes.map((recipeId) => (
                            <Link
                              key={recipeId}
                              to={`/recipe/${recipeId}`}
                              className="text-sm text-primary hover:underline"
                            >
                              {getRecipeTitle(recipeId)}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Glossary;
