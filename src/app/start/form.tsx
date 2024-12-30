'use client'
import {useState} from 'react'
import Button from "@/components/button";

export function SingUpForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(false)

  return (
    <form className='grid gap-3 w-full items-center'>
      <input value={name} onChange={(event)=> setName(event.target.value)} className='w-full h-11 rounded-md px-2 py-1 text-black' placeholder='Nome' />
      <input value={email} onChange={(event)=> setEmail(event.target.value)} className='w-full h-11 rounded-md px-2 py-1 text-black' placeholder='E-mail' />
      <label className='w-full flex justify-start'>
        <input type="checkbox" className='mr-2' checked={newsletter} onChange={()=> { setNewsletter((prev)=>!prev)}}/>
        <span>Receber e-mail com dicas e mensagens</span>
      </label>
      <Button className="w-full max-w-[250px] m-auto" type="button">Ir para o pagamento</Button>
    </form>
  );
}
