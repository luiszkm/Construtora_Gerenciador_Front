import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { ArrowUpDown } from 'lucide-react'
import { Input } from './ui/input'


interface THeadProps {
  columnName: string
  valueFilter: string
  onSort: () => void
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Thead({ columnName, onSort, onChange,valueFilter }: THeadProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Função para manter o dropdown aberto
  const handleInputClick = (event: React.MouseEvent) => {
    event.stopPropagation();  
    setIsOpen(true); 
  };
  
    // Função para fechar o menu, se necessário
    const handleInputBlur = () => {
      setIsOpen(true); 
    };
  return (
<DropdownMenu open={isOpen} onOpenChange={setIsOpen}> 
<DropdownMenuTrigger asChild>
  <Button className='hover:text-orange-400 cursor-pointer bg-transparent border-none' variant="outline">
    {columnName}
  </Button>
</DropdownMenuTrigger>
<DropdownMenuContent className="w-56">
  <DropdownMenuSeparator />
  <DropdownMenuItem>
    <Button variant="ghost" onClick={onSort}>
      Ordenar
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuItem>
  <DropdownMenuItem>
    <Input 
      placeholder="Filtro" 
      onChange={onChange}
      onClick={handleInputClick} 
      onBlur={handleInputBlur}   
      value={valueFilter}
    />
  </DropdownMenuItem>
</DropdownMenuContent>
</DropdownMenu>
  )
}
