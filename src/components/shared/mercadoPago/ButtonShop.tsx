import { useEffect, useState } from 'react'
import { visa } from '../images'
import useAuth from '../../../hooks/useAuth'
import axios from 'axios'
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react'

export const ButtonShop = (): JSX.Element => {
  const [loading] = useState<boolean>(false)
  const [preferenceId, setPreferenceId] = useState('')
  const { cart } = useAuth()

  useEffect(() => {
    // Inicializa Mercado Pago con tu clave pública
    initMercadoPago('TEST-866522c4-294c-4ec1-928d-2f6ccaba880e')
  }, [])

  const handleClickPagar = async (): Promise<void> => {
    try {
      const preferenceData = {
        items: cart.map((producto) => ({
          titles: producto.nombre,
          unit_price:
            producto.precio !== null ? parseFloat(String(producto.precio)) : 0,
          quantity: producto.cantidad
        }))
        // Otros detalles de la preferencia de pago
      }

      // Envía la preferencia de pago a la API de Mercado Pago para generar el ID de la preferencia
      const response = await axios.post(
        'https://api.mercadopago.com/checkout/preferences',
        preferenceData,
        {
          headers: {
            Authorization:
              'Bearer TEST-1103294386763254-070518-dc0ef1e2d894ce6b2c4f58cdd988a282-485171551',
            'Content-Type': 'application/json'
          }
        }
      )
      const preferenceId: string = response.data.id
      setPreferenceId(preferenceId)
    } catch (error) {
      console.error('Error al generar la preferencia de pago:', error)
    }
  }
  return (
    <>
      {loading
        ? (
        <button className="countarget-img envioFormulario pagoCulqui" disabled>
          <img src={visa} />
          <span className="countarget-box">....cargando</span>
        </button>
          )
        : (
        <button className="countarget-img envioFormulario pagoCulqui">
          <img src={visa} />
          <span
            className="countarget-box"
            onClick={() => {
              handleClickPagar()
            }}
          >
            Pague con Tarjeta
          </span>
        </button>
          )}
      {preferenceId && (
       <Wallet initialization={{ preferenceId }} />
      )}
    </>
  )
}
