"use client";
import cards from "@/data";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import Card from "@/components/card";
import { useParams } from "next/navigation";

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const deck = Array.from({ length: 27 }, (_, i) => i + 1);

export default function Play() {
  const [selectedCards, setSelectedCards] = useState<typeof cards>([]);
  const [suport, setSuport] = useState<number[]>([0, 0, 0, 0]);
  const [focusedCard, setFocusCard] = useState<(typeof cards)[0] | null>(null);

  const [iterpretation, setInterpretation] = useState<null | string>(null);

  const [show, setShow] = useState<boolean>(false);

  const params = useParams<{id:string}>();
  const {id} = params;


  const handleSelect = () => {
    const randomIndex = getRandomIntInclusive(0, 78);
    const card = cards[randomIndex];
    const hasItem = selectedCards.findIndex((item) => item?.id === card?.id);

    if (hasItem >= 0) {
      handleSelect();
      return;
    }

    if (selectedCards.length <= 3) {
      setSuport((prev) => prev.slice(0, -1));
      setSelectedCards((prev) => {
        return [...prev, card];
      });
    }
  };

  useEffect(() => {
    if (selectedCards.length === 4) {
      setInterpretation("<p>Aqui uma interpretação</p>");
    }
  }, [selectedCards]);

  return (
    <main className="max-w-lg  w-full h-screen m-auto flex flex-col items-center p-5 text-center ">
      <div className="w-full grid gap-2 grid-cols-4">
        {selectedCards.map((item) => (
          <Card
            image={item.image}
            key={item.id}
            alt={item.name}
            onClick={() => {
              setFocusCard(item);
              setShow(true);
            }}
          />
        ))}
        {suport.map((_, i) => (
          <Card key={`suport_${i}`} />
        ))}
      </div>

      <div className="my-10">
        <p>
          Abaixo estão as cartas do baralho escolha uma por vez mentalizando o
          que você gostaria de saber
        </p>
      </div>

      {selectedCards.length < 4 && (
        <div className="relative w-full h-64">
          {deck.map((_, i) => {
            return (
              <Card
                key={i}
                className={`absolute max-w-[75px] hover:translate-y-[-75px]`}
                onClick={handleSelect}
                style={{
                  left: i * 8,
                }}
              />
            );
          })}
        </div>
      )}

      {iterpretation && (
        <div className="w-full flex flex-1 flex-col justify-start items-start">
          <h2 className="text-4xl font-bold my-4">Interpretação</h2>
          <div dangerouslySetInnerHTML={{ __html: iterpretation }} />
        </div>
      )}

      <div
        className={`fixed top-0 left-0 bg-black w-screen h-screen justify-center ${
          show ? "flex" : "hidden"
        } `}
      >
        <button className="fixed top-3 right-3" onClick={() => setShow(false)}>
          <XCircle size={45} />
        </button>
        {focusedCard && (
          <div className="max-w-lg w-full">
            <Card
              className="max-w-[200px] m-auto mt-6"
              image={focusedCard?.image}
              alt={focusedCard?.name}
            />
            <h3 className="text-4xl font-bold mt-4">{focusedCard?.name}</h3>

            <div className="mt-4 text-left">{focusedCard?.description}</div>
          </div>
        )}
      </div>
    </main>
  );
}
