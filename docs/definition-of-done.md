# Definition of Done — Parcial práctico C2

Un requisito se marca completo solo cuando existe evidencia en implementación, documentación o verificación. Las casillas se actualizarán con resultados observados antes de la entrega.

## Requirements checklist

- [x] Matriz de trazabilidad enlaza requisitos, artefactos, aceptación y pruebas.
- [x] Cinco endpoints implementados con códigos y errores especificados (suite de API: 6/6).
- [x] Validación API/client cubre todas las reglas y devuelve todos los errores detectados.
- [x] Filtros de nombre y categoría funcionan individualmente y combinados (integración API y unidad).
- [ ] App CRUD con lista, detalle y formulario compartido crear/editar.
- [ ] Lista distingue carga, colección vacía, sin resultados y error con reintento.
- [ ] Errores 400/404/red se presentan de forma comprensible; DELETE 204 sin parsing.
- [ ] Kotlin contiene `Product`, `stockLabel`, `applyDiscount` y `main` con tres productos.
- [x] Al menos cuatro pruebas nuevas pasan: cuatro unitarias nuevas y pruebas de integración API; `npm test` pasó con 14/14.
- [x] README documenta instalación, entorno, comandos y ambas secciones inglesas de 3–5 frases.
- [x] `.env` ignorado y `.env.example` presente; la revisión de archivos versionados no encontró `.env`.
- [x] Documentación se confirmó antes del primer commit de implementación.
- [x] Mínimo seis commits significativos con Conventional Commits en rama de funcionalidad.
- [x] `npm test` pasa: 14 pruebas en 2 archivos, según ejecución del usuario en el entorno local.
- [x] `npm run lint` pasa: verificado sin errores ni warnings.
- [x] `npm run build` pasa; Vite informa que el chunk principal supera 500 kB.
- [ ] `npm run server` y `npm run dev` funcionan extremo a extremo: Vite no puede enlazar `::1:5173` (`listen EPERM`); el proceso del servidor imprime el mensaje de inicio, pero el sandbox no permite verificar peticiones ni mantener el listener.
- [ ] Últimos commits subidos y Pull Request hacia `main` del fork propio creado: el commit de actualización DoD aún debe subirse; `gh auth status` reporta token inválido y no hay conexión GitHub confirmada.
- [ ] Verificación manual de accesibilidad y plataformas documentada: pendiente / no exigida por el flujo automatizado del examen.

## Delivery checklist

- [ ] Destino PR verificado como fork del estudiante.
- [ ] Descripción de PR incluye resumen, cambios, resultados reales de pruebas y este checklist.
- [ ] URL del PR pegada como texto en la entrega Moodle.

## Traceability

Consultar [`traceability-matrix.md`](./traceability-matrix.md) para el vínculo requisito → artefacto → aceptación → prueba.
