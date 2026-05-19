import {
  BarChart3,
  CalendarDays,
  CircleDollarSign,
  Eye,
  ImagePlus,
  LockKeyhole,
  Pencil,
  Plus,
  QrCode,
  Settings2,
  Store,
  Trash2,
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
              ["Menu", Store],
              ["Commandes", CircleDollarSign],
              ["QR codes", QrCode],
              ["Horaires", CalendarDays],
              ["Parametres", Settings2],
            ].map(([label, Icon]) => (
              <a key={label as string} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white/72 transition hover:bg-white/10 hover:text-white">
                <Icon size={18} />
                {label as string}
              </a>
            ))}
          </nav>
          <div className="mt-8 rounded-3xl border border-white/10 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-black">
              <LockKeyhole size={17} className="text-[#b89b6a]" />
              Auth admin
            </div>
            <p className="text-sm leading-6 text-white/58">
              Pret pour Supabase Auth, roles restaurateur, stockage photos et permissions par restaurant.
            </p>
          </div>
        </aside>

        <section className="p-4 sm:p-6 lg:p-8">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#967a4f]">Plateforme QR menu</p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Gestion Restaurant La Liste</h2>
            </div>
            <div className="flex gap-2">
              <Link href="/" className="flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-black shadow-sm">
                <Eye size={17} />
                Voir le menu
              </Link>
              <button className="flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-3 text-sm font-black text-white">
                <Plus size={17} />
                Ajouter
              </button>
            </div>
          </header>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric title="Scans QR code" value={analytics.scans.toLocaleString("fr-FR")} detail="+18% cette semaine" />
            <Metric title="Plats actifs" value={products.filter((item) => item.active).length.toString()} detail={`${categories.length} categories`} />
            <Metric title="Nouveaux visiteurs" value={`${analytics.newVisitors}%`} detail={`${analytics.returning}% recurrents`} />
            <Metric title="Commandes table" value="126" detail="Mode commande active" />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
            <section className="rounded-[24px] bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-black">Catalogue produits</h3>
                  <p className="text-sm text-neutral-500">Ajouter, modifier, supprimer, activer, promouvoir.</p>
                </div>
                <button className="grid h-10 w-10 place-items-center rounded-full bg-neutral-950 text-white">
                  <ImagePlus size={18} />
                </button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-neutral-200">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-neutral-100 text-xs uppercase text-neutral-500">
                    <tr>
                      <th className="px-4 py-3">Plat</th>
                      <th className="px-4 py-3">Categorie</th>
                      <th className="px-4 py-3">Prix</th>
                      <th className="px-4 py-3">Statut</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 8).map((product) => (
                      <tr key={product.id} className="border-t border-neutral-200">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src={product.image}
                              alt=""
                              width={48}
                              height={48}
                              className="h-12 w-12 rounded-xl object-cover"
                            />
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
                          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                            Actif
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <button className="grid h-9 w-9 place-items-center rounded-full bg-neutral-100"><Pencil size={15} /></button>
                            <button className="grid h-9 w-9 place-items-center rounded-full bg-red-50 text-red-600"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid gap-6">
              <div className="rounded-[24px] bg-neutral-950 p-5 text-white shadow-sm">
                <h3 className="text-xl font-black">Performance</h3>
                <div className="mt-5 flex h-44 items-end gap-2">
                  {analytics.period.map((item) => (
                    <div key={item.label} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-xl bg-[#b89b6a]"
                        style={{ height: `${Math.max(18, item.value / 13)}px` }}
                      />
                      <span className="text-xs text-white/55">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] bg-white p-5 shadow-sm">
                <h3 className="text-xl font-black">Parametres restaurant</h3>
                <div className="mt-4 grid gap-3">
                  {[
                    "Changer logo, couleur et couverture",
                    "Gerer horaires d'ouverture",
                    "Activer commande a table",
                    "Detecter table via QR: ?table=12",
                    "Ajouter traductions FR / EN / AR",
                  ].map((item) => (
                    <label key={item} className="flex items-center justify-between rounded-2xl border border-neutral-200 px-4 py-3 text-sm font-bold">
                      {item}
                      <input type="checkbox" defaultChecked className="h-4 w-4 accent-[#b89b6a]" />
                    </label>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <section className="rounded-[24px] bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black">Stats de consultation</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ListBlock title="Plats les plus consultes" items={analytics.topProducts} />
                <ListBlock title="Categories les plus consultees" items={analytics.topCategories} />
              </div>
            </section>

            <section className="rounded-[24px] bg-white p-5 shadow-sm">
              <h3 className="text-xl font-black">Schema base de donnees prevu</h3>
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
