import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import axios from 'axios'
import { Global } from '../../helper/Global'
// import Swal from 'sweetalert2'
import useAuth from '../../hooks/useAuth'
import Swal from 'sweetalert2'
import { icono } from '../shared/images'
import { BsWhatsapp } from 'react-icons/bs'
import draw1 from './../../assets/images/animate1.gif'
import draw2 from './../../assets/images/undraw_completed_03xt.gif'
import draw3 from './../../assets/images/undraw_happy_announcement_re_tsm0.svg'
import draw4 from './../../assets/images/undraw_online_party_re_7t6g.svg'
import draw5 from './../../assets/images/undraw_super_thank_you_re_f8bo.svg'
import draw6 from './../../assets/images/undraw_well_done_re_3hpo.svg'
import Loading from '../shared/Loading'

export const SuccesPago = (): JSX.Element => {
  const location = useLocation()
  const { setCart } = useAuth()
  const queryParams = queryString.parse(location.search)
  const [loading, setLoading] = useState<boolean>(true)
  const paymentId = queryParams.payment_id
  const [nombre, setNombre] = useState<string>('')
  const navigate = useNavigate()

  const status = queryParams.status
  const paymentType = queryParams.payment_type
  const orderId = queryParams.merchant_order_id

  const encryptionKey = 'qwerasd159'
  const encryptedData = localStorage.getItem('data')

  const images = ['draw1', 'draw2', 'draw3', 'draw4', 'draw5', 'draw6']
  const randomIndex = Math.floor(Math.random() * images.length)
  const randomImage = images[randomIndex]

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      if (await validarTransaccion()) {
        Swal.fire('Transacción ya registrada', '', 'warning')
      } else {
        guardarData()
      }
    }
    fetchData()
    setLoading(false)
    window.scrollTo(0, 0)
  }, [])

  const guardarData = async (): Promise<void> => {
    if (encryptedData !== null) {
      const decryptedData = CryptoJS.AES.decrypt(
        encryptedData,
        encryptionKey
      ).toString(CryptoJS.enc.Utf8)
      const values = JSON.parse(decryptedData)
      try {
        const data = new FormData()
        data.append('id_transaccion', String(paymentId))

        data.append('status', String(status))
        data.append('tipo', String(paymentType))
        data.append('order_id', String(orderId))

        const nombres: string = values[0].nombres.toString()
        const apellidos: string = values[0].apellidos.toString()
        setNombre(nombres + ' ' + apellidos)

        data.append('nombres', values[0].nombres)
        data.append('apellidos', values[0].apellidos)
        data.append('email', values[0].email)
        data.append('celular', values[0].celular)
        data.append('comentario', values[0].comentario)
        data.append('delivery', values[0].delivery)
        data.append('array_productos', JSON.stringify(values[0].cart))
        data.append('total_pago', values[0].total)

        const respuesta = await axios.post(
          `${Global.url}/handleSuccessTransaction`,
          data
        )

        if (respuesta.data.status === 'success') {
          localStorage.removeItem('cart')
          localStorage.removeItem('data')
          setCart([])
          // Swal.fire('Agregado correctamente', '', 'success')
        } else {
          // Swal.fire('Error ', '', 'error')
        }
      } catch (error) {}
    } else {
      Swal.fire('Transacción invalida', '', 'error')
      navigate('/compra')
    }
  }

  const validarTransaccion = async (): Promise<boolean> => {
    if (paymentId && status && paymentType && orderId) {
      const data = new FormData()
      data.append('id_transaccion', String(paymentId))
      data.append('status', String(status))
      data.append('tipo', String(paymentType))
      data.append('order_id', String(orderId))
      const request = await axios.post(
        `${Global.url}/oneTransaccion`, data
      )
      // eslint-disable-next-line eqeqeq
      if (request.data.length == 1) {
        return true
      } else {
        return false
      }
    } else {
      navigate('/compra')
      return false
    }
  }

  return (
    <>
      {loading && <Loading/>}
      {nombre
        ? <div className="h-fit w-[99wv] flex items-center justify-center p-0 m-0">
          <section className="window window px-20 py-12 bg-white" style={{ overflow: 'hidden' }}>
            <div className="window__wrapper">
              <div className="window__wrapper__head">
                <h2>
                  <span>
                    <img src={icono} alt="" />
                  </span>
                  Compra realizada exitosamente
                </h2>
              </div>
              <div
                className="window__wrapper__body"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <h3>
                  Gracias{' '}
                  <strong className="text-4xl md:text-5xl font-bold">
                    {nombre}
                  </strong>{' '}
                </h3>
                <p>Nos podremos en contacto con usted</p>
                <picture>
                  <img
                    src={
                      (randomImage == 'draw1' ? draw1 : '') ||
                      (randomImage == 'draw2' ? draw2 : '') ||
                      (randomImage == 'draw3' ? draw3 : '') ||
                      (randomImage == 'draw4' ? draw4 : '') ||
                      (randomImage == 'draw5' ? draw5 : '') ||
                      (randomImage == 'draw6' ? draw6 : '')
                    }
                    alt=""
                  />
                </picture>
              </div>
              <div className="window__wrapper__footer">
                <a
                  className="window__wrapper__footer__what cursor-pointer"
                  target="_blank"
                  href="https://api.whatsapp.com/send/?phone=%2B51994181726&text&type=phone_number&app_absent=0"
                  rel="noreferrer"
                >
                  <BsWhatsapp></BsWhatsapp>Compartir
                </a>
                <p className="text-lg w-full text-center font-semibold mt-2">
                  Si desea agilizar el proceso puede comunicarse a traves de
                  Whatsapp
                </p>
              </div>
            </div>
          </section>
        </div>
        : (
        <div className="h-fit w-[99wv] flex items-center justify-center p-0 m-0">
          <section
            className="window px-20 py-12 bg-white"
            style={{ overflow: 'hidden' }}
          >
            <div className="window__wrapper">
              <div className="window__wrapper__head">
                <h2>
                  <span>
                    <img src={icono} alt="" />
                  </span>
                  Transacción ya realizada
                </h2>
              </div>
              <div
                className="window__wrapper__body"
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                <p>Si tiene algun inconveniente contactenos</p>
                {/* <picture>
                  <img
                    src={
                      (randomImage == 'draw1' ? draw1 : '') ||
                      (randomImage == 'draw2' ? draw2 : '') ||
                      (randomImage == 'draw3' ? draw3 : '') ||
                      (randomImage == 'draw4' ? draw4 : '') ||
                      (randomImage == 'draw5' ? draw5 : '') ||
                      (randomImage == 'draw6' ? draw6 : '')
                    }
                    alt=""
                  />
                </picture> */}
              </div>
              <div className="window__wrapper__footer">
                <a
                  className="window__wrapper__footer__what cursor-pointer"
                  target="_blank"
                  href="https://api.whatsapp.com/send/?phone=%2B51994181726&text&type=phone_number&app_absent=0"
                  rel="noreferrer"
                >
                  <BsWhatsapp></BsWhatsapp>Compartir
                </a>
              </div>
            </div>
          </section>
        </div>
          )}
    </>
  )
}
