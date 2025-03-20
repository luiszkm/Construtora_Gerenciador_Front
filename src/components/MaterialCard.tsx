
import { Input } from './ui/input'
import {  useState } from 'react'
import {  formatCurrencyInput } from '@/utils/masks'
import { SelectMaterial } from './SelectMaterial'


type MaterialCardProps = {
  name: string
  quantity: number
  unit: string
  priceUnit: string
  edit?: boolean
  isNewMaterial?: boolean

}

export function MaterialCard({ unit, priceUnit, edit = false , isNewMaterial= false}: MaterialCardProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('')
  const [price, setPrice] = useState<string>(`R$ ${priceUnit}`);
  //   const [formDataMaterial, setFormDataMaterial] = useState({
  //   name: '',
  //   quantity: 0,
  //   unitPrice: 0
  // })

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-2 shadow-md ">
      <div className="flex gap-2 items-center mt-2">
      <SelectMaterial 
      edit={edit} 
      isNewMaterial={isNewMaterial}
      setSelectedMaterial={setSelectedMaterial}
       selectedMaterial={selectedMaterial} />
        <Input className='w-12 text-xs p-1'max={3} maxLength={3} type='number' placeholder='0' disabled={!edit}  />
        <Input className='w-20 p-1' placeholder='medida' value={unit} disabled={!edit} />
        <Input   value={price}  disabled={!edit} 
        onChange={(e) => setPrice(formatCurrencyInput(e.target.value))}
        className='w-24 text-xs p-1'placeholder="preço" name="price" />
      </div>
    </div>
  )
}
