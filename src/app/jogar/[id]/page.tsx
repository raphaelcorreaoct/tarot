"use client";
import cards from "@/data";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import Card from "@/components/card";
import { useParams } from "next/navigation";
import getConsulta, { getDescription, updateConsultaById } from "./action";
import { useRouter } from "next/navigation";

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const deck = Array.from({ length: 27 }, (_, i) => i + 1);

export default function Play() {
  const [selectedCards, setSelectedCards] = useState<typeof cards>([]);
  const [support, setSupport] = useState<number[]>([0, 0, 0, 0]);
  const [focusedCard, setFocusCard] = useState<(typeof cards)[0] | null>(null);

  const [iterpretation, setInterpretation] = useState<null | string>(null);

  const [show, setShow] = useState<boolean>(false);

  const [gameEnd, setGameEnd] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);

  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = params;

  const handleSelect = () => {
    const randomIndex = getRandomIntInclusive(0, 78);
    const card = cards[randomIndex];
    const hasItem = selectedCards.findIndex((item) => item?.id === card?.id);

    if (hasItem >= 0) {
      handleSelect();
      return;
    }

    if (selectedCards.length <= 3) {
      setSupport((prev) => prev.slice(0, -1));
      setSelectedCards((prev) => {
        return [...prev, card];
      });
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedCards.length === 4 && !gameEnd) {
        const IAInterpretation = await getDescription([
          selectedCards[0].name,
          selectedCards[1].name,
          selectedCards[2].name,
          selectedCards[3].name,
        ]);
        setInterpretation(IAInterpretation);
        updateConsultaById(id, {
          gameEnd: true,
          data: {
            cards: selectedCards,
            interpretation: IAInterpretation,
          },
        });
      }
    })();
  }, [selectedCards]);

  useEffect(() => {
    if (id) {
      (async () => {
        const consulta = await getConsulta(id);

        if (!consulta?.paymentAccept) {
          router.replace("/");
        }

        if (consulta?.data) {
          setSupport([]);
          setSelectedCards(consulta?.data?.cards);
          setInterpretation(consulta?.data?.interpretation);
          setGameEnd(consulta?.gameEnd || false);
        }

        setLoading(false);
      })();
    }
  }, [id]);

  if (loading) return <h1>Carregando...</h1>;

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
        {support.map((_, i) => (
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
          <div
            className="w-full text-left gap-4 grid flex-1 overflow-y-auto max-h-96"
            dangerouslySetInnerHTML={{ __html: iterpretation }}
          />
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
