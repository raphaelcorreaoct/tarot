import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from "react";


type ButtonType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button ({children, onClick, className, ...props}:PropsWithChildren<{className?: string} & ButtonType>) {


  return (
    <button onClick={onClick} className={`bg-main text-md font-bold px-4 rounded-md py-2 border-2 ${className}`} {...props}>
      {children}
    </button>
  )
}