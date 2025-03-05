import { GET } from "../api/collaborators/route"
import { CollaboratorProps, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<CollaboratorProps[]> {
  const collaborators = await GET()
  return collaborators

}

export default async function Collaborator (){
  const data = await getData()


  return (
    <main>
      <h1>
        Colaborador
      </h1>

      <DataTable columns={columns} data={data} />

    </main>
  )
}