'use client'

import { ColumnDef } from '@tanstack/react-table'
import {  PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'


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
import { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { GETMaterials } from '../api/materials/route'
import { BudgetsProps, MaterialDbProps, MaterialsProps } from '../@types/typs'
import Link from 'next/link'

async function getMaterials() {
  const response = await GETMaterials()
  return response
}

async function handleActive(supplier: BudgetsProps) {
  const updatedData = { ...supplier }

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
      return (
        <Link href={`/budget/${budget.id}`}>
          {budget.name}
        </Link>
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
      const [isDialogOpen, setIsDialogOpen] = useState(false)
      const [createdMaterial, setCreatedMaterial] = useState(false)
      const [materialExistis, setMaterialExistis] = useState(false)

      const [materialsSelect, setMaterialsSelect] = useState<MaterialDbProps[]>(
        []
      )
      const [selectedMaterial, setSelectedMaterial] = useState<string>('')
      const [formDataMaterial, setFormDataMaterial] = useState({
        name: '',
        quantity: 0,
        unitPrice: 0
      })
      const [formDataUpdateMaterial, setFormDataUpdateMaterial] = useState({
        name: supplier.materials.map(material => material.name).join(', '),
        quantity: supplier.materials
          .map(material => material.quantity)
          .reduce((acc, curr) => acc + curr),
        unitPrice: supplier.materials
          .map(material => material.unitPrice)
          .reduce((acc, curr) => acc + curr)
      })

      const handleChange = (e: {
        target: { name: string; value: unknown }
      }) => {
        const { name, value } = e.target
        setFormDataMaterial(prevState => ({
          ...prevState,
          [name]: value
        }))
      }
      const handleSave = async () => {
        const updatedData = { ...formDataMaterial }
        const response = await fetch(`api/collaborators?id=${supplier.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        })

        if (response.ok) {
          console.log('Colaborador atualizado com sucesso')
          setIsDialogOpen(false)
        } else {
          console.log('Erro ao atualizar colaborador')
        }
      }
      const handleSelectChange = (value: string) => {
        setSelectedMaterial(value)
      }

      const handleVerifyMaterial = (value: string) => {
        const contains = materialsSelect.filter(
          material => material.name.toLowerCase() === value.toLowerCase()
        )
        if (contains.length > 0) {
          setMaterialExistis(true)
        } else {
          setMaterialExistis(false)
        }
      }

      useEffect(() => {
        async function fetchMaterials() {
          const response = await getMaterials()
          setMaterialsSelect(response)
        }
        fetchMaterials()
      }, [])
      return (
        <div className="text-right flex items-center gap-2 font-medium">
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="ghost"
            className="h-4 w-4 p-0 cursor-pointer hover:text-orange-600"
          >
            <span className="sr-only">Open menu</span>
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Material</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave}>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-4">
                    <Select
                      value={selectedMaterial}
                      onValueChange={handleSelectChange}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Materiais" />
                      </SelectTrigger>
                      <SelectContent>
                        {materialsSelect &&
                          materialsSelect?.map((material: MaterialDbProps) => (
                            <SelectItem
                              key={material.name}
                              value={material.name}
                            >
                              {material.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={() => setCreatedMaterial(true)}
                    >
                      Adicionar novo
                    </Button>
                  </div>
                  {createdMaterial && (
                    <div className="flex items-center gap-4">
                      <Label className="text-right">Nome</Label>
                      <Input
                        style={{
                          border: materialExistis ? '1px solid red' : ''
                        }}
                        name="name"
                        value={formDataMaterial.name}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                      {materialExistis && (
                        <p className="text-red-500 text-sm mt-1">
                          Este material já está cadastrado.
                        </p>
                      )}
                      <Button
                        onClick={() =>
                          handleVerifyMaterial(formDataMaterial.name)
                        }
                        type="button"
                      >
                        Verificar
                      </Button>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Criar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
      return <span>{budgets.total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })}</span>
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
  
  },
  

]
