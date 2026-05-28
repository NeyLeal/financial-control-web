import Taskbar from "./Taskbar"

export function Desktop({
children
}:{
children:React.ReactNode
}){

return(

<div
className="
min-h-screen
relative
overflow-hidden
bg-[#5d89c9]
"
>

<div
className="
absolute
inset-0
bg-gradient-to-b
from-[#729ed9]
to-[#4f7fc0]
"
/>

<div
className="
relative
z-10
h-screen
pb-[40px]
">

{children}

</div>

<Taskbar/>

</div>

)

}