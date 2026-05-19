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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { analytics, categories, databaseTables, products, restaurant } from "../data";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f4f1eb] text-neutral-950">
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-black/10 bg-neutral-950 p-5 text-white lg:border-b-0 lg:border-r lg:border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#b89b6a] font-black">LL</div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">Admin</p>
              <h1 className="text-xl font-black">{restaurant.name}</h1>
            </div>
          </div>

          <nav className="mt-8 grid gap-2 text-sm font-bold">
            {[
              ["Dashboard", BarChart3],
              ["Produits", Store],
              ["Categories", ImagePlus],
              ["Accueil video", Video],
              ["QR codes", QrCode],
              ["Horaires", CalendarDays],
              ["Parametres", Settings2],
            ].map(([label, Icon]) => (
              <a key={label as string} href={`#${String(label).toLowerCase().replaceAll(" ", "-")}`} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white/72 transition hover:bg-white/10 hover:text-white">
                <Icon size={18} />
                {label as string}
              </a>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-black">
              <LockKeyhole size={17} className="text-[#b89b6a]" />
              Admin sécurisé
            </div>
            <p className="text-sm leading-6 text-white/58">
              Pret pour Supabase Auth, roles restaurateur, stockage images/videos et permissions par restaurant.
            </p>
          </div>
        </aside>

        <section className="p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#967a4f]">Plateforme menu QR</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Gestion Restaurant La Liste</h2>
              <p className="mt-2 max-w-2xl text-sm font-semibold text-neutral-500">
                Mode consultation uniquement : les clients consultent le menu, sans panier ni commande à table.
              </p>
            </div>
            <div className="flex gap-2">
              <Link href="/" className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black shadow-sm">
                <Eye size={17} />
                Voir le menu
              </Link>
              <button className="flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-3 text-sm font-black text-white">
                <Save size={17} />
                Enregistrer
              </button>
            </div>
          </header>

          <div id="dashboard" className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric title="Scans QR code" value={analytics.scans.toLocaleString("fr-FR")} detail="+18% cette semaine" />
            <Metric title="Plats actifs" value={products.filter((item) => item.active).length.toString()} detail={`${categories.length} categories`} />
            <Metric title="Mode client" value="Menu" detail="Commande désactivée" />
            <Metric title="Video accueil" value="Active" detail="Lecture automatique muette" />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
            <section id="produits" className="rounded-[24px] bg-white p-5 shadow-sm">
              <SectionTitle icon={<Store size={20} />} title="Gestion des produits" subtitle="Ajouter, modifier, supprimer, activer et organiser les plats." />
              <div className="mt-5 grid gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 md:grid-cols-2">
                <Field label="Nom du plat" defaultValue="Nouveau plat" />
                <label className="grid gap-2 text-sm font-black text-neutral-600">
                  Catégorie
                  <select className="h-12 rounded-xl border border-neutral-200 bg-white px-3 font-semibold text-neutral-900 outline-none">
                    {categories.map((category) => (
                      <option key={category.id}>{category.name.fr}</option>
                    ))}
                  </select>
                </label>
                <Field label="Prix MAD" defaultValue="95" />
                <Field label="Image ou video URL" defaultValue="https://..." />
                <label className="grid gap-2 text-sm font-black text-neutral-600 md:col-span-2">
                  Description
                  <textarea className="min-h-24 rounded-xl border border-neutral-200 bg-white px-3 py-3 font-semibold text-neutral-900 outline-none" defaultValue="Description courte visible sur la carte du produit." />
                </label>
                <div className="flex flex-wrap gap-2 md:col-span-2">
                  {["Populaire", "Nouveau", "Spicy", "Vegan", "Sans gluten", "Promotion"].map((badge) => (
                    <label key={badge} className="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-black">
                      <input type="checkbox" className="accent-[#b89b6a]" />
                      {badge}
                    </label>
                  ))}
                </div>
                <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-950 px-4 text-sm font-black text-white md:col-span-2">
                  <Plus size={17} />
                  Ajouter le produit
                </button>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-neutral-200">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-neutral-100 text-xs uppercase text-neutral-500">
                    <tr>
                      <th className="px-4 py-3">Plat</th>
                      <th className="px-4 py-3">Catégorie</th>
                      <th className="px-4 py-3">Prix</th>
                      <th className="px-4 py-3">Visibilité</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t border-neutral-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Image src={product.image} alt="" width={52} height={52} className="h-13 w-13 rounded-xl object-cover" />
                            <div>
                              <p className="font-black">{product.name.fr}</p>
                              <p className="line-clamp-1 max-w-xs text-xs text-neutral-500">{product.description.fr}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-neutral-600">
                          {categories.find((category) => category.id === product.categoryId)?.name.fr}
                        </td>
                        <td className="px-4 py-3 font-black">{product.price} MAD</td>
                        <td className="px-4 py-3">
                          <label className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                            <input type="checkbox" defaultChecked className="accent-emerald-600" />
                            Actif
                          </label>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button className="grid h-9 w-9 place-items-center rounded-full bg-neutral-100" title="Modifier"><Pencil size={15} /></button>
                            <button className="grid h-9 w-9 place-items-center rounded-full bg-red-50 text-red-600" title="Supprimer"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid gap-6">
              <section id="accueil-video" className="rounded-[24px] bg-neutral-950 p-5 text-white shadow-sm">
                <SectionTitle dark icon={<Video size={20} />} title="Accueil vidéo" subtitle="Changer la vidéo plein écran affichée avant le menu." />
                <div className="relative mt-5 aspect-[9/12] overflow-hidden rounded-2xl bg-black">
                  <video className="h-full w-full object-cover" src={restaurant.heroVideo} poster={restaurant.cover} autoPlay muted loop playsInline />
                  <div className="absolute inset-0 bg-black/35" />
                  <p className="absolute bottom-4 left-4 right-4 text-3xl font-black uppercase">La Liste</p>
                </div>
                <div className="mt-4 grid gap-3">
                  <Field dark label="URL vidéo MP4" defaultValue={restaurant.heroVideo} />
                  <Field dark label="Image de secours" defaultValue={restaurant.cover} />
                  <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#b89b6a] px-4 text-sm font-black text-black">
                    <Upload size={17} />
                    Remplacer la vidéo
                  </button>
                </div>
              </section>

              <section id="categories" className="rounded-[24px] bg-white p-5 shadow-sm">
                <SectionTitle icon={<ImagePlus size={20} />} title="Catégories" subtitle="Images, ordre et noms multilingues." />
                <div className="mt-4 grid gap-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-3">
                      <Image src={category.image} alt="" width={64} height={48} className="h-12 w-16 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="font-black">{category.name.fr}</p>
                        <p className="line-clamp-1 text-xs text-neutral-500">{category.description}</p>
                      </div>
                      <button className="grid h-9 w-9 place-items-center rounded-full bg-neutral-100"><Pencil size={15} /></button>
                    </div>
                  ))}
                  <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-dashed border-neutral-300 text-sm font-black">
                    <Plus size={17} />
                    Ajouter une catégorie
                  </button>
                </div>
              </section>
            </section>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <section id="horaires" className="rounded-[24px] bg-white p-5 shadow-sm">
              <SectionTitle icon={<CalendarDays size={20} />} title="Horaires d'ouverture" subtitle="Modifier les horaires visibles dans Info." />
              <div className="mt-4 grid gap-3">
                {restaurant.openingHours.map(([day, hours]) => (
                  <div key={day} className="grid gap-2 rounded-2xl border border-neutral-200 p-3 sm:grid-cols-[1fr_150px_150px] sm:items-center">
                    <strong>{day}</strong>
                    <input className="h-11 rounded-xl border border-neutral-200 px-3 font-semibold outline-none" defaultValue={hours.split(" - ")[0]} />
                    <input className="h-11 rounded-xl border border-neutral-200 px-3 font-semibold outline-none" defaultValue={hours.split(" - ")[1]} />
                  </div>
                ))}
              </div>
            </section>

            <section id="parametres" className="rounded-[24px] bg-white p-5 shadow-sm">
              <SectionTitle icon={<Settings2 size={20} />} title="Informations restaurant" subtitle="Identité, coordonnées, couleurs et langues." />
              <div className="mt-4 grid gap-3">
                <Field label="Nom du restaurant" defaultValue={restaurant.name} />
                <Field label="Adresse" defaultValue={restaurant.address} />
                <Field label="Téléphone" defaultValue={restaurant.phone} />
                <Field label="Email" defaultValue={restaurant.email} />
                <div className="grid gap-3 sm:grid-cols-3">
                  <AdminOption icon={<Palette size={18} />} title="Couleurs" detail="Noir, gris, doré" />
                  <AdminOption icon={<Languages size={18} />} title="Langues" detail="FR, EN, AR" />
                  <AdminOption icon={<ToggleLeft size={18} />} title="Commandes" detail="Désactivées" />
                </div>
              </div>
            </section>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <section className="rounded-[24px] bg-white p-5 shadow-sm">
              <SectionTitle icon={<BarChart3 size={20} />} title="Statistiques de consultation" subtitle="Suivre les scans et les plats les plus consultés." />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ListBlock title="Plats les plus consultés" items={analytics.topProducts} />
                <ListBlock title="Catégories les plus consultées" items={analytics.topCategories} />
              </div>
            </section>

            <section id="qr-codes" className="rounded-[24px] bg-white p-5 shadow-sm">
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

function Field({
  label,
  defaultValue,
  dark = false,
}: {
  label: string;
  defaultValue: string;
  dark?: boolean;
}) {
  return (
    <label className={dark ? "grid gap-2 text-sm font-black text-white/65" : "grid gap-2 text-sm font-black text-neutral-600"}>
      {label}
      <input
        className={dark ? "h-12 rounded-xl border border-white/10 bg-white/10 px-3 font-semibold text-white outline-none" : "h-12 rounded-xl border border-neutral-200 bg-white px-3 font-semibold text-neutral-900 outline-none"}
        defaultValue={defaultValue}
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
