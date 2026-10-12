# Endpoint Integration — Productos

- **Feature:** Catálogo de productos
- **Base URL:** `API_URL` (por defecto `http://localhost:3000`)
- **Auth required:** No

El cliente usa `fetch` y JSON. Los errores de la API tienen forma `{ "error": "mensaje", "details": ["..."] }`; el helper los representa como `ApiError` (mensaje, status y details). Error de conexión tiene `status: null`. No hay caché local; la lista se vuelve a pedir al regresar.

## GET /api/products

### Request

| Param | In | Type | Required | Notes |
|-------|----|------|----------|-------|
| `search` | query | string | No | Subcadena del nombre, sin distinguir mayúsculas. |
| `category` | query | string | No | Coincidencia exacta con categoría. |

**Body:** N/A.

### Response

**Success (200):** arreglo JSON de productos `Product[]`.

**App behavior:** Lista y aplica también `filterProducts`; carga, colección vacía, sin coincidencias y error se representan por separado. Reintentar vuelve a llamar el endpoint.

### Errors

| Status | Meaning | App behavior |
|--------|---------|--------------|
| Network (`status: null`) | API no responde | Mensaje de conexión y botón Reintentar. |
| 500 | Error inesperado | Mensaje de error y reintento. |

### Caching / offline

- **Strategy:** Online-only; filtros de pantalla se aplican a los datos cargados.
- **Cached entity:** N/A (almacenamiento en memoria del servidor; no hay caché local).
- **TTL / invalidation:** N/A; recarga al entrar en la vista.

## GET /api/products/:id

### Request

| Param | In | Type | Required | Notes |
|-------|----|------|----------|-------|
| `id` | path | dígitos / entero | Sí | ID numérico positivo asignado por el servidor. |

**Body:** N/A.

### Response

**Success (200):** objeto `Product` solicitado.

**App behavior:** detalle valida que el parámetro sea numérico, carga por ID y muestra todos los campos.

### Errors

| Status | Meaning | App behavior |
|--------|---------|--------------|
| 400 | ID no numérico (`parseId` devuelve null) | Informar ID inválido; no presentar como producto faltante. |
| 404 | ID válido inexistente | Mostrar producto no encontrado y permitir volver. |
| 500 / red | Fallo inesperado o de conectividad | Mensaje recuperable. |

### Caching / offline

- **Strategy:** Online-only.
- **Cached entity:** N/A (almacenamiento en memoria).
- **TTL / invalidation:** N/A.

## POST /api/products

### Request

Sin parámetros.

**Body:**

```json
{ "name": "Agua mineral 600 ml", "price": 1800, "category": "Bebidas", "stock": 120 }
```

`name` string no vacío tras trim, máximo 60; `price` numérico > 0; `category` una de `Bebidas`, `Snacks`, `Aseo`, `Hogar`; `stock` entero ≥ 0. El servidor asigna ID incremental.

### Response

**Success (201):** objeto `Product` creado, incluyendo `id`.

**App behavior:** validar localmente; deshabilitar envío duplicado; al éxito volver a lista.

### Errors

| Status | Meaning | App behavior |
|--------|---------|--------------|
| 400 | Datos inválidos; `details` contiene todos los problemas | Mostrar mensaje y cada detalle junto al formulario. |
| 500 / red | Fallo inesperado o de conectividad | Conservar formulario y mostrar error recuperable. |

### Caching / offline

- **Strategy:** Online-only; no reintentar automáticamente POST.
- **Cached entity:** N/A (almacenamiento en memoria).
- **TTL / invalidation:** N/A; lista se recarga al regresar.

## PUT /api/products/:id

### Request

| Param | In | Type | Required | Notes |
|-------|----|------|----------|-------|
| `id` | path | dígitos / entero | Sí | ID del producto existente. |

**Body:** mismo objeto editable y mismas reglas de validación de POST; `id` se obtiene de la ruta.

### Response

**Success (200):** objeto `Product` actualizado.

**App behavior:** precargar producto, validar, evitar doble envío y volver a lista al éxito.

### Errors

| Status | Meaning | App behavior |
|--------|---------|--------------|
| 400 | ID malformado o datos inválidos | Mensaje de ID o errores/detalles de campos. |
| 404 | Producto no existe | Mostrar que el registro dejó de existir. |
| 500 / red | Fallo inesperado o de conectividad | Conservar valores y mostrar error. |

### Caching / offline

- **Strategy:** Online-only; no reintentar automáticamente PUT.
- **Cached entity:** N/A (almacenamiento en memoria).
- **TTL / invalidation:** N/A; lista se recarga al regresar.

## DELETE /api/products/:id

### Request

| Param | In | Type | Required | Notes |
|-------|----|------|----------|-------|
| `id` | path | dígitos / entero | Sí | ID del producto existente. |

**Body:** N/A.

### Response

**Success (204):** sin cuerpo. `request<void>` no intenta analizar JSON.

**App behavior:** pedir confirmación simple en pantalla antes de borrar; volver a lista al éxito.

### Errors

| Status | Meaning | App behavior |
|--------|---------|--------------|
| 400 | ID no numérico | Informar solicitud inválida. |
| 404 | Producto inexistente | Informar que ya no se encuentra; mantener el detalle hasta que usuario vuelva. |
| 500 / red | Fallo inesperado o de conectividad | Mostrar error, no afirmar que se eliminó. |

### Caching / offline

- **Strategy:** Online-only; no reintentar automáticamente DELETE.
- **Cached entity:** N/A (almacenamiento en memoria).
- **TTL / invalidation:** N/A; la lista se consulta al regresar.
