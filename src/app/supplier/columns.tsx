'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, PlusCircle, Trash } from 'lucide-react'
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
import { useEffect, useState } from 'react'

type MaterialsProps = {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}

export type MaterialDbProps = {
  id: string
  name: string
}

export type SupplierProps = {
  id: string
  name: string
  phone: string
  owner: string
  active: boolean
  price: number
  date?: Date
  discount: number
  materials: MaterialsProps[]
  materialsDb: MaterialDbProps[]
}
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { GETMaterials } from '../api/materials/route'

async function getMaterials() {
  const response = await GETMaterials()
  return response
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
    cell: ({ row }) => {
      const materials = row.getValue('materials') as MaterialsProps[]
      const supplier: SupplierProps = row.original
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
        console.log(updatedData)
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
          material =>material.name.toLowerCase() === value.toLowerCase()
        )
        if (contains.length > 0) {
          setMaterialExistis(true)
        }else{
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
                            <SelectItem key={material.id} value={material.id}>
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
                      {
                        materialExistis && (
                          <p className="text-red-500 text-sm mt-1">Este material já está cadastrado.</p>
                        )
                      }
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Preço</Label>
                    <Input
                      name="unitPrice"
                      value={formDataMaterial.unitPrice}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Quantidade</Label>
                    <Input
                      type="number"
                      name="quantity"
                      value={formDataMaterial.quantity}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Criar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {materials.map((material: MaterialsProps, index: number) => (
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
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Thead
          onChange={e => column.setFilterValue(e.target.value)}
          valueFilter={String(
            column.getFilterValue() === undefined ? '' : column.getFilterValue()
          )}
          columnName="Preço"
          onSort={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        />
      )
    },
    cell: ({ row }) => {
      const discount = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(discount)

      return (
        <div className="text-right text-green-500 font-medium">{formatted}</div>
      )
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
      const [materials, setMaterials] = useState(supplier.materials)

      const [isDialogOpen, setIsDialogOpen] = useState(false)

      const [formData, setFormData] = useState({
        name: supplier.name,
        phone: supplier.phone,
        owner: supplier.owner,
        active: supplier.active,
        TotalPrice: supplier.price,
        materials: materials,
        discount: supplier.discount
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

      const handleRemoveMaterial = (name: string) => {
        const updatedMaterials = materials.filter(material => material.name !== name)
        setMaterials(updatedMaterials)
        setFormData(prevState => ({
          ...prevState,
          materials: updatedMaterials
        }))
      }

      const handleSave = async () => {
        const updatedData = { ...formData, }
        console.log(updatedData)
        const response = await fetch(`api/materials?id=${supplier.id}`, {
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
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Fornecedor</DialogTitle>
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
                    <Label className="text-right">Atendente</Label>
                    <Input
                      name="role"
                      value={formData.owner}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Contato</Label>
                    <Input
                      type="number"
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
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Preço</Label>
                    <Input
                      name="totalPrice"
                      value={formData.TotalPrice.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      })}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className='flex items-center gap-4'>
                  {materials && formData.materials.map(material =>(
                    <div key={material.name} className=" p-1 rounded-lg flex text-xs items-center gap-2 border border-orange-600">
                        {material.name}
                        <Trash width={16}
                        onClick={() =>handleRemoveMaterial(material.name) }
                          />
                    </div>
                  ))}
                  </div>
                 
                </div>
                <DialogFooter>
                  <Button
                  onClick={handleSave}
                   type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )
    }
  }
]
