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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@radix-ui/react-dropdown-menu'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

type MaterialsProps = {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}
export type SupplierProps = {
  id: string
  name: string
  phone:string
  owner: string
  active: boolean
  totalPrice: number
  date?: Date
  discount: number
  materials?: MaterialsProps[]
}

async function handleActive(supplier: SupplierProps) {
  const updatedData = { ...supplier, active: !supplier.active }

  const response = await fetch(`api/supplier?id=${supplier.id}`, {
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
async function handlePayment(collaborator: SupplierProps) {
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

export const columns: ColumnDef<SupplierProps>[] = [
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
    accessorKey: 'phone',
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
    accessorKey: 'owner',
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
  },
  {
    accessorKey: 'totalPrice',
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
      const totalPrice = parseFloat(row.getValue('totalPrice'))
      return <div className="text-center font-medium">{totalPrice}</div>
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
      const supplier: SupplierProps = row.original
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      const [formData, setFormData] = useState({
        name: supplier.name,
        phone:supplier.phone,
        owner: supplier.owner,
        active: supplier.active,
        TotalPrice: supplier.totalPrice,
        materials: supplier.materials,
        discount: supplier.discount,
      });

      const handleChange = (e: { target: { name: string; value: unknown } }) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      const handleSave = async () => {
        
        const updatedData = {  ...formData };
        console.log(updatedData);
        const response = await fetch(`api/collaborators?id=${supplier.id}`, {
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
              <DropdownMenuItem onClick={() => handleActive(supplier)}>
                {active ? 'Desativar' : 'Ativar'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlePayment(supplier)}>
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
                value={formData.owner}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Dias Trabalhados</Label>
              <Input
                type='number'
                name="workingDays"
                value={formData.phone}
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
