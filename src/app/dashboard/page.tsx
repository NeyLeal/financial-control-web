"use client"

import { useEffect, useState } from "react"

import XPWindow from "../components/ui/XPWindow"

import api from "@/services/api"

import ITransaction from "../../interface/ITransaction"

type DashboardData = {
  currentMonthBalance: number

  currentMonthIncome: number

  currentMonthExpenses: number

  last30DaysIncome: number

  last30DaysExpenses: number

  topCategories: {
    category: string
    amount: number
  }[]
}
  
export default function Dashboard() {
  
  const [transactions, setTransactions] =
  useState<ITransaction[]>([])

  const [dashboard, setDashboard] =
    useState<DashboardData>({
        currentMonthBalance: 0,

        currentMonthIncome: 0,

        currentMonthExpenses: 0,

        last30DaysIncome: 0,

        last30DaysExpenses: 0,

        topCategories: [],
    })
    async function loadTransactions() {
        try {
            const response =
            await api.get(
                "/Transactions"
            )
            
            console.log("Transactions:", response.data.data)
            setTransactions(
            response.data.data
            )
        } catch (error) {
            console.error(error)
        }
    }

  async function loadDashboard() {
    try {
      const response =
        await api.get(
          "/Transactions/dashboard"
        )

      console.log(response.data)

      setDashboard(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
  loadDashboard()

  loadTransactions()
    }, [])

  const thStyle = {
  border: "1px solid #7f9db9",

  padding: "10px",

  textAlign: "left" as const,
 }

 const tdStyle = {
   border: "1px solid #d0d0d0",

   padding: "10px",
 }

  return (
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
        title="Dashboard"
        width="900px"
        height="600px"
      >
        <h1
          style={{
            fontSize: "28px",
            marginBottom: "20px",
          }}
        >
          Bem vindo ao Financial
          Control
        </h1>

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(3, 1fr)",

            gap: "10px",
          }}
        >
          <div
            style={{
              background: "white",

              border:
                "1px solid #7f9db9",

              padding: "20px",

              boxShadow:
                "inset 1px 1px #fff",
            }}
          >
            <h2>Saldo deste Mês</h2>

            <p
              style={{
                fontSize: "24px",

                fontWeight: "bold",

                color: "green",
              }}
            >
              {dashboard.currentMonthBalance.toLocaleString(
                "pt-BR",
                {
                  style: "currency",

                  currency: "BRL",
                }
              )}
            </p>
          </div>

          <div
            style={{
              background: "white",

              border:
                "1px solid #7f9db9",

              padding: "20px",

              boxShadow:
                "inset 1px 1px #fff",
            }}
          >
            <h2>Entradas deste Mês</h2>

            <p
              style={{
                fontSize: "24px",

                fontWeight: "bold",

                color: "#0a59ff",
              }}
            >
              {dashboard.currentMonthIncome.toLocaleString(
                "pt-BR",
                {
                  style: "currency",

                  currency: "BRL",
                }
              )}
            </p>
          </div>

          <div
            style={{
              background: "white",

              border:
                "1px solid #7f9db9",

              padding: "20px",

              boxShadow:
                "inset 1px 1px #fff",
            }}
          >
            <h2>Saídas deste Mês</h2>

            <p
              style={{
                fontSize: "24px",

                fontWeight: "bold",

                color: "red",
              }}
            >
              {dashboard.currentMonthExpenses.toLocaleString(
                "pt-BR",
                {
                  style: "currency",

                  currency: "BRL",
                }
              )}
            </p>
        </div>
        <div
            style={{
                marginTop: "24px",
            }}
            >
            <h2
                style={{
                marginBottom: "12px",
                }}
            >
                Últimas Transações
            </h2>

            <table
                style={{
                width: "100%",

                borderCollapse:
                    "collapse",

                background: "white",

                border:
                    "1px solid #7f9db9",
                }}
            >
                <thead
                style={{
                    background: "#dbe5f1",
                }}
                >
                <tr>
                    <th style={thStyle}>
                    Descrição
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
                {transactions.map(
                    transaction => (
                    <tr
                        key={
                        transaction.id
                        }
                    >
                        <td style={tdStyle}>
                        {
                            transaction.description
                        }
                        </td>

                        <td style={tdStyle}>
                        {transaction.amount.toLocaleString(
                            "pt-BR",
                            {
                            style:
                                "currency",

                            currency:
                                "BRL",
                            }
                        )}
                        </td>

                        <td
                        style={{
                            ...tdStyle,

                            color:
                            transaction.type ===
                            "Income"
                                ? "green"
                                : "red",

                            fontWeight:
                            "bold",
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
          </div>
      </XPWindow>
    </main>
  )
}