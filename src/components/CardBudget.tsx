'use client'
import { Edit, X } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'

import { MaterialCard } from './MaterialCard'
import { BudgetsProps } from '@/app/@types/typs'
import { Button } from './ui/button'

export function CardBudget(budget: BudgetsProps) {
  const [isEditing, setIsEditing] = useState(false)
 const dateFormated = new Date(budget.date).toLocaleDateString()
  const [budgetFormData, setbudgetFormData] = useState<BudgetsProps>(budget)
  return (
    <div
      className="flex w-full max-w-md  flex-col items-start  border border-gray-300 p-4 rounded-lg shadow-2xl"
      style={{ borderColor: isEditing ? '#00cc00' : 'gray' }}
    >
      <div className="flex items-center justify-between w-full">
        <div>{dateFormated}</div>
        {isEditing ? (
          <button title="Cancelar">
            <X
              className="cursor-pointer hover:text-orange-500"
              size={24}
              onClick={() => setIsEditing(false)}
            />
          </button>
        ) : (
          <button title="editar">
            <Edit
              className="cursor-pointer hover:fill-orange-500"
              size={24}
              onClick={() => setIsEditing(true)}
            />
          </button>
        )}
      </div>

      <form action="">
        <div className="flex flex-col items-start">
          <Label className="text-right">Orçamento</Label>
          <Input name="name" value={budgetFormData.name} className="" disabled={!isEditing} />
        </div>
        <div className="flex flex-col items-start">
          <Label className="text-right">Obra</Label>
          <Input name="name" className="" disabled={!isEditing} />
        </div>
        <div className="flex flex-col items-start">
          <Label className="text-right">Fornecedor</Label>
          <Input name="name" className="" disabled={!isEditing} />
        </div>
        <div className="flex flex-col items-start">
          <Label className="text-right">Total</Label>
          <Input name="name" className="" disabled={!isEditing} />
        </div>
       {
          budgetFormData.materials?.map((material) => (
            <MaterialCard
              key={material.name}
              name={material.name}
              quantity={material.quantity}
              unit={String(material.unitPrice)}
              priceUnit={String(material.total)}
              edit={isEditing}
            />
          ))
       }
        
        <Button className='mt-4 bg-green-600 disabled:bg-gray-900 cursor-pointer hover:bg-green-900' type="submit" disabled={!isEditing}>Salvar</Button>
      </form>
    </div>
  )
}
