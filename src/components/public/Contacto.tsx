import { useEffect, useState } from 'react'
import { type ConfiguracionValues } from '../shared/Interfaces'
import axios from 'axios'
import { Global } from '../../helper/Global'
import useAuth from '../../hooks/useAuth'
import Loading from '../shared/Loading'
import { useFormik } from 'formik'
import { SchemaContacto } from '../shared/Schemas'
import Swal from 'sweetalert2'
import { Errors } from '../shared/Errors'

const Contacto = (): JSX.Element => {
  const [loadingCorreo, setLoadingCorreo] = useState<boolean>(false)
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

  const enviarCorreo = async (): Promise<void> => {
    setLoadingCorreo(true)
    const data = new FormData()
    data.append('nombres', values.nombres)
    data.append('email', values.email)
    data.append('celular', values.celular)
    data.append('asunto', values.asunto)
    data.append('mensaje', values.mensaje)
    try {
      const respuesta = await axios.post(
        `${Global.url}/enviarCorreo`,
        data
      )

      if (respuesta.data.status === 'success') {
        Swal.fire('Correo enviado', '', 'success')
        resetForm()
      } else {
        Swal.fire('Error al enviar el correo', '', 'error')
      }
    } catch (error) {
      console.log(error)
      Swal.fire('Error al enviar el correo', '', 'error')
    }
    setLoadingCorreo(false)
  }

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    resetForm
  } = useFormik({
    initialValues: {
      nombres: '',
      celular: '',
      email: '',
      asunto: '',
      mensaje: ''
    },
    validationSchema: SchemaContacto,
    onSubmit: enviarCorreo
  })

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
                <form className="rd-mailform text-left" onSubmit={handleSubmit}>
                  <div className="form-group col-md-6">
                    <label className="titunom text-main">Nombres </label>
                    <input
                      type="text"
                      name="nombres"
                      className="cajaformu"
                      value={values.nombres}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Errors errors={errors.nombres} touched={touched.nombres} />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="titunom">Celular o Telefono</label>
                    <input
                      type="text"
                      name="celular"
                      className="cajaformu"
                      value={values.celular}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Errors errors={errors.celular} touched={touched.celular} />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="titunom">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      className="cajaformu"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Errors errors={errors.email} touched={touched.email} />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="titunom">Asunto</label>
                    <input
                      type="text"
                      name="asunto"
                      className="cajaformu"
                      value={values.asunto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Errors errors={errors.asunto} touched={touched.asunto} />
                  </div>
                  <div className="form-group col-md-12">
                    <label className="titunom">Mensaje</label>
                    <textarea
                      name="mensaje"
                      style={{ height: '220px' }}
                      className="cajaformu"
                      value={values.mensaje}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    ></textarea>
                    <Errors errors={errors.mensaje} touched={touched.mensaje} />
                  </div>
                  {!loadingCorreo
                    ? (
                    <div className="col-md-12">
                      <input
                        type="submit"
                        className="btn_for_all"
                        value={'Enviar'}
                      />
                    </div>
                      )
                    : (
                    <div className="col-md-12">
                      <a href="#" className="btn_for_all">
                        Enviando ....
                      </a>
                    </div>
                      )}
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
                  <p className="small textodatos">{data.horario1}</p>
                  <p className="small textodatos">{data.horario2}</p>
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
