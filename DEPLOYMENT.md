# 🚀 GitHub Pages Deployment Guide

## Initial Setup (One-time)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit - Forest Kitchen"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **The site will automatically deploy** when you push to the main branch!

## 📝 Adding New Recipes

To add a new recipe, simply edit `src/data/recipes.ts`:

```typescript
{
  id: "new-recipe-slug",
  emoji: "🥘",
  title: "Recipe Title",
  description: "A short description of your recipe",
  tags: ["tag1", "tag2", "tag3"],
  ingredients: [
    "Ingredient 1",
    "Ingredient 2",
    // ... more ingredients
  ],
  steps: [
    "Step 1 instructions",
    "Step 2 instructions",
    // ... more steps
  ],
  // image is OPTIONAL - if omitted, a default image will be used
  image: "/src/assets/your-image.jpg"
}
```

### ⚙️ Automatic Card Generation

When you add a new recipe to the array:
1. A new recipe card will **automatically appear** on the homepage
2. A new detail page will be **automatically created** at `/recipe/your-recipe-id`
3. If you don't specify an `image`, the default placeholder image will be used
4. Simply commit and push - GitHub Actions will rebuild and deploy!

```bash
git add src/data/recipes.ts
git commit -m "Add new recipe: Recipe Name"
git push origin main
```

Wait 1-2 minutes for GitHub Actions to complete, then your new recipe will be live! 🎉

## 🖼️ Adding Custom Recipe Images (Optional)

To add a custom image for a recipe:

1. Add your image to `src/assets/` (e.g., `src/assets/my-recipe.jpg`)
2. Import it at the top of `recipes.ts`:
   ```typescript
   import myRecipeImage from "@/assets/my-recipe.jpg";
   ```
3. Use it in your recipe:
   ```typescript
   image: myRecipeImage
   ```

## 🔗 Your Site URL

After deployment, your site will be available at:
`https://naguirre1.github.io/nerea-s-recipe-grove/`

## 📱 Local Development

To test locally before deploying:
```bash
npm install
npm run dev
```

Visit `http://localhost:8080` to see your changes.

## 🛠️ Troubleshooting

- **404 on GitHub Pages**: Make sure the base path in `vite.config.ts` matches your repo name
- **Images not loading**: Ensure images are imported as ES6 modules, not referenced as strings
- **Build fails**: Check the Actions tab on GitHub for error details
