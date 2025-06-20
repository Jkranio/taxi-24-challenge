# Taxi-24-challenge


## Descripción
Taxi24 es una nueva startup que quiere revolucionar la industria del transporte proporcionando
una solución de marca blanca existentes.
Taxi-24-challenge contiene un microservicio backend —inspirado en la prueba técnica homónima— para gestionar **conductores**, **pasajeros**, **viajes** e **invoices**.

---
## Prerequisitos

- **Node.js**: Versión 18 o superior  
- **npm**: Instalado junto con Node.js  
- **Docker**: Para ejecutar los contenedores de base de datos y Adminer  
- **Docker Compose**: Para orquestar los servicios definidos en `docker-compose.yml`

---

## Arquitectura
El proyecto sigue una arquitectura modular basada en principios de diseño limpio (Clean Architecture). Cada módulo representa una funcionalidad específica del sistema y está dividido en capas para separar las responsabilidades. Esto facilita el mantenimiento, escalabilidad y pruebas del código.
```text
src/
 ├─ modules/
 │   ├─ drivers/
 │   │   ├─ domain/         # Define los modelos y las interfaces del repositorio.
 │   │   ├─ infrastructure/ # Implementa las entidades y repositorios específicos.
 │   │   ├─ application/    # Contiene la lógica de negocio (servicios).
 │   │   └─ presentation/   # Maneja la interacción con el usuario (controladores, DTOs).
 │   ├─ passengers/ …
 │   ├─ trips/ …
 │   └─ invoices/ …
 │
 └─ main.ts
```
### Descripción de las Capas
**Domain:**

Contiene los modelos de datos y las interfaces que definen los contratos del repositorio.
Es independiente de cualquier implementación específica.

**Infrastructure:**

Implementa las entidades y repositorios que interactúan directamente con la base de datos u otros servicios externos.
Aquí se define cómo se almacenan y recuperan los datos.

**Application:**

Contiene la lógica de negocio del módulo.
Los servicios en esta capa orquestan las operaciones entre las capas de dominio e infraestructura.

**Presentation:**

Maneja la interacción con el usuario o cliente (API REST, DTOs, controladores).
Es la capa más cercana al cliente y traduce las solicitudes en operaciones del sistema.

---

## Variables de entorno
Se debe crear un archivo `.env` en la raiz del proyecto que contenga las variables necesarias para levantar el microservicio.
En el archivo `.env.example` encontrarás las declaraciones de dichas variables y en la tabla siguiente propuestas para sus valores junto a sus definiciones.

| Variable       | Propuesta                                 | Descripción                                  |
| -------------- | ----------------------------------------- | -------------------------------------------- |
| `PORT`         | `3000`                                    | Nro de puerto donde se levantará el ms       |
| `DB_HOST`      | `localhost`                               | Host de la base de datos                     |
| `DB_PORT`      | `5433`                                    | Puerto donde se levanta la base de datos     |
| `DB_USERNAME`  | `taxi24`                                  | Username de la base de datos                 |
| `DB_PASSWORD`  | `taxi24`                                  | Contraseña de la base de datos               |
| `DB_NAME`      | `taxi24`                                  | Nombre de la base de datos                   |
| `NODE_ENV`     | `development`                             | Entorno de ejecución                         |

`.env.example` contiene todas.

---


## Instalación y puesta en marcha

```bash
# Clonar el repositorio
git clone https://github.com/Jkranio/taxi-24-challenge.git
cd taxi-24-challenge

# Instalación de dependencias
npm install

# Levantar Postgres & Adminer con seed inicial
docker compose up -d

# Arranca la API
npm run start:dev      # http://localhost:3000
```

La dockerización levanta dos contenedores:

1. **db** – PostgreSQL 15  
2. **adminer** – interfaz web ligera para explorar la base

Adminer te permite visualizar tablas, lanzar consultas SQL y comprobar los datos sembrados sin instalar herramientas locales.  
Después de ejecutar `docker compose up -d`:

* Abre **http://localhost:8080**  
* Selecciona _PostgreSQL_ como sistema  
* Indica **db** como servidor  
* Usuario / contraseña de la base de datos

### Utils:

Al mismo tiempo, el contenedor **db** ejecuta automáticamente los scripts que encuentra en `/docker-entrypoint-initdb.d/`.  
El archivo **`/db-init/00-schema-and-seed.sql`** crea todo el esquema y carga datos de ejemplo, de modo que al abrir Adminer —o llamar a los endpoints— la base ya contiene las tablas y registros necesarios para probar la API.

En el repositorio encontrarás la colección **Taxi24.postman_collection.json**.  
La colección sirve como ilustración de la API y guía de uso: muestra el formato de los payloads y los endpoints declarados en este documento. 

Ten en cuenta que algunos requests (p. ej. GET /drivers/:id) se basan en IDs generados durante el seed inicial; por lo cual esos IDs podrian no existir  en tu entorno de ejecución y el endpoint devolverá 404.

Ajusta los identificadores según los registros que tengas en tu entorno antes de ejecutar la petición.


---

## Especificación de la API

> **Base URL:** `http://localhost:3000/`

Aunque cada modulo expone internamente su CRUD completo, útil para administración y pruebas, solo un subconjunto de endpoints satisface los requisitos de la prueba técnica:

### Drivers

| Método | Endpoint                                 | Descripción                               
| ------ | ---------------------------------------- | ----------------------------------------- 
| `GET`  | `/drivers`                               | Lista de todos los conductores.        
| `GET`  | `/drivers/available`                     | Lista conductores con `status=AVAILABLE`. 
| `GET`  | `/drivers/nearby?lat=…&lng=…&radiusKm=3` | Lista de conductores dentro del radio de 3km.             
| `GET`  | `/drivers/:id`                           | Obtener conductor por su Id.        

### Trips 

| Método | Endpoint             | Descripción                                            
| ------ | -------------------- | ------------------------------------------------------ 
| `POST` | `/trips`             | Crea viaje. Requiere sus respectivas referencias a driver y passenger
| `PATCH`| `/trips/:id/complete`| Completa el viaje actualizando su status a `status=FINISHED`.
| `GET`  | `/trips/active`      | Lista de todos los viajes activos. `status=REQUESTED/ONGOING`

### Passengers

| Método | Endpoint          | Descripción          |
| ------ | ----------------- | -------------------- |
| `GET`  | `/passengers`     | Lista de todos los pasajeros.
| `GET`  | `/passengers/:id` | Obtener pasajero por su Id.
| `GET`  | `passengers/:id/nearest-drivers?lat=-…&lng=…&limit=3` | Obtener lista de los 3 conductores mas cercanos al punto de partida.   

---

© 2025 
