import { FinanceProps, InvoiceDbProps } from "@/app/@types/type";
import { GETInvoices } from "@/app/api/invoices/route";
import { Row } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { SelectInvoices } from "@/components/SelectInvoices";
import { Input } from "@/components/ui/input";
import { formatCurrencyInput } from "@/utils/masks";

export const ActionFinanceCell: React.FC<{ row: Row<FinanceProps>  }> = ({ row }) => {
const finance: FinanceProps = row.original
      const [isDialogOpen, setIsDialogOpen] = useState(false)
      const [invoice, setInvoice] = useState('')
      const [invoices, setInvoices] = useState<InvoiceDbProps[]>([])
      const [invoiceExistis, setInvoiceExistis] = useState(false)
      const [createInvoice, setCreateInvoice] = useState(false)
      const [formDataInvoice, setFormDataInvoice] = useState('')
      const [dataIsNotOK, setDataIsNotOk] = useState(false)
      const handleVerifyMaterial = (value: string) => {
        const contains = invoices.filter(
          x => x.name.toLowerCase() == value.toLowerCase()
        )
        console.log(contains)
        if (contains.length > 0) {
          setInvoiceExistis(true)
          setInvoice('')
        } else {
          setInvoiceExistis(false)
        }
      }

      const handlePayment = async () => {
        setDataIsNotOk(false)
        if ((invoice == '' && formDataInvoice == '') || invoiceExistis) {
          setDataIsNotOk(true)
          return
        }

        // const updatedData = { ...finance, status: 'Pago' }
        // const response = await fetch(`api/collaborators?id=${finance.id}`, {
        //   method: 'PUT',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(updatedData)
        // })

        // if (response.ok) {
        //   console.log('Colaborador atualizado com sucesso')
        // } else {
        //   console.log('Erro ao atualizar colaborador')
        // }
        setIsDialogOpen(false)
      }
      const handleCancelPayment = async () => {
        const isPay = (row.original.status = 'Pago')

        if (isPay) {
          const updatedData = { ...finance, status: 'Pendente' }
          const response = await fetch(`api/collaborators?id=${finance.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          })
          if (response.ok) {
            console.log('Colaborador atualizado com sucesso')
          } else {
            console.log('Erro ao atualizar colaborador')
          }
        }
      }
      useEffect(() => {
        async function getInvoices() {
          const response = await GETInvoices()
          setInvoices(response)
        }
        getInvoices()
      }, [])
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            Pagar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleCancelPayment()}>
            Cancelar Pagamento
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Efetuar Pagamento</DialogTitle>
          </DialogHeader>
          <div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <SelectInvoices
                  edit={true}
                  selectedInvoices={invoice}
                  setSelectedInvoices={setInvoice}
                />
                <PlusCircle
                  className="h-8 w-8 text-green-500 cursor-pointer"
                  onClick={() => setCreateInvoice(true)}
                />
              </div>
              {createInvoice && (
                <div className="flex items-center gap-4">
                  <div>
                    <Input
                      style={{
                        border: invoiceExistis ? '1px solid red' : ''
                      }}
                      placeholder="nome da conta"
                      name="name"
                      value={formDataInvoice}
                      onChange={e => setFormDataInvoice(e.target.value)}
                      className="col-span-3"
                    />
                    {invoiceExistis && (
                      <p className="text-red-500 text-sm mt-1">
                        Este material já está cadastrado.
                      </p>
                    )}
                  </div>
                  <Button
                    className="cursor-pointer"
                    onClick={() => handleVerifyMaterial(formDataInvoice)}
                    type="button"
                  >
                    Verificar
                  </Button>
                </div>
              )}
              <div className="flex items-center justify-between w-full gap-2">
                <strong>
                  {formatCurrencyInput(String(finance.value))}
                </strong>

                <Button
                  onClick={handlePayment}
                  className="bg-green-600 hover:bg-green-800 cursor-pointer"
                >
                  Pagar
                </Button>
              </div>
            </div>
            {dataIsNotOK && (
              <small className="text-red-500">selecione uma conta</small>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
