# Establece la imagen base
FROM node:18.12

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración del proyecto
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente, incluyendo la carpeta `data`
COPY . .


# Compilar el código TypeScript dentro del contenedor
RUN npm run build

# Expone el puerto en el que la aplicación NestJS escucha
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start"]


