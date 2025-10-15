# 🛒 Projet Catalogue Produits — React + Supabase

Une application simple de **catalogue produits** avec filtres, pagination et labels multiples.

Le frontend tourne sur **React** (Vite + TypeScript) et le backend repose sur **Supabase** (PostgreSQL).

## 🚀 Fonctionnalités

-   Affichage des produits avec image, catégorie, et labels (BIO, STG, etc.)
-   Système de pagination dynamique
-   Filtres par catégories et labels (à implémenter)
-   Données stockées dans **Supabase** (PostgreSQL)
-   Seed automatique des données (5 produits de base répétés pour simuler un grand stock)
-   Frontend **responsive** (mobile, tablette, desktop)

## 🧩 Stack technique

**CoucheTechnologieFrontend**

React + Vite + TypeScript + **TailwindCSS**

**Backend (DB)**

Supabase (PostgreSQL)

**ORM / Accès aux données**

Supabase JS Client


## 📁 Structure du projet

📦 project-root/
├── assets/
├── components/
├── function/
│   └── renderPageNumber.tsx
├── lib/
│   └── supabaseClient.ts
├── services/
│   └── getProduct.tsx
├── App.tsx
├── index.css
├── main.tsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.app.json


## 🗄️ 1. Base de données Supabase


\-- ==========================
--  STRUCTURE DE LA BASE
-- ==========================
````
DROP TABLE IF EXISTS product_labels;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS labels;
DROP TABLE IF EXISTS categories;

-- Table: categories
create table if not exists categories (
  id serial primary key,
  name text not null
);

-- Table: labels
create table if not exists labels (
  id serial primary key,
  titre text not null,
  icon text not null
);

-- Table: products
create table if not exists products (
  id serial primary key,
  name text not null,
  image text not null,
  is_seasonal boolean default false,
  category_id int references categories(id)
);

-- Table de relation produit ↔ labels
create table if not exists product_labels (
  product_id int references products(id) on delete cascade,
  label_id int references labels(id) on delete cascade,
  primary key (product_id, label_id)
);
````


-- ==========================
--  DONNÉES DE DÉMO
-- ==========================

-- 🗂 Insertion de quelques catégories
````
INSERT INTO categories (name) VALUES
  ('Fruits & Légumes'),
  ('Boissons'),
  ('Épicerie salée'),
  ('Produits laitiers'),
  ('Viandes & Charcuteries');
  ````

-- 🏷 Insertion des labels
````
INSERT INTO labels (titre, icon) VALUES
  ('BIO', '/assets/bio.png'),
  ('STG', '/assets/stg.png');

  RETURNING id; -- Récupère les IDs pour référence si besoin
````

-- 🛒 Insertion de 5 produits de base
````
INSERT INTO products (name, image, is_seasonal, category_id) VALUES
 ('Bourriche d''huîtres l''Authentique de Paimpol - 50 n°3', '/assets/produit-5.png', false, 1),
 ('Confit de vin rouge Bio', '/assets/produit-1.png', false, 2),
 ('Sorbet Pomme Verte 0.5L', '/assets/produit-2.png', false, 3),
 ('Confit de vin rouge Bio', '/assets/produit-3.png', true, 4),
 ('Confit de vin rouge Bio', '/assets/produit-4.png', true, 5)

RETURNING id; -- Récupère les IDs (ici: 1 à 5)
````

-- 🔗 Association des produits aux labels
````
-- On suppose que label_id 1 = BIO et 2 = STG

INSERT INTO product_labels (product_id, label_id) VALUES
 (2, 1), (2, 2), -- Produit 2: BIO, STG
 (5, 1); -- Produit 5: BIO
````

-- 📦 Duplication des produits pour le volume
````
-- Définir combien de fois dupliquer les 5 produits de base.
-- Dupliquer 20 fois les 5 produits de base créera 100 produits (20 * 5)
-- et donc un total de 105 produits dans la table.
WITH initial_products AS (
 SELECT id, name, image, is_seasonal, category_id FROM products LIMIT 5
),
duplicates AS (
 -- Insertion des N duplicatas des produits
 INSERT INTO products (name, image, is_seasonal, category_id)
 SELECT
  p.name,
  p.image,
  p.is_seasonal,
  p.category_id
 FROM initial_products p, generate_series(1, 150) AS s(i) -- Duplique chaque produit 150 fois
 RETURNING id AS new_product_id, (id - 5) % 5 + 1 AS original_product_id
)
````

-- 🔗 Association des labels pour les produits dupliqués
````
INSERT INTO product_labels (product_id, label_id)
SELECT
 d.new_product_id,   -- Le nouvel ID du produit dupliqué
 pl.label_id     -- L'ID du label associé au produit original
FROM duplicates d
JOIN product_labels pl
 ON pl.product_id = d.original_product_id;
````
## ⚙️ 2. Connexion Supabase côté Frontend

### 📄 `Catalogue_Produits/src/services/supabaseClient.ts`

````
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
````

> **Configuration de l'environnement**

> Créez le fichier `.env` à la racine du dossier `Catalogue_Produits` :

````bash
VITE_SUPABASE_URL=[https://xxxx.supabase.co](https://xxxx.supabase.co)
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
````

## 🔍 3. Récupération des produits avec leurs labels

Ce service utilise le concept de `join` dans Supabase via la syntaxe `select()` pour récupérer les relations (catégories et labels).

### 📄 `Catalogue_Produits/src/services/products.ts`

```bash
import { supabase } from "./supabaseClient";

export async function getProducts({
  page = 1,
  limit = 12,
  labels = [],
}: {
  page?: number;
  limit?: number;
  labels?: string[];
}) {
  let query = supabase
    .from("products")
    .select(
      `
      id,
      name,
      image,
      is_seasonal,
      product_labels:product_labels(
        labels:labels(titre, icon)
      )
      `,
      { count: "exact" }
    )
    .range((page - 1) * limit, page * limit - 1);

  if (labels.length > 0) {
    query = query.contains("product_labels.labels.titre", labels);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    data: (data as unknown) as Product[] || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}
```


## 🧾 4. Lancement du projet

### 📦 Installation des dépendances
```bash
cd Catalogue_Produits
npm install
```

### ▶️ Démarrer le projet
```bash
npm run dev
```

Accédez à l’application sur :

👉 `http://localhost:5173`



## 👨‍💻 Auteur

Développé par \[Steeven Loukanou\]