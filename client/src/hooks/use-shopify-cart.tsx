import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      featuredImage?: {
        url: string;
      };
    };
  };
}

interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: {
    edges: Array<{ node: CartLine }>;
  };
}

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  checkout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_ID_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const cartId = localStorage.getItem(CART_ID_KEY);
    if (cartId) {
      fetchCart(cartId);
    }
  }, []);

  const fetchCart = async (cartId: string) => {
    try {
      const response = await fetch(`/api/shopify/cart/${encodeURIComponent(cartId)}`);
      if (response.ok) {
        const cartData = await response.json();
        if (cartData) {
          setCart(cartData);
        } else {
          localStorage.removeItem(CART_ID_KEY);
        }
      } else {
        localStorage.removeItem(CART_ID_KEY);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      localStorage.removeItem(CART_ID_KEY);
    }
  };

  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      let response;
      if (cart) {
        response = await fetch("/api/shopify/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart.id, variantId, quantity }),
        });
      } else {
        response = await fetch("/api/shopify/cart/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ variantId, quantity }),
        });
      }

      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
        localStorage.setItem(CART_ID_KEY, cartData.id);
        setIsOpen(true);
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      if (quantity <= 0) {
        await removeFromCart(lineId);
        return;
      }

      const response = await fetch("/api/shopify/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId: cart.id, lineId, quantity }),
      });

      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/shopify/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId: cart.id, lineIds: [lineId] }),
      });

      if (response.ok) {
        const cartData = await response.json();
        setCart(cartData);
        if (cartData.totalQuantity === 0) {
          localStorage.removeItem(CART_ID_KEY);
        }
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const checkout = () => {
    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        updateQuantity,
        removeFromCart,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
