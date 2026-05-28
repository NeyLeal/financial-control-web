type Props=
React.InputHTMLAttributes<HTMLInputElement>

export function Input(
props:Props
){

return(

<input

{...props}

className="

w-full
h-[34px]

border

border-gray-600

bg-white

px-2

outline-none

"
/>

)

}