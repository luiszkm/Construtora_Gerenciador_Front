import { useState } from "react";
import { Trash, PlusCircle } from "lucide-react";

type MaterialsProps = {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}

type MaterialListProps = {
  materials: MaterialsProps[];
  newMaterial: string;
  isInputValue: boolean;
  setMaterials: (materials: MaterialsProps[]) => void;
};

export const MaterialList = ({ materials, newMaterial, setMaterials, isInputValue }: MaterialListProps) => {
  const [markedForRemoval, setMarkedForRemoval] = useState<string[]>([]);

  const toggleMark = (name: string) => {
    setMarkedForRemoval((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !materials.some((mat) => mat.name === newMaterial)) {
      setMaterials([...materials, { id: Date.now().toString(), name: newMaterial, quantity: 0, unitPrice: 0, total: 0 }]);
    }
  };

  return (
    <div className="flex flex-col gap-2">{
      !isInputValue && (
        <PlusCircle className="cursor-pointer text-green-600" onClick={addMaterial} />
      )
    }

      {materials.map((material) => (
        <div
          key={material.name}
          className={`p-1 rounded-lg flex text-xs items-center gap-2 border ${
            markedForRemoval.includes(material.name)
              ? "bg-red-600 text-white"
              : "border-orange-600"
          }`}
        >
          {material.name}

          <Trash
            className="cursor-pointer"
            width={12}
            onClick={() => toggleMark(material.name)}
          />
        </div>
      ))}
    </div>
  );
};
