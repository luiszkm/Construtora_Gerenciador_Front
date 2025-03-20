export interface MaterialDbProps {
  id: string
  name: string
}


export interface BudgetsProps  {
  id: string
  idSupplier: string
  jobId: string
  date: Date
  materials: MaterialsProps[]
}

export interface SupplierProps  {
  id: string
  name: string
  phone: string
  owner: string
  budget: BudgetsProps[]
  address: string
  email: string
  active: boolean
  rate: number
  obs: string
  materials: MaterialsProps[]
  materialsDb: MaterialDbProps[]
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

export interface FinanceProps {
  id: string
  name: string
  supplierId: string
  supplierName: string
  jobId: string
  JobName: string
  invoice: string
  invoiceId: string
  date: Date
  status: string
  value: number
  budgetId: string
  budgetName: string
  materials: MaterialsProps[]

}

export interface InvoiceDbProps {
  id: string
  name: string
}


export interface CollaboratorProps {
  id: string
  status: 'pendente' | 'pago'
  name: string
  role: 'pedreiro' | 'ajudante'
  dailyPrice: number
  workingDays: number
  additionalMoney: number
  advanceMoney: number
  active: boolean
  totalFifteenDays: number
  pixKey: string
  payDay: Date
  totalToPay: number
  discount: number
  rate: number
  comment: string
}