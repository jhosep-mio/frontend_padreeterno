import { useEffect, useState } from 'react'
import { type ConfiguracionValues } from '../shared/Interfaces'
import axios from 'axios'
import { Global } from '../../helper/Global'
import useAuth from '../../hooks/useAuth'
import Loading from '../shared/Loading'

const Contacto = (): JSX.Element => {
  const { loadingComponents, setLoadingComponents } = useAuth()
  const [data, setData] = useState<ConfiguracionValues>({
    id: null,
    telefono: '',
    celular1: '',
    celular2: '',
    correo1: '',
    correo2: '',
    horario1: '',
    horario2: '',
    direccion: '',
    facebook: '',
    instagram: '',
    twitter: '',
    linkedin: '',
    youtube: '',
    whatsapp: ''
  })

  const getData = async (): Promise<void> => {
    setLoadingComponents(true)
    try {
      const request = await axios.get(`${Global.url}/oneConfi/1`)
      setData(request.data)
    } catch (error) {
      setLoadingComponents(false)
      console.log(error)
    }
    setLoadingComponents(false)
  }
  useEffect(() => {
    getData()
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {loadingComponents && <Loading />}

      <section className="iti-barbg1 mt-10">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="iti-barcontent">
                <h2 className="iti-bartitle">Contacto</h2>
                <ul className="iti-barlist">
                  <li>
                    <a href="/">Inicio</a>
                  </li>
                  <li>contacto</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-md-114">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <h2 className="text-bold">Contacto</h2>
              <div className="textoconta">
                <p>
                  Puede ponerse en contacto con nosotros de la manera que sea
                  conveniente para usted. Estamos disponibles 24/7 a través de
                  fax o correo electrónico. También puede utilizar un formulario
                  de contacto rápido a continuación o visitar nuestra oficina
                  personalmente. Estaremos encantados de responder a sus
                  preguntas.
                </p>
              </div>
              <div className="offset-top-30">
                <form method="post" action="" className="rd-mailform text-left">
                  <div className="form-group col-md-6">
                    <label className="titunom text-main">Nombre</label>
                    <input type="text" name="nombre" className="cajaformu" />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="titunom">Celular o Telefono</label>
                    <input type="text" name="apellido" className="cajaformu" />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="titunom">E-mail</label>
                    <input type="email" name="email" className="cajaformu" />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="titunom">Asunto</label>
                    <input type="text" name="telefono" className="cajaformu" />
                  </div>
                  <div className="form-group col-md-12">
                    <label className="titunom">Mensaje</label>
                    <textarea
                      name="message"
                      style={{ height: '220px' }}
                      className="cajaformu"
                    ></textarea>
                  </div>
                  <div className="col-md-12">
                    <a type="submit" className="btn_for_all">
                      Enviar
                    </a>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-4 topdatos" key={data.id}>
              <div className="media">
                <div className="datos_empresa">
                  <span className="fa fa-map-o"></span>
                </div>
                <div className="media-body">
                  <h4 className="titulosdatos">Dirección:</h4>
                  <a href="#" className="small textodatos">
                    {data.direccion}
                  </a>
                </div>
              </div>
              <div className="media">
                <div className="datos_empresa">
                  <span className="fa fa-phone"></span>
                </div>
                <div className="media-body">
                  <h4 className="titulosdatos">Telefonos:</h4>
                  <div className="flex flex-col gap-3 mt-5">
                    <a
                      href={`callto:+1${data.telefono}`}
                      className="small textodatos"
                    >
                      (01) {data.telefono}
                    </a>
                    <a
                      href={`callto:+51${data.celular1}`}
                      className="small textodatos"
                    >
                      (+51) {data.celular1}
                    </a>
                    {data.celular2 && (
                      <a
                        href={`callto:+51${data.celular2}`}
                        className="small textodatos"
                      >
                        (+51) {data.celular2}
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="media">
                <div className="datos_empresa">
                  <span className="fa fa-envelope-o"></span>
                </div>
                <div className="media-body">
                  <h4 className="titulosdatos">Mail:</h4>
                  <a
                    href="mailto:contact@abrillflowers.com"
                    className="small textodatos"
                  >
                    {data.correo1}
                  </a>
                  <br />
                  {data.correo2 && (
                    <a
                      href="mailto:sales@abrillflowers.com"
                      className="small textodatos"
                    >
                      {data.correo2}
                    </a>
                  )}
                </div>
              </div>
              <div className="media">
                <div className="datos_empresa">
                  <span className="fa fa-clock-o"></span>
                </div>
                <div className="media-body">
                  <h4 className="titulosdatos">Horario de Trabajo:</h4>
                  <p className="small textodatos">
                    {data.horario1}
                  </p>
                  <p className="small textodatos">
                    {data.horario2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contacto
