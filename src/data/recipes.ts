import pumpkinSoup from '../assets/pumpkin-soup.jpg';
import pistoDish from '../assets/pisto-dish.jpg';
import defaultRecipeImg from '../assets/default-recipe.jpg';

export interface Recipe {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  image: string;
}

export const DEFAULT_RECIPE_IMAGE = defaultRecipeImg;

export const recipes: Recipe[] = [
  {
    id: "crema-calabaza",
    emoji: "🎃",
    title: "Crema de Calabaza",
    description: "Una deliciosa crema otoñal con calabaza y leche de coco, perfecta para los días frescos.",
    tags: ["cuchara", "calabaza", "otoño", "verduras", "primerPlato"],
    ingredients: [
      "Una rodaja de calabaza 800 gr aprox",
      "150 gr cebolla",
      "1 diente de ajo",
      "Leche de coco",
      "Mantequilla",
      "150 gr puerro (opcional)"
    ],
    steps: [
      "Cortar la calabaza en trozos medianos y hornear a 200 grados durante 40 minutos.",
      "Mientras, pochar la cebolla en la mantequilla hasta que esté transparente.",
      "Añadir el ajo picado y cocinar por 1-2 minutos más.",
      "Cuando la calabaza esté tierna, agregar junto con la cebolla pochada.",
      "Añadir la leche de coco y triturar hasta obtener una crema suave.",
      "Ajustar la consistencia con agua o caldo si es necesario.",
      "Salpimentar al gusto y servir caliente."
    ],
    image: pumpkinSoup
  },
  {
    id: "pisto",
    emoji: "🥣",
    title: "Pisto",
    description: "El clásico pisto español con verduras frescas y un huevo en el centro, un plato tradicional lleno de sabor.",
    tags: ["cuchara", "primerPlato", "verduras", "calabacín"],
    ingredients: [
      "Calabacín",
      "Pimiento rojo (pelado)",
      "Pimiento verde",
      "Cebolla",
      "1 Patata",
      "2 Tomates maduros"
    ],
    steps: [
      "Poner unos minutos el calabacín en sal para que expulse el agua, luego freír y reservar.",
      "Freír la patata cortada en cubos hasta que esté dorada. Reservar.",
      "Sofrito: cortar la cebolla en brunoise y pocharla a fuego medio.",
      "Cuando esté caída, añadir los pimientos cortados en tiras.",
      "Finalmente, añadir el tomate pelado y cortado en trocitos.",
      "Cuando toda la verdura esté pasada, se puede añadir un poco de pimentón ahumado y dejarlo tostar unos segundos sin parar de remover.",
      "Añadir las patatas y el calabacín fritos.",
      "Poner un huevo en el centro y servir cuando esté cuajado."
    ],
    image: pistoDish
  }
];
