# Definition of Done — Parcial práctico C2

Un requisito se marca completo solo cuando existe evidencia en implementación, documentación o verificación. Las casillas se actualizarán con resultados observados antes de la entrega.

## Requirements checklist

- [x] Matriz de trazabilidad enlaza requisitos, artefactos, aceptación y pruebas.
- [ ] Cinco endpoints implementados con códigos y errores especificados.
- [ ] Validación API/client cubre todas las reglas y devuelve todos los errores detectados.
- [ ] Filtros de nombre y categoría funcionan individualmente y combinados.
- [ ] App CRUD con lista, detalle y formulario compartido crear/editar.
- [ ] Lista distingue carga, colección vacía, sin resultados y error con reintento.
- [ ] Errores 400/404/red se presentan de forma comprensible; DELETE 204 sin parsing.
- [ ] Kotlin contiene `Product`, `stockLabel`, `applyDiscount` y `main` con tres productos.
- [ ] Al menos cuatro pruebas nuevas pasan: dos unitarias y dos de integración API.
- [x] README documenta instalación, entorno, comandos y ambas secciones inglesas de 3–5 frases.
- [x] `.env` ignorado y `.env.example` presente; la revisión de archivos versionados no encontró `.env`.
- [x] Documentación se confirmó antes del primer commit de implementación.
- [x] Mínimo seis commits significativos con Conventional Commits en rama de funcionalidad.
- [ ] `npm test` pasa: 8 unitarias pasan; 6 pruebas API no pueden abrir el listener (`listen EPERM`) en este sandbox.
- [x] `npm run lint` pasa: verificado sin errores ni warnings.
- [x] `npm run build` pasa; Vite informa que el chunk principal supera 500 kB.
- [ ] `npm run server` y `npm run dev` funcionan extremo a extremo: Vite no puede enlazar `::1:5173` (`listen EPERM`); el proceso del servidor imprime el mensaje de inicio, pero el sandbox no permite verificar peticiones ni mantener el listener.
- [ ] Rama subida y Pull Request hacia `main` del fork propio creado y enlazado: push bloqueado porque este entorno no resuelve `github.com`.
- [ ] Verificación manual de accesibilidad y plataformas documentada: pendiente / no exigida por el flujo automatizado del examen.

## Delivery checklist

- [ ] Destino PR verificado como fork del estudiante.
- [ ] Descripción de PR incluye resumen, cambios, resultados reales de pruebas y este checklist.
- [ ] URL del PR pegada como texto en la entrega Moodle.

## Traceability

Consultar [`traceability-matrix.md`](./traceability-matrix.md) para el vínculo requisito → artefacto → aceptación → prueba.
