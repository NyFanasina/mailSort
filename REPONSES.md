### 1. Correction des anomalies de comportement

#### Anomalie 1 — Filtre par catégorie incorrect sur `/api/messages`

- **Symptôme** : `?category=client` retournait aussi `client-vip` et `reclamation-client`.
- **Cause** : utilisation de `includes()`, qui effectue une recherche par sous-chaîne.
- **Correction** : remplacement par une égalité stricte (===):

```js
result = result.filter((m) => m.category === category);
```

Seuls les messages correspondant exactement à la catégorie demandée sont maintenant retournés.

#### Anomalie 2 — Catégorie invalide non détectée sur `/api/messages`

- **Symptôme** : une catégorie inexistante comme `?category=xyz` retournait `200` avec une liste de messages vide.
- **Cause** : aucune validation de la catégorie reçue.
- **Correction** : validation avec `VALID_CATEGORIES` et retour d'une erreur `400` pour les catégories inconnues. Cela permet de distinguer une catégorie invalide d'une catégorie valide sans message.

### Anomalie 3 : Absence de validation du champ requis sur la reclassification (`PATCH`)

- **Symptôme :** Envoyer une requête `PATCH /api/messages/:id/category` avec un body vide ou sans la clé `category` renvoyait un message d'erreur générique sur les catégories autorisées au lieu de signaler l'absence de donnée.
- **Cause :** Absence de vérification de l'existence de la propriété `category` avant la vérification dans `VALID_CATEGORIES`.
- **Correction :** Ajout d'une condition d'existence `if (!category)` dans la route `PATCH` renvoyant une erreur `400 Bad Request` spécifique (`"Champs catégorie obligatoire"`).

### 2. Choix techniques principaux

- **Authentification (Middleware Next.js) :** J'ai mis en place un middleware Next.js pour protéger l'ensemble des routes `/api/messages*` en rejetant toute requête sans JWT valide par une erreur **401 Unauthorized**. Cette approche permet de centraliser la logique de sécurité en un seul endroit, tout en laissant la route `/api/auth/login` accessible au public.
- **Gestion du JWT (`jose`) :** J'ai remplacé la bibliothèque `jsonwebtoken` par `jose` pour la vérification des tokens. Ce choix garantit une compatibilité native avec l'Edge Runtime de Next.js grâce à l'utilisation des API Web standards.
- **Interface utilisateur (React & Tailwind CSS) :** L'ensemble du dashboard a été développé avec React et Tailwind CSS. Cela permet de construire une interface réactive, moderne et entièrement personnalisée rapidement.
- **Styles conditionnels (`clsx`) :** J'ai intégré `clsx` pour piloter l'assemblage dynamique des classes CSS. Cet utilitaire simplifie la lisibilité du code lors des changements d'état visuels (boutons actifs, filtres, alertes).
- **Gestion des données (Axios & TanStack Query) :** L'application s'appuie sur Axios et TanStack Query pour orchestrer les appels HTTP. Ce couple facilite la mise en cache automatique, le rafraîchissement des données et la gestion fluide des états de chargement ou d'erreur.
- **Formulaires (React Hook Form) :** La saisie de la connexion est gérée via React Hook Form. Cet outil offre une gestion performante des formulaires avec une validation simple, tout en évitant des re-rendus inutiles du composant.

### 4. Architecture pour une application desktop

Le fait que l’API soit consommée par une application desktop implique de considérer des clients dont la mise à jour n’est pas maîtrisée.

L’API doit obligatoirement être exposée en HTTPS afin de protéger les échanges réseau.

Je conserverais l'authentification Auth Bearer (JSON Web Token) pour les applications desktop. Les requêtes hors-navigateur contournent le CORS,il ne faut donc pas se reposer sur CORS pour la sécurité, mais imposer une authentification stricte (Authorization: Bearer) et un Rate Limiting par IP client.

Je mettrais en place un versionnage explicite de l’API, par exemple /api/v1/messages, afin de pouvoir la faire évoluer sans casser les anciennes versions du desktop. Les changements incompatibles seraient introduits dans une nouvelle version majeure, avec une période de dépréciation.

Je documenterais le contrat de l’API avec OpenAPI/Swagger afin de faciliter son intégration et son évolution.

Enfin, l’API resterait indépendante de la version du client et les permissions seraient toujours vérifiées côté serveur, sans faire confiance au desktop.
Merci.

### 5. Temps réellement passé

Temps total : environ 3 heures.
