"use client";

import clsx from "clsx";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  ChevronDown,
  ChefHat,
  Clock3,
  Globe2,
  Home,
  MapPin,
  MessagesSquare,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { categories, products, restaurant, type Category, type Locale, type Product } from "./data";

type View = "home" | "categories" | "products";

const copy = {
  fr: {
    menu: "MENU",
    info: "Info",
    back: "Retour",
    search: "Rechercher",
    intro: "Pour commencer la saison ☀️ en beaute Nos chefs nous ont concocte des mets raffines.",
    close: "Fermer",
    options: "Options disponibles",
    allergens: "Allergenes",
    nutrition: "Nutrition",
  },
  en: {
    menu: "MENU",
    info: "Info",
    back: "Back",
    search: "Search",
    intro: "To start the season ☀️ beautifully, our chefs prepared refined dishes.",
    close: "Close",
    options: "Available options",
    allergens: "Allergens",
    nutrition: "Nutrition",
  },
  ar: {
    menu: "القائمة",
    info: "معلومات",
    back: "رجوع",
    search: "بحث",
    intro: "لبداية الموسم ☀️ بأجمل شكل، حضر طهاتنا أطباقا راقية.",
    close: "إغلاق",
    options: "الاختيارات",
    allergens: "مسببات الحساسية",
    nutrition: "القيمة الغذائية",
  },
};

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [view, setView] = useState<View>("home");
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const t = copy[locale];
  const activeCategoryData = categories.find((category) => category.id === activeCategory) ?? categories[0];

  const categoryProducts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const category = categories.find((item) => item.id === product.categoryId);
      const matchesCategory = product.categoryId === activeCategory;
      const searchText = [
        product.name[locale],
        product.description[locale],
        product.fullDescription[locale],
        product.badges.join(" "),
        category?.name[locale],
      ]
        .join(" ")
        .toLowerCase();
      return product.active && matchesCategory && (!cleanQuery || searchText.includes(cleanQuery));
    });
  }, [activeCategory, locale, query]);

  function openCategory(category: Category) {
    setActiveCategory(category.id);
    setQuery("");
    setView("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-[#3f3b3b] text-white">
      <div className="mx-auto min-h-screen w-full max-w-[760px] bg-[#3f3b3b] shadow-2xl shadow-black/40">
        {view === "home" && (
          <LandingScreen
            locale={locale}
            setLocale={setLocale}
            onInfo={() => setInfoOpen(true)}
            onMenu={() => setView("categories")}
          />
        )}

        {view === "categories" && (
          <CategoryScreen
            locale={locale}
            onBack={() => setView("home")}
            onInfo={() => setInfoOpen(true)}
            onOpenCategory={openCategory}
          />
        )}

        {view === "products" && (
          <ProductsScreen
            category={activeCategoryData}
            products={categoryProducts}
            locale={locale}
            query={query}
            setQuery={setQuery}
            labels={t}
            onBack={() => setView("categories")}
            onInfo={() => setInfoOpen(true)}
            onSelect={setSelected}
          />
        )}
      </div>

      {selected && <ProductModal product={selected} locale={locale} labels={t} onClose={() => setSelected(null)} />}
      {infoOpen && <InfoPanel onClose={() => setInfoOpen(false)} />}
    </main>
  );
}

