


export async function GETInvoices(){
  const url = process.env.NEXT_PUBLIC_SERVER_URL
  const response = await fetch(`${url}/invoices`,{
    next:{
      revalidate: 1,
      tags: ['finance']
    }
  })
  return response.json()
}