import { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import { Link } from 'react-router-dom'
import {
  type categoriasValues,
  type productosValues
} from '../shared/Interfaces'
import { Paginacion } from '../shared/Paginacion'
import useAuth from '../../hooks/useAuth'
import { getData } from '../shared/FetchData'
import { Global } from '../../helper/Global'
import Loading from '../shared/Loading'

const Tienda = (): JSX.Element => {
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const { loadingComponents, setLoadingComponents } = useAuth()

  const [paginaActual, setpaginaActual] = useState(1)
  const [cantidadRegistros] = useState(6)

  const indexOfLastPost = paginaActual * cantidadRegistros
  const indexOfFirstPost = indexOfLastPost - cantidadRegistros
  const totalPosts = productos.length

  function formatearURL (nombre: string): string {
    // Eliminar espacios al principio y al final del nombre
    let url = nombre.trim()

    // Convertir todo el string a minúsculas
    url = url.toLowerCase()

    // Reemplazar los espacios por guiones
    url = url.replace(/ /g, '-')

    // Retornar la URL formateada
    return url
  }

  const filterDate = (): never[] => {
    return productos.slice(indexOfFirstPost, indexOfLastPost)
  }

  useEffect(() => {
    setLoadingComponents(true)
    Promise.all([
      getData('allCategorias', setCategorias),
      getData('allProductos', setProductos)
    ]).then(() => {
      setLoadingComponents(false)
      window.scrollTo(0, 0)
    })
  }, [])

  return (
    <>
      {loadingComponents && <Loading />}

      <section className="iti-barbg1 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="iti-barcontent">
                <h2 className="iti-bartitle">Tienda</h2>
                <ul className="iti-barlist">
                  <li>
                    <Link to="/">Inicio</Link>
                  </li>
                  <li>
                    <Link to="/tienda">Tienda</Link>
                  </li>
                  <li>Nuestros Productos</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="iti-bgs1">
        <div className="total_lenght">
          <p>{productos.length} producto(s) en total</p>
        </div>
        <div className="container mt-10">
          <div className="row">
            <div className="col-md-9">
              <ul className="prodlist-grid grid">
                {filterDate().map((producto: productosValues) => (
                  <li className="pogrid" key={producto.id}>
                    <div className="protop-content">
                      <div className="protop-imgblock">
                        <Link
                          to={`/producto-descripcion/${
                            producto.id
                          }-${formatearURL(producto.nombre)}`}
                          className="protop-imgref"
                        >
                          <img
                            src={`${Global.urlImages}/productos/${producto.imagen1}`}
                            alt=""
                            title=""
                            style={{ objectFit: 'contain' }}
                          />
                        </Link>
                      </div>
                      <ul className="protop-refcat1">
                        <li>
                          <Link to="#">{producto.categoria}</Link>
                        </li>
                      </ul>
                      <div className="protop-dscrip">
                        <div
                          className="protop-valora"
                          data-toggle="tooltip"
                          title="Valoración 3.00 de 5"
                        >
                          <span style={{ width: '60%' }}></span>
                        </div>
                        <h3 className="protop-hrfh3">
                          <Link to="#">{producto.nombre}</Link>
                        </h3>
                        <span className="protop-price">
                          <ins className="protop-priofert">
                            <span>S/ {producto.precio}</span>
                          </ins>
                          <del>
                            <span>S/ {producto.oferta}</span>
                          </del>
                        </span>
                        <div className="clearfix"></div>
                        <div className="protop-bhover">
                          <Link
                            to={`/producto-descripcion/${
                              producto.id
                            }-${formatearURL(producto.nombre)}`}
                            className="pro-add1"
                          >
                            Ver Producto
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-md-3">
              <div className="iti-pane1">
                <Accordion className="panel-group" defaultActiveKey="0">
                  <Accordion.Item eventKey="0" className="panel panel-default">
                    <Accordion.Header className="panel-heading">
                      <h4 className="panel-title">
                        <Link
                          data-toggle="collapse"
                          data-parent="#accordion"
                          to="#collapse1"
                        >
                          <i className="more-less fa fa-minus"></i>
                          Categorias
                        </Link>
                      </h4>
                    </Accordion.Header>
                    <Accordion.Body className="panel-collapse collapse in ">
                      <div className="panel-body">
                        <ul className="iti-panlist1">
                          {categorias.map((cate: categoriasValues) => (
                            <li key={cate.id} className="impor_colla">
                              <Link
                                className="text-black"
                                to={`/categorias/${cate.id}-${formatearURL(
                                  cate.nombre
                                )}`}
                              >
                                {cate.nombre}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            <div className="col-md-12 flex justify-center">
              <Paginacion
                totalPosts={totalPosts}
                cantidadRegistros={cantidadRegistros}
                paginaActual={paginaActual}
                setpaginaActual={setpaginaActual}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tienda
