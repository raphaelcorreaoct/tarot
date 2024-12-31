'use client'
import {useState} from 'react'
import Button from "@/components/button";
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '@/services/payment.service';

export function SingUpForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false);

  const router = useRouter()


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //router.push('/jogar')
    await createCheckoutSession({
      name,
      email,
      newsletter
    });

  }

  return (
    <form className='grid gap-3 w-full items-center' onSubmit={onSubmit}>
      <input value={name} onChange={(event)=> setName(event.target.value)} name="name" className='w-full h-11 rounded-md px-2 py-1 text-black' placeholder='Nome' required/>
      <input value={email} onChange={(event)=> setEmail(event.target.value)} name="email" className='w-full h-11 rounded-md px-2 py-1 text-black' placeholder='E-mail' required/>
      <label className='w-full flex justify-start'>
        <input type="checkbox" className='mr-2' checked={newsletter} onChange={()=> { setNewsletter((prev)=>!prev)}} required/>
        <span>Receber e-mail com dicas e mensagens</span>
      </label>
      <Button className="w-full max-w-[250px] m-auto" >Ir para o pagamento</Button>
    </form>
  );
}
