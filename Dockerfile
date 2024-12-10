# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración y dependencias
COPY package*.json ./ 

# Instala TODAS las dependencias, incluidas las de desarrollo
RUN npm install

# Instala @nestjs/cli globalmente
RUN npm install -g @nestjs/cli

# Copia el resto del código fuente
COPY . .

# Copia el script wait-for-it.sh al contenedor
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Construye la aplicación NestJS
RUN npm run build

# Elimina las dependencias de desarrollo para optimizar la imagen
RUN npm prune --omit=dev

# Exponer el puerto de la aplicación
EXPOSE 3001

# Establece el comando de inicio con el script wait-for-it
CMD ["sh", "-c", "./wait-for-it.sh ecommerce-db -- npm run migration:run && npm run start:prod"]
