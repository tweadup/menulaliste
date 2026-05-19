"use client";

import {
  BarChart3,
  CalendarDays,
  Eye,
  ImagePlus,
  Languages,
  LockKeyhole,
  Palette,
  Pencil,
  Plus,
  QrCode,
  Save,
  Settings2,
  Store,
  ToggleLeft,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  analytics,
  categories as initialCategories,
  databaseTables,
  products as initialProducts,
  restaurant as initialRestaurant,
  type Category,
  type Product,
} from "../data";

type AdminRestaurant = typeof initialRestaurant;

type ProductForm = {
  id?: string;
  name: string;
  categoryId: string;
  price: string;
  image: string;
  description: string;
  fullDescription: string;
  badges: string[];
  active: boolean;
};

type CategoryForm = {
  id?: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
};

const emptyProduct = (categoryId: string): ProductForm => ({
  name: "",
  categoryId,
  price: "0",
  image: "",
  description: "",
  fullDescription: "",
  badges: [],
  active: true,
});

const emptyCategory: CategoryForm = {
  name: "",
  description: "",
  image: "",
  featured: false,
};

const badgeOptions = ["Populaire", "Nouveau", "Spicy", "Vegan", "Sans gluten", "Promotion"];

export default function AdminPage() {
  const [adminProducts, setAdminProducts] = useState<Product[]>(initialProducts);
  const [adminCategories, setAdminCategories] = useState<Category[]>(initialCategories);
  const [adminRestaurant, setAdminRestaurant] = useState<AdminRestaurant>(initialRestaurant);
  const [productForm, setProductForm] = useState<ProductForm>(() => emptyProduct(initialCategories[0].id));
  const [categoryForm, setCategoryForm] = useState<CategoryForm>(emptyCategory);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    window.queueMicrotask(() => {
      const stored = window.localStorage.getItem("la-liste-admin");
      if (!stored) return;

      try {
        const parsed = JSON.parse(stored) as {
          products?: Product[];
          categories?: Category[];
          restaurant?: AdminRestaurant;
        };
        if (parsed.products?.length) setAdminProducts(parsed.products);
        if (parsed.categories?.length) {
          setAdminCategories(parsed.categories);
          setProductForm((current) => ({ ...current, categoryId: parsed.categories?.[0]?.id ?? current.categoryId }));
        }
        if (parsed.restaurant) setAdminRestaurant(parsed.restaurant);
      } catch {
        window.localStorage.removeItem("la-liste-admin");
      }
    });
  }, []);

  const activeProductsCount = useMemo(
    () => adminProducts.filter((product) => product.active).length,
    [adminProducts],
  );

  function saveAll() {
    window.localStorage.setItem(
      "la-liste-admin",
      JSON.stringify({
        products: adminProducts,
        categories: adminCategories,
        restaurant: adminRestaurant,
      }),
    );
    setSavedMessage("Modifications enregistrées localement");
    window.setTimeout(() => setSavedMessage(""), 2400);
  }

  function resetDemo() {
    setAdminProducts(initialProducts);
    setAdminCategories(initialCategories);
    setAdminRestaurant(initialRestaurant);
    setProductForm(emptyProduct(initialCategories[0].id));
    setCategoryForm(emptyCategory);
    window.localStorage.removeItem("la-liste-admin");
    setSavedMessage("Données de démonstration restaurées");
    window.setTimeout(() => setSavedMessage(""), 2400);
  }

  function submitProduct() {
    const fallbackImage =
      productForm.image.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80";
    const nextProduct: Product = {
      id: productForm.id ?? `product-${Date.now()}`,
      categoryId: productForm.categoryId,
      name: { fr: productForm.name || "Nouveau plat", en: productForm.name || "New dish", ar: productForm.name || "طبق جديد" },
      description: {
        fr: productForm.description || "Description du plat",
        en: productForm.description || "Dish description",
        ar: productForm.description || "وصف الطبق",
      },
      fullDescription: {
        fr: productForm.fullDescription || productForm.description || "Description détaillée du plat",
        en: productForm.fullDescription || productForm.description || "Detailed dish description",
        ar: productForm.fullDescription || productForm.description || "وصف مفصل للطبق",
      },
      price: Number(productForm.price) || 0,
      image: fallbackImage,
      badges: productForm.badges,
      allergens: [],
      nutrition: "Non renseigné",
      options: [],
      active: productForm.active,
      promoted: productForm.badges.includes("Promotion"),
    };

    setAdminProducts((current) =>
      productForm.id ? current.map((product) => (product.id === productForm.id ? nextProduct : product)) : [nextProduct, ...current],
    );
    setProductForm(emptyProduct(adminCategories[0]?.id ?? ""));
    setSavedMessage(productForm.id ? "Produit modifié" : "Produit ajouté");
    window.setTimeout(() => setSavedMessage(""), 1800);
  }

  function editProduct(product: Product) {
    setProductForm({
      id: product.id,
      name: product.name.fr,
      categoryId: product.categoryId,
      price: String(product.price),
      image: product.image,
      description: product.description.fr,
      fullDescription: product.fullDescription.fr,
      badges: product.badges,
      active: product.active,
    });
    document.getElementById("produits")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function deleteProduct(productId: string) {
    setAdminProducts((current) => current.filter((product) => product.id !== productId));
    if (productForm.id === productId) setProductForm(emptyProduct(adminCategories[0]?.id ?? ""));
  }

  function toggleProduct(productId: string) {
    setAdminProducts((current) =>
      current.map((product) => (product.id === productId ? { ...product, active: !product.active } : product)),
    );
  }

  function submitCategory() {
    const nextCategory: Category = {
      id: categoryForm.id ?? `category-${Date.now()}`,
      name: { fr: categoryForm.name || "Nouvelle catégorie", en: categoryForm.name || "New category", ar: categoryForm.name || "تصنيف جديد" },
      description: categoryForm.description || "Description de la catégorie",
      image:
        categoryForm.image.trim() ||
        "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1200&q=85",
      featured: categoryForm.featured,
    };

    setAdminCategories((current) =>
      categoryForm.id ? current.map((category) => (category.id === categoryForm.id ? nextCategory : category)) : [...current, nextCategory],
    );
    setCategoryForm(emptyCategory);
    setSavedMessage(categoryForm.id ? "Catégorie modifiée" : "Catégorie ajoutée");
    window.setTimeout(() => setSavedMessage(""), 1800);
  }

  function editCategory(category: Category) {
    setCategoryForm({
      id: category.id,
      name: category.name.fr,
      description: category.description,
      image: category.image,
      featured: !!category.featured,
    });
    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function deleteCategory(categoryId: string) {
    if (adminCategories.length <= 1) {
      setSavedMessage("Gardez au moins une catégorie");
      window.setTimeout(() => setSavedMessage(""), 1800);
      return;
    }
    const fallback = adminCategories.find((category) => category.id !== categoryId)?.id ?? adminCategories[0].id;
    setAdminCategories((current) => current.filter((category) => category.id !== categoryId));
    setAdminProducts((current) =>
      current.map((product) => (product.categoryId === categoryId ? { ...product, categoryId: fallback } : product)),
    );
    if (productForm.categoryId === categoryId) setProductForm((current) => ({ ...current, categoryId: fallback }));
  }

  function updateHours(index: number, part: "open" | "close", value: string) {
    setAdminRestaurant((current) => {
      const openingHours = current.openingHours.map(([day, hours], hourIndex) => {
        if (hourIndex !== index) return [day, hours];
        const [open, close] = hours.split(" - ");
        return [day, part === "open" ? `${value} - ${close ?? "00:00"}` : `${open ?? "07:00"} - ${value}`];
      }) as AdminRestaurant["openingHours"];
      return { ...current, openingHours };
    });
  }

  return (
    <main className="min-h-screen bg-[#f4f1eb] text-neutral-950">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-black/10 bg-neutral-950 p-4 text-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r lg:border-white/10 lg:p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#b89b6a] font-black">LL</div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Admin</p>
              <h1 className="text-xl font-black">{adminRestaurant.name}</h1>
            </div>
          </div>

          <nav className="mt-6 flex gap-2 overflow-x-auto pb-1 text-sm font-bold lg:grid lg:overflow-visible">
            {[
              ["Dashboard", BarChart3, "dashboard"],
              ["Produits", Store, "produits"],
              ["Catégories", ImagePlus, "categories"],
              ["Vidéo", Video, "accueil-video"],
              ["QR", QrCode, "qr-codes"],
              ["Horaires", CalendarDays, "horaires"],
              ["Paramètres", Settings2, "parametres"],
            ].map(([label, Icon, id]) => (
              <a key={id as string} href={`#${id}`} className="flex shrink-0 items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-white/72 transition hover:bg-white/10 hover:text-white lg:bg-transparent">
                <Icon size={18} />
                {label as string}
              </a>
            ))}
          </nav>

          <div className="mt-6 rounded-3xl border border-white/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-black">
              <LockKeyhole size={17} className="text-[#b89b6a]" />
              Admin fonctionnel
            </div>
            <p className="text-sm leading-6 text-white/58">
              Les changements sont actifs dans cette page et sauvegardés dans le navigateur avec le bouton Enregistrer.
            </p>
          </div>
        </aside>

        <section className="min-w-0 p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#967a4f]">Plateforme menu QR</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Gestion Restaurant La Liste</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-neutral-500">
                Interface responsive avec ajout, modification, suppression et sauvegarde locale.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/" className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black shadow-sm">
                <Eye size={17} />
                Voir le menu
              </Link>
              <button onClick={resetDemo} className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black shadow-sm">
                <X size={17} />
                Réinitialiser
              </button>
              <button onClick={saveAll} className="flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-3 text-sm font-black text-white">
                <Save size={17} />
                Enregistrer
              </button>
            </div>
          </header>

          {savedMessage && (
            <div className="mt-4 rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-black text-emerald-800">
              {savedMessage}
            </div>
          )}

          <div id="dashboard" className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric title="Scans QR code" value={analytics.scans.toLocaleString("fr-FR")} detail="+18% cette semaine" />
            <Metric title="Plats actifs" value={String(activeProductsCount)} detail={`${adminCategories.length} catégories`} />
            <Metric title="Mode client" value="Menu" detail="Commande désactivée" />
            <Metric title="Vidéo accueil" value={adminRestaurant.heroVideo ? "Active" : "Inactive"} detail="Lecture automatique muette" />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <section id="produits" className="rounded-[24px] bg-white p-4 shadow-sm sm:p-5">
              <SectionTitle icon={<Store size={20} />} title="Gestion des produits" subtitle="Ajouter, modifier, supprimer et activer les plats." />
              <div className="mt-5 grid gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:grid-cols-2">
                <TextInput label="Nom du plat" value={productForm.name} onChange={(value) => setProductForm({ ...productForm, name: value })} />
                <label className="grid gap-2 text-sm font-black text-neutral-600">
                  Catégorie
                  <select
                    value={productForm.categoryId}
                    onChange={(event) => setProductForm({ ...productForm, categoryId: event.target.value })}
                    className="h-12 rounded-xl border border-neutral-200 bg-white px-3 font-semibold text-neutral-900 outline-none"
                  >
                    {adminCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name.fr}
                      </option>
                    ))}
                  </select>
                </label>
                <TextInput label="Prix MAD" value={productForm.price} onChange={(value) => setProductForm({ ...productForm, price: value })} />
                <TextInput label="Image URL" value={productForm.image} onChange={(value) => setProductForm({ ...productForm, image: value })} />
                <label className="grid gap-2 text-sm font-black text-neutral-600 md:col-span-2">
                  Description courte
                  <textarea
                    value={productForm.description}
                    onChange={(event) => setProductForm({ ...productForm, description: event.target.value })}
                    className="min-h-24 rounded-xl border border-neutral-200 bg-white px-3 py-3 font-semibold text-neutral-900 outline-none"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-neutral-600 md:col-span-2">
                  Description détaillée
                  <textarea
                    value={productForm.fullDescription}
                    onChange={(event) => setProductForm({ ...productForm, fullDescription: event.target.value })}
                    className="min-h-24 rounded-xl border border-neutral-200 bg-white px-3 py-3 font-semibold text-neutral-900 outline-none"
                  />
                </label>
                <div className="flex flex-wrap gap-2 md:col-span-2">
                  {badgeOptions.map((badge) => (
                    <label key={badge} className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black">
                      <input
                        type="checkbox"
                        checked={productForm.badges.includes(badge)}
                        onChange={() =>
                          setProductForm((current) => ({
                            ...current,
                            badges: current.badges.includes(badge)
                              ? current.badges.filter((item) => item !== badge)
                              : [...current.badges, badge],
                          }))
                        }
                        className="accent-[#b89b6a]"
                      />
                      {badge}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black">
                    <input
                      type="checkbox"
                      checked={productForm.active}
                      onChange={() => setProductForm({ ...productForm, active: !productForm.active })}
                      className="accent-emerald-600"
                    />
                    Actif
                  </label>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2 sm:flex-row">
                  <button onClick={submitProduct} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-black text-white">
                    {productForm.id ? <Save size={17} /> : <Plus size={17} />}
                    {productForm.id ? "Enregistrer la modification" : "Ajouter le produit"}
                  </button>
                  {productForm.id && (
                    <button onClick={() => setProductForm(emptyProduct(adminCategories[0]?.id ?? ""))} className="flex h-12 items-center justify-center rounded-xl bg-white px-4 text-sm font-black">
                      Annuler
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-3">
                {adminProducts.map((product) => (
                  <article key={product.id} className="grid gap-3 rounded-2xl border border-neutral-200 p-3 sm:grid-cols-[72px_1fr_auto] sm:items-center">
                    <Image src={product.image} alt="" width={72} height={72} className="h-18 w-full rounded-xl object-cover sm:h-18 sm:w-18" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-black">{product.name.fr}</p>
                        <span className={product.active ? "rounded-full bg-emerald-100 px-2 py-1 text-xs font-black text-emerald-700" : "rounded-full bg-neutral-100 px-2 py-1 text-xs font-black text-neutral-500"}>
                          {product.active ? "Actif" : "Masqué"}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm text-neutral-500">{product.description.fr}</p>
                      <p className="mt-1 text-sm font-black">
                        {product.price} MAD · {adminCategories.find((category) => category.id === product.categoryId)?.name.fr}
                      </p>
                    </div>
                    <div className="flex gap-2 sm:justify-end">
                      <button onClick={() => toggleProduct(product.id)} className="rounded-full bg-neutral-100 px-3 py-2 text-xs font-black">
                        {product.active ? "Masquer" : "Activer"}
                      </button>
                      <button onClick={() => editProduct(product)} className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100" title="Modifier">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => deleteProduct(product.id)} className="grid h-10 w-10 place-items-center rounded-full bg-red-50 text-red-600" title="Supprimer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-6">
              <section id="accueil-video" className="rounded-[24px] bg-neutral-950 p-4 text-white shadow-sm sm:p-5">
                <SectionTitle dark icon={<Video size={20} />} title="Accueil vidéo" subtitle="Modifier la vidéo plein écran affichée avant le menu." />
                <div className="relative mt-5 aspect-[9/12] overflow-hidden rounded-2xl bg-black">
                  <video className="h-full w-full object-cover" src={adminRestaurant.heroVideo} poster={adminRestaurant.cover} autoPlay muted loop playsInline />
                  <div className="absolute inset-0 bg-black/35" />
                  <p className="absolute bottom-4 left-4 right-4 text-3xl font-black uppercase">La Liste</p>
                </div>
                <div className="mt-4 grid gap-3">
                  <TextInput dark label="URL vidéo MP4" value={adminRestaurant.heroVideo} onChange={(value) => setAdminRestaurant({ ...adminRestaurant, heroVideo: value })} />
                  <TextInput dark label="Image de secours" value={adminRestaurant.cover} onChange={(value) => setAdminRestaurant({ ...adminRestaurant, cover: value })} />
                  <button onClick={saveAll} className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#b89b6a] px-4 text-sm font-black text-black">
                    <Upload size={17} />
                    Appliquer la vidéo
                  </button>
                </div>
              </section>

              <section id="categories" className="rounded-[24px] bg-white p-4 shadow-sm sm:p-5">
                <SectionTitle icon={<ImagePlus size={20} />} title="Catégories" subtitle="Ajouter, modifier et supprimer les catégories." />
                <div className="mt-4 grid gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <TextInput label="Nom catégorie" value={categoryForm.name} onChange={(value) => setCategoryForm({ ...categoryForm, name: value })} />
                  <TextInput label="Description" value={categoryForm.description} onChange={(value) => setCategoryForm({ ...categoryForm, description: value })} />
                  <TextInput label="Image URL" value={categoryForm.image} onChange={(value) => setCategoryForm({ ...categoryForm, image: value })} />
                  <label className="flex items-center gap-2 text-sm font-black">
                    <input
                      type="checkbox"
                      checked={categoryForm.featured}
                      onChange={() => setCategoryForm({ ...categoryForm, featured: !categoryForm.featured })}
                      className="accent-[#b89b6a]"
                    />
                    Catégorie mise en avant
                  </label>
                  <div className="flex gap-2">
                    <button onClick={submitCategory} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-black text-white">
                      {categoryForm.id ? <Save size={17} /> : <Plus size={17} />}
                      {categoryForm.id ? "Modifier" : "Ajouter"}
                    </button>
                    {categoryForm.id && (
                      <button onClick={() => setCategoryForm(emptyCategory)} className="h-12 rounded-xl bg-white px-4 text-sm font-black">
                        Annuler
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-4 grid gap-3">
                  {adminCategories.map((category) => (
                    <div key={category.id} className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-3">
                      <Image src={category.image} alt="" width={64} height={48} className="h-12 w-16 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-black">{category.name.fr}</p>
                        <p className="line-clamp-1 text-xs text-neutral-500">{category.description}</p>
                      </div>
                      <button onClick={() => editCategory(category)} className="grid h-9 w-9 place-items-center rounded-full bg-neutral-100">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => deleteCategory(category.id)} className="grid h-9 w-9 place-items-center rounded-full bg-red-50 text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <section id="horaires" className="rounded-[24px] bg-white p-4 shadow-sm sm:p-5">
              <SectionTitle icon={<CalendarDays size={20} />} title="Horaires d'ouverture" subtitle="Modifier les horaires visibles dans Info." />
              <div className="mt-4 grid gap-3">
                {adminRestaurant.openingHours.map(([day, hours], index) => {
                  const [open, close] = hours.split(" - ");
                  return (
                    <div key={day} className="grid gap-2 rounded-2xl border border-neutral-200 p-3 sm:grid-cols-[1fr_120px_120px] sm:items-center">
                      <strong>{day}</strong>
                      <input className="h-11 rounded-xl border border-neutral-200 px-3 font-semibold outline-none" value={open} onChange={(event) => updateHours(index, "open", event.target.value)} />
                      <input className="h-11 rounded-xl border border-neutral-200 px-3 font-semibold outline-none" value={close} onChange={(event) => updateHours(index, "close", event.target.value)} />
                    </div>
                  );
                })}
              </div>
            </section>

            <section id="parametres" className="rounded-[24px] bg-white p-4 shadow-sm sm:p-5">
              <SectionTitle icon={<Settings2 size={20} />} title="Informations restaurant" subtitle="Identité, coordonnées, couleurs et langues." />
              <div className="mt-4 grid gap-3">
                <TextInput label="Nom du restaurant" value={adminRestaurant.name} onChange={(value) => setAdminRestaurant({ ...adminRestaurant, name: value })} />
                <TextInput label="Adresse" value={adminRestaurant.address} onChange={(value) => setAdminRestaurant({ ...adminRestaurant, address: value })} />
                <TextInput label="Téléphone" value={adminRestaurant.phone} onChange={(value) => setAdminRestaurant({ ...adminRestaurant, phone: value })} />
                <TextInput label="Email" value={adminRestaurant.email} onChange={(value) => setAdminRestaurant({ ...adminRestaurant, email: value })} />
                <div className="grid gap-3 sm:grid-cols-3">
                  <AdminOption icon={<Palette size={18} />} title="Couleurs" detail="Noir, gris, doré" />
                  <AdminOption icon={<Languages size={18} />} title="Langues" detail="FR, EN, AR" />
                  <AdminOption icon={<ToggleLeft size={18} />} title="Commandes" detail="Désactivées" />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <section className="rounded-[24px] bg-white p-4 shadow-sm sm:p-5">
              <SectionTitle icon={<BarChart3 size={20} />} title="Statistiques de consultation" subtitle="Suivre les scans et les plats les plus consultés." />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ListBlock title="Plats les plus consultés" items={analytics.topProducts} />
                <ListBlock title="Catégories les plus consultées" items={analytics.topCategories} />
              </div>
            </section>

            <section id="qr-codes" className="rounded-[24px] bg-white p-4 shadow-sm sm:p-5">
              <SectionTitle icon={<QrCode size={20} />} title="QR codes et base de données" subtitle="Tables prévues pour la version connectée." />
              <div className="mt-4 flex flex-wrap gap-2">
                {databaseTables.map((table) => (
                  <span key={table} className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs font-black text-neutral-600">
                    {table}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
  dark = false,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  dark?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className={dark ? "text-[#b89b6a]" : "text-[#967a4f]"}>{icon}</span>
          <h3 className="text-xl font-black">{title}</h3>
        </div>
        <p className={dark ? "text-sm text-white/55" : "text-sm text-neutral-500"}>{subtitle}</p>
      </div>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  dark = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  dark?: boolean;
}) {
  return (
    <label className={dark ? "grid gap-2 text-sm font-black text-white/65" : "grid gap-2 text-sm font-black text-neutral-600"}>
      {label}
      <input
        className={dark ? "h-12 rounded-xl border border-white/10 bg-white/10 px-3 font-semibold text-white outline-none" : "h-12 rounded-xl border border-neutral-200 bg-white px-3 font-semibold text-neutral-900 outline-none"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function AdminOption({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <div className="mb-2 text-[#967a4f]">{icon}</div>
      <p className="font-black">{title}</p>
      <p className="mt-1 text-xs font-semibold text-neutral-500">{detail}</p>
    </div>
  );
}

function Metric({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="rounded-[24px] bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-neutral-500">{title}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
      <p className="mt-2 text-sm font-semibold text-[#967a4f]">{detail}</p>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-neutral-200 p-4">
      <p className="mb-3 font-black">{title}</p>
      <ol className="grid gap-2">
        {items.map((item, index) => (
          <li key={item} className="flex items-center justify-between text-sm">
            <span>{item}</span>
            <strong className="text-[#967a4f]">#{index + 1}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
