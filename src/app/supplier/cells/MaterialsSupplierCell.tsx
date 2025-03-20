import { MaterialDbProps, SupplierProps } from "@/app/@types/type";
import { GETMaterials } from "@/app/api/materials/route";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {  Row } from "@tanstack/react-table";






export const MaterialsSupplierCell: React.FC<{ row: Row<SupplierProps> }> = ({ row }) => {
  const supplier: SupplierProps = row.original;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createdMaterial, setCreatedMaterial] = useState(false);
  const [materialExists, setMaterialExists] = useState(false);
  const [materialsSelect, setMaterialsSelect] = useState<MaterialDbProps[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  
  const [formDataMaterial, setFormDataMaterial] = useState({
    name: '',
    quantity: 0,
    unitPrice: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataMaterial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`api/collaborators?id=${supplier.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formDataMaterial),
    });

    if (response.ok) {
      console.log('Colaborador atualizado com sucesso');
      setIsDialogOpen(false);
    } else {
      console.log('Erro ao atualizar colaborador');
    }
  };

  const handleVerifyMaterial = (value: string) => {
    const exists = materialsSelect.some(
      (material) => material.name.toLowerCase() === value.toLowerCase()
    );
    setMaterialExists(exists);
  };

  useEffect(() => {
    async function fetchMaterials() {
      const response = await GETMaterials()
      setMaterialsSelect(response);
    }
    fetchMaterials();
  }, []);

  return (
    <div className="text-right flex items-center gap-2 font-medium">
      <Button onClick={() => setIsDialogOpen(true)} variant="ghost" className="h-4 w-4 p-0 cursor-pointer hover:text-orange-600">
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
                <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Materiais" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialsSelect.map((material) => (
                      <SelectItem key={material.name} value={material.name}>
                        {material.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={() => setCreatedMaterial(true)}>Adicionar novo</Button>
              </div>
              {createdMaterial && (
                <div className="flex items-center gap-4">
                  <Label className="text-right">Nome</Label>
                  <Input
                    style={{ border: materialExists ? '1px solid red' : '' }}
                    name="name"
                    value={formDataMaterial.name}
                    onChange={handleChange}
                    className="col-span-3"
                  />
                  {materialExists && <p className="text-red-500 text-sm mt-1">Este material já está cadastrado.</p>}
                  <Button onClick={() => handleVerifyMaterial(formDataMaterial.name)} type="button">Verificar</Button>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit">Criar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {supplier.materials.map((material, index) => (
        <div key={index}>{material.name}</div>
      ))}
    </div>
  );
};
