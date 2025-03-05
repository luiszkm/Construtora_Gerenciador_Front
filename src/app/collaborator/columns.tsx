'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export type CollaboratorProps = {
  id: string
  status: 'aguardando' | 'pago'
  name: string
  role: 'pedreiro' | 'ajudante'
  dailyPrice: number
  workingDays: number
  additionalMoney: number
  advanceMoney: number
  active: boolean
  totalFifteenDays: number
  pixKey: string
  date?: Date
  totalToPay: number
  discount: number
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
    cell: () => {
      const date = new Date().toLocaleDateString('pt-BR', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      })
      return <span>{date}</span>
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
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const [formData, setFormData] = useState({
        name: collaborator.name,
        role: collaborator.role,
        dailyPrice: collaborator.dailyPrice,
        workingDays: collaborator.workingDays,
        additionalMoney: collaborator.additionalMoney,
        advanceMoney: collaborator.advanceMoney,
        discount: collaborator.discount,
        pixKey: collaborator.pixKey,
      });

      const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      const handleSave = async () => {
        formData.dailyPrice = parseFloat(String(formData.dailyPrice).replace('R$', '').replace('.', '').replace(',', '.'));
        formData.additionalMoney = parseFloat(String(formData.additionalMoney).replace('R$', '').replace('.', '').replace(',', '.'));
        formData.advanceMoney = parseFloat(String(formData.advanceMoney).replace('R$', '').replace('.', '').replace(',', '.'));
        formData.discount = parseFloat(String(formData.discount).replace('R$', '').replace('.', '').replace(',', '.'));
        formData.pixKey = String(formData.pixKey).trim();
        const updatedData = {  ...formData };
        console.log(updatedData);
        const response = await fetch(`api/collaborators?id=${collaborator.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });

        if (response.ok) {
          console.log('Colaborador atualizado com sucesso');
          setIsDialogOpen(false);
        } else {
          console.log('Erro ao atualizar colaborador');
        }
      };
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Nome</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Cargo</Label>
              <Input
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Dias Trabalhados</Label>
              <Input
                type='number'
                name="workingDays"
                value={formData.workingDays}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Adicional</Label>
              <Input
                name="additionalMoney"
                value={formData.additionalMoney.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">PIX</Label>
              <Input
                name="pixKey"
                value={formData.pixKey}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            
            {/* Adicione mais campos conforme necessário */}
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
          </Dialog>
        </>
      );
    }
  }
]
