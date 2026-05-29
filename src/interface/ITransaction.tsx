export default interface Transaction {
  id: string
  description: string
  amount: number
  type: string
  date: string

  categoryId: string

  category?: {
    id: string
    name: string
  }
}