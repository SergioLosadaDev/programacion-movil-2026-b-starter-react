# Feature — Catálogo de productos

- **Owner:** Estudiante
- **Status:** In progress
- **Related stories:** Requisitos 1–30 de `TODO.md` (Parcial práctico C2)

## Purpose

Permitir consultar, buscar, filtrar y administrar productos de un catálogo pequeño mediante una aplicación Ionic React conectada a una API Express. La API conserva los cambios en memoria durante la ejecución y vuelve a los ocho productos semilla al reiniciarse.

## Screens

| Screen | Route | Purpose |
|--------|-------|---------|
| Lista de productos | `/productos` | Consultar, buscar y filtrar productos; distinguir carga, colección vacía, cero coincidencias y error. |
| Nuevo producto | `/productos/nuevo` | Crear un producto validado. |
| Detalle de producto | `/productos/:id` | Consultar todos los campos y elegir editar o eliminar. |
| Editar producto | `/productos/:id/editar` | Cargar y actualizar un producto existente. |

Las especificaciones están en [`../screens/product-list.md`](../screens/product-list.md), [`../screens/product-detail.md`](../screens/product-detail.md) y [`../screens/product-form.md`](../screens/product-form.md). Crear y editar comparten formulario.

## State

- **Pattern:** Estado local de página con `useState` y efectos de ciclo de vida (`useEffect`; la lista también se recarga al volver a entrar en la vista Ionic). Ver [ADR-001](../decisions/ADR-001-estado.md).
- **State objects:** datos de productos o formulario, filtros, estado de carga/guardado, errores de petición y confirmación de borrado; cada página mantiene solo el estado que presenta.
- **Key transitions:** lista `loading → ready` o `loading → error`; `ready` distingue colección vacía, resultados y sin coincidencias. Formularios `idle → submitting → success/error`; el detalle `loading → loaded/not-found/error`, y el borrado confirmado vuelve a la lista.

## Data

- **Use cases:** listar y filtrar; consultar por ID; crear; actualizar; eliminar.
- **Repositories:** el cliente HTTP `data/products-api.ts` encapsula las llamadas fetch.
- **Remote sources / endpoints:** `GET /api/products?search=&category=`, `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id` (contrato en [`../api/products-endpoints.md`](../api/products-endpoints.md)).
- **Local persistence:** N/A; el cliente no persiste datos localmente y el servidor usa un arreglo en memoria basado en `server/data/products.json`.

## Edge cases & states

- [x] Loading
- [x] Empty collection distinta de cero coincidencias
- [x] Error y reintento al cargar la lista
- [x] Sin conexión reflejada como error recuperable
- [x] Producto inexistente y parámetro ID inválido
- [x] Validación de cada campo y errores múltiples del servidor
- [x] Prevención de envíos duplicados y confirmación de borrado
- [ ] Operación offline; fuera del alcance porque no existe persistencia local

## Decisions

- [ADR-001 — Estado por página con React hooks](../decisions/ADR-001-estado.md)
- [ADR-002 — Consumo HTTP con fetch y ApiError](../decisions/ADR-002-consumo-api.md)

## Tests

- **Unit:** validación (todos los campos y errores múltiples), transformación/precio/etiqueta de stock y filtros combinados.
- **UI:** comprobar estados y acciones de lista, detalle y formulario cuando las herramientas de pruebas lo permitan.
- **Integration:** endpoints de API con `startTestServer()`: validación 400, producto inexistente 404 y ruta desconocida 404.

## Acceptance criteria

- La API implementa los cinco endpoints, sus códigos y el formato `{ error, details }`; filtra por búsqueda sin distinguir mayúsculas y categoría exacta.
- Las operaciones POST/PUT validan nombre (texto no vacío, máximo 60), precio positivo, categoría permitida y stock entero no negativo; informan todos los problemas detectados.
- La aplicación completa la navegación CRUD, representa los cuatro estados de lista, valida antes de guardar y expone los errores del servidor.
- Kotlin imprime tres productos, etiqueta stock nullable y calcula el descuento del 10 %.
- Las pruebas, lint y build pasan; la documentación precede al primer commit de implementación.
