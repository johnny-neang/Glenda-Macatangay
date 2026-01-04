import { useCart } from "@/hooks/use-shopify-cart";
import { X, Minus, Plus, ShoppingBag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CartSidebar() {
  const { cart, isOpen, isLoading, closeCart, updateQuantity, removeFromCart, checkout } = useCart();

  const lines = cart?.lines?.edges?.map((edge) => edge.node) || [];
  const totalAmount = cart?.cost?.totalAmount?.amount || "0";
  const currencyCode = cart?.cost?.totalAmount?.currencyCode || "USD";

  const formatPrice = (amount: string, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(parseFloat(amount));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5" />
                <h2 className="text-xl font-serif">Your Cart</h2>
                {cart?.totalQuantity && cart.totalQuantity > 0 && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {cart.totalQuantity}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-muted transition-colors"
                data-testid="button-close-cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                  <p className="text-lg font-serif mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">
                    Add items to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {lines.map((line) => (
                    <div key={line.id} className="flex gap-4 pb-6 border-b border-border" data-testid={`cart-item-${line.id}`}>
                      {line.merchandise.product.featuredImage?.url && (
                        <div className="w-20 h-24 bg-muted overflow-hidden flex-shrink-0">
                          <img
                            src={line.merchandise.product.featuredImage.url}
                            alt={line.merchandise.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif text-sm leading-tight mb-1">
                          {line.merchandise.product.title}
                        </h3>
                        {line.merchandise.product.description && (
                          <p className="text-xs text-muted-foreground mb-4 leading-relaxed italic">
                            {line.merchandise.product.description}
                          </p>
                        )}
                        {line.merchandise.title !== "Default Title" && (
                          <p className="text-xs text-muted-foreground mb-2">
                            {line.merchandise.title}
                          </p>
                        )}
                        <p className="text-sm font-bold">
                          {formatPrice(line.merchandise.priceV2.amount, line.merchandise.priceV2.currencyCode)}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity - 1)}
                            disabled={isLoading}
                            className="w-8 h-8 border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                            data-testid={`button-decrease-${line.id}`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.id, line.quantity + 1)}
                            disabled={isLoading}
                            className="w-8 h-8 border border-border flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-50"
                            data-testid={`button-increase-${line.id}`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(line.id)}
                            disabled={isLoading}
                            className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
                            data-testid={`button-remove-${line.id}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatPrice(totalAmount, currencyCode)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
                <button
                  onClick={checkout}
                  disabled={isLoading}
                  className="w-full bg-primary text-white py-4 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  data-testid="button-checkout"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
