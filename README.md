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
├── backend/
│   ├── schema.sql          # Création des tables
│   ├── seed.sql            # Données d’exemple
├── frontend/
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── services/
│   │   │   ├── supabaseClient.ts
│   │   │   └── products.ts
│   │   └── pages/
│   ├── vite.config.ts
│   └── package.json
└── README.md

## 🗄️ 1. Base de données Supabase

### 📘 `backend/schema.sql`

\-- ==========================
--  STRUCTURE DE LA BASE
-- ==========================
````
DROP TABLE IF EXISTS product\_labels;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS labels;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE labels (
  id SERIAL PRIMARY KEY,
  titre TEXT NOT NULL,
  icon TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  price NUMERIC DEFAULT 0,
  is\_seasonal BOOLEAN DEFAULT FALSE,
  category\_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE product\_labels (
  product\_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  label\_id INTEGER REFERENCES labels(id) ON DELETE CASCADE,
  PRIMARY KEY (product\_id, label\_id)
);
````

### 🌱 `backend/seed.sql`

\-- ==========================
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
````

-- 🛒 Insertion de 5 produits de base
````
INSERT INTO products (name, image, price, is_seasonal, category_id) VALUES
  ('Bourriche d''huîtres l''Authentique de Paimpol - 50 n°3', '/assets/produit-5.png', 29.99, true, 1),
  ('Confit de vin rouge Bio', '/assets/produit-1.png', 12.50, false, 2),
  ('Sorbet Pomme Verte 0.5L', '/assets/produit-2.png', 7.80, false, 3),
  ('Yaourt Nature Bio 4x125g', '/assets/produit-3.png', 4.20, true, 4),
  ('Charcuterie artisanale', '/assets/produit-4.png', 8.90, true, 5);
````

-- 🔗 Association des produits aux labels
````
INSERT INTO product_labels (product_id, label_id) VALUES
  (1, 1), (1, 2), -- Produit 1: BIO, STG
  (2, 1), (2, 2), -- Produit 2: BIO, STG
  (3, 2),         -- Produit 3: STG
  (4, 1),         -- Produit 4: BIO
  (5, 2);         -- Produit 5: STG
````

-- 📦 Duplication des produits pour le volume
````
INSERT INTO products (name, image, price, is\_seasonal, category\_id)
SELECT name, image, price, is\_seasonal, category\_id FROM products LIMIT 5;


INSERT INTO products (name, image, price, is\_seasonal, category\_id)
SELECT name, image, price, is\_seasonal, category\_id FROM products LIMIT 5;
````

-- 🔁 Réassociation des labels (ATTENTION: Ceci assigne TOUS les labels à TOUS les produits dupliqués)
````
INSERT INTO product\_labels (product\_id, label\_id)
SELECT p.id, l.id
FROM products p
JOIN labels l ON true
WHERE p.id > 5;
````
## ⚙️ 2. Connexion Supabase côté Frontend

### 📄 `frontend/src/services/supabaseClient.ts`

````
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
````

> **Configuration de l'environnement**

> Créez le fichier `.env` à la racine du dossier `frontend` :

````bash
VITE_SUPABASE_URL=[https://xxxx.supabase.co](https://xxxx.supabase.co)
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
````

## 🔍 3. Récupération des produits avec leurs labels

Ce service utilise le concept de `join` dans Supabase via la syntaxe `select()` pour récupérer les relations (catégories et labels).

### 📄 `frontend/src/services/products.ts`

```bash
import { supabase } from "./supabaseClient";

export const getProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      image,
      price,
      is_seasonal,
      category:categories(name),
      product_labels (
        label:labels(titre, icon)
      )
    `);

  if (error) {
    console.error("Erreur lors du chargement des produits :", error.message);
    throw error;
  }

  -- Mappe les données pour simplifier la structure côté React
  return data.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image,
    price: p.price,
    isSeasonal: p.is_seasonal,
    category: p.category?.name,
    labels: p.product_labels?.map((pl) => pl.label) || [],
  }));
};
```


## 🧾 5. Lancement du projet

### 📦 Installation des dépendances
```bash
cd frontend
npm install
```

### ▶️ Démarrer le projet
```bash
npm run dev
```

Accédez à l’application sur :

👉 `http://localhost:5173`

## 🧠 6. Déploiement

### 🌐 Sur Vercel ou Netlify

1.  Déployez votre projet React (build avec `npm run build`).
2.  Configurez les variables d’environnement :

-   `VITE_SUPABASE_URL`
-   `VITE_SUPABASE_ANON_KEY`

Votre application sera connectée automatiquement à Supabase.



## 👨‍💻 Auteur

Développé par \[Steeven Loukanou\]