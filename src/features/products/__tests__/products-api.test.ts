// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { startTestServer } from './test-server';

/**
 * Prueba de la API de EJEMPLO (ya viene dada). Patrón que se espera en las pruebas de la API:
 *  1. `startTestServer()` levanta la API en un puerto libre antes de cada prueba.
 *  2. `fetch` (el de Node, sin dependencias extra) llama a la API como lo haría la app.
 *  3. Se comprueba el código de estado y el cuerpo.
 *  4. `close()` cierra el servidor al terminar.
 */
let baseUrl = '';
let close: (() => Promise<void>) | undefined;

beforeEach(async () => {
  ({ baseUrl, close } = await startTestServer());
});

afterEach(async () => {
  await close?.();
});

describe('API de productos (ejemplo)', () => {
  it('arranca y responde 404 con el formato de error en una ruta desconocida', async () => {
    const response = await fetch(`${baseUrl}/api/no-existe`);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({ error: expect.any(String), details: expect.any(Array) });
  });
});

describe('POST /api/products', () => {
  it('responde 400 con todos los detalles cuando el producto es inválido', async () => {
    const response = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: ' ', price: -1, category: 'Otra', stock: 1.2 }),
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error).toEqual(expect.any(String));
    expect(body.details).toHaveLength(4);
    expect(body.details).toEqual(expect.arrayContaining([
      expect.stringContaining('name'),
      expect.stringContaining('price'),
      expect.stringContaining('category'),
      expect.stringContaining('stock'),
    ]));
  });
});

describe('GET /api/products/:id', () => {
  it('responde 404 con error y details para un id inexistente', async () => {
    const response = await fetch(`${baseUrl}/api/products/9999`);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body).toEqual({ error: expect.any(String), details: expect.arrayContaining([expect.any(String)]) });
  });

  it('responde 400 si el id de ruta no contiene solo dígitos', async () => {
    const response = await fetch(`${baseUrl}/api/products/abc`);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body).toEqual({ error: expect.any(String), details: expect.arrayContaining([expect.any(String)]) });
  });
});

describe('CRUD de productos', () => {
  it('crea, consulta, actualiza y elimina un producto con los estados requeridos', async () => {
    const createdResponse = await fetch(`${baseUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '  Té verde  ', price: 2500, category: 'Bebidas', stock: 10 }),
    });
    const created = await createdResponse.json();
    expect(createdResponse.status).toBe(201);
    expect(created).toMatchObject({ id: 9, name: 'Té verde', price: 2500, category: 'Bebidas', stock: 10 });

    const getResponse = await fetch(`${baseUrl}/api/products/${created.id}`);
    expect(getResponse.status).toBe(200);
    expect(await getResponse.json()).toEqual(created);

    const updateResponse = await fetch(`${baseUrl}/api/products/${created.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Té negro', price: 3000, category: 'Bebidas', stock: 8 }),
    });
    expect(updateResponse.status).toBe(200);
    expect(await updateResponse.json()).toMatchObject({ id: 9, name: 'Té negro', price: 3000, stock: 8 });

    const deleteResponse = await fetch(`${baseUrl}/api/products/${created.id}`, { method: 'DELETE' });
    expect(deleteResponse.status).toBe(204);
    expect(await deleteResponse.text()).toBe('');
  });

  it('combina búsqueda sin distinguir mayúsculas y categoría exacta', async () => {
    const response = await fetch(`${baseUrl}/api/products?search=AGUA&category=Bebidas`);
    const products = await response.json();
    expect(response.status).toBe(200);
    expect(products.map((product: { id: number }) => product.id)).toEqual([1]);
  });
});
