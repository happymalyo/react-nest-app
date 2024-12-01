## <p align="center"> Documentation du Projet 👨‍💻</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Ce projet utilise les technologies suivantes :

- **React.js v18.3** & **Material UI** pour le frontend
- **NestJS v10** pour le backend
- **Node.js 21** pour l'environnement d'exécution

L'objectif du projet est de fournir une application web permettant de gérer des utilisateurs et de réaliser des opérations CRUD à l'aide de **React.js** et **NestJS**. J'ai utilisé **MariaDB** comme base de données avec <code>TypeORM</code> accompagné de Docker pour le déploiement et la gestion des services.

### Pour lancer le projet 🚀

### 1. Cloner le projet

Clonez le projet avec :

```bash
$ git clone git@github.com:happymalyo/react-nest-app.git
```

Maintenant, renommer le fichier <code>.env.example</code> dans le root en <code>.env </code> et changez ses valeurs.</br>

```bash
$ mv .env.example .env
```

### 2. Installation des dépendances

Une fois le projet cloné, allez dans le projet avec <code>cd react-nest-app</code> puis installer les dépendances pour le frontend et le backend.

Pour le frontend :

```bash
$ cd frontend
$ npm install
```

Pour le backend :

```bash
$ cd backend
$ npm install
```

### 3. Commandes Docker

Voici les commandes pour générer les tables dans <code>/mariadb/init.sql</code>.
Pour démarrer et gérer les containers Docker du projet, voici les commandes principales :

Arrêter et supprimer les containers en cours :

```bash
$ docker compose down # stopper les container en cours
$ docker compose down -v # Supprime les containers et les volumes associés.
$ docker compose up -d --build # Generer les tables et demarrer les services
```

- <code>--build</code> : Ce commande force la reconstruction des images Docker avant de démarrer les services.

### 4. Accéder à l'application sur le navigateur :

Une fois les containers sont démarrés, ouvrez un navigateur et accédez à http://localhost:3001 pour utiliser l'application.

### 5. Se connecter à la base de données MariaDB :

Vous pouvez vous connecter à la base de données MariaDB via Docker avec la commande suivante (vous aurez besoin du mot de passe qui est dans le fichier <code>.env</code> ) :

```bash
$ sudo docker exec -it mariadb mariadb -u [username] -p
```

Enjoy ;)
