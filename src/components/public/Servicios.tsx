// import React from 'react'
import { s1, s2, s3 } from '../shared/images'

export const Servicios = (): JSX.Element => {
  return (
    <>
        <section className="iti-barbg1 mt-10">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="iti-barcontent">
                            <h2 className="iti-bartitle">Servicio</h2>
                            <ul className="iti-barlist">
                                <li><a href="#">Inicio</a></li>
                                <li>Servicio</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="ise-bgx1 wow bounceInLeft">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <h2 className="ise-tiserv">ARREGLOS FLORALES</h2>
                        <p>
                            Creamos bellos diseños florales con estilo propio, ofreciendo a nuestros clientes una propuesta diferente para esos momentos inolvidables o para ubicar ese detalle que sus ambientes necesitan como complemento.
                        </p>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6">
                        <figure className="ise-figcircl">
                            <img src={s1} />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
        <section className="ise-bgx2 wow bounceInRight">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <h2 className="ise-tiserv">CORONAS FÚNEBRES</h2>
                        <p>
                            Coronas Funebres para difuntos, condolencias, velorios, funerales, sepelios, iglesia y entierros en Lima.
                        </p>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <figure className="ise-figcircl">
                            <img src={s2} />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
        <section className="ise-bgx1 wow bounceInLeft">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-6">
                        <h2 className="ise-tiserv">LAGRIMAS FÚNEBRES</h2>
                        <p>
                            La lágrima fúnebre proporciona un homenaje de flores en colores rojos y blancos. Es un arreglo pomposo e imponente por el gran tamaño, puesto en un pedestal de metal. Algunas frases fúnebres que pueden acompañar al arreglo los puedes conseguir aquí.
                        </p>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <figure className="ise-figcircl">
                            <img src={s3} />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Servicios
