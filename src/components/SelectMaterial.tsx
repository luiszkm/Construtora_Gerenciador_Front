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
import { GETMaterials } from '@/app/api/materials/route'
import { Input } from './ui/input'
import { Check } from 'lucide-react'

type SelectMaterialProps = {
  selectedMaterial?: string
  edit?: boolean
  setSelectedMaterial: (value: string) => void
  isNewMaterial?: boolean
}

export function SelectMaterial({
  selectedMaterial,
  edit,
  setSelectedMaterial,
  isNewMaterial = false
}: SelectMaterialProps) {
  const [materialsSelect, setMaterialsSelect] = useState<MaterialDbProps[]>([])
  const [materialExist, setMaterialExist] = useState(false)
  const [newMaterial, setNewMaterial] = useState('')
  const handleSelectChange = (value: string) => {
    setSelectedMaterial(value)
  }

  const handleVerifyMaterial = () => {
    const contains = materialsSelect.find(
      material => material.name.toLowerCase() === newMaterial.toLowerCase()
    )
    if (!contains) {
      setMaterialExist(false)
    } else {
      setMaterialExist(true)
    }
  }

  useEffect(() => {
    async function getMaterials() {
      const response = await GETMaterials()
      console.log(response)
      setMaterialsSelect(response)
    }
    getMaterials()
  }, [])
  return isNewMaterial ? (
    <div className="flex gap-2 items-center mt-2">
      <Input
        value={newMaterial}
        disabled={!edit}
        style={{ borderColor: materialExist ? 'red' : 'gray' }}
        onChange={e => setNewMaterial(e.target.value)}
      />
      <Check
        onClick={handleVerifyMaterial}
        style={{ color: materialExist ? 'red' : 'green' }}
        className="cursor-pointer hover:fill-green-500"
        size={24}
      />
    </div>
  ) : (
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
