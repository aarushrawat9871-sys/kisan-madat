// Project direction and ownership: Aarush & Project Team.
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, Package, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { toast } from "sonner";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Farm Inventory — Kisan AI Sahayak" },
      {
        name: "description",
        content:
          "Track seeds, fertilizer, pesticides and tools with low-stock warnings, saved on your device.",
      },
      { property: "og:title", content: "Farm Inventory — Kisan AI Sahayak" },
      {
        property: "og:description",
        content: "Simple farm store register with search, categories and low-stock alerts.",
      },
    ],
  }),
  component: InventoryPage,
});

type Category = "Seeds" | "Fertilizer" | "Pesticides" | "Tools";

interface Item {
  id: string;
  name: string;
  category: Category;
  quantity: number;
  unit: string;
  lowAt: number;
}

const CATEGORIES: Category[] = ["Seeds", "Fertilizer", "Pesticides", "Tools"];
const STORE_KEY = "kisan-inventory";

const SEED_ITEMS: Item[] = [
  { id: "1", name: "Wheat seed HD-3086", category: "Seeds", quantity: 80, unit: "kg", lowAt: 40 },
  { id: "2", name: "Urea", category: "Fertilizer", quantity: 3, unit: "bags", lowAt: 4 },
  { id: "3", name: "DAP", category: "Fertilizer", quantity: 6, unit: "bags", lowAt: 3 },
  { id: "4", name: "Neem oil concentrate", category: "Pesticides", quantity: 2, unit: "litre", lowAt: 2 },
  { id: "5", name: "Knapsack sprayer", category: "Tools", quantity: 1, unit: "piece", lowAt: 1 },
];

const EMOJI: Record<Category, string> = {
  Seeds: "🌱",
  Fertilizer: "🧪",
  Pesticides: "🧴",
  Tools: "🛠️",
};

const field =
  "w-full rounded-2xl border border-border bg-card px-4 py-3 text-base font-medium outline-none focus:border-primary focus:ring-2 focus:ring-ring/40";

function InventoryPage() {
  const [items, setItems] = useState<Item[]>(SEED_ITEMS);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [editing, setEditing] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORE_KEY);
      if (raw) setItems(JSON.parse(raw) as Item[]);
    } catch {
      /* keep defaults */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) => (category === "all" || i.category === category) && (!q || i.name.toLowerCase().includes(q)),
    );
  }, [items, query, category]);

  const lowStock = items.filter((i) => i.quantity <= i.lowAt);

  function upsert(item: Item) {
    setItems((prev) =>
      prev.some((i) => i.id === item.id)
        ? prev.map((i) => (i.id === item.id ? item : i))
        : [...prev, item],
    );
    setOpen(false);
    setEditing(null);
    toast.success("Inventory updated");
  }

  return (
    <>
      <PageHeader
        icon={Package}
        title="Farm Inventory"
        subtitle="Stored on this device only. Nothing is uploaded anywhere."
        action={
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground"
          >
            <Plus className="h-4 w-4" /> Add item
          </button>
        }
      />

      {lowStock.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl bg-surface-rose px-4 py-3 text-sm font-semibold text-danger">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Low stock: {lowStock.map((i) => i.name).join(", ")}
        </div>
      )}

      <div className="card-base grid gap-3 p-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className={`${field} pl-11`}
            placeholder="Search item…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          className={field}
          value={category}
          onChange={(e) => setCategory(e.target.value as "all" | Category)}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => {
          const low = item.quantity <= item.lowAt;
          return (
            <article key={item.id} className="card-base space-y-3 p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-surface-emerald text-xl">
                  {EMOJI[item.category]}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-bold">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </div>
              </div>
              <p className={`text-2xl font-extrabold ${low ? "text-danger" : ""}`}>
                {item.quantity} {item.unit}
              </p>
              {low && (
                <p className="rounded-xl bg-surface-rose px-3 py-2 text-xs font-bold text-danger">
                  At or below your low-stock mark of {item.lowAt} {item.unit}
                </p>
              )}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(item);
                    setOpen(true);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary px-3 py-2 text-xs font-bold"
                >
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setItems((prev) => prev.filter((i) => i.id !== item.id));
                    toast.success("Item removed");
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-surface-rose px-3 py-2 text-xs font-bold text-danger"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="card-base p-6 text-sm text-muted-foreground">
          Nothing here yet. Add your seeds, fertilizer bags, sprays and tools to keep track.
        </p>
      )}

      {open && (
        <ItemModal
          item={editing}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSave={upsert}
        />
      )}
    </>
  );
}

function ItemModal({
  item,
  onClose,
  onSave,
}: {
  item: Item | null;
  onClose: () => void;
  onSave: (item: Item) => void;
}) {
  const [form, setForm] = useState<Item>(
    item ?? {
      id: String(Date.now()),
      name: "",
      category: "Seeds",
      quantity: 1,
      unit: "kg",
      lowAt: 1,
    },
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-nav/60 p-4">
      <form
        className="w-full max-w-md space-y-4 rounded-3xl bg-card p-5 shadow-lift"
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.name.trim()) return;
          onSave(form);
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">{item ? "Edit item" : "Add item"}</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-xl bg-muted p-2">
            <X className="h-4 w-4" />
          </button>
        </div>

        <input
          className={field}
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          className={field}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div className="grid grid-cols-3 gap-3">
          <input
            className={field}
            inputMode="decimal"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) || 0 })}
          />
          <input
            className={field}
            value={form.unit}
            onChange={(e) => setForm({ ...form, unit: e.target.value })}
          />
          <input
            className={field}
            inputMode="decimal"
            value={form.lowAt}
            onChange={(e) => setForm({ ...form, lowAt: Number(e.target.value) || 0 })}
          />
        </div>
        <p className="text-xs text-muted-foreground">Quantity · unit · low-stock warning level</p>

        <button
          type="submit"
          className="w-full rounded-2xl bg-primary px-5 py-3.5 text-base font-bold text-primary-foreground"
        >
          Save item
        </button>
      </form>
    </div>
  );
}
