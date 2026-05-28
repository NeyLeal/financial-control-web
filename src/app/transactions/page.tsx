"use client"

import { useEffect, useState } from "react"

import XPWindow from "@/app/components/ui/XPWindow"
import XPModal from "@/app/components/ui/XPModal"

import api from "../../services/api"

type Transaction = {
  id: string
  description: string
  amount: number
  type: string
  date: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<
    Transaction[]
  >([])

  const [loading, setLoading] = useState(true)

  const [isModalOpen, setIsModalOpen] =
    useState(false)

  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [type, setType] = useState("Income")

  async function loadTransactions() {
    try {
      const response =
        await api.get("/Transactions")
        
        console.log(response.data)
        console.log(response.data.data)
        
      setTransactions(response.data.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateTransaction() {
  try {
    await api.post("/Transactions", {
      categoryId:
        "a5e9e45f-d788-4aa2-99d9-3a855c610574",

      description: title,

      amount: Number(amount),

      type:
        type === "Income"
          ? 1
          : 2,
    })

    setTitle("")
    setAmount("")
    setType("Income")

    setIsModalOpen(false)

    loadTransactions()
  } catch (error) {
    console.error(error)

    alert(
      "Erro ao criar transação"
    )
  }
}

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <>
      <main
        style={{
          minHeight: "100vh",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <XPWindow
          title="Transações"
          width="1000px"
          height="650px"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",

              marginBottom: "20px",
            }}
          >
            <h1
              style={{
                margin: 0,
              }}
            >
              Transações
            </h1>

            <button
              onClick={() =>
                setIsModalOpen(true)
              }
              style={buttonStyle}
            >
              Nova Transação
            </button>
          </div>

          <div
            style={{
              border: "1px solid #7f9db9",
              background: "white",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#dbe5f1",
                  }}
                >
                  <th style={thStyle}>
                    Título
                  </th>

                  <th style={thStyle}>
                    Valor
                  </th>

                  <th style={thStyle}>
                    Tipo
                  </th>

                  <th style={thStyle}>
                    Data
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={4}
                      style={emptyStyle}
                    >
                      Carregando...
                    </td>
                  </tr>
                )}

                {!loading &&
                  transactions.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={4}
                        style={emptyStyle}
                      >
                        Nenhuma transação
                        encontrada
                      </td>
                    </tr>
                  )}

                {transactions.map(
                  transaction => (
                    <tr
                      key={transaction.id}
                    >
                      <td style={tdStyle}>
                        {
                          transaction.description
                        }
                      </td>

                      <td style={tdStyle}>
                        R${" "}
                        {
                          transaction.amount
                        }
                      </td>

                      <td
                        style={{
                            color:
                            transaction.type ===
                            "Income"
                                ? "#008000"
                                : "#cc0000",

                            fontWeight: "bold",
                        }}
                        >
                        {transaction.type ===
                        "Income"
                            ? "Entrada"
                            : "Saída"}
                      </td>

                      <td style={tdStyle}>
                        { new Date(
                            transaction.date
                        ).toLocaleDateString(
                            "pt-BR"
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </XPWindow>
      </main>

      <XPModal
        title="Nova Transação"
        isOpen={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div>
            <label>Título</label>

            <input
              value={title}
              onChange={e =>
                setTitle(
                  e.target.value
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>Valor</label>

            <input
              type="number"
              value={amount}
              onChange={e =>
                setAmount(
                  e.target.value
                )
              }
              style={inputStyle}
            />
          </div>

          <div>
            <label>Tipo</label>

            <select
              value={type}
              onChange={e =>
                setType(
                  e.target.value
                )
              }
              style={inputStyle}
            >
              <option value="Income">
                Entrada
              </option>

              <option value="Expense">
                Saída
              </option>
            </select>
          </div>

          <button
            onClick={
              handleCreateTransaction
            }
            style={buttonStyle}
          >
            Salvar
          </button>
        </div>
      </XPModal>
    </>
  )
}

const buttonStyle: React.CSSProperties =
  {
    height: "36px",

    paddingLeft: "18px",
    paddingRight: "18px",

    border: "1px solid #7f9db9",

    background:
      "linear-gradient(to bottom, #ffffff 0%, #d6d3ce 100%)",

    cursor: "pointer",

    fontWeight: "bold",
  }

const inputStyle: React.CSSProperties =
  {
    width: "100%",

    height: "34px",

    marginTop: "6px",

    border: "1px solid #7f9db9",

    paddingLeft: "10px",

    background: "white",
  }

const thStyle: React.CSSProperties = {
  borderBottom: "1px solid #7f9db9",

  textAlign: "left",

  padding: "12px",
}

const tdStyle: React.CSSProperties = {
  padding: "12px",

  borderBottom: "1px solid #d6d3ce",
}

const emptyStyle: React.CSSProperties =
  {
    padding: "30px",

    textAlign: "center",
  }