export type Locale = "fr" | "en" | "ar";

export type Category = {
  id: string;
  name: Record<Locale, string>;
  description: string;
};

export type Product = {
  id: string;
  categoryId: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  fullDescription: Record<Locale, string>;
  price: number;
  image: string;
  badges: string[];
  allergens: string[];
  nutrition: string;
  options: string[];
  active: boolean;
  promoted?: boolean;
};

export const restaurant = {
  name: "West 91",
  tagline: "Restaurant, cafe & lounge",
  phone: "+212 6 12 34 56 78",
  email: "contact@west91.ma",
  address: "91 Avenue Mohammed V, Casablanca",
  mapUrl: "https://maps.google.com/?q=West%2091%20Casablanca",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  cover:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85",
  logoMark: "W91",
  openingHours: [
    ["Lundi", "08:00 a 23:00"],
    ["Mardi", "08:00 a 23:00"],
    ["Mercredi", "08:00 a 23:00"],
    ["Jeudi", "08:00 a 23:00"],
    ["Vendredi", "08:00 a 23:00"],
    ["Samedi", "08:00 a 23:00"],
    ["Dimanche", "08:00 a 23:00"],
  ],
};

export const categories: Category[] = [
  { id: "breakfast", name: { fr: "Petit-dejeuner", en: "Breakfast", ar: "فطور" }, description: "Classiques matinaux" },
  { id: "starters", name: { fr: "Entrees", en: "Starters", ar: "مقبلات" }, description: "A partager" },
  { id: "salads", name: { fr: "Salades", en: "Salads", ar: "سلطات" }, description: "Frais et equilibre" },
  { id: "pasta", name: { fr: "Pates", en: "Pasta", ar: "معكرونة" }, description: "Sauces maison" },
  { id: "burgers", name: { fr: "Burgers", en: "Burgers", ar: "برغر" }, description: "Pain brioche" },
  { id: "meat", name: { fr: "Viandes", en: "Meat", ar: "لحوم" }, description: "Grillades premium" },
  { id: "fish", name: { fr: "Poissons", en: "Fish", ar: "أسماك" }, description: "Selon arrivage" },
  { id: "desserts", name: { fr: "Desserts", en: "Desserts", ar: "حلويات" }, description: "Douceurs" },
  { id: "drinks", name: { fr: "Boissons", en: "Drinks", ar: "مشروبات" }, description: "Froides" },
  { id: "coffee", name: { fr: "Cafes", en: "Coffee", ar: "قهوة" }, description: "Barista" },
  { id: "cocktails", name: { fr: "Cocktails", en: "Cocktails", ar: "كوكتيلات" }, description: "Signature" },
];

