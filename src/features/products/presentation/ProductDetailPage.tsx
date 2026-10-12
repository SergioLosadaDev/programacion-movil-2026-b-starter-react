import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { getErrorMessage } from '../data/api-error';
import { deleteProduct, getProduct } from '../data/products-api';
import { toProductView, type Product } from '../domain/product';
import EmptyState from './EmptyState';

type DetailStatus = 'loading' | 'ready' | 'error';

const ProductDetailPage: React.FC = () => {
  const { id: rawId } = useParams<{ id: string }>();
  const id = /^\d+$/.test(rawId) ? Number(rawId) : NaN;
  const isValidId = Number.isSafeInteger(id) && id > 0;
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<DetailStatus>(isValidId ? 'loading' : 'error');
  const [errorMessage, setErrorMessage] = useState(isValidId ? '' : 'El identificador del producto no es válido.');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  const loadProduct = useCallback(async () => {
    if (!isValidId) return;
    setStatus('loading');
    setErrorMessage('');
    try {
      setProduct(await getProduct(id));
      setStatus('ready');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setStatus('error');
    }
  }, [id, isValidId]);

  useEffect(() => {
    void loadProduct();
  }, [loadProduct]);

  const confirmDelete = async () => {
    setIsDeleting(true);
    setErrorMessage('');
    try {
      await deleteProduct(id);
      history.replace('/productos');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
      setIsConfirmingDelete(false);
    } finally {
      setIsDeleting(false);
    }
  };

  const view = product ? toProductView(product) : null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/productos" />
          </IonButtons>
          <IonTitle>Detalle del producto</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {status === 'loading' && <p role="status">Cargando producto…</p>}
        {status === 'error' && (
          <EmptyState
            title={errorMessage.includes('encontramos') ? 'Producto no encontrado' : 'No se pudo cargar el producto'}
            message={errorMessage}
            actionLabel={isValidId ? 'Reintentar' : undefined}
            onAction={isValidId ? () => void loadProduct() : undefined}
          />
        )}
        {status === 'ready' && view && (
          <>
            <IonList>
              <IonItem><IonLabel><h2>Nombre</h2><p>{view.name}</p></IonLabel></IonItem>
              <IonItem><IonLabel><h2>Categoría</h2><p>{view.category}</p></IonLabel></IonItem>
              <IonItem><IonLabel><h2>Precio</h2><p>{view.priceLabel}</p></IonLabel></IonItem>
              <IonItem><IonLabel><h2>Stock</h2><p>{view.stock}</p></IonLabel></IonItem>
              <IonItem><IonLabel><h2>Disponibilidad</h2><p>{view.stockLabel}</p></IonLabel></IonItem>
            </IonList>
            <IonButton expand="block" routerLink={`/productos/${id}/editar`}>Editar</IonButton>
            {!isConfirmingDelete ? (
              <IonButton expand="block" color="danger" onClick={() => setIsConfirmingDelete(true)}>
                Eliminar
              </IonButton>
            ) : (
              <section aria-label="Confirmar eliminación">
                <p>¿Eliminar este producto?</p>
                <IonButton color="danger" disabled={isDeleting} onClick={() => void confirmDelete()}>
                  {isDeleting ? 'Eliminando…' : 'Confirmar'}
                </IonButton>
                <IonButton fill="outline" disabled={isDeleting} onClick={() => setIsConfirmingDelete(false)}>
                  Cancelar
                </IonButton>
              </section>
            )}
            {errorMessage && <p role="alert">{errorMessage}</p>}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductDetailPage;
