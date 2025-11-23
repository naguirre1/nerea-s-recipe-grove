import hummus from '../assets/hummus.jpg';
import cremaDeCalabaza from '../assets/pumpkin-soup.jpg';
import antxoasEnVinagre from '../assets/antxoas-en-vinagre.jpg';
import ollaFerroviaria from '../assets/olla-ferroviaria.jpg';
import tartaDeZanahoriaBizcocho from '../assets/tarta-de-zanahoria.jpg';
import lactonesa from '../assets/lactonesa.jpg';
import pisto from '../assets/pisto-dish.jpg';
import rabas from '../assets/rabas.jpg';
import vinagreta from '../assets/vinagreta.jpg';
import buttercream from '../assets/buttercream.jpg';

export interface Recipe {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  image?: string;
}

export const DEFAULT_RECIPE_IMAGE = '/src/assets/default-recipe.jpg';

export const recipes: Recipe[] = [
  {
    id: "hummus",
    emoji: "🍽️",
    title: "Hummus",
    description: "Recipe description",
    tags: ["recipe"],
    ingredients: [
      "400 gr de garbanzos cocidos",
      "2 cucharadas de [[Tahini]]"
    ],
    steps: [
      "paso 1…"
    ],
    image: hummus
  },
  {
    id: "tahini",
    emoji: "🍽️",
    title: "Tahini",
    description: "Recipe description",
    tags: ["recipe", "complemento"],
    ingredients: [
      "Sésamo",
      "Aceite"
    ],
    steps: [
      "Tostar en una sartén a fuego medio el sésamo durante 5 minutos.",
      "Batir con el aceite."
    ]
  },
  {
    id: "crema-de-calabaza",
    emoji: "🎃",
    title: "🎃 Crema de calabaza",
    description: "Recipe description",
    tags: ["recipe", "cuchara", "calabaza", "otoño", "verduras", "orden/primero"],
    ingredients: [
      "Una rodaja de calabaza 800 gr aprox",
      "150 gr cebolla",
      "1 diente de ajo",
      "Leche de coco",
      "Mantequilla",
      "Caldo de pollo",
      "150 gr puerro (opcional)"
    ],
    steps: [
      "Picar la calabaza en trozos pequeños porque así caramelizará mejor. Picar en juliana la cebolla, el ajo y el puerro.",
      "Vamos a dorar la calabaza en una cazuela. Se puede dorar con mantequilla o aceite de oliva (más rica con mantequilla). Si lo hacemos en tandas quedará mejor. Cuanto más se dore (sin quemarse), más rica. Cuando esté, reservamos.",
      "En un poco de aceite salteamos la cebolla, el ajo y el puerro. También podemos añadir un poco de patata o una manzana reineta si queremos darle más cuerpo. Antes de sacar el rehogado, añadir las especias que nos gusten, por ejemplo curry, ras el hannout, nuez moscada o pimentón dulce y tostarlas un momento sin que lleguen a quemarse.",
      "Añadir la calabaza y caldo de pollo o agua hasta cubrir. Si hemos salteado bastante con 20 minutos bastará, si no, habrá que esperar un poco más.",
      "Cuando esté cocido si tiene mucho caldo, retirar un poco y triturar. Cuando veamos la textura triturada vamos añadiendo el lácteo/líquido para dejarlo con al textura que nos guste (leche de coco, griego, leche evaporada...)",
      "Servimos con alguna guarnición bien salada por encima (bacon, anchoas en aceite, parmesano...)"
    ],
    image: cremaDeCalabaza
  },
  {
    id: "antxoas-en-vinagre",
    emoji: "🐟",
    title: "🐟 Antxoas en vinagre",
    description: "Recipe description",
    tags: ["recipe", "pescado/antxoas", "aperitivo"],
    ingredients: [
      "Hielo",
      "Ajos (quitar el gérmen)",
      "Perejil",
      "Vinagre de manzana",
      "Antxoas (400-500 gr)",
      "Aceite de oliva"
    ],
    steps: [
      "Poner en agua con hielo las antxoas limpias durante 30 mins aproximadamente para blanquearlas.",
      "Poner en un recipiente 3 partes de vinagre y 1 de agua y dejar las antxoas cocinándose en la mezcla 2 horas.",
      "Limpiar las antxoas del vinagre y ponerlas con aceite, perejil y ajo picadito."
    ],
    image: antxoasEnVinagre
  },
  {
    id: "olla-ferroviaria",
    emoji: "🚂",
    title: "🚂 Olla ferroviaria",
    description: "Recipe description",
    tags: ["recipe", "menu/primero", "cuchara", "alubias"],
    ingredients: [
      "1 kg de alubias",
      "5 litros de \"agua blanda\"",
      "3 dientes de ajo",
      "2 pimientos choriceros",
      "1 puerro",
      "1 cebolla",
      "Tomate rallado o triturado",
      "1 trozo de tocino o panceta",
      "1/2 kg de costilla de cerdo adobada",
      "Chorizo (a poder ser ahumado)",
      "Morcilla",
      "Sal y aceite"
    ],
    steps: [
      "Remojar desde la noche anterior.",
      "Encender la puchera con carbón vegetal y dejar los tiros abiertos hasta que las ascuas estén al rojo vivo.",
      "Picar la verdura muy finita ([[brunoise]]).",
      "Añadir la verdura, las alubias, un chorro de aceite y agua hasta cubrir",
      "Cuando empiece a hervir hay que cortar la cocción con agua fría (asustar), se puede hacer hasta 3 veces pero con 1 es suficiente. A partir de ahora conviene que se haga a fuego lento.",
      "Durante la cocción no meter la cuchara para remover, coger la olla cada 15 minutos aproximadamente y hacer el movimiento del pil-pil con ella. También hay que ir vigilando el nivel del agua.",
      "A mitad de cocción se añaden las carnes excepto la morcilla. Se pueden hervir en un poco de agua antes para desgrasarlos o también se pueden añadir directamente e ir desgrasando con un cazo.",
      "Cuando las alubias ya estén hechas, incluir la morcilla y corregir el punto de sal."
    ],
    image: ollaFerroviaria
  },
  {
    id: "tarta-de-zanahoria-bizcocho",
    emoji: "🥕",
    title: "🥕 Tarta de zanahoria (bizcocho)",
    description: "Recipe description",
    tags: ["recipe", "zanahoria", "orden/postre", "tarta", "dulce"],
    ingredients: [
      "240 ml de aceite de girasol suave",
      "4 huevos medianos",
      "400 gr de zanahorias enteras, sin pelar",
      "280 gr de harina",
      "200 gr de azúcar moreno…",
      "2 cucharaditas de bicarbonato o 2 sobres de gasificante",
      "1 cucharadita de levadura en polvo",
      "1 pizca de sal",
      "1 o 2 cucharaditas de canela en polvo",
      "150 gr de nueces"
    ],
    steps: [
      "Batir los huevos y el azúcar",
      "Añadir el aceite y batir un poco más.",
      "Pelar, lavar y rallar las zanahorias. Contienen mucha cantidad de agua, así que es bueno escurrirlas un poco con las manos. No demasiado, para que no quede seco el bizcocho. Las añadimos a la mezcla.",
      "En un recipiente a parte, ponemos harina, sal, bicarbonato, levadura y la canela. Mezclamos todo bien y tamizamos sobre la mezcla anterior.",
      "Añadimos la nuez troceada.",
      "Hornear el bizcocho a 180° durante 50 minutos, hasta que al pinchar con un palo salga limpio.",
      "Cuando se enfríe, cortar por la mitad y rellenar con [[🧈 Buttercream]]"
    ],
    image: tartaDeZanahoriaBizcocho
  },
  {
    id: "lactonesa",
    emoji: "🥛",
    title: "🥛 Lactonesa",
    description: "Recipe description",
    tags: ["recipe", "salsa"],
    ingredients: [
      "Leche entera",
      "Limón",
      "Sal",
      "Aceite de oliva",
      "Un poco de ajo"
    ],
    steps: [
      "Cortamos la leche con un poco de zumo de limón, un poco de ajo y un poco de sal.",
      "Vamos añadiendo el aceite en hilo mientras batimos."
    ],
    image: lactonesa
  },
  {
    id: "pisto",
    emoji: "🥣",
    title: "🥣 Pisto",
    description: "Recipe description",
    tags: ["cuchara", "orden/primero", "verduras", "calabacín", "recipe"],
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
      "Freír la patata",
      "Sofrito: cortar la cebolla en *[[brunoise]]* y pocharla. Cuando esté caída, añadir los pimientos y finalmente el tomate pelado y cortado en trocitos.",
      "Cuando toda la verdura esté pasada, se puede añadir un poco de pimentón ahumado y dejarlo tostar unos segundos sin parar de remover.",
      "Añadir las patatas y el calabacín.",
      "Poner un huevo en el centro y servir"
    ],
    image: pisto
  },
  {
    id: "rabas",
    emoji: "🦑",
    title: "🦑 Rabas",
    description: "Recipe description",
    tags: ["recipe", "aperitivo", "pescado/calamar"],
    ingredients: [
      "600 gr de calamares",
      "230 gr de harina de tempura",
      "1 lata de cerveza fría",
      "Ajos",
      "Leche",
      "Sal"
    ],
    steps: [
      "El corte de la raba debe ser al contrario que el aro de calamar.",
      "La noche anterior poner las rabas cortadas en leche y ajos para que rompan las fibras del calamar.",
      "Una hora antes de hacerlas, mezclar con una varilla la sal, la cerveza y la harina y dejar reposar.",
      "Freír con aceite de girasol."
    ],
    image: rabas
  },
  {
    id: "vinagreta",
    emoji: "🧂",
    title: "🧂 Vinagreta",
    description: "Recipe description",
    tags: ["recipe", "salsa"],
    ingredients: [
      "1 parte de vinagre",
      "3 partes de aceite",
      "Un poco de sal"
    ],
    steps: [
      "Juntar todo y agitar o batir",
      "Se puede sustituir el vinagre por lima, limón...",
      "Se pueden añadir unos pimientos, cebolleta etc cortado en [[brunoise]] muy fina"
    ],
    image: vinagreta
  },
  {
    id: "buttercream",
    emoji: "🧈",
    title: "🧈 Buttercream",
    description: "Recipe description",
    tags: ["recipe", "relleno", "postre/relleno", "mantequilla"],
    ingredients: [
      "250 gr de mantequilla sin sal a temperatura ambiente",
      "200 gr de queso crema (mascarpone)",
      "600 gr de azúcar seda",
      "1 cucharada de vainilla (opcional)"
    ],
    steps: [
      "Batir la mantequilla durante aproximadamente 1 minuto",
      "Tamizar el azúcar glass sobre la mantequilla y batirlo mucho. Esto es muy importante para que no se note la textura del azúcar. Hay que tamizar y batir mucho mucho.",
      "Cuando ambos ingredientes estén integrados, añadir el queso (mejor frío) y la vainilla",
      "Batir un poco más y listo.",
      "Como al batir se calienta, estará más blando así que antes de rellenar la tarta, podemos meter el relleno en la nevera."
    ],
    image: buttercream
  }
];