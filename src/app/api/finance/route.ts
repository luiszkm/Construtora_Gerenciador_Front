


export async function GETFinances(){
  const url = process.env.NEXT_PUBLIC_SERVER_URL
  const response = await fetch(`${url}/financeiro`,{
    next:{
      revalidate: 1,
      tags: ['finance']
    }
  })
  return response.json()
}