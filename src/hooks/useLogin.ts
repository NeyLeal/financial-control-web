import  api  from "@/services/api"

type LoginDto={

email:string

password:string

}

export async function login(
dto:LoginDto
){

const response =
await api.post(
"/Auth/login",
dto
)

return response.data

}