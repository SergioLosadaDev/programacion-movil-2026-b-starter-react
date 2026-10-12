import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getErrorMessage } from '../data/api-error';
import { getProducts } from '../data/products-api';
import { CATEGORIES, filterProducts, toProductView, type Product } from '../domain/product';
import EmptyState from './EmptyState';
import ProductCard from './ProductCard';

type LoadStatus = 'loading' | 'ready' | 'error';
const CATEGORY_OPTIONS = ['Todas', ...CATEGORIES] as const;

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const isLoadingRef = useRef(false);
  const history = useHistory();

  const loadProducts = useCallback(async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setStatus('loading');
    setErrorMessage('');
    try {
      setProducts(await getProducts());
      setStatus('ready');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setStatus('error');
    } finally {
      isLoadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  useIonViewWillEnter(() => {
    void loadProducts();
  });

  const visibleProducts = filterProducts(products, { search, category });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          className="ion-padding-horizontal"
          label="Buscar productos"
          labelPlacement="stacked"
          placeholder="Escriba un nombre"
          type="search"
          value={search}
          onIonInput={(event) => setSearch(String(event.detail.value ?? ''))}
        />
        <div className="ion-padding-horizontal" role="group" aria-label="Filtrar por categoría">
          {CATEGORY_OPTIONS.map((option) => (
            <IonButton
              key={option}
              fill={(category || 'Todas') === option ? 'solid' : 'outline'}
              aria-pressed={(category || 'Todas') === option}
              onClick={() => setCategory(option === 'Todas' ? '' : option)}
            >
              {option}
            </IonButton>
          ))}
        </div>

        {status === 'loading' && <p className="ion-padding" role="status">Cargando productos…</p>}
        {status === 'error' && (
          <EmptyState
            title="No se pudo cargar"
            message={errorMessage}
            actionLabel="Reintentar"
            onAction={() => void loadProducts()}
          />
        )}
        {status === 'ready' && products.length === 0 && (
          <EmptyState title="No hay productos" message="El catálogo está vacío. Puede crear el primer producto." />
        )}
        {status === 'ready' && products.length > 0 && visibleProducts.length === 0 && (
          <EmptyState title="Sin resultados" message="Pruebe otra búsqueda o seleccione Todas las categorías." />
        )}
        {status === 'ready' && visibleProducts.length > 0 && (
          <div className="ion-padding-horizontal" aria-label="Resultados de productos">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={toProductView(product)}
                onSelect={(id) => history.push(`/productos/${id}`)}
              />
            ))}
          </div>
        )}
        <IonButton className="ion-margin" onClick={() => history.push('/productos/nuevo')}>
          Nuevo producto
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProductListPage;
