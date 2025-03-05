import { GET } from '../api/collaborators/route'
import { CollaboratorProps, columns } from './columns'
import { DataTable } from './data-table'

async function getData(): Promise<CollaboratorProps[]> {
  const collaborators = await GET()
  return collaborators
}

export default async function Collaborator() {
  const data = await getData()

  const totalDailyPrice = data
    .map(c => {
      const totalCollaborators =
        c.dailyPrice * c.workingDays +
        c.additionalMoney -
        c.advanceMoney -
        c.discount

      return totalCollaborators
    })
    .reduce((total, current) => total + current, 0)

  const dateCurrent = data.map(c => {
    return c.date
  })
  const date = new Date(dateCurrent[0]).toLocaleDateString('pt-BR', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <main className="overflow-x-hidden w-full px-2">
      <div className="flex flex-col justify-between items-center py-4">
        <span>
       {date}
        </span>
        <span>
          Total:{' '}
          {totalDailyPrice.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </span>
      </div>

      <DataTable columns={columns} data={data} />
    </main>
  )
}
