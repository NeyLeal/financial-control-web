"use client";

import {
useEffect,
useState
}
from "react";

import {
useRouter
}
from "next/navigation";

type Props = {
children: React.ReactNode;
};

export default function AuthGuard({
children,
}: Props) {

const router =
useRouter();

const [
authorized,
setAuthorized
]
=
useState<
boolean | null
>(
null
);

useEffect(() => {

const token =
localStorage.getItem(
"token"
);

if (!token)
{
router.replace(
"/login"
);

setAuthorized(
false
);

return;
}

setAuthorized(
true
);

},
[
router
]);

if (
authorized === null
)
{
return null;
}

if (
authorized === false
)
{
return null;
}

return (
<>
{children}
</>
);

}