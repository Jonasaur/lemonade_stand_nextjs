"use client";
import NavBar from "../../components/NavBar";
import { useShop } from "@/context/ShopContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useShop();

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const totalLemons = cart.reduce((sum, item) => sum + item.lemons, 0);
  const totalProfit = cart.reduce(
    (sum, item) => sum + (item.price - item.lemons * 0.5),
    0
  );

  return (
    <div>
      <NavBar />
      <main className="p-12 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-5xl font-bold mb-6 underline">le reçu</h2>
        <div className="lemonContainer w-1/2 p-10">
          {cart.length === 0 ? (
            <div className="bg-white p-6 shadow-lg text-center border-2">
              <p className="text-gray-600">Votre panier est vide.</p>
            </div>
          ) : (
            <>
              <ul className="space-y-4 mb-6 text-left">
                {cart.map((item, idx) => (
                  <li key={idx} className="bg-white border-2 p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Citrons: {item.lemons}
                        </p>
                        <p className="text-sm text-green-600">
                          Profit: €{(item.price - item.lemons * 0.5).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-lg font-medium">
                        €{item.price.toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="bg-white text-lg space-y-1 mb-6 p-4 border-4 border-dashed">
                <p>
                  <strong>Total:</strong> €{total.toFixed(2)}
                </p>
                <p>Citrons utilisés: {totalLemons}</p>
                <p className="text-green-700 font-medium">
                  Profit total: €{totalProfit.toFixed(2)}
                </p>

                <button
                  onClick={clearCart}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-black"
                >
                  Finaliser l’achat
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
