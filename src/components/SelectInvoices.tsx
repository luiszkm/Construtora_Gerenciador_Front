'use client'
import { MaterialDbProps } from '@/app/@types/type'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { useEffect, useState } from 'react'
import { GETInvoices } from '@/app/api/invoices/route'

type SelectMaterialProps = {
  selectedInvoices?: string
  edit?: boolean
  setSelectedInvoices: (value: string) => void
}

export function SelectInvoices({
  selectedInvoices,
  edit,
  setSelectedInvoices
}: SelectMaterialProps) {
  const [invoicesSelect, setInvoicesSelect] = useState<MaterialDbProps[]>([])
  const handleSelectChange = (value: string) => {
    setSelectedInvoices(value)
  }

  useEffect(() => {
    async function getInvoices() {
      const response = await GETInvoices()
      console.log(response)
      setInvoicesSelect(response)
    }
    getInvoices()
  }, [])
  return (
    <Select
      value={selectedInvoices}
      onValueChange={handleSelectChange}
      disabled={!edit}
    >
      <SelectTrigger className="w-[108px] text-xs">
        <SelectValue placeholder="Contas" />
      </SelectTrigger>
      <SelectContent>
        {invoicesSelect &&
          invoicesSelect?.map((material: MaterialDbProps) => (
            <SelectItem
              className="text-xs"
              key={material.name}
              value={material.name}
            >
              {material.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  )
}
