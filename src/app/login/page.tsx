"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/services/auth";
import { useToast } from "@/hooks/useToast";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const result = await login(
        email,
        password
      );

      localStorage.setItem(
        "token",
        result.token
      );

       showToast(
        "Login bem sucedido",
        "success"
      );

      router.push("/dashboard");
    }
    catch (error: any) {

      console.log(
        error?.response?.data
      );
      showToast(
        "Usuário ou senha inválidos",
        "error"
      );
    }
    finally {
      setLoading(false);
    }
  }

return(

<div
className="
min-h-screen
relative
overflow-hidden

bg-gradient-to-b
from-[#729ed9]
to-[#4f7fc0]
"
>

<div
className="
absolute

left-1/2
top-1/2

-translate-x-1/2
-translate-y-1/2

w-[420px]

bg-[#ece9d8]

border

border-black

rounded-b-lg

shadow-[8px_8px_0_black]
"
>

<div
className="
h-[34px]

flex

justify-between

items-center

px-3

text-white

font-bold

bg-gradient-to-r
from-[#2458d4]
to-[#3b86ff]
"
>

<div>

💰 Financial Control

</div>

<div
className="
flex
gap-1
"
>

<button
className="
w-5
h-5
bg-[#ece9d8]
text-black
"
>

—

</button>

<button
className="
w-5
h-5
bg-[#ece9d8]
text-black
text-align-center
"
>

□

</button>

<button
className="
w-5
h-5
bg-red-600
"
>

×

</button>

</div>

</div>

<div className="p-8">

<h1
className="
text-center
text-5xl
font-bold
mb-2
"
>

Bem vindo

</h1>

<div className="mb-5">

<label>

Email

</label>

<input

value={email}

onChange={(e)=>
setEmail(
e.target.value
)}

className="
mt-2
w-full
p-2

bg-white

border

border-black
"

/>

</div>

<div className="mb-8">

<label>

Senha

</label>

<input

type="password"

value={password}

onChange={(e)=>
setPassword(
e.target.value
)}

className="
mt-2
w-full
p-2

bg-white

border

border-black
"

/>

</div>

<button

onClick={handleLogin}

disabled={loading}

className="
w-full

h-[42px]

bg-[#d6d3ce]

border

border-black

hover:bg-[#e8e6dd]
"

>

{

loading
?
"Entrando..."
:
"Entrar"

}

</button>

<button

onClick={()=>
router.push(
"/register"
)
}

className="
mt-4

w-full
"

>

Criar conta

</button>

</div>

</div>

<footer
className="
fixed
bottom-0

w-full

h-[40px]

bg-gradient-to-b
from-[#4d8df3]
to-[#1b57cc]

border-t

border-[#8ec0ff]
"
>

<button
className="
w-[120px]

h-full

rounded-r-full

bg-gradient-to-b
from-[#67d44f]
to-[#218b18]

text-white

font-bold

text-2xl
"
>

Start

</button>

</footer>

</div>

)

}