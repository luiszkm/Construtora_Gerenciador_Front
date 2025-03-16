'use client'
import { MaterialDbProps } from '@/app/@types/typs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { useEffect, useState } from 'react'
import { GETMaterials } from '@/app/api/materials/route'

type SelectMaterialProps = {
  selectedMaterial?: string
  edit?: boolean
  setSelectedMaterial: (value: string) => void

}

export function SelectMaterial({ selectedMaterial, edit, setSelectedMaterial }: SelectMaterialProps) {
  const [materialsSelect, setMaterialsSelect] = useState<MaterialDbProps[]>([])
  const handleSelectChange = (value: string) => {
    setSelectedMaterial(value)
  }

  useEffect(() => {
    async function getMaterials() {
      const response = await GETMaterials()
      console.log(response)
      setMaterialsSelect(response)
    }
    getMaterials()
  }, [])
  return (
    <Select
      value={selectedMaterial}
      onValueChange={handleSelectChange}
      disabled={!edit}
    >
      <SelectTrigger className="w-[108px] text-xs">
        <SelectValue placeholder="Materiais" />
      </SelectTrigger>
      <SelectContent>
        {materialsSelect &&
          materialsSelect?.map((material: MaterialDbProps) => (
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
