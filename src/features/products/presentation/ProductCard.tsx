import { IonItem, IonLabel, IonNote } from '@ionic/react';
import type { ProductView } from '../domain/product';

export interface ProductCardProps {
  product: ProductView;
  /** Se invoca con el id del producto cuando la persona toca la tarjeta. */
  onSelect?: (id: number) => void;
}

/**
 * Tarjeta reutilizable de un producto (se usa en la lista).
 *
 * Presentational card: receives an already formatted view model and delegates selection.
 */
const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => (
  <IonItem
    button={Boolean(onSelect)}
    detail={Boolean(onSelect)}
    onClick={() => onSelect?.(product.id)}
    aria-label={`${product.name}, ${product.category}, ${product.priceLabel}, ${product.stockLabel}`}
  >
    <IonLabel>
      <h2>{product.name}</h2>
      <p>{product.category}</p>
      <p>{product.priceLabel}</p>
      <p>{product.stockLabel}</p>
    </IonLabel>
    {(product.isLowStock || product.isOutOfStock) && (
      <IonNote slot="end" color={product.isOutOfStock ? 'danger' : 'warning'}>
        {product.isOutOfStock ? 'Agotado' : 'Pocas unidades'}
      </IonNote>
    )}
  </IonItem>
);

export default ProductCard;
