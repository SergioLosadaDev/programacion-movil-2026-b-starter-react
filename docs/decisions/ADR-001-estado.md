# ADR-001 — Estado local por pantalla con hooks de React

- **ID:** ADR-001
- **Date:** 2026-10-12
- **Status:** Accepted
- **Authors:** Estudiante

## Context

El catálogo tiene cuatro rutas y flujos CRUD sencillos. La evaluación indica explícitamente mantener el estado de cada pantalla con `useState` y `useEffect` (o un hook propio), y el starter ya organiza pantallas como componentes React. No existe estado global compartido que justifique un store.

**Known constraints:** Ionic React mantiene vistas en memoria al navegar; la lista debe recargarse al volver. El estado de servidor se obtiene de nuevo desde API y no se cachea localmente.

## Decision

**We decided:** Mantener estado inmutable y acotado a cada página mediante `useState` y efectos para cargar datos; recargar la lista al entrar de nuevo en su vista Ionic.

**Justification:** Esta elección sigue el patrón de estado requerido por el starter y deja visibles en cada página sus transiciones de carga, datos, validación y error. Evita añadir dependencias y complejidad que no aportan valor al alcance de una única funcionalidad CRUD.

## Evaluated alternatives

| Alternative | Pros | Cons | Reason for discarding |
|-------------|------|------|-----------------------|
| Hooks locales (`useState`/`useEffect`) — elegido | Incluidos en React; estado cercano a la pantalla; simple de probar | Compartir estado entre rutas requiere coordinación | Adecuado al alcance y al requisito del ejercicio. |
| Redux/Zustand u otro store | Compartición y transiciones globales centralizadas | Dependencia y configuración adicionales; estado global innecesario | No hay flujo transversal complejo ni estado global requerido. |
| Estado mantenido en servidor/caché de consultas | Política de caché y refresco reutilizable | Nueva abstracción/dependencia y más comportamiento | Excede el alcance; los datos se vuelven a consultar al entrar. |

## Consequences

**Positive:**
- El estado de cada página es explícito y localizado.
- No se incorpora una biblioteca de estado adicional.

**Negative / Trade-offs:**
- El estado de filtros se reinicia cuando la pantalla se desmonta.
- Las solicitudes y transiciones se implementan por página y requieren pruebas cuidadosas.

**Impact on the system:**
- Affected features/screens: lista, detalle y formulario.
- Documents to update: feature de productos y README si cambia el patrón.

## References

- Framework: `01-architecture/layers-and-state.md`.
- Starter: `TODO.md`, Parte 3.
- Related to: [ADR-002](./ADR-002-consumo-api.md).
