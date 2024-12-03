# Usa una imagen oficial de Node.js como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias dentro del contenedor
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el proyecto TypeScript
RUN npm run build

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3001

# Configura el comando de inicio
CMD ["node", "dist/main"]



