import Image from "next/image";

import cards from "@/data";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="grid grid-cols-6 gap-4">

       
        {cards.map((item, i) => {
          return (
            <div key={i}>
              <Image
                className="aspect-[9/16] w-full"
                src={item.image}
                alt="Next.js logo"
                width={180}
                height={38}
                priority
              />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
         </div>
      </main>
    </div>
  );
}
