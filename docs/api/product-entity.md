# Local Entity — Product (contrato de API)

> La plantilla describe entidades persistidas; esta aplicación no tiene base local. Se conserva la estructura para especificar el modelo compartido cliente/API. La única copia mutable vive en memoria del proceso Express.

- **Store:** N/A (almacenamiento en memoria)
- **Table/collection:** N/A (almacenamiento en memoria)
- **Schema version introduced:** N/A (almacenamiento en memoria)

## Fields

| Field | Type | Null | Required / constraints |
|-------|------|------|------------------------|
| `id` | number / entero | No | Asignado incrementalmente por API; no va en POST/PUT. |
| `name` | string | No | Tras trim no vacío; máximo 60 caracteres. |
| `price` | number | No | Finito y estrictamente mayor que 0. |
| `category` | string | No | `Bebidas`, `Snacks`, `Aseo` o `Hogar`. |
| `stock` | integer | No | Mayor o igual que 0. |

## Indexes

N/A (almacenamiento en memoria).

## Relationships

N/A (almacenamiento en memoria).

## Sync

- **Synced?** No. El cliente consulta el servidor por HTTP; no hay sincronización offline.
- **Conflict policy:** N/A (almacenamiento en memoria; actualizaciones reemplazan campos validados del registro identificado).

## Migration notes

N/A (almacenamiento en memoria). Reiniciar el servidor repone los ocho productos de `server/data/products.json`; operaciones creadas/actualizadas/eliminadas no sobreviven al reinicio.
