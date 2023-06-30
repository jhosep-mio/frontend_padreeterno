import { icono, logo } from '../../shared/images'
import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiWhatsappLine,
  RiMapPinLine,
  RiMailSendLine,
  RiPhoneLine
} from 'react-icons/ri'

import { FloatingWhatsApp } from 'react-floating-whatsapp'

export const Footer = (): JSX.Element => {
  return (
    <footer className="w-full bg-secondary py-28 h-full">
      <section className="grid grid-cols-1 gap-20 lg:gap-0 h-full w-full md:w-[80%] justify-between mx-auto lg:h-96 md:grid-cols-2 lg:grid-cols-4">
        <div className="w-full px-10">
          <img src={logo} alt="" className="mx-auto" />
        </div>
        <div className="w-full px-10 flex flex-col gap-10 lg:gap-0 justify-between">
          <h2 className="font-bold text-4xl text-primary text-center md:text-left">
            Dioselyna
          </h2>
          <ul className="flex flex-col gap-3 text-3xl text-center md:text-left">
            <li>Luminarias de Alumbrado Publico</li>
            <li>Reflectores Led</li>
            <li>Paneles Led</li>
            <li>Luminarias Acuáticas</li>
            <li>Luminarias de Emergencia Led</li>
          </ul>
        </div>
        <div className="w-full px-10 flex flex-col gap-10 lg:gap-0 justify-between">
          <h3 className="font-bold text-4xl text-primary text-center md:text-left">
            ¿Alguna duda?
          </h3>
          <ul className="flex flex-col gap-3 text-3xl text-center md:text-left">
            <li>Contacto</li>
            <li>Nosotros</li>
          </ul>
          <div className="flex justify-center md:justify-start lg:justify-center gap-5">
            <RiFacebookCircleFill className="text-white bg-blue-700 text-5xl rounded-full w-16 h-16 p-3" />
            <RiInstagramLine className="text-white bg-pink-600 text-5xl rounded-full w-16 h-16 p-3" />
            <RiWhatsappLine className="text-white bg-green-400 text-5xl rounded-full w-16 h-16 p-3" />
          </div>
        </div>
        <div className="w-full px-10 flex flex-col gap-10 lg:gap-0 justify-between">
          <h3 className="font-bold text-4xl text-primary text-center md:text-left">
            Contacto
          </h3>
          <ul className="flex flex-col gap-3 w-[70%] mx-auto md:w-full">
            <li className="flex gap-3 ">
              <RiMapPinLine className=" text-primary w-auto text-4xl" />
              <p className="text-3xl text-justify flex-grow w-full">
                Av. argentina 275 c.c. nicolini pasaje 6 puesto u-11 Lima
              </p>
            </li>
            <li className="flex gap-3 items-center">
              <RiMailSendLine className=" text-primary w-auto text-4xl" />
              <p className="text-3xl text-justify flex-grow w-full">
                ventas.dioselyna@gmail.com
              </p>
            </li>
            <li className="flex gap-3 items-center">
              <RiPhoneLine className=" text-primary w-auto text-4xl" />
              <p className="text-3xl text-justify flex-grow w-full">
                959-075-511
              </p>
            </li>
          </ul>
        </div>
      </section>
      <section></section>
      <FloatingWhatsApp
        phoneNumber="+51923082893"
        accountName="Dioselyna"
        statusMessage="En linea"
        placeholder="Envianos un mensaje"
        chatMessage="Hola un gusto! 🤝, Como podemos ayudarte?"
        avatar={icono}
        allowEsc
        allowClickAway
        notification
        notificationSound
      />
    </footer>
  )
}
