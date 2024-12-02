# Usa una imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala todas las dependencias (producción y desarrollo) necesarias para compilar
RUN npm install

# Instala el CLI de NestJS globalmente
RUN npm install -g @nestjs/cli

# Copia el resto del código de la aplicación
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Elimina dependencias de desarrollo después de la compilación para reducir el tamaño de la imagen
RUN npm prune --production

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3001

# Configura el comando de inicio
CMD ["node", "dist/main"]

