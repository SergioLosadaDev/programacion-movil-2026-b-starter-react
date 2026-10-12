import { describe, expect, it } from 'vitest';
import seedProducts from '../../../../server/data/products.json';
import {
  CATEGORIES,
  filterProducts,
  formatCOP,
  LOW_STOCK_THRESHOLD,
  toProductView,
  validateProduct,
  type Product,
} from '../domain/product';

/**
 * Pruebas unitarias de EJEMPLO (ya vienen dadas) para que `npm test` corra desde el inicio.
 * Muestran el estilo esperado: describe / it / expect, sin red ni pantallas.
 */
describe('datos semilla de la API (ejemplo)', () => {
  it('trae 8 productos con ids 1 a 8', () => {
    expect(seedProducts).toHaveLength(8);
    expect(seedProducts.map((item) => item.id)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('usa solo categorías permitidas y stock entero no negativo', () => {
    for (const item of seedProducts) {
      expect(CATEGORIES).toContain(item.category);
      expect(Number.isInteger(item.stock)).toBe(true);
      expect(item.stock).toBeGreaterThanOrEqual(0);
    }
  });

  it('incluye productos agotados y con pocas unidades para probar las etiquetas', () => {
    expect(seedProducts.some((item) => item.stock === 0)).toBe(true);
    expect(seedProducts.some((item) => item.stock > 0 && item.stock < LOW_STOCK_THRESHOLD)).toBe(true);
  });
});

describe('formatCOP (ejemplo)', () => {
  it('separa los miles con punto y antepone el signo de pesos', () => {
    expect(formatCOP(1250000)).toBe('$ 1.250.000');
    expect(formatCOP(8500)).toBe('$ 8.500');
    expect(formatCOP(950)).toBe('$ 950');
  });
});

describe('validateProduct', () => {
  it('rechaza todos los campos inválidos y conserva un problema por campo', () => {
    const result = validateProduct({ name: '  ', price: 0, category: 'Otro', stock: 1.5 });
    expect(result.isValid).toBe(false);
    expect(result.errors).toMatchObject({
      name: expect.any(String),
      price: expect.any(String),
      category: expect.any(String),
      stock: expect.any(String),
    });
  });

  it('acepta valores en los límites permitidos', () => {
    expect(validateProduct({ name: ' Producto ', price: 0.01, category: 'Hogar', stock: 0 })).toEqual({
      isValid: true,
      errors: {},
    });
  });
});

describe('toProductView', () => {
  it('formatea el precio, limpia el nombre y deriva la disponibilidad', () => {
    const soldOut = toProductView({ id: 1, name: '  Agua  ', price: 1250000, category: 'Bebidas', stock: 0 });
    const lowStock = toProductView({ id: 2, name: 'Jugo', price: 4500, category: 'Bebidas', stock: 4 });
    expect(soldOut).toMatchObject({ name: 'Agua', priceLabel: '$ 1.250.000', stockLabel: 'Agotado', isOutOfStock: true });
    expect(lowStock).toMatchObject({ stockLabel: 'Pocas unidades', isLowStock: true });
  });
});

describe('filterProducts', () => {
  it('combina búsqueda insensible a mayúsculas con categoría y no muta la entrada', () => {
    const products: Product[] = [
      { id: 1, name: 'Agua mineral', price: 1, category: 'Bebidas', stock: 1 },
      { id: 2, name: 'Agua de aseo', price: 1, category: 'Aseo', stock: 1 },
      { id: 3, name: 'Jugo', price: 1, category: 'Bebidas', stock: 1 },
    ];
    const result = filterProducts(products, { search: 'AGUA', category: 'Bebidas' });
    expect(result.map((product) => product.id)).toEqual([1]);
    expect(result).not.toBe(products);
    expect(products).toHaveLength(3);
  });
});
