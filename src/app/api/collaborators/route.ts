import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"


export async function POST(req: Request){
  const url = new URL(req.url)

  const response = await fetch(`${url.origin}/funcionarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
    
  })
  revalidateTag('funcionarios')
  return response.json()
  
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const collaboratorId = url.searchParams.get('id');

  const apiUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const response = await fetch(`${apiUrl}/funcionarios/${collaboratorId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await req.json()), // Converte o body corretamente
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Erro ao atualizar o colaborador' }, { status: response.status });
  }

  revalidateTag('funcionarios');
  const data = await response.json(); // Pega o JSON da resposta corretamente

  return NextResponse.json(data);
}
  

export async function GET(){
  const url = process.env.NEXT_PUBLIC_SERVER_URL
  const response = await fetch(`${url}/funcionarios`,{
    next:{
      revalidate: 1,
      tags: ['funcionarios']
    }
  })
  return response.json()
}