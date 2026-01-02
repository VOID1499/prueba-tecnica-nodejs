# Prueba Técnica Node.js + Prisma + PostgreSQL

---



## Requisitos

Instalados en el sistema

* **Node.js** `>= 18 < 21`
* **npm**
* **PostgreSQL**

---

## Postman URL documentacion publica

<https://www.postman.com/lively-flare-92708/prueba-tecnica-nodejs/

## Tecnologías utilizadas

* Node.js (ESM)
* TypeScript
* Express
* Prisma ORM
* PostgreSQL
* Zod (validaciones)
* JWT (autenticación)
* bcryptjs (hash de contraseñas)

---

## Instalación

Clonar el repositorio e instalar las dependencias:

```bash
npm install
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DATABASE_URL="postgresql://usuario:password@localhost:5432/notes"
JWT_SECRET=secret
```

> **Importante**: La base de datos `notes` debe existir previamente en PostgreSQL.

---

## Levantar base de datos con npx prisma

### Ejecutar migraciones

Para crear las tablas en la base de datos migracion inicial:
```bash
npx prisma migrate dev --name init
```
### Ejecutar migraciones

Generar el cliente necesario para poder interactuar con la base de datos
```bash
npx prisma generate
```

Esto:

* Aplica las migraciones
* Genera el cliente de Prisma

---

### Generar cliente Prisma (manual)

```bash
npx prisma generate
```

---

## Scripts npm

### Modo desarrollo (compilado)
Ejecutar build luego dev para la ejecucion del compilado en ./dist
```bash
npm run build
npm run dev
```


### Modo desarrollo con watch (TypeScript en caliente)
Ejecutar para trabajo en caliente y tener los cambios de forma automatia.
```bash
npm run dev:watch
```
Este modo utiliza:
Los cambios en el archivo .env en caliente no son reflejados de forma automatica se debe arrancar el servidor nuevamente.
* `nodemon`
* `ts-node` con loader ESM

---



##  Notas importantes

* El proyecto esta bajo una estructura de carpetas DDD separada por features.
* El proyecto utiliza **ES Modules** (`"type": "module"`).
* Prisma usa PostgreSQL como proveedor.
* El script `dev:watch` ejecuta directamente TypeScript sin build previo.
* La base de datos **no se crea automáticamente**, debe existir antes de migrar.



