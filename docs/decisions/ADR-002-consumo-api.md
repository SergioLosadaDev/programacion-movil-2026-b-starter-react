# ADR-002 — Consumo de API con fetch y errores tipados

- **ID:** ADR-002
- **Date:** 2026-10-12
- **Status:** Accepted
- **Authors:** Estudiante

## Context

La app Ionic debe consumir un servidor Express en desarrollo y diferenciar fallas de red de respuestas HTTP fallidas. El starter entrega `API_URL`, `ApiError`, `getErrorMessage` y un `request<T>` usado por `getProducts`; deben conservarse y extenderse con las operaciones CRUD.

**Known constraints:** API local en puerto 3000; configuración mediante `VITE_API_URL`; sin autenticación ni almacenamiento persistente; DELETE responde 204 sin JSON.

## Decision

**We decided:** Centralizar fetch, serialización JSON, lectura de errores y tratamiento de 204 en el helper `request<T>` de `data/products-api.ts`, usar `API_URL` y propagar `ApiError` con status y details para que cada pantalla decida su presentación.

**Justification:** Reutiliza el patrón ya dado y mantiene los detalles HTTP en la capa data. Los formularios pueden mostrar los `details` de validación, y el detalle puede distinguir 404; los fallos de conexión conservan `status: null`.

## Evaluated alternatives

| Alternative | Pros | Cons | Reason for discarding |
|-------------|------|------|-----------------------|
| `fetch` encapsulado y `ApiError` — elegido | Nativo, ya provisto, contrato uniforme | Debe manejar explícitamente JSON, errores y 204 | Alineado al starter y evita dependencias. |
| Axios | Interceptores y configuración integrados | Nueva dependencia para cinco rutas sencillas | No es necesario y no sigue el ejemplo provisto. |
| `fetch` independiente en cada pantalla | Código inicial directo | Duplica URL, parsing, status y tratamiento de errores | Rompe separación por capas y consistencia. |

## Consequences

**Positive:**
- `API_URL` se configura sin editar código y todas las operaciones comparten parsing.
- `ApiError` conserva mensaje, status y `details`; un `status` nulo identifica error de red.
- DELETE 204 no intenta analizar un cuerpo inexistente.

**Negative / Trade-offs:**
- No hay caché, timeout, retry automático ni cancelación centralizada; no se requieren para el alcance del examen.
- La API de desarrollo usa HTTP local; esto no define una configuración de producción.

**Impact on the system:**
- Affected features/screens: cliente de productos y estados de lista, detalle y formulario.
- Documents to update: endpoints y README si cambia el contrato de errores.

## References

- Framework: `03-api-and-data/api-networking.md`.
- Starter: `data/products-api.ts` y `data/api-error.ts`.
- Related to: [ADR-001](./ADR-001-estado.md).
