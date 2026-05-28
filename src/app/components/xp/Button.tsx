type Props=
React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button(
props:Props
){

return(

<button

{...props}

className="

h-[34px]

bg-[#d4d0c8]

border

border-black

px-5

cursor-pointer

active:translate-y-[1px]

"

>

{props.children}

</button>

)

}