'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Thead } from '@/components/Thead'
import { Rate } from '@/components/Rate'
import Link from 'next/link'
import {  SupplierProps } from '../@types/type'
import { ActionSupplierCell } from './cells/ActionSupplierCell'
import { MaterialsSupplierCell } from './cells/MaterialsSupplierCell'

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
          columnName="Contato"
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
          columnName="Atendente"
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
    cell: ({ row }) => <MaterialsSupplierCell row={row} />,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true
      const materials = row.original.materials.map(m => m.name.toLowerCase())
      return materials.some(material =>
        material.includes(filterValue.toLowerCase())
      )
    }
  },
  {
    accessorKey: 'rate',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Avaliação"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const rate = parseInt(row.getValue('rate'))
      return <Rate rate={rate} obs={row.original.obs} />
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
    accessorKey: 'address',
    header: 'Endereço',
    cell: ({ row }) => {
      const address = row.getValue('address') as string
      return <span>{address}</span>
    }
  },
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'active',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Ativo"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
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
    cell: ({ row }) =>  <ActionSupplierCell row={row} />
  }
]
