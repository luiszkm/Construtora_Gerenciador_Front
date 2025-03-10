'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Thead } from '@/components/Thead'
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
import { Rate } from '@/components/Rate'
import { Textarea } from '@/components/ui/textarea'

export type CollaboratorProps = {
  id: string
  status: 'pendente' | 'pago'
  name: string
  role: 'pedreiro' | 'ajudante'
  dailyPrice: number
  workingDays: number
  additionalMoney: number
  advanceMoney: number
  active: boolean
  totalFifteenDays: number
  pixKey: string
  date: Date
  totalToPay: number
  discount: number
  rate: number
  obs: string
}

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

export const columns: ColumnDef<CollaboratorProps>[] = [
  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Status"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <div
          style={{ color: status === 'pendente' ? 'red' : 'green' }}
          className="text-center font-medium"
        >
          {status}
        </div>
      )
    }
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Nome"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    }
  },
  {
    accessorKey: 'role',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Cargo"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    }
  },
  {
    accessorKey: 'dailyPrice',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Diária"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const dailyPrice = parseFloat(row.getValue('dailyPrice'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(dailyPrice)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'workingDays',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Dias"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const workingDays = parseFloat(row.getValue('workingDays'))
      return <div className="text-center font-medium">{workingDays}</div>
    }
  },
  {
    accessorKey: 'additionalMoney',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Adicional"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const additionalMoney = parseFloat(row.getValue('additionalMoney'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(additionalMoney)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'advanceMoney',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Adiantamento"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const advanceMoney = parseFloat(row.getValue('advanceMoney'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(advanceMoney)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: 'discount',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Descontos"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue('discount'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(discount)

      return (
        <div className="text-right text-red-500 font-medium">{formatted}</div>
      )
    }
  },

  {
    accessorKey: 'totalToPay',
    header: 'Total',
    cell: ({ row }) => {
      const dailyPrice = parseFloat(row.getValue('dailyPrice'))
      const workingDays = parseFloat(row.getValue('workingDays'))
      const additionalMoney = parseFloat(row.getValue('additionalMoney'))
      const advanceMoney = parseFloat(row.getValue('advanceMoney'))
      const discount = parseFloat(row.getValue('discount'))
      const total =
        dailyPrice * workingDays + additionalMoney - advanceMoney - discount
      return (
        <span>
          {total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </span>
      )
    }
  },
  {
    accessorKey: 'pixKey',
    header: 'Chave PIX',
    cell: ({ row }) => {
      const pix = String(row.getValue('pixKey'))

      return (
        <Button
          className="bg-transparent border-none text-gray-800 hover:bg-transparent hover:text-blue-500 cursor-pointer"
          onClick={() => navigator.clipboard.writeText(pix)}
        >
          {pix}
        </Button>
      )
    }
  },
  {
    accessorKey: 'date',
    header: 'Quinzena',
    cell: ({ row }) => {
      const date = new Date(String(row.getValue('pixKey'))).toLocaleDateString(
        'pt-BR',
        {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric'
        }
      )
      return <span>{date}</span>
    }
  },
  {
    accessorKey: 'rate',
    header: 'Observação',
    cell: ({ row }) => {
      const dataRow = row.original
      return <Rate rate={dataRow.rate} obs={dataRow.obs} />
    }
  },
  {
    accessorKey: 'active',
    header: 'Ativo',
    cell: ({ row }) => {
      const active = row.getValue('active')
      return active ? (
        <span className="text-green-500">Sim</span>
      ) : (
        <span className="text-red-500">Não</span>
      )
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => {
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
                        value={formData.dailyPrice.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
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
                        value={formData.additionalMoney.toLocaleString(
                          'pt-BR',
                          {
                            style: 'currency',
                            currency: 'BRL'
                          }
                        )}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <Label className="text-right">Adiantamento</Label>
                      <Input
                        name="advanceMoney"
                        value={formData.advanceMoney.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
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
                        value={formData.discount.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        })}
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
  }
]
