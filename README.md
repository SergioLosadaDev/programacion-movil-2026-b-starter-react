# Catálogo de productos · Starter Ionic React (versión 2)

Parcial práctico del corte 2 · Programación Móvil · CORHUILA 2026-B (modalidad individual).

Este repositorio es el punto de partida. El proyecto tiene tres piezas que se construyen durante el parcial, siguiendo el [Mobile Governance Framework](https://github.com/jesusarielgb-works/mobile-governance-framework):

- **API Express** (`server/`): CRUD de productos con validación, filtros y manejo de errores.
- **App Ionic React** (`src/`): lista con búsqueda y filtro, detalle, y formulario de crear y editar, organizada por capas.
- **Ejercicio Kotlin** (`kotlin/Product.kt`): modelo y funciones básicas, con lo visto en la semana 7.

Además, la **documentación** (`docs/`) se escribe antes del código, a partir de las plantillas del framework.

> El enunciado oficial es el PDF de la actividad en Moodle. Este README es un resumen; si algo difiere, manda el PDF.

## Cómo ejecutar

Requisito: Node.js 22.12 o superior (`node --version`).

```bash
npm install        # instala dependencias (una sola vez)
npm run server     # arranca la API en http://localhost:3000
npm run dev        # arranca la app en http://localhost:5173 (en otra terminal)
npm test           # corre las pruebas (Vitest)
npm run lint       # revisión de estilo del código
npm run build      # revisión de tipos y compilación para producción
```

La app y la API se ejecutan al mismo tiempo, cada una en su terminal. La app lee la dirección de la API de la variable `VITE_API_URL`: copie `.env.example` como `.env` si necesita cambiarla. El archivo `.env` está ignorado por Git; nunca se versiona.

El ejercicio Kotlin es independiente de la app: copie `kotlin/Product.kt` en [Kotlin Playground](https://play.kotlinlang.org) y ejecútelo con **Run**. No requiere crear un proyecto Android.

Rutas de la app: `/productos` (lista), `/productos/nuevo`, `/productos/:id` (detalle) y `/productos/:id/editar`.

La API implementa el CRUD en memoria y la app incluye lista, detalle y formularios para crear y editar. Antes de entregar, ejecute `npm test`, `npm run lint` y `npm run build`; registre los resultados observados en `docs/definition-of-done.md`.

## Flujo de entrega

1. Haga un **fork** de este repositorio a su cuenta de GitHub y clónelo.
2. Cree una rama de funcionalidad: `git switch -c feature/productos`.
3. Trabaje la lista de [TODO.md](./TODO.md), en orden, con commits pequeños en formato [Conventional Commits](https://www.conventionalcommits.org/): `type(scope): resumen` (por ejemplo, `docs(productos): describe la funcionalidad` o `feat(api): agrega el endpoint de lista`).
4. Los documentos de `docs/` van **antes** que el código: el primer commit de código debe ser posterior al commit de documentación.
5. Abra un **Pull Request hacia el `main` de su propio fork** (no hacia el repositorio original), con una descripción de lo hecho y el checklist de `docs/definition-of-done.md` marcado.
6. Pegue el **enlace del PR** en la actividad de Moodle (texto en línea) antes del cierre: sábado 10 de octubre de 2026, 11:59 p. m.

## Qué se evalúa (5,0)

| Parte | Puntos |
|---|---|
| 1. Documentar antes de codificar | 0,75 |
| 2. API Express | 1,0 |
| 3. App Ionic | 1,5 |
| 4. Kotlin | 0,5 |
| 5. Calidad | 0,5 |
| 6. Git y entrega | 0,25 |
| 7. Inglés | 0,5 |

El detalle de cada criterio está en [TODO.md](./TODO.md).

## Contrato de la API (resumen)

Recurso `/api/products` con `{ id: number, name: string, price: number, category: string, stock: integer }`. Los datos semilla están en `server/data/products.json` y se guardan en memoria (se reinician al reiniciar el servidor).

| Método y ruta | Éxito | Errores |
|---|---|---|
| `GET /api/products?search=&category=` | 200 + arreglo | — |
| `GET /api/products/:id` | 200 + objeto | 400 (id no numérico) · 404 |
| `POST /api/products` | 201 + objeto creado | 400 |
| `PUT /api/products/:id` | 200 + objeto actualizado | 400 · 404 |
| `DELETE /api/products/:id` | 204 sin cuerpo | 400 · 404 |

Validación: `name` obligatorio (máximo 60 caracteres), `price` número mayor que 0, `category` una de `Bebidas`, `Snacks`, `Aseo` o `Hogar`, y `stock` entero mayor o igual que 0. Todo error usa el formato `{ "error": "mensaje", "details": ["..."] }`; una ruta desconocida responde 404 con ese formato, y un error inesperado, 500.

## Estructura

```text
docs/                         especificaciones, ADRs, contratos y trazabilidad
  features/ screens/ decisions/ api/ definition-of-done.md
kotlin/Product.kt             ejercicio Kotlin independiente
server/
  app.js                      createApp(): CRUD, validación y manejo de errores
  index.js                    arranque en el puerto 3000
  data/products.json          8 productos semilla
src/app/                      arranque, rutas y tema
src/features/products/        funcionalidad organizada por capas del framework
  data/                       configuración, ApiError y operaciones HTTP fetch
  domain/product.ts           tipos, validación, transformación, filtros y formato COP
  presentation/               lista, detalle, formulario, EmptyState y ProductCard
  __tests__/                  pruebas unitarias e integración API
```

Capas (framework, `01-architecture/layers-and-state`): `presentation` depende de `domain` y de `data`; `data` depende de `domain`; `domain` no depende de nada. El estado de cada pantalla puede vivir en la misma página con `useState` y `useEffect`.

## State management decision

Each page keeps its view state with React `useState`, while `useEffect` loads detail and form data when a route opens. The product list also refreshes when its Ionic view becomes active again, so changes made on another screen appear after returning. This keeps loading, form, filter, and error state close to the screen that renders it without adding a global store. If the app grows to share complex state across many features, we can evaluate a dedicated store and record that change in a new ADR.

## API error handling

The shared `request` helper uses the configured `API_URL` and turns a fetch connection failure into an `ApiError` with a null status. For non-success HTTP responses it preserves the server message, status code, and `details` array; it also handles DELETE 204 without trying to parse a body. Express returns a structured 404 for unknown routes and its central error handler returns a structured 500 for unexpected failures, while malformed JSON is reported as 400. The interface shows connection and not-found messages, displays validation details beside the product form, and does not report failed writes as successful.

---

Las plantillas de `docs/` provienen del Mobile Governance Framework (licencia MIT; ver `docs/LICENSE-mobile-governance-framework.txt`).
