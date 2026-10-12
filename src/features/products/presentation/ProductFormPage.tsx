import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState, type FormEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { ApiError, getErrorMessage } from '../data/api-error';
import { createProduct, getProduct, updateProduct } from '../data/products-api';
import { CATEGORIES, validateProduct, type ProductField, type ProductInput } from '../domain/product';
import EmptyState from './EmptyState';

type FormStatus = 'loading' | 'ready' | 'error';
const emptyInput: ProductInput = { name: '', price: NaN, category: '', stock: NaN };

const ProductFormPage: React.FC = () => {
  const { id: rawId } = useParams<{ id?: string }>();
  const isEditing = rawId !== undefined;
  const id = rawId && /^\d+$/.test(rawId) ? Number(rawId) : NaN;
  const isValidId = Number.isSafeInteger(id) && id > 0;
  const [input, setInput] = useState<ProductInput>(emptyInput);
  const [status, setStatus] = useState<FormStatus>(isEditing ? (isValidId ? 'loading' : 'error') : 'ready');
  const [errors, setErrors] = useState<Partial<Record<ProductField, string>>>({});
  const [serverDetails, setServerDetails] = useState<string[]>([]);
  const [requestError, setRequestError] = useState(isEditing && !isValidId ? 'El identificador del producto no es válido.' : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!isEditing || !isValidId) return;
    let isCurrent = true;
    void getProduct(id).then((product) => {
      if (!isCurrent) return;
      setInput({ name: product.name, price: product.price, category: product.category, stock: product.stock });
      setStatus('ready');
    }).catch((error: unknown) => {
      if (!isCurrent) return;
      setRequestError(getErrorMessage(error));
      setStatus('error');
    });
    return () => { isCurrent = false; };
  }, [id, isEditing, isValidId]);

  const updateField = <K extends keyof ProductInput>(field: K, value: ProductInput[K]) => {
    setInput((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerDetails([]);
    setRequestError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    const validation = validateProduct(input);
    setErrors(validation.errors);
    setServerDetails([]);
    setRequestError('');
    if (!validation.isValid) return;

    setIsSubmitting(true);
    try {
      if (isEditing) await updateProduct(id, { ...input, name: input.name.trim() });
      else await createProduct({ ...input, name: input.name.trim() });
      history.replace('/productos');
    } catch (error) {
      if (error instanceof ApiError) {
        setServerDetails(error.details);
        setRequestError(error.message);
      } else {
        setRequestError(getErrorMessage(error));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (field: ProductField) => errors[field] && (
    <p role="alert" className="ion-padding-start" style={{ color: 'var(--ion-color-danger)' }}>{errors[field]}</p>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/productos" /></IonButtons>
          <IonTitle>{isEditing ? 'Editar producto' : 'Nuevo producto'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {status === 'loading' && <p role="status">Cargando producto…</p>}
        {status === 'error' && (
          <EmptyState title={isEditing ? 'No se pudo cargar el producto' : 'Identificador inválido'} message={requestError} />
        )}
        {status === 'ready' && (
          <form onSubmit={(event) => void handleSubmit(event)} noValidate>
            <IonItem>
              <IonInput
                label="Nombre"
                labelPlacement="floating"
                fill="outline"
                maxlength={60}
                value={input.name}
                aria-invalid={Boolean(errors.name)}
                onIonInput={(event) => updateField('name', String(event.detail.value ?? ''))}
              />
            </IonItem>
            {fieldError('name')}
            <IonItem>
              <IonInput
                label="Precio"
                labelPlacement="floating"
                fill="outline"
                type="number"
                min="0.01"
                step="any"
                value={Number.isNaN(input.price) ? '' : input.price}
                aria-invalid={Boolean(errors.price)}
                onIonInput={(event) => updateField('price', event.detail.value === '' ? NaN : Number(event.detail.value))}
              />
            </IonItem>
            {fieldError('price')}
            <IonLabel className="ion-padding-top">Categoría</IonLabel>
            <div role="group" aria-label="Categoría">
              {CATEGORIES.map((category) => (
                <IonButton
                  key={category}
                  type="button"
                  fill={input.category === category ? 'solid' : 'outline'}
                  aria-pressed={input.category === category}
                  onClick={() => updateField('category', category)}
                >
                  {category}
                </IonButton>
              ))}
            </div>
            {fieldError('category')}
            <IonItem>
              <IonInput
                label="Stock"
                labelPlacement="floating"
                fill="outline"
                type="number"
                min="0"
                step="1"
                value={Number.isNaN(input.stock) ? '' : input.stock}
                aria-invalid={Boolean(errors.stock)}
                onIonInput={(event) => updateField('stock', event.detail.value === '' ? NaN : Number(event.detail.value))}
              />
            </IonItem>
            {fieldError('stock')}
            {requestError && <p role="alert">{requestError}</p>}
            {serverDetails.length > 0 && (
              <div role="alert">
                <IonLabel>Detalles de validación del servidor</IonLabel>
                <ul>{serverDetails.map((detail, index) => <li key={`${detail}-${index}`}>{detail}</li>)}</ul>
              </div>
            )}
            <IonButton expand="block" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Guardando…' : 'Guardar'}
            </IonButton>
          </form>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductFormPage;
