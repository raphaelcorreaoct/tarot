import { SingUpForm } from "./form";
import { SunMoon } from "lucide-react";

export default function Play() {
  return (
    <main className="max-w-lg  w-full h-screen m-auto flex flex-col items-center p-5 text-center ">
      <SunMoon size={150} className=" mb-8" />
      <SingUpForm />
      <div className="mt-4">
        <p>
          O custo para cada consulta é de <strong>R$ 4,80</strong>{' '}
          os resultados serão enviados para o seu e-mail para que você não perca
          nada.
        </p>
      </div>
    </main>
  );
}
