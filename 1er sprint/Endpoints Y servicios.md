1.  **.NET MVC \- CRUD de Conciertos**  
   1. **1.1. GET /api/conciertos**  
* **Descripción:** Obtiene una lista de todos los conciertos disponibles.  
* **Método HTTP:** \`GET\`  
* **Parámetros de Entrada:** Ninguno  
* **Formato de Respuesta:**

    
\[  
    {  
      "id\_concierto": 1,  
      "nombre\_concierto": "Concierto A",  
      "fecha": "2024-09-15T20:00:00Z",  
      "id\_lugar": 2,  
      "precio\_base": 50.00,  
      "estado": "Programado"  
    },  
    ...  
  \]


* **Autenticación:** Requiere token JWT válido.


  2. **GET /api/conciertos/{id}**  
* **Descripción:** Obtiene los detalles de un concierto específico.  
* **Método HTTP:** \`GET\`  
* **Parámetros de Entrada:** \`id\`: Identificador del concierto.  
*  **Formato de Respuesta:**

    
  {  
    "id\_concierto": 1,  
    "nombre\_concierto": "Concierto A",  
    "fecha": "2024-09-15T20:00:00Z",  
    "id\_lugar": 2,  
    "precio\_base": 50.00,  
    "estado": "Programado"  
  }

* **Autenticación:** Requiere token JWT válido.

  3. **POST /api/conciertos**  
* **Descripción:** Crea un nuevo concierto.  
* **Método HTTP:** \`POST\`  
* **Parámetros de Entrada:** 

  {  
    "nombre\_concierto": "Concierto B",  
    "fecha": "2024-10-01T19:00:00Z",  
    "id\_lugar": 3,  
    "precio\_base": 60.00,  
    "estado": "Programado"  
  }

* **Formato de Respuesta:**

   {  
    "id\_concierto": 2,  
    "nombre\_concierto": "Concierto B",  
    "fecha": "2024-10-01T19:00:00Z",  
    "id\_lugar": 3,  
    "precio\_base": 60.00,  
    "estado": "Programado"  
  }  
  \`\`\`

* **Autenticación:** Requiere token JWT válido con rol \`Admin\`.

  4. **PUT /api/conciertos/{id}**  
* **Descripción:** Actualiza los detalles de un concierto existente.  
* **Método HTTP:** \`PUT\`  
* **Parámetros de Entrada:**\`id\`: Identificador del concierto

  {  
    "nombre\_concierto": "Concierto B Actualizado",  
    "fecha": "2024-10-01T19:00:00Z",  
    "id\_lugar": 3,  
    "precio\_base": 65.00,  
    "estado": "Programado"  
  }

* **Formato de Respuesta:**

  {  
    "id\_concierto": 2,  
    "nombre\_concierto": "Concierto B Actualizado",  
    "fecha": "2024-10-01T19:00:00Z",  
    "id\_lugar": 3,  
    "precio\_base": 65.00,  
    "estado": "Programado"  
  }


* **Autenticación:** Requiere token JWT válido con rol \`Admin\`.

  5. **DELETE /api/conciertos/{id}**  
* **Descripción:** Elimina un concierto existente.  
* **Método HTTP:** \`DELETE\`  
* **Parámetros de Entrada:** \`id\`: Identificador del concierto   
* **Formato de Respuesta:**

  {  
    "mensaje": "Concierto eliminado exitosamente."  
  }

* **Autenticación:** Requiere token JWT válido con rol \`Admin\`.

2.  **Spring Boot \- Transacciones de Compra y Pagos**

   

   1. **POST /api/transacciones**  
* **Descripción:** Procesa una nueva transacción de compra.  
* **Método HTTP:** \`POST\`  
* **Parámetros de Entrada:**

  {  
    "id\_boleto": 123,  
    "monto": 50.00,  
    "metodo\_pago": "Tarjeta de Crédito"  
  }


* **Formato de Respuesta:**

  {  
    "id\_transaccion": 1,  
    "id\_boleto": 123,  
    "monto": 50.00,  
    "fecha\_transaccion": "2024-09-01T15:30:00Z",  
    "metodo\_pago": "Tarjeta de Crédito",  
    "estado": "Completada"  
  }  
 

* **Autenticación:** Requiere token JWT válido.

  2. **GET /api/transacciones/{id}**  
* **Descripción:** Obtiene los detalles de una transacción específica.  
* **Método HTTP:** \`GET\`  
* **Parámetros de Entrada:**\`id\`: Identificador de la transacción.  
* Formato de Respuesta

  {  
    "id\_transaccion": 1,  
    "id\_boleto": 123,  
    "monto": 50.00,  
    "fecha\_transaccion": "2024-09-01T15:30:00Z",  
    "metodo\_pago": "Tarjeta de Crédito",  
    "estado": "Completada"  
  }

* **Autenticación:** Requiere token JWT válido.

  3. **PUT /api/transacciones/{id}**  
* **Descripción:** Actualiza el estado de una transacción.  
* **Método HTTP:** \`PUT\`  
* **Parámetros de Entrada:**\`id\`: Identificador de la transacción 

  {  
    "estado": "Cancelada"  
  }  
  \`\`\`

* **Formato de Respuesta:**

  {  
    "id\_transaccion": 1,  
    "id\_boleto": 123,  
    "monto": 50.00,  
    "fecha\_transaccion": "2024-09-01T15:30:00Z",  
    "metodo\_pago": "Tarjeta de Crédito",  
    "estado": "Cancelada"  
  }

* **Autenticación:** Requiere token JWT válido.

3. **FastAPI \- Registro y Gestión de Clientes**

1. **POST /api/usuarios**  
* **Descripción:** Registra un nuevo usuario.  
* **Método HTTP:** \`POST\`  
* **Parámetros de Entrada:**

  {  
    "nombre": "Pepito Gonzalez",  
    "email": "pepito.gonzalez@gmail.com",  
    "password": "pass123"  
  }  
    
\- **Formato de Respuesta:**  
  {  
    "id\_usuario": 1,  
    "nombre": "Pepito Gonzalez",  
    "email": "pepito.gonzalez@gmail.com",  
    "fecha\_registro": "2024-09-01T12:00:00Z"  
  }

* **Autenticación:** No requiere token para el registro inicial.

2. **POST /api/login**  
* **Descripción:** Autentica a un usuario y devuelve un token JWT.  
* **Método HTTP:** \`POST\`  
* **Parámetros de Entrada:**

  {  
    "email": "pepito.gonzalez@gmail.com",  
    "password": "pass123"  
  }


* **Formato de Respuesta:**

  {  
    "access\_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  
    "token\_type": "bearer"  
  }


* **Autenticación:** No requiere token para iniciar sesión.  
3. **GET /api/usuarios/{id}**  
* **Descripción:** Obtiene los detalles de un usuario específico.  
* **Método HTTP:** \`GET\`  
* **Parámetros de Entrada:**\`id\`: Identificador del usuario  
* **Formato de Respuesta:**

  {  
    "id\_usuario": 1,  
    "nombre": "Juan Pérez",  
    "email": "juan.perez@example.com",  
    "fecha\_registro": "2024-09-01T12:00:00Z"  
  }

* **Autenticación:** Requiere token JWT válido.

 **4\. Integración con Keycloak para Autenticación y Autorización (Continuación)**

 Descripción de la Integración:

* **Autenticación:** Todos los endpoints sensibles están protegidos por autenticación basada en tokens JWT (JSON Web Tokens).   
* **Flujo:**  
  *  Registro/Iniciar Sesión:  
    * El usuario se registra a través del endpoint \`POST /api/usuarios\` en FastAPI, o inicia sesión a través de \`POST /api/login\`.  
    * Durante el inicio de sesión, las credenciales del usuario se envían a Keycloak, que verifica la autenticidad de las credenciales.  
    *  Si las credenciales son válidas, Keycloak genera un token JWT que se envía de vuelta al cliente.  
    * Este token JWT incluye información sobre el usuario, como su \`id\`, \`email\`, y \`roles\`.

       

* **Autenticación del Token:**  
  * El cliente utiliza el token JWT para acceder a los endpoints protegidos en los servicios \`.NET MVC\`, \`Spring Boot\`, y \`FastAPI\`.  
  * Cada solicitud a un endpoint protegido incluye el token JWT en el encabezado \`Authorization\` de la siguiente forma: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…  
  * Los servicios \`.NET MVC\`, \`Spring Boot\`, y \`FastAPI\` validan este token con Keycloak para asegurarse de que el token es válido y no ha expirado.

* **Autorización:**  
  * Roles: Los roles de usuario (\`Admin\`, \`Cliente\`, etc.) se gestionan en Keycloak.  
  * El token JWT generado por Keycloak incluye un claim con el rol del usuario, que es usado para controlar el acceso a los endpoints.





* **Protección de Endpoints:**   
  * Los endpoints en \`.NET MVC\`, \`Spring Boot\`, y \`FastAPI\` están configurados para permitir o denegar el acceso basado en los roles del usuario presentes en el token JWT.  
  * Por ejemplo:  
    * Solo los usuarios con el rol \`Admin\` pueden acceder a los endpoints que permiten la creación, actualización o eliminación de conciertos (\`POST\`, \`PUT\`, \`DELETE /api/conciertos\`).  
    * Los usuarios con el rol \`Cliente\` solo pueden acceder a los endpoints de compra de boletos y transacciones, pero no a la administración de conciertos.

      

*  **Renovación del Token:**  
  * Los tokens JWT tienen un tiempo de vida limitado (\`exp\` en el payload del token).  
  * Si un token está a punto de expirar, el cliente puede solicitar un nuevo token a Keycloak usando el token de refresco (\`refresh token\`), si se ha implementado ese flujo.

**Configuración en Keycloak:**


1. **Crear Realms:** Un \`Realm\` es un espacio donde se configuran los usuarios, roles, y políticas de autenticación.  
   1. Crear un \`Realm\` específico para la aplicación, por ejemplo, \`ConcertsRealm\`.

2. **Configurar Roles:**   
   1. Crear los roles necesarios como \`Admin\`, \`Cliente\` dentro del \`Realm\`.

   

3. **Definir Clientes:**   
   1. Registrar la aplicación como un \`Client\` en Keycloak, por ejemplo, \`concert-app-client\`.  
   2. Configurar el \`Client\` para usar el protocolo \`OpenID Connect\` (OIDC), que es el que maneja la autenticación y emisión de tokens JWT.

   

4. **Usuarios:**  
   1. Los usuarios pueden ser gestionados directamente en Keycloak, asignándoles los roles correspondientes.  
   2. Alternativamente, los usuarios pueden registrarse a través de la API de FastAPI, que luego interactúa con Keycloak para crear el usuario.

5. **Integración de Backends:**  
   1. Configurar los servicios en \`.NET MVC\`, \`Spring Boot\`, y \`FastAPI\` para validar los tokens JWT emitidos por Keycloak, generalmente mediante una librería de OIDC/JWT.

