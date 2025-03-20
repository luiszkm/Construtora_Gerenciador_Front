'use client'
import { CirclePlus, Edit, X } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useState } from 'react'

import { MaterialCard } from './MaterialCard'
import { BudgetsProps, MaterialsProps } from '@/app/@types/type'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export function CardBudget(budget: BudgetsProps) {
  const { refresh } = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const dateFormated = new Date(budget.date).toLocaleDateString()
  const [budgetFormData, setbudgetFormData] = useState<BudgetsProps>(budget)
  const [isNewMaterials, setIsNewMaterials] = useState(false)
  const [addMaterial, setAddMaterial] = useState(false)
  const [newMaterial, setNewMaterial] = useState<MaterialsProps>({
    id: '',
    name: '',
    quantity: 0,
    unitPrice: 0,
    total: 0
  })
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
          <Input
            name="name"
            value={budgetFormData.name}
            className=""
            disabled={!isEditing}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-start">
            <Label className="text-right">Obra</Label>
            <Input name="name" className="" disabled={!isEditing} />
          </div>
          <div className="flex flex-col items-start">
            <Label className="text-right">Total</Label>
            <Input name="name" className="" disabled={!isEditing} />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <Label className="text-right">Fornecedor</Label>
          <Input name="name" className="" disabled={!isEditing} />
        </div>

        {budgetFormData.materials?.map(material => (
          <MaterialCard
            key={material.name}
            name={material.name}
            quantity={material.quantity}
            unit={String(material.unitPrice)}
            priceUnit={String(material.total)}
            edit={isEditing}
          />
        ))}
        {isNewMaterials && (
          <MaterialCard
            key={newMaterial?.id}
            name={newMaterial?.name}
            quantity={newMaterial.quantity}
            unit={String(newMaterial.unitPrice)}
            priceUnit={String(newMaterial.total)}
            edit={isEditing}
            isNewMaterial
          />
        )}

        {addMaterial && (
          <MaterialCard
            key={newMaterial?.id}
            name={newMaterial?.name}
            quantity={newMaterial.quantity}
            unit={String(newMaterial.unitPrice)}
            priceUnit={String(newMaterial.total)}
            edit={isEditing}
          />
        )}

        <div className="flex items-center justify-between mt-2">
          <Button
            onClick={() => setAddMaterial(true)}
            className="bg-transparent p-0 border-0 text-green-600 font-bold text-lg disabled:text-gray-600"
            disabled={!isEditing}
            type="button"
          >
            <CirclePlus />
          </Button>
          {isNewMaterials ? (
            <Button
              disabled={!isEditing}
              type="button"
              onClick={() => setIsNewMaterials(false)}
            >
              Cancelar
            </Button>
          ) : (
            <Button
              disabled={!isEditing}
              type="button"
              onClick={() => setIsNewMaterials(true)}
            >
              Criar Material
            </Button>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <Button
            className=" bg-green-600 disabled:bg-gray-900 cursor-pointer hover:bg-green-900"
            type="submit"
            disabled={!isEditing}
          >
            Salvar
          </Button>

          <Button
            onClick={() => refresh()}
            className="m bg-red-600 disabled:bg-gray-900 cursor-pointer hover:bg-red-900"
            type="submit"
            disabled={!isEditing}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  )
}
