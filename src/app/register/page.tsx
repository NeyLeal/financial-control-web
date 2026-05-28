"use client"

import { useState }from "react"

import axios from "axios"

export default function Register(){

const[
name,
setName
]=
useState("")

const[
email,
setEmail
]=
useState("")

const[
password,
setPassword
]=
useState("")

async function create(){

await axios.post(
"http://localhost:8080/Users",
{
name,
email,
password
}
)

alert(
"Conta criada"
)

}

return(

<div>

<input
placeholder="Nome"

onChange={(e)=>
setName(
e.target.value
)}
/>

<input
placeholder="Email"

onChange={(e)=>
setEmail(
e.target.value
)}
/>

<input
type="password"

placeholder="Senha"

onChange={(e)=>
setPassword(
e.target.value
)}
/>

<button
onClick={create}
>

Criar

</button>

</div>

)

}