/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type UserName = {
  firstName: string
  lastName: string
}

export type Address = {
  street: string
  city: string
  country: string
}

export type Orders = {
  productName: string
  price: number
  quantity: number
}

export type User = {
  userId: number
  userName: string
  password: string
  fullName: UserName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: Address
  orders: Orders[]
}

export interface UserModels extends Model<User> {
  isUserExists(id: number): Promise<User | null>
}
