type Props={
title:string
children:React.ReactNode
}

export function Window({
title,
children
}:Props){

return(

<div

className="

w-[470px]

rounded-t-[10px]

rounded-b-[8px]

overflow-hidden

border

border-[#0d2f7b]

bg-[#ece9d8]

shadow-[0_10px_25px_rgba(0,0,0,.45)]

"

>

<div

className="

h-[38px]

flex

justify-between

items-center

px-4

bg-gradient-to-r

from-[#0057d8]

via-[#3b8cff]

to-[#0d46b5]

text-white

font-bold

"

>

<div>

💰 Financial Control

</div>

<div
className="
flex
gap-1">

<XpButton>
—
</XpButton>

<XpButton>
□
</XpButton>

<XpButton close>
×
</XpButton>

</div>

</div>

<div
className="

p-8

">

{children}

</div>

</div>

)

}

function XpButton({
children,
close
}:any){

return(

<button

className={`

w-6

h-6

border

rounded-[3px]

text-black

font-bold

${
close
?

"bg-red-500"

:

"bg-[#ece9d8]"
}

`}

>

{children}

</button>

)

}