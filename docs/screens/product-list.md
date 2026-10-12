# Screen — Lista de productos

- **Route:** `/productos`
- **Feature:** Catálogo de productos
- **Design reference:** Componentes Ionic existentes y tema `src/app/theme/variables.css`.

## Purpose

Consultar el catálogo, encontrar productos por nombre y acotar la lista por categoría; abrir un producto o iniciar su creación.

## UI regions

| Region | Component | Notes |
|--------|-----------|-------|
| Header | `IonHeader`, `IonToolbar`, `IonTitle` | Título Productos. |
| Search | `IonInput` | Búsqueda incremental por subcadena, sin distinguir mayúsculas. |
| Category filters | `IonButton` | Todas, Bebidas, Snacks, Aseo y Hogar; un filtro activo. |
| Body | `ProductCard` dentro de lista Ionic | Nombre, categoría, precio COP y aviso de stock. |
| Empty/error | `EmptyState` | Mensaje específico; error ofrece Reintentar. |
| Footer/action | `IonButton` | Navega a `/productos/nuevo`. |

## States

| State | Trigger | UI |
|-------|---------|-----|
| Loading | Petición inicial o recarga al volver | Indicador/mensaje de carga; evita confundirlo con lista vacía. |
| Loaded | GET 200 con productos | Tarjetas filtradas. |
| Empty | GET 200 devuelve arreglo vacío | EmptyState que identifica colección vacía y permite crear. |
| No results | Hay productos, pero los filtros no encuentran coincidencias | EmptyState distinto; limpiar búsqueda o elegir Todas. |
| Error | Fetch falla o API responde no exitoso | Mensaje de error y botón Reintentar. |
| Offline | No hay respuesta del servidor | Mensaje de conexión y reintento; no se muestran datos cacheados. |

## Actions

| User action | Result | Use case / event |
|-------------|--------|------------------|
| Escribir búsqueda | Actualiza coincidencias por subcadena | `filterProducts` |
| Elegir categoría | Combina categoría con búsqueda | `filterProducts` |
| Tocar tarjeta | Abre `/productos/:id` | Navegar por ID |
| Reintentar | Vuelve a solicitar colección | `getProducts` |
| Nuevo producto | Abre `/productos/nuevo` | Navegar a creación |

## Accessibility

- [x] Controles con etiquetas accesibles y nombre del producto en la tarjeta.
- [x] Acciones realizables con controles Ionic y orden de lectura natural.
- [ ] Confirmar área táctil mínima, escala de texto y contraste en revisión manual de plataforma.
- No indicar stock solo mediante color: mostrar también su etiqueta textual.
