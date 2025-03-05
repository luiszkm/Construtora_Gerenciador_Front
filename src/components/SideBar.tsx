import { BrickWall, House, LogOut, PlusCircle, Truck, Users } from 'lucide-react'
import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className='max-w-48  max-w-md:flex w-full h-screen border-r p-4 border-gray-700  flex-col justify-between'>
      <ul className='flex flex-col gap-4 '>
        <li>
          <Link className="flex items-center gap-4 hover:text-orange-500 hover:font-bold
           " href="/dashboard">
            <House /> Home
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-4 hover:text-orange-500 hover:font-bold
           " href="/collaborator/register">
            <PlusCircle /> Cadastrar
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-4 hover:text-orange-500 hover:font-bold
           " href="/collaborator">
            <Users />
            Colaboradores
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-4 hover:text-orange-500 hover:font-bold
           " href="/supplier">
            <Truck /> Fornecedores
          </Link>
        </li>
        <li>
          <Link className="flex items-center gap-4 hover:text-orange-500 hover:font-bold
           " href="/materials">
            <BrickWall /> Materiais
          </Link>
        </li>
     
      </ul>

      <div>
          <Link className="flex items-center gap-4 hover:text-orange-500 hover:font-bold
           " href="/">
            <LogOut />
            Sair
          </Link>
      </div>
    </aside>
  )
}
