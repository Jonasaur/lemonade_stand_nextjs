import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function NavBar() {
  const { cart } = useShop(); 
  return (
    <nav className="flex justify-between items-center p-4 bg-black text-white shadow-md px-5">
      <div className="text-2xl font-bold">Le Mon Noire</div>
      <ul className="flex items-center space-x-6">
        <li className="text-lg">
          <Link href="/">Home</Link>
        </li>
        <li className="text-lg">
          <Link href="/products">Carte</Link>
        </li>
        <li className="relative">
          <Link href="/checkout">
            <ShoppingCart className="w-8 h-8 hover:text-yellow-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
