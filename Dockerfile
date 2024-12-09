# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de configuración y dependencias
COPY package*.json ./

# Instala TODAS las dependencias, incluidas las de desarrollo
RUN npm install

# Instala @nestjs/cli globalmente
RUN npm install -g @nestjs/cli

# Copia el resto del código fuente
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Elimina las dependencias de desarrollo para optimizar la imagen
RUN npm prune --omit=dev
EXPOSE 3000
# Establece el comando de inicio en modo producción
CMD ["npm", "run", "start:prod"]

