# Utiliser une image de base pour Node.js
FROM node:22

# Définir le répertoire de travail
WORKDIR /app

RUN mkdir -p /usr/src/app/node_modules/.cache && \
    chmod -R 777 /usr/src/app/node_modules/.cache
# Copier package.json et package-lock.json
COPY package*.json ./


# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser une image de base pour Nginx
FROM nginx:alpine

# Copier les fichiers de build dans le répertoire de Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
