import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-between p-12">
        <h1 className="text-5xl font-bold underline">Le Mon Noire</h1>
        <p className="text-lg">une boutique en ligne de limonade</p>
        <section className="relative w-[28rem] h-[39rem] flex flex-row-reverse mt-10">
          <img src="/img/bgMenu.svg" alt="" className="size-fit" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ul className="p-8 text-2xl underline bg-white bg-opacity-80 w-48 text-center shadow-md">
              <li className="mb-2">
                <Link href="/products">Carte</Link>
              </li>
              <li><Link href="/checkout">Á la caisse</Link></li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
