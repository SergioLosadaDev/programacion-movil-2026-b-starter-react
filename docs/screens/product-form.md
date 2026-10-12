# Screen — Formulario de producto

- **Route:** `/productos/nuevo` (crear) y `/productos/:id/editar` (editar)
- **Feature:** Catálogo de productos
- **Design reference:** Componentes Ionic existentes y tema `src/app/theme/variables.css`.

## Purpose

Crear o modificar un producto con validación compartida con el dominio y el servidor.

## UI regions

| Region | Component | Notes |
|--------|-----------|-------|
| Header | `IonBackButton`, `IonTitle` | El título distingue creación y edición. |
| Body | Campos Ionic controlados | Nombre, precio, categoría y stock; editar precarga el producto. |
| Validation | Mensaje junto al campo | `validateProduct`; presentar errores de servidor en forma legible. |
| Actions | Botón Guardar | Desactivado durante envío; éxito vuelve a `/productos`. |
| Feedback | Error/estado de envío | Error de red, validación del API, 404 al editar u otro error. |

## States

| State | Trigger | UI |
|-------|---------|-----|
| Loading | Edición carga GET del producto | Indicador; formulario no editable aún. |
| Ready | Creación o precarga exitosa | Campos controlados y acción Guardar. |
| Invalid | Validación local falla | Errores junto a campos; no enviar. |
| Submitting | POST/PUT en curso | Deshabilitar guardado para evitar duplicados. |
| Success | POST 201 o PUT 200 | Navegar a la lista. |
| Error | API/red falla | Mensaje general más `details` cuando existan; conservar valores. |
| Not found | Producto editado no existe | Informar que no se encontró y permitir volver. |

## Actions

| User action | Result | Use case / event |
|-------------|--------|------------------|
| Editar nombre/precio/stock | Actualiza campo controlado | Estado local de formulario |
| Elegir categoría | Guarda una de cuatro categorías permitidas | Estado local de formulario |
| Guardar en creación | Valida y envía POST | `validateProduct`, `createProduct` |
| Guardar en edición | Precarga por ID, valida y envía PUT | `getProduct`, `validateProduct`, `updateProduct` |
| Volver/cancelar | Regresa sin guardar | Navegación atrás |

## Validation rules

- `name`: string no vacío después de trim; máximo 60 caracteres.
- `price`: número finito mayor que cero.
- `category`: `Bebidas`, `Snacks`, `Aseo` o `Hogar`.
- `stock`: entero mayor o igual que cero.

## Accessibility

- [x] Cada campo tiene etiqueta visible; errores asociados visualmente al campo.
- [x] No comunicar error solo con color.
- [ ] Verificar foco/lector de pantalla, objetivo táctil, texto ampliado y contraste manualmente.
