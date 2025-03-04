import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      dailyPrice: 100,
      status: "aguardando",
      name: "Pedro",
      role: "ajudante",
      workingDays: 10,
      additionalMoney: 50,
      advanceMoney: 0,
      active: true,
      pixKey: "dadadadadadad333",
      totalFifteenDays: 0,
    },
    {
      id: "2",
      dailyPrice: 150,
      status: "pago",
      name: "Irineu",
      role: "pedreiro",
      workingDays: 15,
      additionalMoney: 150,
      advanceMoney: 100,
      active: true,
      pixKey: "32323211",
      totalFifteenDays: 0,
    },
    {
      id: "3",
      dailyPrice: 150,
      status: "pago",
      name: "zina",
      role: "pedreiro",
      workingDays: 15,
      additionalMoney: 150,
      advanceMoney: 100,
      active: true,
      pixKey: "32323211",
      totalFifteenDays: 0,
    },
    // ...
  ]
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