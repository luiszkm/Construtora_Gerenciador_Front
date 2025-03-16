'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, PlusCircle, Star, Trash } from 'lucide-react'
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
  name: string
}

type BudgetsProps = {
  id: string
  idSupplier: string
  jobId: string
  date: Date
  materials: MaterialsProps[]
}

export type SupplierProps = {
  id: string
  name: string
  phone: string
  owner: string
  budget: BudgetsProps[]
  address: string
  email: string
  active: boolean
  rate: number
  obs: string
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
import { Rate } from '@/components/Rate'
import { MaterialList } from '@/components/MaterialList'
import Link from 'next/link'

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
    cell: ({row}) => {
      return <Link href={`budget/${row.id}`} >Orçamentos</Link>
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
      const supplier: SupplierProps = row.original
      const [materials, setMaterials] = useState(supplier.materials)
      const [rating, setRating] = useState(supplier.rate)
      const [createdMaterial, setCreatedMaterial] = useState(false)
      const [materialExistis, setMaterialExistis] = useState(false)
      const [materialsSelect, setMaterialsSelect] = useState<MaterialDbProps[]>(
        []
      ) // data from database
      const [selectedMaterial, setSelectedMaterial] = useState<string>('')
      const [isDialogOpen, setIsDialogOpen] = useState(false)
      const [newMaterial, setNewMaterial] = useState('')
      const [materialInput, setMaterialInput] = useState('')

      const [formData, setFormData] = useState({
        name: supplier.name,
        phone: supplier.phone,
        owner: supplier.owner,
        active: supplier.active,
        materials: materials,
        email: supplier.email,
        address: supplier.address,
        rate: supplier.rate,
        obs: supplier.obs
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

    

      const handleCreateMaterial = () => {
        setCreatedMaterial(true)
        setSelectedMaterial('')
      }
      const handleVerifyMaterial = () => {
        if (!materialInput.trim()) return;
    
        // Verifica se o material já existe no select
        const exists = materialsSelect.some((mat) => mat.name.toLowerCase() === materialInput.toLowerCase());
    
        if (exists) {
          setMaterialExistis(true);
          return;
        }
    
        setMaterialsSelect([...materialsSelect, { name: materialInput }]);
        setMaterials([...materials, { id: '', name: materialInput, quantity: 0, unitPrice: 0, total: 0 }]);
        setMaterialInput("");
        setCreatedMaterial(false);
        setMaterialExistis(false);
        const contains = materialsSelect.filter(
          material => material.name.toLowerCase() === materialInput.toLowerCase()
        )
        if (contains.length > 0) {
          setMaterialExistis(true)
          return true
        } else {
          setMaterialExistis(false)
          return false
        }
      }

      const handleSelectChange = (value: string) => {
        setSelectedMaterial(value)
        setNewMaterial(value)
        setCreatedMaterial(false)
      }
      const handleSave = async () => {
        const updatedData = { ...formData }
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
      useEffect(() => {
        async function fetchMaterials() {
          const response = await getMaterials()
          setMaterialsSelect(response)
        }
        fetchMaterials()
      }, [])
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
                {supplier.active ? 'Desativar' : 'Ativar'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Fornecedor</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave}>
                <div className="grid gap-2 py-2">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-start">
                      <Label className="text-right">Nome</Label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>

                    <div className="flex flex-col items-start ">
                      <Label className="text-right">Contato</Label>
                      <Input
                        type="number"
                        name="workingDays"
                        value={formData.phone}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-start">
                      <Label className="text-right">Email</Label>
                      <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>

                    <div className="flex flex-col items-start ">
                      <Label className="text-right">Atendente</Label>
                      <Input
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col items-start">
                      <Label className="text-right">Endereço</Label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>

                    <div className="flex flex-col items-start ">
                      <Label className="text-right">Observação</Label>
                      <Input
                        name="obs"
                        value={formData.obs}
                        onChange={handleChange}
                        className="col-span-3"
                      />
                    </div>

                    <div>
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
                  </div>

                  <div className="flex flex-col items-start gap-4">
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
                            materialsSelect?.map(
                              (material: MaterialDbProps) => (
                                <SelectItem
                                  key={material.name}
                                  value={material.name}
                                >
                                  {material.name}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        className="cursor-pointer text-green-600"
                        onClick={() => handleCreateMaterial()}
                      >
                        cadastrar
                      </Button>

                      {createdMaterial && (
                        <div className="flex items-center gap-4">
                          <div className="flex items-start flex-col">
                            <Input
                              style={{
                                border: materialExistis ? '1px solid red' : ''
                              }}
                              name="name"
                              value={materialInput}
                              onChange={e => setMaterialInput(e.target.value)}
                              className="col-span-3"
                            />
                            {materialExistis && (
                              <small className="text-red-500 text-xm mt-1">
                                Este material já está cadastrado.
                              </small>
                            )}
                          </div>
                          <PlusCircle className="cursor-pointer text-green-600"onClick={() => handleVerifyMaterial()} />
                        </div>
                      )}
                    </div>

                    <MaterialList
                      isInputValue={createdMaterial}
                      materials={materials}
                      newMaterial={newMaterial}
                      setMaterials={setMaterials}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSave} type="submit">
                    Salvar
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )
    }
  }
]
