// import { describe, expect, test } from "@jest/globals";
import { updateSubtotal, getProductDetails } from '../scripts/cart/displayCart';

describe('Cart Subtotal Calculation', () => {
  // Mock localStorage and products
  const mockProducts = [
    { id: "1", price: 10.99, name: "Product 1" },
    { id: "3", price: 25.50, name: "Product 3" }
  ];

  beforeEach(() => {
    // Set up a mock localStorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem: jest.fn(key => {
          return store[key] || null;
        }),
        setItem: jest.fn((key, value) => {
          store[key] = value.toString();
        }),
        clear: jest.fn(() => {
          store = {};
        })
      };
    })();

    // Replace localStorage with our mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock
    });

    // Populate localStorage with mock products
    localStorage.setItem('products', JSON.stringify(mockProducts));

    // Set up a mock DOM element
    document.body.innerHTML = '<div id="subtotalPrice"></div>';
  });

  test('calculates correct subtotal for multiple items', () => {
    const cartItems = [
      { id: "3", quantity: 2 },
      { id: "1", quantity: 1 }
    ];

    const subtotal = updateSubtotal(cartItems);

    // Expected calculation:
    // Product 3: $25.50 * 2 = $51.00
    // Product 1: $10.99 * 1 = $10.99
    // Total: $61.99
    expect(subtotal).toBe(61.99);

    // Check if the subtotal is correctly displayed in the DOM
    const subtotalElement = document.getElementById("subtotalPrice");
    expect(subtotalElement.textContent).toBe("$61.99");
  });

  test('handles empty cart', () => {
    const cartItems = [];

    const subtotal = updateSubtotal(cartItems);

    expect(subtotal).toBe(0);

    const subtotalElement = document.getElementById("subtotalPrice");
    expect(subtotalElement.textContent).toBe("$0.00");
  });

  test('ignores items with no product details', () => {
    const cartItems = [
      { id: "3", quantity: 2 },
      { id: "999", quantity: 1 }  // Non-existent product
    ];

    const subtotal = updateSubtotal(cartItems);

    // Should only calculate for existing products
    expect(subtotal).toBe(51.00);

    const subtotalElement = document.getElementById("subtotalPrice");
    expect(subtotalElement.textContent).toBe("$51.00");
  });

  test('getProductDetails retrieves correct product', () => {
    const product = getProductDetails("1");
    expect(product).toEqual({ id: "1", price: 10.99, name: "Product 1" });

    const nonExistentProduct = getProductDetails("999");
    expect(nonExistentProduct).toBeUndefined();
  });
});