export interface MaterialDbProps {
  id: string
  name: string
}



export interface MaterialsProps  {
  id: string
  name: string
  quantity: number
  unitPrice: number
  total: number
}

export interface BudgetsProps  {
  id: string
  name: string
  supplierId: string
  supplierName: string
  jobId: string
  JobName: string
  date: Date
  status: string
  total: number
  materials: MaterialsProps[]
}


export interface JobDbProps{
  id: string
  name: string
}