export const products: Product[] = [
  {
    id: "morning-91",
    categoryId: "breakfast",
    name: { fr: "Morning West 91", en: "Morning West 91", ar: "فطور ويست 91" },
    description: { fr: "Oeufs, avocat, fromage frais, pain grille", en: "Eggs, avocado, cream cheese, toasted bread", ar: "بيض، أفوكادو، جبن طري وخبز محمص" },
    fullDescription: { fr: "Une assiette complete pour demarrer la journee avec des produits frais et une touche cafe lounge.", en: "A complete breakfast plate with fresh produce and a refined lounge touch.", ar: "طبق فطور متكامل بمكونات طازجة ولمسة راقية." },
    price: 72,
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80",
    badges: ["Populaire"],
    allergens: ["Oeufs", "Gluten", "Lait"],
    nutrition: "520 kcal",
    options: ["Oeufs brouilles", "Oeufs au plat", "Pain complet"],
    active: true,
  },
  {
    id: "burrata",
    categoryId: "starters",
    name: { fr: "Burrata tomate confite", en: "Burrata & tomato confit", ar: "بوراتا بالطماطم" },
    description: { fr: "Burrata cremeuse, tomate confite, pesto basilic", en: "Creamy burrata, tomato confit, basil pesto", ar: "بوراتا كريمية، طماطم وبيستو" },
    fullDescription: { fr: "Burrata italienne servie avec tomates confites, huile d'olive vierge et pesto basilic maison.", en: "Italian burrata served with tomato confit, virgin olive oil and house basil pesto.", ar: "بوراتا إيطالية مع طماطم، زيت زيتون وبيستو منزلي." },
    price: 84,
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80",
    badges: ["Vegetarien"],
    allergens: ["Lait", "Fruits a coque"],
    nutrition: "430 kcal",
    options: ["Pain grille", "Extra pesto"],
    active: true,
  },
  {
    id: "salad-atlas",
    categoryId: "salads",
    name: { fr: "Salade Atlas", en: "Atlas Salad", ar: "سلطة أطلس" },
    description: { fr: "Quinoa, legumes croquants, feta, citron", en: "Quinoa, crisp vegetables, feta, lemon", ar: "كينوا، خضار مقرمشة، فيتا وليمون" },
    fullDescription: { fr: "Une salade lumineuse aux legumes de saison, quinoa, feta, herbes fraiches et vinaigrette citronnee.", en: "A bright seasonal salad with quinoa, feta, fresh herbs and lemon dressing.", ar: "سلطة موسمية بالكينوا والفيتا والأعشاب وصلصة الليمون." },
    price: 76,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    badges: ["Vegan", "Sans gluten"],
    allergens: ["Lait"],
    nutrition: "390 kcal",
    options: ["Sans feta", "Poulet grille", "Sauce a part"],
    active: true,
  },
  {
    id: "truffle-pasta",
    categoryId: "pasta",
    name: { fr: "Tagliatelles truffe", en: "Truffle tagliatelle", ar: "تالياتيلي بالكمأة" },
    description: { fr: "Creme de truffe, parmesan, champignons", en: "Truffle cream, parmesan, mushrooms", ar: "كريمة الكمأة، بارميزان وفطر" },
    fullDescription: { fr: "Tagliatelles fraiches nappees d'une creme de truffe onctueuse, copeaux de parmesan et champignons poeles.", en: "Fresh tagliatelle with silky truffle cream, parmesan shavings and sauteed mushrooms.", ar: "تالياتيلي طازجة بكريمة الكمأة والبارميزان والفطر." },
    price: 118,
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80",
    badges: ["Populaire"],
    allergens: ["Gluten", "Lait"],
    nutrition: "690 kcal",
    options: ["Extra parmesan", "Poulet", "Crevettes"],
    active: true,
  },
  {
    id: "burger-west-91",
    categoryId: "burgers",
    name: { fr: "Burger West 91", en: "West 91 Burger", ar: "برغر ويست 91" },
    description: { fr: "Pain brioche, steak hache, cheddar, salade, tomate, sauce maison", en: "Brioche bun, beef patty, cheddar, lettuce, tomato, house sauce", ar: "خبز بريوش، لحم، شيدر، خس، طماطم وصلصة" },
    fullDescription: { fr: "Le burger signature West 91 avec steak de boeuf, cheddar fondu, pickles croquants et sauce maison legerement fumee.", en: "The West 91 signature burger with beef patty, melted cheddar, crisp pickles and a lightly smoky house sauce.", ar: "برغر ويست 91 بلحم بقري، شيدر، مخللات وصلصة خاصة." },
    price: 89,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80",
    badges: ["Populaire", "Promotion"],
    allergens: ["Gluten", "Lait", "Moutarde"],
    nutrition: "760 kcal",
    options: ["Supplement fromage", "Supplement sauce", "Cuisson viande", "Double steak"],
    active: true,
    promoted: true,
  },
  {
    id: "beef-filet",
    categoryId: "meat",
    name: { fr: "Filet de boeuf", en: "Beef filet", ar: "فيليه لحم" },
    description: { fr: "Puree maison, jus reduit, legumes rotis", en: "House mash, reduced jus, roasted vegetables", ar: "بطاطس مهروسة، صلصة وخضار مشوية" },
    fullDescription: { fr: "Filet tendre grille a la commande, accompagne de puree maison, jus reduit et legumes de saison rotis.", en: "Tender filet grilled to order with house mash, reduced jus and seasonal roasted vegetables.", ar: "فيليه مشوي حسب الطلب مع بطاطس وخضار موسمية." },
    price: 168,
    image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80",
    badges: ["Nouveau"],
    allergens: ["Lait"],
    nutrition: "810 kcal",
    options: ["Saignant", "A point", "Bien cuit", "Sauce poivre"],
    active: true,
  },
  {
    id: "salmon",
    categoryId: "fish",
    name: { fr: "Saumon grille", en: "Grilled salmon", ar: "سلمون مشوي" },
    description: { fr: "Saumon, riz safrane, legumes verts", en: "Salmon, saffron rice, green vegetables", ar: "سلمون، أرز بالزعفران وخضار" },
    fullDescription: { fr: "Pave de saumon grille, riz safrane, legumes verts et beurre citronne.", en: "Grilled salmon fillet, saffron rice, green vegetables and lemon butter.", ar: "قطعة سلمون مشوية مع أرز وخضار وزبدة الليمون." },
    price: 142,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=80",
    badges: ["Sans gluten"],
    allergens: ["Poisson", "Lait"],
    nutrition: "610 kcal",
    options: ["Sauce a part", "Riz", "Legumes uniquement"],
    active: true,
  },
  {
    id: "fondant",
    categoryId: "desserts",
    name: { fr: "Fondant chocolat", en: "Chocolate fondant", ar: "فوندان شوكولاتة" },
    description: { fr: "Coeur coulant, glace vanille, cacao", en: "Molten center, vanilla ice cream, cocoa", ar: "قلب ذائب، آيس كريم فانيلا وكاكاو" },
    fullDescription: { fr: "Fondant au chocolat noir servi chaud avec glace vanille et eclats de cacao.", en: "Warm dark chocolate fondant served with vanilla ice cream and cocoa nibs.", ar: "فوندان شوكولاتة داكنة دافئ مع آيس كريم فانيلا." },
    price: 58,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    badges: ["Populaire"],
    allergens: ["Gluten", "Oeufs", "Lait"],
    nutrition: "480 kcal",
    options: ["Sans glace", "Extra glace"],
    active: true,
  },
  {
    id: "detox",
    categoryId: "drinks",
    name: { fr: "Detox gingembre", en: "Ginger detox", ar: "ديتوكس زنجبيل" },
    description: { fr: "Citron, gingembre, menthe, concombre", en: "Lemon, ginger, mint, cucumber", ar: "ليمون، زنجبيل، نعناع وخيار" },
    fullDescription: { fr: "Boisson fraiche pressee minute, vive et parfumee.", en: "Freshly pressed drink, bright and aromatic.", ar: "مشروب طازج ومنعش." },
    price: 46,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=80",
    badges: ["Vegan"],
    allergens: [],
    nutrition: "130 kcal",
    options: ["Sans sucre", "Extra gingembre"],
    active: true,
  },
  {
    id: "flat-white",
    categoryId: "coffee",
    name: { fr: "Flat white", en: "Flat white", ar: "فلات وايت" },
    description: { fr: "Espresso double, lait micro-mousse", en: "Double espresso, micro-foam milk", ar: "إسبريسو مزدوج وحليب" },
    fullDescription: { fr: "Cafe intense et texture soyeuse, prepare au bar avec grains selectionnes.", en: "Intense coffee and silky texture, brewed with selected beans.", ar: "قهوة مركزة بقوام ناعم." },
    price: 34,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    badges: ["Nouveau"],
    allergens: ["Lait"],
    nutrition: "120 kcal",
    options: ["Lait vegetal", "Extra shot", "Decafeine"],
    active: true,
  },
  {
    id: "sunset-91",
    categoryId: "cocktails",
    name: { fr: "Sunset 91", en: "Sunset 91", ar: "سنست 91" },
    description: { fr: "Ananas, passion, citron vert, sirop epice", en: "Pineapple, passion fruit, lime, spiced syrup", ar: "أناناس، باشن فروت، ليمون وشراب متبل" },
    fullDescription: { fr: "Cocktail signature sans alcool, tropical, acidule et legerement epice.", en: "Signature alcohol-free cocktail, tropical, tangy and lightly spiced.", ar: "كوكتيل مميز بدون كحول بنكهة استوائية." },
    price: 62,
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=900&q=80",
    badges: ["Spicy", "Nouveau"],
    allergens: [],
    nutrition: "210 kcal",
    options: ["Moins sucre", "Extra citron", "Format large"],
    active: true,
  },
];

export const analytics = {
  scans: 12842,
  returning: 38,
  newVisitors: 62,
  topProducts: ["Burger West 91", "Tagliatelles truffe", "Fondant chocolat"],
  topCategories: ["Burgers", "Pates", "Cocktails"],
  period: [
    { label: "Lun", value: 430 },
    { label: "Mar", value: 520 },
    { label: "Mer", value: 610 },
    { label: "Jeu", value: 740 },
    { label: "Ven", value: 980 },
    { label: "Sam", value: 1240 },
    { label: "Dim", value: 860 },
  ],
};

export const databaseTables = [
  "restaurants",
  "menus",
  "categories",
  "products",
  "product_options",
  "orders",
  "order_items",
  "tables",
  "qr_codes",
  "opening_hours",
  "analytics",
  "languages",
  "translations",
];
