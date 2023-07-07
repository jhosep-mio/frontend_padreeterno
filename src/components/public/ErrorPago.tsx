// import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import { icono } from '../shared/images'
import { BsWhatsapp } from 'react-icons/bs'

export const ErrorPago = (): JSX.Element => {
  return (
    <>
      <div className="h-fit w-[99wv] flex items-center justify-center p-0 m-0">
        <section
          className="window px-20 py-12 bg-white"
          style={{ overflow: 'hidden' }}
        >
          <div className="window__wrapper">
            <div className="w-full flex flex-col items-center justify-center">
              <h2 className='flex items-center justify-center text-4xl gap-3'>
                <span>
                  <img src={icono} alt="" />
                </span>
                Se genero un error en la transacción
              </h2>
              <Link className='w-fit text-center flex items-center justify-center mb-5 bg-main text-white py-2 px-4 rounded-md no-underline hover:text-white' to="/compra">
                Volver a pagar
                <span className="fa fa-shopping-cart icon_ih text-white text-sm" />
              </Link>
            </div>
            <div
              className="window__wrapper__body"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              <p>Si tiene algun inconveniente contactenos</p>
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
    </>
  )
}
