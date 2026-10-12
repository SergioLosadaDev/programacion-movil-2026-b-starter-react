# Screen — Detalle del producto

- **Route:** `/productos/:id`
- **Feature:** Catálogo de productos
- **Design reference:** Componentes Ionic existentes y tema `src/app/theme/variables.css`.

## Purpose

Consultar nombre, categoría, precio y existencias de un producto identificado por la ruta, y editarlo o eliminarlo tras confirmación.

## UI regions

| Region | Component | Notes |
|--------|-----------|-------|
| Header | `IonHeader`, `IonBackButton`, `IonTitle` | Volver a la lista. |
| Body | `IonContent` | Todos los campos; precio COP y etiqueta de stock. |
| Actions | `IonButton` | Editar y Eliminar. |
| Delete confirmation | Contenido en pantalla | Pregunta con Confirmar y Cancelar; evitar borrado accidental. |
| Feedback | Texto/`EmptyState` | Carga, no encontrado, red/API y borrado en progreso/error. |

## States

| State | Trigger | UI |
|-------|---------|-----|
| Loading | Carga del ID | Indicador/mensaje. |
| Loaded | GET 200 | Todos los campos y acciones. |
| Not found | ID válido sin producto (404) | Mensaje de producto inexistente y navegación de regreso. |
| Invalid route | ID no numérico | No solicitar API; mostrar error de ruta y retorno. |
| Error | Error de red u otro estado no exitoso | Mensaje comprensible y acción de volver o reintentar. |
| Deleting | Borrado confirmado en curso | Evitar segunda operación y comunicar progreso/error. |

## Actions

| User action | Result | Use case / event |
|-------------|--------|------------------|
| Editar | Abre `/productos/:id/editar` | Navegar por ID |
| Eliminar | Muestra confirmación en pantalla | Confirmación local |
| Cancelar | Cierra confirmación sin cambios | Cancelación local |
| Confirmar | DELETE 204 y vuelve a `/productos`; error permanece visible | `deleteProduct` |

## Accessibility

- [x] Botones nombrados Editar, Eliminar, Confirmar y Cancelar.
- [x] Confirmación textual; no depende solo del color.
- [ ] Confirmar áreas táctiles, escalado tipográfico y lector de pantalla manualmente.
