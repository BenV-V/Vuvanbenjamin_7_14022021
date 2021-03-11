

# avant l'installation

## Base de données
```
Prenez la base de données disponible dans backend\database\groupomaniabase.sql

Créer un fichier .env dans le backend en copiant les données suivantes : 
PORT=5000
DB_HOST=localhost
DB_PASS=
DB_NAME=groupomania
DB_USER=
DB_PORT=3306

Veuillez mettre votre nom d'utilisateur dans DB_USER ainsi que votre mot de passe dans DB_PASS
```


# cd backend

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run start
```

# cd frontend

## Project setup
```
npm install

Veuillez vérifier si core-js, json-parser, path, vuejs et axios sont installés, si ce n'est pas le cas, merci de rentrer :
npm i axios jsonparser path @vue/cli core-js

en supprimant les frameworks que vous detenez déjà
```
### Compiles and hot-reloads for development
```
npm run serve
```

