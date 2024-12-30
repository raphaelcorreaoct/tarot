"use client";
import cards from "@/data";
import { useState } from "react";
import Image from "next/image";
import Card from "@/components/card";

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Play() {
  const [selectedCards, setSelectedCards] = useState<typeof cards>([]);

  const handleSelect = () => {
    const randomIndex = getRandomIntInclusive(0, 78);
 
    const hasCardInSelected = selectedCards.findIndex(
      (item) => item.id === `card_${randomIndex}`
    );

    if (selectedCards.length < 3) {
      const card = cards[randomIndex];
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  return (
    <main className="max-w-lg  w-full h-screen m-auto flex flex-col items-center p-5 text-center ">
        <div className="w-full grid gap-2 grid-cols-4">
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>

        <div className="my-10">
          <p>Abaixo estão as cartas do barlho 
          escolha uma por vez mentalizando o que você gostaria de saber</p>
        </div>

        <div className="w-full flex flex-wrap translate-x-[45px]">
          {cards.map((item, i)=> {

            return (
              <Card key={item.id} className="ml-[-45px] max-w-[75px]"/>
            )
          })}

        </div>
 
    </main>
  );
}
