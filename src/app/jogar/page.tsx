"use client";
import cards from "@/data";
import { useState } from "react";
import Image from "next/image";

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Play() {
  const [selectedCards, setSelectedCards] = useState<typeof cards>([]);

  const handleSelect = () => {
    const randomIndex = getRandomIntInclusive(0, 78);
    alert('aaaaaaa')
    const hasCardInSelected = selectedCards.findIndex(
      (item) => item.id === `card_${randomIndex}`
    );

    // if (Boolean(hasCardInSelected)) {
    //   handleSelect();
    //   return;
    // }

    if (selectedCards.length < 3) {
      const card = cards[randomIndex];
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start m-auto max-w-[1024px] py-16 px-3">
      <div>
        <div className="grid grid-cols-3 gap-4">
          {selectedCards.map((item, i) => {
            return (
              <div key={i}>
                <Image
                  className="aspect-[9/16] w-full container rounded-lg"
                  src={item.image}
                  alt="Next.js logo"
                  width={180}
                  height={38}
                  priority
                />
                <h3 className="text-2xl my-3">{item.name}</h3>
                <div className="max-h-64 overflow-y-auto">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
{/* 
      <div className="w-full flex flex-row p-1 flex-wrap">

        {cards.map((item,i)=> {
          return <div key={`dec_${i}`}  onClick={handleSelect} className={`aspect-[9/16] w-44 bg-slate-200 rounded-md ${i !== 0?'ml-[-10.5rem]':''} border-2 border-red-200 hover:ml-[-5rem] hover:-translate-y-6`}/>
        })}
      </div> */}

      

      <div className="flex justify-center items-center w-full m-auto p-5">
        <button onClick={handleSelect} className="bg-red-400 p-5 rounded-md font-bold m-auto cursor-pointer" type="button">Retirar Carta</button>
      </div>
    </main>
  );
}
