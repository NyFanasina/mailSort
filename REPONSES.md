### 1. Correction des anomalies de comportement

Anomalie 1 — Filtre par catégorie incorrect sur /api/messages
Symptôme : ?category=client retournait aussi client-vip et reclamation-client.
Cause : utilisation de includes(), qui effectue une recherche par sous-chaîne.
Correction : remplacement par une égalité stricte :
result = result.filter((m) => m.category === category);
Seuls les messages correspondant exactement à la catégorie demandée sont maintenant retournés.

Anomalie 2 — Catégorie invalide non détectée sur /api/messages
Symptôme : une catégorie inexistante comme ?category=xyz retournait 200 avec une liste vide.
Cause : aucune validation de la catégorie reçue.
Correction : validation avec VALID_CATEGORIES et retour d'une erreur 400 pour les catégories inconnues. Cela permet de distinguer une catégorie invalide d'une catégorie valide sans message.

J’ai choisi d’utiliser un middleware Next.js pour protéger les routes /api/messages\*. Le middleware intercepte les requêtes avant leur exécution et vérifie la présence d’un header Authorization au format Bearer <token>.

Si le token est absent, invalide ou mal formé, la requête est immédiatement rejetée avec une réponse HTTP 401 Unauthorized. Les routes /api/messages\* ne sont donc accessibles qu’avec un JWT valide.

J’ai privilégié cette approche afin de centraliser la logique d’authentification plutôt que de répéter la même vérification dans chaque route API. Le middleware est également configuré uniquement sur les routes /api/messages\*, tandis que /api/auth/login reste accessible publiquement puisqu’il sert justement à obtenir le token.

### 4. Architecture pour une application desktop

Le fait que l’API soit consommée par une application desktop implique de considérer des clients dont la mise à jour n’est pas maîtrisée.

L’API doit obligatoirement être exposée en HTTPS afin de protéger les échanges réseau.
Je conserverais l'authentification Auth Bearer (JSON Web Token) pour les applications desktop. Les requêtes hors-navigateur contournent le CORS,il ne faut donc pas se reposer sur CORS pour la sécurité, mais imposer une authentification stricte (Authorization: Bearer) et un Rate Limiting par IP client.

Je mettrais en place un versionnage explicite de l’API, par exemple /api/v1/messages, afin de pouvoir la faire évoluer sans casser les anciennes versions du desktop. Les changements incompatibles seraient introduits dans une nouvelle version majeure, avec une période de dépréciation.

Je documenterais le contrat de l’API avec OpenAPI/Swagger afin de faciliter son intégration et son évolution.

Enfin, l’API resterait indépendante de la version du client et les permissions seraient toujours vérifiées côté serveur, sans faire confiance au desktop.
