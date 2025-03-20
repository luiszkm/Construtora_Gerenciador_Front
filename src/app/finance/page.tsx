'use client'
import { useEffect, useState } from "react"
import { GETFinances } from "../api/finance/route"
import { columns } from "./columns"
import { DataTable } from "./data-table"




export default function Finance() {
  const [data, setData] = useState([])
  console.log(data)
  useEffect(() => {
    async function fetchFinances(){
      const data = await GETFinances()
      setData(data)
    }
    fetchFinances()
  },[])
  return (
    <main className="overflow-x-hidden w-full px-2">
      <h1>Finance</h1>
            <DataTable columns={columns} data={data} />
      
    </main>
  )
}