function LandingScreen({
  locale,
  setLocale,
  onInfo,
  onMenu,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  onInfo: () => void;
  onMenu: () => void;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={restaurant.cover}
      >
        <source src={restaurant.heroVideo} type="video/mp4" />
      </video>
      <Image src={restaurant.cover} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 bg-[#0b4960]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/82" />

      <div className="relative z-10 flex min-h-screen flex-col px-5 py-5">
        <header className="flex items-center justify-between gap-4">
          <label className="flex h-[74px] min-w-[210px] items-center justify-between rounded-[22px] bg-black px-7 text-2xl font-black shadow-xl">
            <select
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
              className="w-full appearance-none bg-transparent outline-none"
              aria-label="Language"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
            <ChevronDown className="pointer-events-none shrink-0" size={30} />
          </label>
          <button onClick={onInfo} className="flex h-[68px] items-center gap-3 rounded-[22px] bg-black px-6 text-2xl font-black">
            <Home size={34} fill="currentColor" />
            Info
          </button>
        </header>

        <div className="grid flex-1 place-items-center pb-20 pt-16">
          <div className="text-center">
            <p className="mb-10 text-right text-4xl font-black uppercase tracking-[0.12em] text-white/55">Restaurant</p>
            <h1 className="max-w-[680px] text-[clamp(4.4rem,18vw,9rem)] font-black uppercase leading-[0.86] tracking-[0.03em]">
              La Liste
            </h1>
          </div>
        </div>

        <button
          onClick={onMenu}
          className="mx-auto mb-28 flex h-[86px] w-full max-w-[620px] items-center justify-between rounded-[14px] bg-black px-7 text-4xl font-light tracking-wide shadow-2xl"
        >
          {copy[locale].menu}
          <ArrowRight size={42} />
        </button>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900/85 px-5 py-2 text-lg font-semibold text-white/70">
          Powered by <span className="underline">Tweadup</span>
        </p>
      </div>
    </section>
  );
}

function CategoryScreen({
  locale,
  onBack,
  onInfo,
  onOpenCategory,
}: {
  locale: Locale;
  onBack: () => void;
  onInfo: () => void;
  onOpenCategory: (category: Category) => void;
}) {
  return (
    <section className="min-h-screen bg-[#403c3c]">
      <TopBar onBack={onBack} onInfo={onInfo} />
      <div className="grid gap-8 px-5 py-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onOpenCategory(category)}
            className={clsx(
              "relative h-[170px] overflow-hidden text-white shadow-xl",
              category.featured && "h-[170px]",
            )}
          >
            <Image src={category.image} alt="" fill sizes="760px" className="object-cover" />
            <div className="absolute inset-0 bg-black/58" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="border-2 border-white px-6 py-3 text-[clamp(1.7rem,6vw,2.6rem)] font-black uppercase leading-none tracking-wide">
                {category.name[locale]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function ProductsScreen({
  category,
  products,
  locale,
  query,
  setQuery,
  labels,
  onBack,
  onInfo,
  onSelect,
}: {
  category: Category;
  products: Product[];
  locale: Locale;
  query: string;
  setQuery: (query: string) => void;
  labels: typeof copy.fr;
  onBack: () => void;
  onInfo: () => void;
  onSelect: (product: Product) => void;
}) {
  return (
    <section className="min-h-screen bg-[#403c3c] pb-8">
      <div className="sticky top-0 z-20 bg-[#2b2727]/96 backdrop-blur">
        <TopBar onBack={onBack} onInfo={onInfo} compact />
        <div className="px-5 pb-4">
          <label className="flex h-12 flex-1 items-center gap-3 rounded-full bg-white/10 px-4 text-white/80">
            <Search size={19} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.search}
              className="w-full bg-transparent text-base outline-none placeholder:text-white/45"
            />
          </label>
        </div>
      </div>

      <header className="px-5 pb-8 pt-5 text-center">
        <h1 className="text-[clamp(1.9rem,7vw,4rem)] font-black uppercase leading-tight tracking-wide [overflow-wrap:anywhere]">
          {category.name[locale]}
        </h1>
        <p className="mx-auto mt-20 max-w-[680px] px-6 text-center text-[clamp(1.45rem,5vw,2.1rem)] italic leading-snug text-white/92">
          {labels.intro}
        </p>
      </header>

      <div className="grid gap-7 px-1.5">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelect(product)}
            className="grid min-h-[232px] grid-cols-[132px_1fr] bg-[#282424] text-left shadow-lg sm:grid-cols-[190px_1fr]"
          >
            <div className="relative h-full min-h-[232px] overflow-hidden">
              <Image src={product.image} alt="" fill sizes="190px" className="animate-product-image object-cover" />
            </div>
            <div className="flex min-w-0 flex-col p-6">
              <h2 className="text-[clamp(1.65rem,5vw,2.7rem)] font-black uppercase leading-tight tracking-wide">
                {product.name[locale]}
              </h2>
              <p className="mt-8 line-clamp-3 text-[clamp(1.1rem,3.7vw,1.9rem)] font-medium leading-snug text-white/95">
                {product.description[locale]}
              </p>
              <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                <strong className="text-[clamp(1.35rem,4.2vw,2rem)] font-black">MAD {product.price}.00</strong>
                <ArrowRight size={44} strokeWidth={2.5} />
              </div>
            </div>
          </button>
        ))}
        {products.length === 0 && (
          <p className="rounded-2xl bg-[#282424] p-8 text-center text-xl font-semibold text-white/70">
            Aucun plat trouve.
          </p>
        )}
      </div>
    </section>
  );
}

