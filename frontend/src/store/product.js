// store/product.js
import { create } from 'zustand';

export const useProductStore = create(set => ({
  products: [],

  setProducts: products => set({ products }),

  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      set({ products: data });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },

  createProduct: async newProduct => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: 'Please fill in all fields' };
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        throw new Error('Failed to create product');
      }

      const data = await res.json();
      set(state => ({ products: [...state.products, data] }));

      return { success: true, message: 'Product created successfully' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
