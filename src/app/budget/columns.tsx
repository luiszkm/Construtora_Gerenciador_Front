'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Thead } from '@/components/Thead'
import { BudgetsProps, MaterialsProps } from '../@types/type'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { formatCurrencyInput } from '@/utils/masks'

// async function handleActive(supplier: BudgetsProps) {
//   const updatedData = { ...supplier }

//   const response = await fetch(`api/supplier?id=${supplier.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(updatedData)
//   })

//   if (response.ok) {
//     console.log('Colaborador atualizado com sucesso')
//   } else {
//     console.log('Erro ao atualizar colaborador')
//   }
// }

export const columns: ColumnDef<BudgetsProps>[] = [
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
    },
    cell: ({ row }) => {
      const budget: BudgetsProps = row.original
      return <Link href={`/budget/${budget.id}`}>{budget.name}</Link>
    }
  },

  {
    accessorKey: 'supplierName',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Fornecedor"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    }
  },
  {
    accessorKey: 'materials',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Materiais"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const supplier: BudgetsProps = row.original
      return (
        <div className="text-right flex items-center gap-2 font-medium">
          {supplier.materials.map((material: MaterialsProps, index: number) => (
            <div key={index}>{material.name}</div>
          ))}
        </div>
      )
    },
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true
      const materials = row.original.materials.map(m => m.name.toLowerCase())
      return materials.some(material =>
        material.includes(filterValue.toLowerCase())
      )
    }
  },
  {
    accessorKey: 'JobName',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Obra"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    }
  },

  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const budgets: BudgetsProps = row.original
      return <span>{formatCurrencyInput(String(budgets.total))}</span>
    }
  },
  {
    accessorKey: 'date',
    header: 'Data'
  },
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
    id: 'actions',
    cell: ({ row }) => {
      const finance: BudgetsProps = row.original

      const handleChangeStatusBudget = async () => {
        const updatedData = { ...finance }
        updatedData.status = 'Fechado'
        const response = await fetch(`api/budgets?id=${finance.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        })

        if (response.ok) {
          console.log('Orçamento atualizado com sucesso')
        } else {
          console.log('Erro ao atualizar orçamento')
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleChangeStatusBudget()}>
              Fechar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeStatusBudget()}>
              Cancelar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
