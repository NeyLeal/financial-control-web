"use client"

import { useEffect, useState } from "react"

import api from "@/services/api"

import XPWindow from "../components/ui/XPWindow"
import XPModal from "../components/ui/XPModal"

interface Category {
  id: string
  name: string
  color: string
}

export default function CategoriesPage() {

  const [categories, setCategories] =
    useState<Category[]>([])

  const [isModalOpen, setIsModalOpen] =
    useState(false)

  const [name, setName] =
    useState("")

  const [color, setColor] =
    useState("#ffffff")

    const [editingId, setEditingId] =
  useState<string | null>(null)

  async function handleUpdateCategory() {

  try {

    await api.put(
      `/Categories/${editingId}`,
      {
        name,
        color,
      }
    )

    setEditingId(null)

    setName("")
    setColor("#ffffff")

    setIsModalOpen(false)

    loadCategories()

  } catch (error) {

    console.error(error)

    alert("Erro ao editar categoria")
  }
}

  async function loadCategories() {

    try {

      const response =
        await api.get("/Categories")

      console.log(response.data)

      setCategories(response.data)

    } catch (error) {

      console.error(error)

    }
  }

  async function handleCreateCategory() {

    try {

      await api.post("/Categories", {
        name,
        color,
      })

      setName("")
      setColor("#ffffff")

      setIsModalOpen(false)

      loadCategories()

    } catch (error) {

      console.error(error)

      alert("Erro ao criar categoria")
    }
  }

  async function handleDeleteCategory(
    id: string
  ) {

    const confirmDelete =
      confirm(
        "Deseja excluir esta categoria?"
      )

    if (!confirmDelete) return

    try {

      await api.delete(
        `/Categories/${id}`
      )

      loadCategories()

    } catch (error) {

      console.error(error)

      alert("Erro ao excluir categoria")
    }
  }

  useEffect(() => {

    loadCategories()

  }, [])

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    background: "#dcd8c8",
  }

  const thStyle = {
    border: "1px solid #7f9db9",
    background: "#c7d3e5",
    padding: "10px",
    textAlign: "left" as const,
  }

  const tdStyle = {
    border: "1px solid #c0c0c0",
    padding: "10px",
  }

  const buttonStyle = {
    border: "1px solid #7f9db9",
    background: "#ece9d8",
    padding: "6px 12px",
    cursor: "pointer",
    fontWeight: "bold" as const,
  }

  const inputStyle = {
    width: "100%",
    border: "1px solid #7f9db9",
    padding: "8px",
    background: "white",
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
        title="Categorias"
        width="1000px"
        height="700px"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2>Categorias</h2>

          <button
            style={buttonStyle}
            onClick={() =>
              setIsModalOpen(true)
            }
          >
            Nova Categoria
          </button>
        </div>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>
                Nome
              </th>
              <th style={thStyle}>
                Ações
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map(category => (

              <tr key={category.id}>

                <td style={tdStyle}>
                  {category.name}
                </td>

                <td style={tdStyle}>

                  <button
                    style={{
                        ...buttonStyle,
                        marginRight: "8px",
                    }}
                    onClick={() => {

                        setEditingId(category.id)

                        setName(category.name)

                        setColor(
                        category.color ||
                        "#ffffff"
                        )

                        setIsModalOpen(true)
                    }}
                    >
                    Editar
                  </button>

                  <button
                    style={buttonStyle}
                    onClick={() =>
                      handleDeleteCategory(
                        category.id
                      )
                    }
                  >
                    Excluir
                  </button>

                </td>

              </tr>

            ))}
          </tbody>
        </table>

        <XPModal
          title="Nova Categoria"
          isOpen={isModalOpen}
          onClose={() => {

            setEditingId(null)

            setName("")

            setColor("#ffffff")

            setIsModalOpen(false)
            }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div>
              <label>Nome</label>

              <input
                value={name}
                onChange={e =>
                  setName(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            <button
              onClick={() => {

                if (editingId) {

                    handleUpdateCategory()

                } else {

                    handleCreateCategory()
                }
                }}
            >
              Salvar
            </button>
          </div>
        </XPModal>
      </XPWindow>
    </main>
  )
}