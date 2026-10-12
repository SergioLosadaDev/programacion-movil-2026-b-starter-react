# Matriz de trazabilidad — Parcial práctico C2

Estados actualizados con el trabajo hecho y la evidencia disponible. `Completed` identifica entregables revisados o verificaciones ejecutadas; el código que aún no pudo ejecutarse permanece `In Progress`. Las referencias numeradas corresponden a `TODO.md` y al resumen del enunciado oficial.

| Requirement | Implementation / documentation | Acceptance criteria | Verification | Status |
|-------------|--------------------------------|--------------------|--------------|--------|
| Feature, state, screens, endpoints, edge cases (TODO 1) | `docs/features/productos.md`; ADRs | Alcance y flujos completos descritos | Revisión documental | Completed |
| Screen list / detail / form (TODO 2) | `docs/screens/product-list.md`, `product-detail.md`, `product-form.md` | Regiones, estados, acciones, accesibilidad documentadas | Revisión documental | Completed |
| State decision (TODO 3) | `docs/decisions/ADR-001-estado.md` | Contexto, decisión, alternativas y efectos | Revisión documental | Completed |
| API consumption decision (TODO 4) | `docs/decisions/ADR-002-consumo-api.md` | fetch/API_URL/ApiError y errores descritos | Revisión documental | Completed |
| Five endpoint contracts (TODO 5) | `docs/api/products-endpoints.md` | Métodos, parámetros, códigos, validación, filtros y UI definidos | Revisión documental | Completed |
| Product entity contract (TODO 6) | `docs/api/product-entity.md` | Tipos, nullabilidad y restricciones documentadas | Revisión documental | Completed |
| Error handlers supplied (TODO 11) | `server/app.js`; `products-api.test.ts`; README | Ruta desconocida 404 y central 500 descritos; test 404 existente | API integration test passed in user's environment; README reviewed | Completed |
| API CRUD and validation (TODO 7–10) | `server/app.js` | 200/201/204/400/404 contract; all validation problems | Full CRUD, invalid payload, invalid/missing ID and filters tested; 6/6 API tests passed | Completed |
| HTTP client operations (TODO 12) | `src/features/products/data/products-api.ts` | Five operations; handles 204 and ApiError | Revisión de código; test/build pendientes | In Progress |
| Domain rules (TODO 13) | `src/features/products/domain/product.ts` | validation, view mapping, filtering, COP format and stock labels | Unit tests escritos; no ejecutables sin dependencias | In Progress |
| Product list (TODO 14) | `ProductListPage.tsx`, `ProductCard.tsx`, `EmptyState.tsx` | Four states, search/category, navigation, refresh-on-return | Revisión de código; UI/API run pendiente | In Progress |
| Reusable product card (TODO 15) | `presentation/ProductCard.tsx` | Typed props, product fields and visible stock warning | Revisión de código; UI pendiente | In Progress |
| Product detail (TODO 16) | `presentation/ProductDetailPage.tsx` | All fields, ID validation, edit/delete confirmation and 404 | Revisión de código; UI/API run pendiente | In Progress |
| Create/edit form (TODO 17) | `presentation/ProductFormPage.tsx` | Prefill, field errors, server details, duplicate-send guard | Revisión de código; UI/API run pendiente | In Progress |
| Routes/navigation (TODO 18) | `src/app/App.tsx` | Four required paths navigate by ID | Rutas base existentes; app no ejecutada | In Progress |
| Kotlin exercise (TODO 19–21) | `kotlin/Product.kt` | Nullable stock, labels, discount, three output records | Código revisado; compilador/Playground no disponible | In Progress |
| Four new tests (TODO 22) | `src/features/products/__tests__/` | ≥2 unit + ≥2 API integration tests passing | User reports `npm test`: 14/14 tests passed, including all 6 API tests | Completed |
| DoD and secrets (TODO 23–24) | This file; `.gitignore`; `.env.example` | Checklist refleja evidencia; no `.env` versionado | Revisión Git; `.env` ignored, ejemplo tracked | Completed |
| Branch and commits (TODO 25–26) | Git history | Feature branch and ≥6 meaningful conventional commits | Branch `feature/catalogo-productos` pushed to own fork; history reviewed | Completed |
| PR and README execution (TODO 27–28) | README; GitHub PR | PR to own fork; startup instructions | Base branch pushed; final docs commit needs push; `gh auth status` reports invalid token; PR not created | Blocked |
| English sections (TODO 29–30) | Root `README.md` | Each required heading has 3–5 accurate English sentences | Conteo y revisión manual | Completed |
| Quality commands / first commit ordering | DoD; Git history | tests, lint, build pass; docs commit precedes code | User reports 14 tests passed; lint/build passed locally; docs commit precedes code | Completed |
