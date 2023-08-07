# API de Vueflix

Ceci est l'API de Vueflix basée sur les données de [TMDB](https://www.themoviedb.org).

## Installation et lancement

```bash
cp .env.example .env
npm install
node index.js
```

Il faut mettre votre clé TMDB dans la variable `MOVIE_DB_API_KEY`.

Et voilà, vous avez l'API sur `http://localhost:3000`.

J'utilise la base de [Json Server](https://github.com/typicode/json-server), sur la documentation tout est indiqué pour réaliser les requêtes en GET, POST, PUT ou DELETE. J'ai aussi ajouté la partie authentification avec ce [middleware](https://github.com/jeremyben/json-server-auth). On peut donc s'inscrire ou se connecter sur cette API.

Voici les URLs de l'API :

- http://localhost:3000/movies => Tous les films
- http://localhost:3000/genres => Toutes les catégories
- http://localhost:3000/actors => Tous les acteurs
