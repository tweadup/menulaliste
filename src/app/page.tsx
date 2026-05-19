"use client";

import {
  ArrowRight,
  Camera,
  ChefHat,
  Clock3,
  Globe2,
  Info,
  MapPin,
  MessagesSquare,
  Minus,
  Moon,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { categories, products, restaurant, type Locale, type Product } from "./data";

type CartItem = {
  product: Product;
  quantity: number;
  note: string;
};

const filters = ["Vegetarien", "Vegan", "Sans gluten", "Spicy", "Populaire", "Promotion"];

const copy = {
  fr: {
    search: "Rechercher un plat, ingredient ou categorie",
    info: "Info",
    open: "Ouvert aujourd'hui",
    details: "Voir details",
    add: "Ajouter a la commande",
    cart: "Commande",
    confirm: "Confirmer la commande",
    table: "Table",
    note: "Note speciale",
    empty: "Votre panier est vide",
    options: "Options disponibles",
    allergens: "Allergenes",
    nutrition: "Nutrition",
    powered: "Powered by West 91 digital menu",
  },
  en: {
    search: "Search dish, ingredient or category",
    info: "Info",
    open: "Open today",
    details: "View details",
    add: "Add to order",
    cart: "Order",
    confirm: "Confirm order",
    table: "Table",
    note: "Special note",
    empty: "Your cart is empty",
    options: "Available options",
    allergens: "Allergens",
    nutrition: "Nutrition",
    powered: "Powered by West 91 digital menu",
  },
  ar: {
    search: "ابحث عن طبق أو مكون أو تصنيف",
    info: "معلومات",
    open: "مفتوح اليوم",
    details: "التفاصيل",
    add: "أضف للطلب",
    cart: "الطلب",
    confirm: "تأكيد الطلب",
    table: "طاولة",
    note: "ملاحظة خاصة",
    empty: "السلة فارغة",
    options: "الاختيارات",
    allergens: "مسببات الحساسية",
    nutrition: "القيمة الغذائية",
    powered: "مدعوم من West 91 digital menu",
  },
};

export default function Home() {
  const [locale, setLocale] = useState<Locale>("fr");
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const tableNumber =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("table") ?? "12" : "12";
  const t = copy[locale];

  const visibleProducts = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const category = categories.find((item) => item.id === product.categoryId);
      const searchText = [
        product.name[locale],
        product.description[locale],
        product.badges.join(" "),
        category?.name[locale],
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !cleanQuery || searchText.includes(cleanQuery);
      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.every((filter) => product.badges.includes(filter) || (filter === "Promotion" && product.promoted));
      return product.active && matchesQuery && matchesFilters;
    });
  }, [activeFilters, locale, query]);

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function scrollToCategory(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleFilter(filter: string) {
    setActiveFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter],
    );
  }

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { product, quantity: 1, note: "" }];
    });
    setCartOpen(true);
  }

  function updateQuantity(productId: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function updateNote(productId: string, note: string) {
    setCart((current) => current.map((item) => (item.product.id === productId ? { ...item, note } : item)));
  }

  return (
    <main
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={clsx(
        "min-h-screen font-sans transition-colors",
        dark ? "bg-neutral-950 text-white" : "bg-[#f5f2ec] text-neutral-950",
      )}
    >
      <section className="mx-auto min-h-screen w-full max-w-6xl bg-white shadow-2xl shadow-black/10 lg:my-6 lg:min-h-[calc(100vh-3rem)] lg:overflow-hidden lg:rounded-[28px]">
        <Hero locale={locale} setLocale={setLocale} dark={dark} setDark={setDark} />

        <div className={clsx("sticky top-0 z-30 border-y backdrop-blur-xl", dark ? "border-white/10 bg-neutral-950/88" : "border-black/10 bg-white/92")}>
          <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3">
            <button
              onClick={() => document.getElementById("restaurant-info")?.scrollIntoView({ behavior: "smooth" })}
              className="flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold"
            >
              <Info size={16} />
              {t.info}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className="shrink-0 rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#b89b6a]"
              >
                {category.name[locale]}
              </button>
            ))}
          </div>
        </div>

        <div className={clsx("mx-auto max-w-5xl px-4 py-5", dark ? "bg-neutral-950" : "bg-white")}>
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <label className={clsx("flex items-center gap-3 rounded-2xl border px-4 py-3", dark ? "border-white/15 bg-white/5" : "border-neutral-200 bg-neutral-50")}>
              <Search size={18} className="text-neutral-500" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.search}
                className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
              />
            </label>
            <button
              onClick={() => setCartOpen(true)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#b89b6a] px-5 py-3 text-sm font-bold text-white"
            >
              <ShoppingBag size={18} />
              {t.cart} · {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </button>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={clsx(
                  "shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition",
                  activeFilters.includes(filter)
                    ? "border-[#b89b6a] bg-[#b89b6a] text-white"
                    : dark
                      ? "border-white/15 bg-white/5 text-white"
                      : "border-neutral-200 bg-white text-neutral-700",
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className={clsx("mx-auto grid max-w-5xl gap-8 px-4 pb-28", dark ? "bg-neutral-950" : "bg-white")}>
          {categories.map((category) => {
            const categoryProducts = visibleProducts.filter((product) => product.categoryId === category.id);
            if (categoryProducts.length === 0) return null;

            return (
              <section id={category.id} key={category.id} className="scroll-mt-28">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b89b6a]">{category.description}</p>
                    <h2 className="mt-1 text-2xl font-black">{category.name[locale]}</h2>
                  </div>
                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-bold text-neutral-500">
                    {categoryProducts.length}
                  </span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      locale={locale}
                      onSelect={setSelected}
                      onAdd={addToCart}
                      detailsLabel={t.details}
                      addLabel={t.add}
                      dark={dark}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <RestaurantInfo dark={dark} />
      </section>

      {selected && (
        <ProductModal
          product={selected}
          locale={locale}
          labels={t}
          onClose={() => setSelected(null)}
          onAdd={(product) => {
            addToCart(product);
            setSelected(null);
          }}
        />
      )}
      {cartOpen && (
        <CartDrawer
          cart={cart}
          tableNumber={tableNumber}
          total={total}
          labels={t}
          onClose={() => setCartOpen(false)}
          onQuantity={updateQuantity}
          onNote={updateNote}
        />
      )}
    </main>
  );
}

function Hero({
  locale,
  setLocale,
  dark,
  setDark,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dark: boolean;
  setDark: (value: boolean) => void;
}) {
  return (
    <header className="relative min-h-[480px] overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${restaurant.cover})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/80" />
      <div className="relative z-10 flex min-h-[480px] flex-col justify-between px-5 py-5 sm:px-8">
        <nav className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/15 text-sm font-black backdrop-blur">
              {restaurant.logoMark}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-white/70">{restaurant.tagline}</p>
              <p className="font-bold">{restaurant.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              aria-label="Language"
              value={locale}
              onChange={(event) => setLocale(event.target.value as Locale)}
              className="h-10 rounded-full border border-white/30 bg-black/30 px-3 text-sm font-semibold text-white outline-none backdrop-blur"
            >
              <option value="fr">FR</option>
              <option value="en">EN</option>
              <option value="ar">AR</option>
            </select>
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDark(!dark)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-black/30 backdrop-blur"
            >
              <Moon size={18} />
            </button>
          </div>
        </nav>
        <div className="max-w-xl pb-3">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-2 text-xs font-bold backdrop-blur">
            <Clock3 size={15} />
            08:00 - 23:00 · ouvert 7j/7
          </div>
          <h1 className="text-5xl font-black leading-none sm:text-7xl">{restaurant.name}</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-white/82">
            Menu digital premium avec plats signatures, photos, details allergenes et commande a table.
          </p>
        </div>
      </div>
    </header>
  );
}

function ProductCard({
  product,
  locale,
  onSelect,
  onAdd,
  detailsLabel,
  addLabel,
  dark,
}: {
  product: Product;
  locale: Locale;
  onSelect: (product: Product) => void;
  onAdd: (product: Product) => void;
  detailsLabel: string;
  addLabel: string;
  dark: boolean;
}) {
  return (
    <article className={clsx("grid grid-cols-[116px_1fr] overflow-hidden rounded-2xl border", dark ? "border-white/10 bg-white/5" : "border-neutral-200 bg-white shadow-sm")}>
      <button onClick={() => onSelect(product)} className="relative min-h-[156px] overflow-hidden">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="116px"
          className="object-cover transition duration-500 hover:scale-105"
        />
      </button>
      <div className="flex min-w-0 flex-col p-3">
        <div className="flex flex-wrap gap-1">
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge} className="rounded-full bg-[#f0e7d7] px-2 py-1 text-[10px] font-black uppercase text-[#8b6b38]">
              {badge}
            </span>
          ))}
        </div>
        <h3 className="mt-2 text-base font-black leading-tight">{product.name[locale]}</h3>
        <p className="mt-1 line-clamp-2 text-sm leading-5 text-neutral-500">{product.description[locale]}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <strong className="text-base">{product.price} MAD</strong>
          <div className="flex gap-2">
            <button onClick={() => onSelect(product)} className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200" title={detailsLabel}>
              <ArrowRight size={16} />
            </button>
            <button onClick={() => onAdd(product)} className="grid h-9 w-9 place-items-center rounded-full bg-neutral-950 text-white" title={addLabel}>
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductModal({
  product,
  locale,
  labels,
  onClose,
  onAdd,
}: {
  product: Product;
  locale: Locale;
  labels: typeof copy.fr;
  onClose: () => void;
  onAdd: (product: Product) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/55 p-0 sm:place-items-center sm:p-6">
      <section className="max-h-[92vh] w-full overflow-auto rounded-t-[28px] bg-white text-neutral-950 shadow-2xl sm:max-w-xl sm:rounded-[28px]">
        <div className="relative h-72">
          <Image src={product.image} alt="" fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
          <button onClick={onClose} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90">
            <X size={18} />
          </button>
        </div>
        <div className="space-y-5 p-5">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span key={badge} className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-black uppercase text-neutral-600">
                  {badge}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-black">{product.name[locale]}</h2>
            <p className="mt-2 leading-7 text-neutral-600">{product.fullDescription[locale]}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <InfoBlock title={labels.allergens} value={product.allergens.length ? product.allergens.join(", ") : "Aucun"} />
            <InfoBlock title={labels.nutrition} value={product.nutrition} />
          </div>
          <div>
            <h3 className="mb-2 font-black">{labels.options}</h3>
            <div className="grid gap-2">
              {product.options.map((option) => (
                <label key={option} className="flex items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-semibold">
                  {option}
                  <input type="checkbox" className="h-4 w-4 accent-[#b89b6a]" />
                </label>
              ))}
            </div>
          </div>
          <button onClick={() => onAdd(product)} className="flex w-full items-center justify-between rounded-2xl bg-neutral-950 px-5 py-4 font-black text-white">
            <span>{labels.add}</span>
            <span>{product.price} MAD</span>
          </button>
        </div>
      </section>
    </div>
  );
}

function InfoBlock({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-neutral-100 p-4">
      <p className="text-xs font-black uppercase text-neutral-500">{title}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function CartDrawer({
  cart,
  tableNumber,
  total,
  labels,
  onClose,
  onQuantity,
  onNote,
}: {
  cart: CartItem[];
  tableNumber: string;
  total: number;
  labels: typeof copy.fr;
  onClose: () => void;
  onQuantity: (productId: string, delta: number) => void;
  onNote: (productId: string, note: string) => void;
}) {
  return (
    <aside className="fixed inset-0 z-50 flex justify-end bg-black/45">
      <section className="flex h-full w-full max-w-md flex-col bg-white text-neutral-950 shadow-2xl">
        <header className="flex items-center justify-between border-b border-neutral-200 p-5">
          <div>
            <p className="text-xs font-black uppercase text-[#b89b6a]">{labels.table} {tableNumber}</p>
            <h2 className="text-2xl font-black">{labels.cart}</h2>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100">
            <X size={18} />
          </button>
        </header>
        <div className="flex-1 space-y-3 overflow-auto p-5">
          {cart.length === 0 && <p className="rounded-2xl bg-neutral-100 p-5 text-center font-semibold text-neutral-500">{labels.empty}</p>}
          {cart.map((item) => (
            <div key={item.product.id} className="rounded-2xl border border-neutral-200 p-4">
              <div className="flex gap-3">
                <Image
                  src={item.product.image}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-black">{item.product.name.fr}</h3>
                  <p className="text-sm text-neutral-500">{item.product.price} MAD</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onQuantity(item.product.id, -1)} className="grid h-8 w-8 place-items-center rounded-full bg-neutral-100">
                    <Minus size={14} />
                  </button>
                  <span className="w-5 text-center font-black">{item.quantity}</span>
                  <button onClick={() => onQuantity(item.product.id, 1)} className="grid h-8 w-8 place-items-center rounded-full bg-neutral-950 text-white">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <input
                value={item.note}
                onChange={(event) => onNote(item.product.id, event.target.value)}
                placeholder={labels.note}
                className="mt-3 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-[#b89b6a]"
              />
            </div>
          ))}
        </div>
        <footer className="border-t border-neutral-200 p-5">
          <div className="mb-4 flex items-center justify-between text-lg font-black">
            <span>Total</span>
            <span>{total} MAD</span>
          </div>
          <button className="w-full rounded-2xl bg-[#b89b6a] px-5 py-4 font-black text-white disabled:opacity-40" disabled={cart.length === 0}>
            {labels.confirm}
          </button>
        </footer>
      </section>
    </aside>
  );
}

function RestaurantInfo({ dark }: { dark: boolean }) {
  return (
    <footer id="restaurant-info" className={clsx("border-t px-4 py-8", dark ? "border-white/10 bg-neutral-950 text-white" : "border-neutral-200 bg-[#f5f2ec] text-neutral-950")}>
      <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl bg-white p-5 text-neutral-950 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-950 font-black text-white">{restaurant.logoMark}</div>
            <div>
              <h2 className="text-2xl font-black">{restaurant.name}</h2>
              <p className="text-sm text-neutral-500">{restaurant.tagline}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 text-sm font-semibold text-neutral-700">
            <a href={restaurant.mapUrl} className="flex items-center gap-2" target="_blank">
              <MapPin size={17} /> {restaurant.address}
            </a>
            <p className="flex items-center gap-2"><Globe2 size={17} /> {restaurant.email}</p>
            <div className="flex gap-2 pt-2">
              <a href={restaurant.instagram} className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100" target="_blank"><Camera size={18} /></a>
              <a href={restaurant.facebook} className="grid h-10 w-10 place-items-center rounded-full bg-neutral-100" target="_blank"><MessagesSquare size={18} /></a>
              <a href="/admin" className="flex h-10 items-center gap-2 rounded-full bg-neutral-950 px-4 text-sm font-bold text-white"><ChefHat size={16} /> Admin</a>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-neutral-950 p-5 text-white">
          <div className="mb-4 flex items-center gap-2">
            <Clock3 size={18} className="text-[#b89b6a]" />
            <h3 className="font-black">Horaires d&apos;ouverture</h3>
          </div>
          <div className="grid gap-2">
            {restaurant.openingHours.map(([day, hours]) => (
              <div key={day} className="flex items-center justify-between border-b border-white/10 pb-2 text-sm">
                <span className="text-white/70">{day}</span>
                <strong>{hours}</strong>
              </div>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-white/55">
            <Sparkles size={14} /> Powered by West 91 digital menu
          </p>
        </div>
      </div>
    </footer>
  );
}
