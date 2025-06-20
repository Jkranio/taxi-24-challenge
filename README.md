# Taxi-24-challenge

> **Stack** NestJS · TypeORM · PostgreSQL · Docker Compose

---


## Descripción
Taxi24 es una nueva startup que quiere revolucionar la industria del transporte proporcionando
una solución de marca blanca existentes.
Taxi-24-challenge contiene un microservicio backend —inspirado en la prueba técnica homónima— para gestionar **conductores**, **pasajeros**, **viajes** e **invoices**.

---

## Arquitectura

```text
src/
 ├─ modules/
 │   ├─ drivers/
 │   │   ├─ domain/        (Driver models, repo‑interface)
 │   │   ├─ infrastructure/ (DriverEntity, DriverRepository)
 │   │   ├─ application/   (DriversService)
 │   │   └─ presentation/  (DriversController, DTOs)
 │   ├─ passengers/ …
 │   ├─ trips/ …
 │   └─ invoices/ …
 │
 └─ main.ts
```
---

## Variables de entorno

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
git clone https://github.com/tu‑usuario/taxi24.git
cd taxi24

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