function TopBar({
  onBack,
  onInfo,
  compact = false,
}: {
  onBack: () => void;
  onInfo: () => void;
  compact?: boolean;
}) {
  return (
    <header className={clsx("flex items-center justify-between bg-[#2b2727] px-5", compact ? "h-[84px]" : "h-[132px]")}>
      <button
        onClick={onBack}
        className={clsx("grid place-items-center rounded-full bg-white/10", compact ? "h-12 w-12" : "h-20 w-20")}
        aria-label="Retour"
      >
        <ArrowLeft size={compact ? 30 : 42} />
      </button>
      <button
        onClick={onInfo}
        className="flex h-[64px] items-center gap-3 rounded-[12px] border-2 border-[#9c8b69] px-5 text-2xl font-bold"
      >
        <Home size={32} fill="currentColor" />
        Info
      </button>
    </header>
  );
}

function ProductModal({
  product,
  locale,
  labels,
  onClose,
}: {
  product: Product;
  locale: Locale;
  labels: typeof copy.fr;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/65 sm:place-items-center sm:p-6">
      <section className="max-h-[92vh] w-full max-w-[760px] overflow-auto rounded-t-[28px] bg-[#282424] text-white shadow-2xl sm:rounded-[28px]">
        <div className="relative h-72">
          <Image src={product.image} alt="" fill sizes="760px" className="animate-product-image object-cover" />
          <button onClick={onClose} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-black/85">
            <X size={24} />
          </button>
        </div>
        <div className="space-y-6 p-6">
          <div>
            <h2 className="text-4xl font-black uppercase">{product.name[locale]}</h2>
            <p className="mt-4 text-xl leading-relaxed text-white/78">{product.fullDescription[locale]}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InfoBlock title={labels.allergens} value={product.allergens.length ? product.allergens.join(", ") : "Aucun"} />
            <InfoBlock title={labels.nutrition} value={product.nutrition} />
          </div>
          <div>
            <h3 className="mb-3 text-xl font-black">{labels.options}</h3>
            <div className="grid gap-2">
              {product.options.map((option) => (
                <div key={option} className="border border-white/12 bg-white/5 px-4 py-4 text-lg font-semibold">
                  {option}
                </div>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="flex w-full items-center justify-between rounded-xl bg-black px-5 py-5 text-xl font-black">
            <span>{labels.close}</span>
            <span>MAD {product.price}.00</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white/8 p-4">
      <p className="text-xs font-black uppercase tracking-widest text-[#bba274]">{title}</p>
      <p className="mt-2 text-sm font-semibold text-white/88">{value}</p>
    </div>
  );
}

function InfoPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/60 sm:place-items-center sm:p-6">
      <section className="max-h-[92vh] w-full max-w-[620px] overflow-auto rounded-t-[28px] bg-[#282424] p-6 text-white shadow-2xl sm:rounded-[28px]">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#bba274]">Restaurant</p>
            <h2 className="text-4xl font-black">Restaurant La Liste</h2>
          </div>
          <button onClick={onClose} className="grid h-12 w-12 place-items-center rounded-full bg-white/10">
            <X size={22} />
          </button>
        </header>

        <div className="grid gap-6">
          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-[#bba274]">Adresse</p>
            <a href={restaurant.mapUrl} target="_blank" className="flex items-center gap-3 text-lg font-semibold text-white/78">
              <MapPin className="text-[#bba274]" /> {restaurant.address}
            </a>
          </div>

          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-[#bba274]">Téléphone</p>
            <p className="flex items-center gap-3 text-lg font-semibold text-white/78">
              <MessagesSquare className="text-[#bba274]" /> {restaurant.phone}
            </p>
          </div>

          <div>
            <p className="mb-2 text-sm font-black uppercase tracking-[0.18em] text-[#bba274]">Contact</p>
            <p className="flex items-center gap-3 text-lg font-semibold text-white/78">
              <Globe2 className="text-[#bba274]" /> {restaurant.email}
            </p>
          </div>

          <div className="grid gap-2">
            <p className="mb-1 flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-[#bba274]">
              <Clock3 size={18} /> Horaires d&apos;ouverture
            </p>
            {restaurant.openingHours.map(([day, hours]) => (
              <div key={day} className="flex justify-between border-b border-white/10 py-2 text-base">
                <span className="text-white/55">{day}</span>
                <strong>{hours}</strong>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <a href={restaurant.instagram} className="grid h-12 w-12 place-items-center rounded-full bg-white/10" target="_blank"><Camera size={20} /></a>
            <a href={restaurant.facebook} className="grid h-12 w-12 place-items-center rounded-full bg-white/10" target="_blank"><MessagesSquare size={20} /></a>
            <a href="/admin" className="flex h-12 items-center gap-2 rounded-full bg-[#bba274] px-5 text-sm font-black text-black"><ChefHat size={17} /> Admin</a>
          </div>
        </div>
      </section>
    </div>
  );
}
