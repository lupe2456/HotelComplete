# Usa una imagen base de Maven y Java, (temurin)
FROM maven:3.9.7-eclipse-temurin-17 AS build

COPY src /app/src
COPY pom.xml /app
WORKDIR /app

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-alpine

# Crear un directorio para persistencia de H2
RUN mkdir -p /opt/h2db

COPY --from=build /app/target/*.jar /app.jar
EXPOSE 8895
ENTRYPOINT ["java", "-jar", "/app.jar"]

# docker build -t mi-apirest-hotel .
# docker run -d --name apirest-hotel -p 8895:8895 -v ./h2data:/opt/h2db mi-apirest-hotel