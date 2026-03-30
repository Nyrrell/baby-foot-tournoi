# Tournoi Baby-Foot

Application web de gestion de tournois de baby-foot. Créez des tournois, gérez les équipes, générez les matchs automatiquement et suivez le classement en temps réel.

---

## Stack

**Backend**
- [NestJS](https://nestjs.com/) — framework Node.js
- [Fastify](https://fastify.dev/) — serveur HTTP
- [Sequelize](https://sequelize.org/) — ORM
- [MySQL 9](https://www.mysql.com/) — base de données
- [JWT](https://jwt.io/) — authentification

**Frontend**
- [Nuxt 3](https://nuxt.com/) — framework Vue.js (SSR)
- [Nuxt UI](https://ui.nuxt.com/) — composants UI
- [TypeScript](https://www.typescriptlang.org/)

---

Les trois services communiquent dans le même réseau Docker :

```
Navigateur → frontend:8080 → backend:3000 → mysql:3306
```

## Prérequis

- [Docker](https://docs.docker.com/get-docker/) & Docker Compose
- [Node.js](https://nodejs.org/) 22+ (développement local uniquement)


---

## Démarrage avec Docker

### Démo complète

Lance les trois services (MySQL + Backend + Frontend) en une commande :

```bash
docker compose -f compose.prod.yml up --build
```

L'application est accessible sur **http://localhost:8080**

## Comptes par défaut

Les migrations créent automatiquement deux comptes :

| Identifiant | Mot de passe | Rôle |
|---|---|---|
| `admin` | `nimda` | Administrateur |
| `user` | `resu` | Utilisateur standard |

---

## Développement local

```bash
git clone https://github.com/Nyrrell/baby-foot-tournoi.git
cd baby-foot-tournoi
````

### Base de données

```bash
docker compose up -d
```


### Backend

```bash
cd backend
pnpm install
pnpm start:dev
```

Le backend démarre sur **http://localhost:3000**. Les migrations sont appliquées automatiquement au démarrage.

Variables d'environnement à renseigner (`.env`) :

| Variable | Défaut | Description |
|---|---|---|
| `DB_HOST` | `localhost` | Hôte MySQL |
| `DB_PORT` | `3306` | Port MySQL |
| `DB_NAME` | `tournoi_baby_foot` | Nom de la base |
| `DB_USERNAME` | `tournoi` | Utilisateur MySQL |
| `DB_PASSWORD` | `ionruot` | Mot de passe MySQL |
| `JWT_SECRET` | — | Secret de signature JWT |
| `PORT` | `3000` | Port d'écoute |

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Le frontend démarre sur **http://localhost:3001** sinon voir la console.

---

## API Reference

Toutes les routes sont préfixées par `/api`. La plupart nécessitent un header `Authorization: Bearer <token>`.

### Authentification

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | ❌ | Connexion, retourne un JWT |

### Tournois

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/tournois` | ❌ | Liste tous les tournois |
| `GET` | `/api/tournois/:id` | ❌ | Détail d'un tournoi |
| `GET` | `/api/tournois/:id/classements` | ❌ | Classement du tournoi |
| `POST` | `/api/tournois` | ✅ | Crée un tournoi |
| `PATCH` | `/api/tournois/:id` | ✅ | Modifie un tournoi |
| `DELETE` | `/api/tournois/:id` | ✅ | Supprime un tournoi |

### Équipes

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/tournois/:id/equipes` | ✅ | Liste les équipes d'un tournoi |
| `POST` | `/api/tournois/:id/equipes` | ✅ | Ajoute une équipe |
| `PATCH` | `/api/equipes/:id` | ✅ | Modifie une équipe |
| `DELETE` | `/api/equipes/:id` | ✅ | Supprime une équipe |

### Matchs

| Méthode | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/api/tournois/:id/matchs` | ✅ | Liste les matchs d'un tournoi |
| `POST` | `/api/tournois/:id/matchs/generate` | ✅ | Génère les matchs (round-robin) |
| `PATCH` | `/api/matchs/:id/score` | ✅ | Saisit le score d'un match |
| `DELETE` | `/api/tournois/:id/matchs` | ✅ | Supprime tous les matchs |

