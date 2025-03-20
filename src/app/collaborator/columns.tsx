'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Thead } from '@/components/Thead'
import { Rate } from '@/components/Rate'
import { CollaboratorProps } from '../@types/type'
import { ActionCollaboratorCell } from './cells/ActionCollaboratorCell'




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
      return <Rate rate={dataRow.rate} obs={dataRow.comment} />
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
    cell: ({ row }) => <ActionCollaboratorCell row={row} />
  }
]
