'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const columnTranslations: Record<string, string> = {
    id: 'ID',
    status: 'Status',
    name: 'Nome',
    role: 'Cargo',
    dailyPrice: 'diária',
    workingDays: 'dias trabalhados',
    additionalMoney: 'adicional',
    advanceMoney: 'adiantamento',
    active: 'ativo',
    totalFifteenDays: 'quinzena',
    pixKey: 'chave pix',
    date: 'data',
    totalToPay: 'total a pagar',
    discount: 'desconto'
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // 📌 Em telas pequenas, mostramos apenas algumas colunas essenciais
        setColumnVisibility({
          name: true,
          role: false,
          active: false,
          date: false,
          status: false
        })
      } else if (window.innerWidth < 1024) {
        // 📌 Em telas médias, mostramos mais colunas
        setColumnVisibility({
          name: true,
          email: true,
          phone: false
        })
      } else {
        // 📌 Em telas grandes, mostramos todas as colunas
        setColumnVisibility({
          name: true,
          email: true,
          phone: true
        })
      }
    }

    handleResize() // 📌 Definir as colunas corretas ao montar o componente
    window.addEventListener('resize', handleResize) // 📌 Atualizar ao redimensionar

    return () => window.removeEventListener('resize', handleResize) // 📌 Limpeza do evento ao desmontar
  }, [])

  return (
    <div className=" max-w-11/12  ">
      <div className="flex flex-col md:flex-row justify-between items-stretch gap-4 py-3">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="filtrar por nome"
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="max-w-sm mr-4"
          />
          <Button onClick={() => table.resetColumnFilters()}>reset</Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                title="ocultar colunas"
                variant="outline"
                className="ml-auto"
              >
                Colunas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {table
                .getAllColumns()
                .filter(column => column.getCanHide())
                .map(column => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={value =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnTranslations[column.id] ?? column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="overflow-x-auto  ">
          <TableHeader className="bg-gray-100  ">
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  className="hover:bg-gray-100 text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
