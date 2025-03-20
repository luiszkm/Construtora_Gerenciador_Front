'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Thead } from '@/components/Thead'
import Link from 'next/link'
import { FinanceProps, MaterialsProps } from '../@types/type'
import { formatCurrencyInput } from '@/utils/masks'
import { ActionFinanceCell } from './cells/ActionFinanceCell'


export const columns: ColumnDef<FinanceProps>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Compra"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    }
  },
  {
    accessorKey: 'invoice',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Conta"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
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
    },
    cell: ({ row }) => {
      const supplier = row.original
      return (
        <Link href={`supplier/${supplier.supplierId}`}>
          {supplier.supplierName}
        </Link>
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
      const finance: FinanceProps = row.original
      return (
        <div className="text-right flex items-center gap-2 font-medium">
          {finance.materials.map((material: MaterialsProps, index: number) => (
            <div key={index}>{material.name}</div>
          ))}
        </div>
      )
    },
    filterFn: (row, filterValue) => {
      if (!filterValue) return true
      const materials = row.original.materials.map(m => m.name.toLowerCase())
      return materials.some(material =>
        material.includes(filterValue.toLowerCase())
      )
    }
  },
  {
    accessorKey: 'jobName',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Fase"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    }
  },
  {
    accessorKey: 'budget',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Orçamentos"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      return <Link href={`budget/${row.id}`}>Orçamentos</Link>
    }
  },
  {
    accessorKey: 'value',
    header: 'Valor',
    cell: ({ row }) => {
      const value = row.getValue('value')
      return <span>{formatCurrencyInput(String(value))}</span>
    }
  },
  {
    accessorKey: 'date',
    header: 'Data'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const active = row.getValue('active')
      return active ? (
        <span className="text-green-500">Pago</span>
      ) : (
        <span className="text-red-500">Pendente</span>
      )
    }
  },

  {
    id: 'actions',
    cell: ({ row }) =>  <ActionFinanceCell row={row} />,
  }
]
