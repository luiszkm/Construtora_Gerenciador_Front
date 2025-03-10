import { GETMaterials } from "../api/materials/route"
import { GET } from "../api/supplier/route"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function Supplier (){
  const data =await GET()
  const materials = await GETMaterials()
  return (
    <main className="w-full">
      Supplier Page
      <DataTable columns={columns} data={data} materials={materials} />
    </main>
  )
}