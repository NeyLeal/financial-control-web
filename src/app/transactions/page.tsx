"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/useToast"
import XPWindow from "@/app/components/ui/XPWindow"
import XPModal from "@/app/components/ui/XPModal"

import api from "../../services/api"

type Transaction = {
  id: string
  description: string
  amount: number
  type: string
  date: string
  categoryId: string
}

interface Category {
  id: string
  name: string
}

export default function TransactionsPage() {

    const { showToast } = useToast()
    const [page, setPage] =
    useState(1)

    const [pageSize] =
      useState(10)

    const [totalItems, setTotalItems] =
      useState(0)

    const [filterStartDate, setFilterStartDate] =
    useState("")

    const [filterEndDate, setFilterEndDate] =
    useState("")
    const [filterCategoryId, setFilterCategoryId] =
    useState("")
  
    const [filterType, setFilterType] =
    useState("")
    const [transactions, setTransactions] =
    useState<Transaction[]>([])

    const [loading, setLoading] = useState(true)

    const [isModalOpen, setIsModalOpen] =
      useState(false)
    const [editingId, setEditingId] =
    useState<string | null>(null)
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("Income")

    const [categories, setCategories] =
    useState<Category[]>([])

    const [categoryId, setCategoryId] =
    useState("")
    const [
      deleteTransactionId,
      setDeleteTransactionId,
    ] = useState<
      string | null
    >(null)
  
    async function confirmDelete() {
      if (!deleteTransactionId)
        return

      try {
        await api.delete(
          `/Transactions/${deleteTransactionId}`
        )

        setDeleteTransactionId(
          null
        )

        loadTransactions()
        showToast(
          "Transação excluída com sucesso",
          "success"
        )
      } catch (error) {
        showToast(
          "Erro ao excluir transação",
          "error"
        )
      }
    }
    async function loadCategories() {

    try {

        const response =
        await api.get("/Categories")
        setCategories(response.data)

    } catch (error) {

        showToast(
            "Erro ao carregar categorias",
            "error"
        )
    }
    }
      async function loadTransactions() {
        try {
          setLoading(true)

          const response = await api.get(
            "/Transactions",
            {
              params: {
                page,
                pageSize,

                categoryId:
                  filterCategoryId || undefined,

                type:
                  filterType || undefined,

                startDate:
                  filterStartDate || undefined,

                endDate:
                  filterEndDate || undefined,
              },
            }
          )

          setTransactions(
            response.data.data
          )

          setTotalItems(
            response.data.totalItems
          )
        } catch (error) {
          showToast(
            "Erro ao carregar transações",
            "error"
          )
        } finally {
          setLoading(false)
        }
      }
    function handleEditTransaction(
    transaction: Transaction
    ) {
    setEditingId(transaction.id)

    setTitle(
        transaction.description
    )

    setAmount(
        transaction.amount.toString()
    )

    setType(transaction.type)

    setCategoryId(
        transaction.categoryId
    )

    setIsModalOpen(true)
    }
  async function handleSaveTransaction() {
  try {

    const payload = {
      categoryId,
      amount: Number(amount),
      description: title,
      type:
        type === "Income"
          ? 1
          : 2,
    }

    if (editingId) {

      await api.put(
        `/Transactions/${editingId}`,
        payload
      )

    } else {

      await api.post(
        "/Transactions",
        payload
      )

    }

    setTitle("")
    setAmount("")
    setType("Income")
    setCategoryId("")
    setEditingId(null)

    setIsModalOpen(false)

    loadTransactions()
    loadCategories()
    showToast(
      "Transação salva com sucesso",
      "success"
    )

  } catch (error) {

    showToast(
      "Erro ao salvar transação",
      "error"
    )

  }
}

useEffect(() => {
  loadTransactions()
  loadCategories()
}, [
  page,
  filterCategoryId,
  filterType,
  filterStartDate,
  filterEndDate,
])

const totalPages =
  Math.ceil(
    totalItems / pageSize
  )

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
              onClick={() => {
                setEditingId(null)

                setTitle("")
                setAmount("")
                setType("Income")
                setCategoryId("")

                setIsModalOpen(true)
              }}
              style={buttonStyle}
            >
              Nova Transação
            </button>
          </div>

          <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "16px",
                alignItems: "end",
              }}
            >
              <div
                style={{
                  minWidth: "250px",
                }}
              >
                <label>Categoria</label>

                <select
                  value={filterCategoryId}
                  onChange={e =>
                    setFilterCategoryId(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                >
                  <option value="">
                    Todas
                  </option>

                  {categories.map(category => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div
                style={{
                  minWidth: "200px",
                }}
              >
                <label>Tipo</label>

                <select
                  value={filterType}
                  onChange={e => {
                    setPage(1)
                    setFilterType(
                      e.target.value
                    )
                  }}
                  style={inputStyle}
                >
                  <option value="">
                    Todos
                  </option>

                  <option value="1">
                    Entradas
                  </option>

                  <option value="2">
                    Saídas
                  </option>
                </select>
              </div>
              <div>
                <label>Data Inicial</label>

                <input
                  type="date"
                  value={filterStartDate}
                  onChange={e =>
                    setFilterStartDate(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label>Data Final</label>

                <input
                  type="date"
                  value={filterEndDate}
                  onChange={e =>
                    setFilterEndDate(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />
              </div>

              <button
                onClick={() => {
                  setFilterCategoryId("")
                  setFilterType("")
                  setFilterStartDate("")
                  setFilterEndDate("")
                  setPage(1)
                }}
                style={buttonStyle}
              >
                Limpar
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
                  <th style={thStyle}>
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td
                      colSpan={5}
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
                        colSpan={5}
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
                            borderBottom: "1px solid #d6d3ce"
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
                      <td style={tdStyle}>
                        <div
                            style={{
                            display: "flex",
                            gap: "8px",
                            }}
                        >
                            <button
                            style={buttonStyle}
                            onClick={() =>
                                handleEditTransaction(
                                transaction
                                )
                            }
                            >
                            Editar
                            </button>

                            <button
                            style={{
                                ...buttonStyle,
                                color: "red",
                            }}
                            onClick={() =>
                              setDeleteTransactionId(
                                transaction.id
                              )
                            }
                            >
                            Excluir
                            </button>
                        </div>
                        </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "16px",
                      }}
                    >
                      <button
                        style={buttonStyle}
                        disabled={page === 1}
                        onClick={() =>
                          setPage(page - 1)
                        }
                      >
                        Anterior
                      </button>

                      <span>
                        Página {page} de {totalPages || 1}
                      </span>

                      <button
                        style={buttonStyle}
                        disabled={
                          page >= totalPages
                        }
                        onClick={() =>
                          setPage(page + 1)
                        }
                      >
                        Próxima
                      </button>
                    </div>
          </div>
        </XPWindow>
      </main>

      <XPModal
        title={
        editingId
            ? "Editar Transação"
            : "Nova Transação"
        }
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

            <label>Categoria</label>

            <select
                value={categoryId}
                onChange={e =>
                setCategoryId(
                    e.target.value
                )
                }
                style={inputStyle}
            >

                <option value="">
                Selecione
                </option>

                {categories.map(category => (

                <option
                    key={category.id}
                    value={category.id}
                >
                    {category.name}
                </option>

                ))}

            </select>

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
                handleSaveTransaction
            }
            style={buttonStyle}
            >
            Salvar
            </button>

        </div>
        </XPModal>

        <XPModal
          title="Confirmar Exclusão"
          isOpen={
            deleteTransactionId !== null
          }
          onClose={() =>
            setDeleteTransactionId(
              null
            )
          }
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <p>
              Deseja excluir esta
              transação?
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
              }}
            >
              <button
                style={buttonStyle}
                onClick={
                  confirmDelete
                }
              >
                Sim
              </button>

              <button
                style={buttonStyle}
                onClick={() =>
                  setDeleteTransactionId(
                    null
                  )
                }
              >
                Não
              </button>
            </div>
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