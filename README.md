# ProyectoTickets Configuración y Conexión de Servicios
Este proyecto proporciona instrucciones detalladas para configurar y conectar los siguientes servicios y herramientas que se usaran en el desarrollo del proyecto:
- Git
- GitHub
- Node.js
- Angular CLI
- Visual Studio 2022 con .NET MVC
- IntelliJ IDEA
- Docker para Keycloak y base de datos

## Requisitos Previos
Asegurarse de tener instalados los siguientes programas:
- Git
- Node.js (incluye npm)
- [Angular CLI](https://angular.io/cli)
- Visual Studio 2022
- IntelliJ IDEA
- Docker

## Configuración de Git y GitHub
1. Descarga Git desde [https://git-scm.com/downloads](https://git-scm.com/downloads) 
2. Ejecuta el instalador y sigue las instrucciones 
3. Abre una terminal y verifica la instalación con `git --version`

## Configuración de GitHub
En este caso como ya tenemos un repositorio solamente lo clonaremos:
1. Abre una terminal.
2. Clona un repositorio usando: git clone https://github.com/KeVelo/ProyectoTickets.git

## Configuración de Node.js
1. Descarga Node.js desde [https://nodejs.org/](https://nodejs.org/) 
2. Ejecuta el instalador y sigue las instrucciones 
3. Verifica la instalación con `node --version` y `npm --version`

## Configuración de Angular CLI
1. Abre una terminal y ejecuta: `npm install -g @angular/cli` 
2. Verifica la instalación con `ng version`
Para crear un proyecto angular:
1.	ng new mi-proyecto-angular
2.	cd mi-proyecto-angular
3.	ng serve
#### Dependencias de Angular CLI
Para instalar las dependencias necesarias para el proyecto Angular, ejecuta:
1. npm install @angular/material @angular/cdk @angular/animations
2. npm install @auth0/angular-jwt
3. npm install keycloak-angular keycloak-js
#### Pruebas de Angular
1. Para ejecutar las pruebas unitarias de Angular:
`ng test`
2. Para ejecutar pruebas end-to-end:
`ng e2e`

## Configuración de Visual Studio 2022 con .NET MVC
1. Descarga Visual Studio 2022 desde [https://visualstudio.microsoft.com/vs/](https://visualstudio.microsoft.com/vs/) 
2. Ejecuta el instalador 
3. Selecciona la carga de trabajo "Desarrollo de ASP.NET y web" 
4. Asegúrate de que .NET MVC esté incluido en los componentes seleccionados 
5. Completa la instalación
Para crear un proyecto:
1.	Abre Visual Studio y selecciona Crear un nuevo proyecto.
2.	Elige Aplicación web ASP.NET Core y sigue las instrucciones para configurar el proyecto.
#### Dependencias de .NET 
Para agregar las dependencias necesarias al proyecto .NET, usa el Administrador de Paquetes NuGet para instalar:
1. Microsoft.EntityFrameworkCore
2. Microsoft.EntityFrameworkCore.SqlServer
3. Microsoft.AspNetCore.Authentication.JwtBearer
#### Pruebas de .NET
Para ejecutar pruebas en el proyecto .NET, utiliza el Test Explorer en Visual Studio o ejecuta:
`dotnet test`

## Configuración de Intellij IDEA
1. Descarga IntelliJ IDEA desde [https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download/) 
2. Ejecuta el instalador y sigue las instrucciones 
3. Abre IntelliJ IDEA y configura tus preferencias iniciales
Para crear un proyecto:
1.	Abre IntelliJ IDEA y selecciona Nuevo Proyecto.
2.	Configura el proyecto según tus necesidades.

## Configuración de Docker para Keycloack y Base de Datos

### Instalación de Docker
1. Descarga Docker Desktop desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) 
2. Instala Docker Desktop siguiendo las instrucciones 
3. Verifica la instalación con `docker --version`

### Configuración de Keycloak 
1.	Asegurate de tener Docker abierto y en la terminal ejecuta: 
`docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev` 
2.	Verificar que el contenedor este corriendo:
`docker ps`

### Configuración de Base de Datos (PostgreSQL)
1.	Correr en la terminal:
`docker run -d --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=mi_base_de_datos -p 5432:5432 postgres`

### Ejecución de Contenedores Docker
Para iniciar todos los servicios necesarios, puedes crear un archivo docker-compose.yml para implementarlo en el proyecto
con el siguiente contenido:
version: '3' 
services:
  keycloak:
    image: quay.io/keycloak/keycloak:latest
    environment:
      - KEYCLOAK_USER=admin
      - KEYCLOAK_PASSWORD=admin
    ports:
      - "8080:8080"
    command: start-dev

  postgres:
    image: postgres
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=admin
      - POSTGRES_DB=mi_base_de_datos
    ports:
      - "5432:5432"

Luego ejecuta:
`docker-compose up -d`

Para detener el servicio:
`docker-compose down`

## Pruebas de Integración
Para probar la integración entre los servicios:
1. Asegúrate de que todos los contenedores Docker estén en ejecución.
2. Inicia tu aplicación Angular y .NET.
3. Intenta realizar un inicio de sesión utilizando Keycloak.
4. Verifica que puedas acceder a los endpoints protegidos de tu API .NET.
5. Comprueba que los datos se estén guardando correctamente en la base de datos PostgreSQL.

## Conclusión
Sigue estas instrucciones para configurar y conectar los servicios necesarios el proyecto. 

