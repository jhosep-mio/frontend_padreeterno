import axios from 'axios'
import { Global } from '../../helper/Global'
import type React from 'react'
// import { type bannersValues } from './Interfaces'

export const getData = async (ruta: string, setDatos: React.Dispatch<React.SetStateAction<never[]>>): Promise<void> => {
  try {
    const request = await axios.get(`${Global.url}/${ruta}`)
    setDatos(request.data)
  } catch (error) {
    console.log(error)
  }
}

export const getOneData = async (ruta: string, setDatos: React.Dispatch<React.SetStateAction<string>>, id: number): Promise<void> => {
  const request = await axios.get(`${Global.url}/${ruta}/${id}`)
  setDatos(request.data)
}
