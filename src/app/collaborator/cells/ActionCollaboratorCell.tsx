import { MoreHorizontal, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { formatCurrencyInput } from '@/utils/masks'
import { CollaboratorProps } from '@/app/@types/type'
import { Row } from '@tanstack/react-table'

async function handleActive(collaborator: CollaboratorProps) {
  const updatedData = { ...collaborator, active: !collaborator.active }

  const response = await fetch(`api/collaborators?id=${collaborator.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })

  if (response.ok) {
    console.log('Colaborador atualizado com sucesso')
  } else {
    console.log('Erro ao atualizar colaborador')
  }
}
async function handlePayment(collaborator: CollaboratorProps) {
  const updatedData = { ...collaborator, status: 'ok' }

  const response = await fetch(`api/collaborators?id=${collaborator.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })

  if (response.ok) {
    console.log('Colaborador atualizado com sucesso')
  } else {
    console.log('Erro ao atualizar colaborador')
  }
}




export const ActionCollaboratorCell: React.FC<{ row: Row<CollaboratorProps> }> = ({ row }) => {
  const active = row.getValue('active')
       const collaborator: CollaboratorProps = row.original
       const [isDialogOpen, setIsDialogOpen] = useState(false)
       const [rating, setRating] = useState(collaborator.rate)
 
       const [formData, setFormData] = useState({
         name: collaborator.name,
         role: collaborator.role,
         dailyPrice: collaborator.dailyPrice,
         workingDays: collaborator.workingDays,
         additionalMoney: collaborator.additionalMoney,
         advanceMoney: collaborator.advanceMoney,
         discount: collaborator.discount,
         pixKey: collaborator.pixKey,
         obs: collaborator.obs,
         rate: collaborator.rate
       })
 
       const handleChange = (e: {
         target: { name: string; value: unknown }
       }) => {
         const { name, value } = e.target
         setFormData(prevState => ({
           ...prevState,
           [name]: value
         }))
       }
       const handleSave = async () => {
         formData.dailyPrice = parseFloat(
           String(formData.dailyPrice)
             .replace('R$', '')
             .replace('.', '')
             .replace(',', '.')
         )
         formData.additionalMoney = parseFloat(
           String(formData.additionalMoney)
             .replace('R$', '')
             .replace('.', '')
             .replace(',', '.')
         )
         formData.advanceMoney = parseFloat(
           String(formData.advanceMoney)
             .replace('R$', '')
             .replace('.', '')
             .replace(',', '.')
         )
         formData.discount = parseFloat(
           String(formData.discount)
             .replace('R$', '')
             .replace('.', '')
             .replace(',', '.')
         )
         formData.pixKey = String(formData.pixKey).trim()
         const updatedData = { ...formData }
         const response = await fetch(
           `api/collaborators?id=${collaborator.id}`,
           {
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify(updatedData)
           }
         )
 
         if (response.ok) {
           console.log('Colaborador atualizado com sucesso')
           setIsDialogOpen(false)
         } else {
           console.log('Erro ao atualizar colaborador')
         }
       }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleActive(collaborator)}>
            {active ? 'Desativar' : 'Ativar'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePayment(collaborator)}>
            Pagar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Colaborador</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave}>
            <div className="flex flex-col gap-1 ">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-start">
                  <Label className="text-right">Nome</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <Label className="text-right">Cargo</Label>
                  <Input
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-start">
                  <Label className="text-right">Diária</Label>
                  <Input
                    name="dailyPrice"
                    value={formData.dailyPrice}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <Label className="text-right">Dias Trabalhados</Label>
                  <Input
                    type="number"
                    name="workingDays"
                    value={formData.workingDays}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-start">
                  <Label className="text-right">Adicional</Label>
                  <Input
                    name="additionalMoney"
                    value={formData.additionalMoney}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <Label className="text-right">Adiantamento</Label>
                  <Input
                    name="advanceMoney"
                    value={formatCurrencyInput(String( formData.advanceMoney))}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col items-start">
                  <Label className="text-right">Descontos</Label>
                  <Input
                    name="discount"
                    value={formatCurrencyInput(String( formData.discount))}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <Label className="text-right">PIX</Label>
                  <Input
                    name="pixKey"
                    value={formData.pixKey}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start ">
                <Label className="text-right">Observação</Label>
                <Textarea 
                  name="obs"
                  value={formData.obs}
                  onChange={handleChange}
                  className="max-w-10/12"
                />
              </div>

              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    onClick={() => setRating(star)}
                    className={`w-4 h-4 cursor-pointer transition-colors duration-300 text-gray-500
                        ${
                          star <= rating
                            ? 'fill-orange-600'
                            : 'text-gray-300'
                        }`}
                  />
                ))}
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}