import { GET } from "../api/supplier/route"
import { columns, SupplierProps } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<SupplierProps[]> {
  const suppliers = await GET()
  return suppliers

}
export default async function Supplier (){
  const data = await getData()

  return (
    <div>
      Supplier Page
      <DataTable columns={columns} data={data} />
    </div>
  )
}