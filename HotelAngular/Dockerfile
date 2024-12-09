# Etapa 1 Importar la iamgen oficial de node
FROM node:latest AS build

# Seleccionar el directorio de trabajo
WORKDIR /app

#Agregar codigo fuente a la app
COPY ./ /app/

# Instalar dependencias
RUN npm install

#Generar el build de la aplicacion
RUN npm run build

#Etapa 2
# Desplegar la informacion para ello nginx
FROM nginx:latest

# Copiar la salida de nuestra app construida para reemplazar el archivo por defecto
COPY --from=build /app/dist/hotel-angular/browser/ /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# docker build -t hotel-frontend .
# docker run -d -p 8080:80 hotel-frontend