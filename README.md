# ProyectoTickets Configuraci�n y Conexi�n de Servicios
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

## Configuraci�n de Git y GitHub
1. Descarga Git desde [https://git-scm.com/downloads](https://git-scm.com/downloads) 
2. Ejecuta el instalador y sigue las instrucciones 
3. Abre una terminal y verifica la instalaci�n con `git --version`

## Configuraci�n de GitHub
En este caso como ya tenemos un repositorio solamente lo clonaremos:
1. Abre una terminal.
2. Clona un repositorio usando: git clone https://github.com/KeVelo/ProyectoTickets.git

## Configuraci�n de Node.js
1. Descarga Node.js desde [https://nodejs.org/](https://nodejs.org/) 
2. Ejecuta el instalador y sigue las instrucciones 
3. Verifica la instalaci�n con `node --version` y `npm --version`

## Configuraci�n de Angular CLI
1. Abre una terminal y ejecuta: `npm install -g @angular/cli` 
2. Verifica la instalaci�n con `ng version`
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

## Configuraci�n de Visual Studio 2022 con .NET MVC
1. Descarga Visual Studio 2022 desde [https://visualstudio.microsoft.com/vs/](https://visualstudio.microsoft.com/vs/) 
2. Ejecuta el instalador 
3. Selecciona la carga de trabajo "Desarrollo de ASP.NET y web" 
4. Aseg�rate de que .NET MVC est� incluido en los componentes seleccionados 
5. Completa la instalaci�n
Para crear un proyecto:
1.	Abre Visual Studio y selecciona Crear un nuevo proyecto.
2.	Elige Aplicaci�n web ASP.NET Core y sigue las instrucciones para configurar el proyecto.
#### Dependencias de .NET 
Para agregar las dependencias necesarias al proyecto .NET, usa el Administrador de Paquetes NuGet para instalar:
1. Microsoft.EntityFrameworkCore
2. Microsoft.EntityFrameworkCore.SqlServer
3. Microsoft.AspNetCore.Authentication.JwtBearer
#### Pruebas de .NET
Para ejecutar pruebas en el proyecto .NET, utiliza el Test Explorer en Visual Studio o ejecuta:
`dotnet test`

## Configuraci�n de Intellij IDEA
1. Descarga IntelliJ IDEA desde [https://www.jetbrains.com/idea/download/](https://www.jetbrains.com/idea/download/) 
2. Ejecuta el instalador y sigue las instrucciones 
3. Abre IntelliJ IDEA y configura tus preferencias iniciales
Para crear un proyecto:
1.	Abre IntelliJ IDEA y selecciona Nuevo Proyecto.
2.	Configura el proyecto seg�n tus necesidades.

## Configuraci�n de Docker para Keycloack y Base de Datos

### Instalaci�n de Docker
1. Descarga Docker Desktop desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) 
2. Instala Docker Desktop siguiendo las instrucciones 
3. Verifica la instalaci�n con `docker --version`

### Configuraci�n de Keycloak 
1.	Asegurate de tener Docker abierto y en la terminal ejecuta: 
`docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:latest start-dev` 
2.	Verificar que el contenedor este corriendo:
`docker ps`

### Configuraci�n de Base de Datos (PostgreSQL)
1.	Correr en la terminal:
`docker run -d --name postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=mi_base_de_datos -p 5432:5432 postgres`

### Ejecuci�n de Contenedores Docker
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

## Pruebas de Integraci�n
Para probar la integraci�n entre los servicios:
1. Aseg�rate de que todos los contenedores Docker est�n en ejecuci�n.
2. Inicia tu aplicaci�n Angular y .NET.
3. Intenta realizar un inicio de sesi�n utilizando Keycloak.
4. Verifica que puedas acceder a los endpoints protegidos de tu API .NET.
5. Comprueba que los datos se est�n guardando correctamente en la base de datos PostgreSQL.

## Conclusi�n
Sigue estas instrucciones para configurar y conectar los servicios necesarios el proyecto. 

