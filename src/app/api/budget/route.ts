import { NextResponse } from "next/server"


export async function POST(req: Request){
  const url = new URL(req.url)

  const response = await fetch(`${url.origin}/materials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
    
  })
 // revalidateTag('budgets')
  return response.json()
  
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const supplierId = url.searchParams.get('id');

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const response = await fetch(`${apiUrl}/materials/${supplierId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await req.json()), // Converte o body corretamente
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Erro ao atualizar o colaborador' }, { status: response.status });
  }

  //revalidateTag('budgets');
  const data = await response.json(); // Pega o JSON da resposta corretamente

  return NextResponse.json(data);
}
  

export async function GETBudgets(){
  const url = process.env.NEXT_PUBLIC_SERVER_URL
  const response = await fetch(`${url}/Orcamentos`,{
    next:{
      revalidate: 1,
      tags: ['budgets']
    }
  })
  return response.json()
}

export async function GETBudgetsCompare(){
  const url = process.env.NEXT_PUBLIC_SERVER_URL
  const response = await fetch(`${url}/compare`,{
    next:{
      revalidate: 1,
      tags: ['budgets']
    }
  })
  return response.json()
}