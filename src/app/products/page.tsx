"use client";

import { useEffect, useState } from "react";
import { useShop } from "@/context/ShopContext";
import NavBar from "../../components/NavBar";

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export default function Shop() {
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useShop();

  useEffect(() => {
    async function fetchDrinks() {
      try {
        const res = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lemon"
        );
        const data = await res.json();
        setDrinks(data.drinks.slice(0, 9));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching drinks", error);
        setLoading(false);
      }
    }
    fetchDrinks();
  }, []);

  return (
    <div>
      <NavBar></NavBar>
      <main className="p-12 flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold mb-8 underline">Nos Limonades</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="lemonContainer w-2/3 p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-black p-6 shadow-lg">
              {drinks.map((drink) => {
                const lemonPrice = 0.5;
                const basePrice = 3.0 + drink.strDrink.length * 0.1;
                // An intriquete formula to calculate the number of lemons used based on the drink name
                const vowels = (drink.strDrink.match(/[aeiou]/gi) || []).length;
                const nameLength = drink.strDrink.length;
                const lemonsUsed = Math.max(
                  1,
                  Math.round((nameLength + vowels) / 7)
                );

                const price = parseFloat(basePrice.toFixed(2));
                const Profit = price - lemonPrice * lemonsUsed;

                return (
                  <div key={drink.idDrink} className="bg-white p-5">
                    <div className="p-4 flex flex-col items-center justify-around border-2 border-dashed min-h-[20rem]">
                      <img
                        src={drink.strDrinkThumb}
                        alt={drink.strDrink}
                        className="w-40 h-40 object-cover mb-2 fliter grayscale border-2 shadow-md opacity-90"
                      />
                      <h2 className="text-xl font-semibold">
                        {drink.strDrink}
                      </h2>
                      <div>
                        <p className="text-sm text-gray-600">
                          €{price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          lemons: {lemonsUsed}
                        </p>
                        <button
                          className="mt-2 px-4 py-1 bg-yellow-400 hover:bg-black hover:text-white hover:rounded-md"
                          onClick={() => {
                            console.log(Profit.toFixed(2));
                            addToCart({
                              id: drink.idDrink,
                              name: drink.strDrink,
                              price,
                              lemons: lemonsUsed,
                            });                            
                          }}
                        >
                          Ajouter au panier
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
