import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Global } from '../../helper/Global'
import { icon1, icon2, icon3, icono } from '../shared/images'
import { BsWhatsapp } from 'react-icons/bs'
import draw1 from './../../assets/images/animate1.gif'
import draw2 from './../../assets/images/undraw_completed_03xt.gif'
import draw3 from './../../assets/images/undraw_happy_announcement_re_tsm0.svg'
import draw4 from './../../assets/images/undraw_online_party_re_7t6g.svg'
import draw5 from './../../assets/images/undraw_super_thank_you_re_f8bo.svg'
import draw6 from './../../assets/images/undraw_well_done_re_3hpo.svg'
import Loading from '../shared/Loading'

export const SuccesPago = (): JSX.Element => {
  const { ui } = useParams()
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const images = ['draw1', 'draw2', 'draw3', 'draw4', 'draw5', 'draw6']
  const randomIndex = Math.floor(Math.random() * images.length)
  const randomImage = images[randomIndex]

  const validarTransaccion = async (): Promise<void> => {
    if (ui) {
      const data = new FormData()
      data.append('ui', String(ui))
      const request = await axios.post(`${Global.url}/oneTransaccion/${ui}`)
      if (request.data.length == 0) {
        navigate('/compra')
      }
    } else {
      navigate('/compra')
    }
    setLoading(false)
  }

  useEffect(() => {
    validarTransaccion()
  }, [])

  return (
    <>
      {loading && <Loading />}

      <div className="row mx-0">
        <div className="col-md-12 py-12">
          <ul className="list_pasos">
            <li>
              <figure className="box-pasfig1">
                <img src={icon1} />
              </figure>
              <div className="box_pasos">
                <span>1</span>
                <h4>CARRITO DE COMPRAS</h4>
              </div>
            </li>

            <li >
              <figure className="box-pasfig1">
                <img src={icon2} />
              </figure>
              <div className="box_pasos">
                <span>2</span>
                <h4>FORMULARIO DE ENVÍO</h4>
              </div>
            </li>

            <li className="active">
              <figure className="box-pasfig1">
                <img src={icon3} />
              </figure>
              <div className="box_pasos">
                <span>3 </span>
                <h4>COMPRA REALIZADA</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-fit w-[99wv] flex items-center justify-center p-0 m-0">
        <section
          className="window px-20 pb-20"
          style={{ overflow: 'hidden' }}
        >
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
                <strong className="text-4xl md:text-5xl font-bold"></strong>{' '}
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
    </>
  )
}
