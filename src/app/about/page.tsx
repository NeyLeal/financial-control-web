import XPWindow from
"../components/ui/XPWindow"

export default function AboutPage()
{
  return (
    <main
        style={{
          minHeight: "100vh",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <XPWindow
        title="Sobre"
        width="700px"
        height="500px"
        >
        <h1>
            Financial Control XP
        </h1>

        <p>
            Versão 1.0
        </p>

        <p>
            Desenvolvido com:
        </p>

        <ul>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>.NET 8</li>
            <li>SQL Server</li>
            <li>JWT</li>
        </ul>
        </XPWindow>
    </main>
  )
}