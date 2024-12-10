# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copia únicamente los archivos de configuración necesarios para instalar dependencias
COPY package*.json ./

# Instala TODAS las dependencias, incluidas las de desarrollo
RUN npm install --legacy-peer-deps

# Instala @nestjs/cli globalmente
RUN npm install -g @nestjs/cli

# Copia el resto del código fuente
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Elimina las dependencias de desarrollo para optimizar la imagen
RUN npm prune --omit=dev

# Exponer el puerto de la aplicación
EXPOSE 3001

# Establece el comando de inicio
CMD ["npm", "run", "start:prod"]


