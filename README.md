# ProyectoTickets Configuración y Conexión de Servicios

En el presente proyecto les dejo una guia de todo lo que necesitamos tener instalado en nuestro equipo para la ejecucion correcta de nuestro proyecto

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

## Configuraci�n de Docker para Keycloack y Base de Datos (DENNYS)

### Instalaci�n de Docker
1. Descarga Docker Desktop desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop) 
2. Instala Docker Desktop siguiendo las instrucciones 
3. Verifica la instalaci�n con `docker --version`

## Descargar e Instalar Keycloak en Docker

1. Instalar Docker Desktop:

- Asegúrate de tener Docker Desktop instalado y funcionando en tu máquina.
- Puedes descargar Docker desde docker.com.
- Sigue las instrucciones de instalación específicas para tu sistema operativo.

2. Descargar la imagen de Keycloak desde Docker Hub:

- Abre tu terminal o línea de comandos.
- Ejecuta el siguiente comando para descargar la última imagen de Keycloak desde Docker Hub: docker pull quay.io/keycloak/keycloak:latest
  Este comando descarga la imagen de Keycloak que usaremos para crear nuestro contenedor.

3. Crear y ejecutar un contenedor de Keycloak:

- Ejecuta el siguiente comando en tu terminal para iniciar un contenedor de Keycloak: docker run -d --name keycloak -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin quay.io/keycloak/     keycloak:latest start-dev 

- Explicación del comando:
- -d: Ejecuta el contenedor en segundo plano (modo "detached").
- --name keycloak: Asigna el nombre keycloak al contenedor.
- -p 8080:8080: Mapea el puerto 8080 del contenedor al puerto 8080 de la máquina local.
- -e KEYCLOAK_ADMIN=admin: Establece el usuario administrador de Keycloak como admin.
- -e KEYCLOAK_ADMIN_PASSWORD=admin: Establece la contraseña del administrador como admin.
- quay.io/keycloak/keycloak:latest: Especifica la imagen de Keycloak a utilizar.
- start-dev: Indica que se debe iniciar Keycloak en modo de desarrollo (útil para pruebas locales).


4. Verificar que el contenedor esté en funcionamiento:

- Ejecuta el siguiente comando para ver los contenedores en ejecución: docker ps
- Asegúrate de que el contenedor de Keycloak esté listado y en estado "Up".

## Crear Realm, Clientes y Roles en Keycloak

1. Acceder al Panel de Administración de Keycloak:

- Abre tu navegador web.
- Ve a la URL http://localhost:8080.
- Verás la pantalla de inicio de sesión de Keycloak.
- Inicia sesión con el nombre de usuario admin y la contraseña admin que configuraste anteriormente.(admin/admin)

2. Crear un nuevo realm:

- En la parte superior izquierda del panel, haz clic en "Master" (el realm por defecto) y selecciona "Add Realm".
- Asigna un nombre a tu nuevo realm (por ejemplo, mi_realm).
- Haz clic en "Create" para crear el nuevo realm.

3. Crear un cliente en el realm:

- Una vez dentro del realm recién creado, ve a la sección "Clients" en el menú de la izquierda.
- Haz clic en "Create" para añadir un nuevo cliente.
- Rellena los detalles del cliente:
- Client ID: Por ejemplo, mi_app_cliente.
- Client Protocol: Selecciona openid-connect.
- Root URL: Introduce la URL base de la aplicación (puede dejarse en blanco si no es necesario para pruebas).
- Haz clic en "Save" para guardar el cliente.

4. Crear roles para el realm:

- Navega a la sección "Roles" en el menú de la izquierda.
- Haz clic en "Add Role" para crear un nuevo rol.
- Rellena el nombre del rol (por ejemplo, admin, user).
- Haz clic en "Save" para guardar el rol.

## Configurar Usuarios de Prueba

1. Crear un usuario en Keycloak:

- Ve a la sección "Users" en el menú de la izquierda.
- Haz clic en "Add User" para añadir un nuevo usuario.
- Rellena los detalles del usuario, como el nombre de usuario (por ejemplo, usuario1), el correo electrónico, etc.
- Haz clic en "Save" para guardar el usuario.

2. Establecer una contraseña para el usuario:

- Después de crear el usuario, haz clic en la pestaña "Credentials".
- Introduce una contraseña para el usuario.
- Selecciona la opción Temporary si deseas que el usuario cambie la contraseña en su primer inicio de sesión o déjala desmarcada para una contraseña permanente.
- Haz clic en "Set Password".

3. Asignar roles al usuario:

- Haz clic en la pestaña "Role Mappings".
- En la sección "Available Roles", selecciona el rol que deseas asignar al usuario (por ejemplo, admin o user).
- Haz clic en "Add selected" para asignar el rol al usuario.

## Criterio de Aceptación
- Para considerar la configuración completa y funcional, asegúrate de que:

- Keycloak esté en ejecución y accesible desde http://localhost:8080.
- El realm esté creado y correctamente configurado con clientes y roles.
- Los usuarios de prueba estén configurados y puedan autenticarse con éxito.

## Proceso para exportar e importar el Realm, Clientes y Roles 

## Exportar(en el caso del hace la creacion y quiere compartirlo con los demas miembros del equipo)

- Estando dentro de Keycloack seleccionamos nuestro Realm en este caso mi_realm.
- Bajamos hasta la parte inferior izquierda donde veremos el apartado de REAL SETTINGS y daremos clic
- Luego vamos a la esquina superior derecha en donde dice Action buscaremos en la flechita la opcion que diga PARTIAL EXPORT y daremos clic
- Luego marcamos las casillas include groups and roles Y include clients
- Ahora se genero un archivo j.son que sera el que compartiremos con los demas miembros del equipo.

## Importar(en el caso que nos manden el archivo j.son y no sabemos como importarlo)

- Estando dentro de Keycloack seleccionamos Keycloack master (este viene por defecto)
- Bajamos hasta la parte inferior izquierda donde veremos el apartado de REAL SETTINGS y daremos clic
- Luego vamos a la esquina superior derecha en donde dice Action buscaremos en la flechita la opcion que diga PARTIAL IMPORT y daremos clic
- Luego arrastramos nuestro archivo j.son aca marcamos las casillas clients, realm roles, client roles y le damos clic a la casilla import y ya lo tendriamos.
