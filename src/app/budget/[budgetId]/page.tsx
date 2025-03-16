'use client'
import { BudgetsProps } from '@/app/@types/typs'
import { GETBudgetsCompare } from '@/app/api/budget/route'
import { CardBudget } from '@/components/CardBudget'
import { SelectMaterial } from '@/components/SelectMaterial'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Compare() {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('')

  const { push } = useRouter()
  const params = useParams()
  const [budgetsForCompare, setBudgetsForCompare] = useState<BudgetsProps[]>([])
  const isCompare = Number(params.budgetId) === 0

  const handleCompare = () => {
    push(`/budget/${selectedMaterial}`)
  }

  useEffect(() => {
    async function getBudgets() {
      const response = await GETBudgetsCompare()
      setBudgetsForCompare(response)
    }
    if (!isCompare) getBudgets()
  }, [])
  return (
    <main className="overflow-x-hidden w-full px-2">
      {isCompare ? (
        <div>
          <h1 className="text-2xl font-bold text-center">
            Comparar Orçamentos
          </h1>
          <div className="flex items-center justify-center">
            <h2 className="text-xl font-bold">
              Selecione os orçamentos para comparar
            </h2>
          </div>
          <div className="flex justify-center gap-4 mt-5">
            <SelectMaterial
              setSelectedMaterial={setSelectedMaterial}
              selectedMaterial={selectedMaterial}
              edit={true}
            />
            <Button onClick={() => handleCompare()} className="cursor-pointer">
              Buscar
            </Button>
          </div>
        </div>
      ) : (
        <div className=' flex flex-col items-center gap-5'>
          <div className=" flex  justify-center gap-4">
            {budgetsForCompare.map((budget: BudgetsProps) => (
              <CardBudget key={budget.id} {...budget} />
            ))}
           
          </div>
          <Button
              onClick={() => push('/budget/0')}
              className="cursor-pointer"
            >
              Resetar
            </Button>
        </div>
      )}
    </main>
  )
}
