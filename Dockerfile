# FROM node:14-alpine - Especifica la imagen base
FROM node:14-alpine

# WORKDIR /usr/src/app - Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# COPY package*.json ./ - Copia los archivos de paquetes al directorio de trabajo
COPY package*.json ./

# RUN npm install - Instala las dependencias del proyecto
RUN npm install

# COPY . . - Copia el resto de los archivos del proyecto al contenedor
COPY . .

# EXPOSE 3000 - Expone el puerto 3000 del contenedor para que sea accesible
EXPOSE 3000

# CMD ["node", "index.js"] - Define el comando que se ejecutará al iniciar el contenedor
# Ajustado para usar el punto de entrada correcto del proyecto Express
CMD ["npm", "start"] 