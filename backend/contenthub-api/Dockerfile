# Etapa de Build
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Como o Dockerfile já está dentro de contenthub-api, copiamos a partir daqui
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Etapa de Execução
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]