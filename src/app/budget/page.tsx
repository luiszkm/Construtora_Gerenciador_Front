import { GETBudgets } from '../api/budget/route'
import { columns } from './columns'
import { DataTable } from './data-table'

export default async function Budget() {
  const data = await GETBudgets()

  return (
    <main className="overflow-x-hidden w-full px-2">
      <h1>Budget</h1>
      <DataTable columns={columns} data={data} />
    </main>
  )
}
