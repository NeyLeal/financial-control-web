"use client"

import { useState }from "react"
import { useToast } from "@/hooks/useToast"
import axios from "axios"
import XPWindow from "../components/ui/XPWindow"

export default function Register(){
const { showToast } = useToast()
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
try{
    await axios.post(
    "http://localhost:8080/Users",
    {
    name,
    email,
    password
    }
    )

    showToast(
    "Conta criada",
    "success")
}
catch(error:any){
    showToast(
    "Erro ao criar conta",
    "error"
    )
}

}

return(
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #6ea2e8 0%, #4f7dbd 100%)",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",
      }}
    >  

    <XPWindow
 title="Registrar nova conta"
        width="900px"
        height="600px"
>
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
</XPWindow>

    </main>
)

}