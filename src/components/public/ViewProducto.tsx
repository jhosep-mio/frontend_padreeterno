import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaPlus, FaMinus } from 'react-icons/fa'
// import { FreeMode, Navigation, Thumbs } from "swiper";

// @ts-expect-error: Type 'any' has no properties in common with type 'PaginationOptions'
import { FreeMode, Navigation, Thumbs } from 'swiper'
import useAuth from '../../hooks/useAuth'
import { getData } from '../shared/FetchData'
import { type productosValues } from '../shared/Interfaces'
import { Global } from '../../helper/Global'
import axios from 'axios'
import { AddProducto } from '../shared/carrito/AddProducto'
import Loading from '../shared/Loading'

const ViewProducto = (): JSX.Element => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const { loadingComponents, setLoadingComponents } = useAuth()
  const [producto, setProducto] = useState<productosValues>({
    id: 0,
    nombre: '',
    id_categoria: '',
    categoria: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    oferta: 0,
    imagen1: '',
    imagen2: '',
    imagen3: '',
    created_at: '',
    updated_at: ''
  })
  const [productoCategories, setProductosCategories] = useState<never[]>([])
  const { id } = useParams()
  const [contador, setContador] = useState(1)
  const navigate = useNavigate()
  const addContador = (): void => {
    setContador(contador + 1)
  }

  const ressContador = (): void => {
    if (contador > 1) {
      setContador(contador - 1)
    }
  }

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

  const getOneData = async (): Promise<void> => {
    const request = await axios.get(`${Global.url}/oneProducto/${id ?? ''}`)
    const responseData: productosValues = request.data // Replace "YourResponseType" with the actual type of the response data
    setProducto(responseData)

    if (responseData.id_categoria) {
      getData(
        `allProductosGroup/${responseData.id_categoria}`,
        setProductosCategories
      )
    }
  }

  useEffect(() => {
    setLoadingComponents(true)

    Promise.all([getOneData()]).then(() => {
      setLoadingComponents(false)
      window.scrollTo(0, 0)
    })
  }, [])

  useEffect(() => {
    setLoadingComponents(true)

    Promise.all([getOneData()]).then(() => {
      setLoadingComponents(false)
      window.scrollTo(0, 0)
    })
  }, [id])

  //   function addProduct (product: productosValues, cantidad: number): void {
  //     const itemIndex = cart.findIndex(
  //       (item) => item.id === product.id && item.nombre === product.nombre
  //     )

  //     if (itemIndex === -1) {
  //       // No existe un elemento coincidente en el carrito, agregar uno nuevo
  //       setCart([
  //         ...cart,
  //         {
  //           id: product.id,
  //           nombre: product.nombre,
  //           cantidad,
  //           precio: 99,
  //           imagen1: ''
  //         }
  //       ])
  //       localStorage.setItem(
  //         'cart',
  //         JSON.stringify([
  //           ...cart,
  //           { id: product.id, nombre: product.nombre, cantidad, precio: 99 }
  //         ])
  //       )
  //     } else {
  //       // Ya existe un elemento en el carrito con el mismo id y nombre, actualizar la cantidad
  //       const updatedItems = [...cart]
  //       if (cantidad != null) {
  //         updatedItems[itemIndex].cantidad =
  //               (updatedItems[itemIndex].cantidad ?? 0) + cantidad
  //       }
  //       setCart(updatedItems)
  //       localStorage.setItem('cart', JSON.stringify(updatedItems))
  //     }
  //   }

  return (
    <>
      {loadingComponents && <Loading />}

      <section className="iti-barbg1 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="iti-barcontent">
                <h2 className="iti-bartitle">Producto</h2>
                <ul className="iti-barlist">
                  <li>
                    <Link to="/">Inicio</Link>
                  </li>
                  <li>
                    <Link to="/tienda">Tienda</Link>
                  </li>
                  <li>{producto.nombre}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full">
        <div className="w-full flex flex-col md:flex-row py-32 container ">
          <div className="w-full md:w-1/2">
            <Swiper
              loop={true}
              spaceBetween={10}
              navigation={true}
              modules={[FreeMode, Navigation, Thumbs]}
              thumbs={{ swiper: thumbsSwiper }}
              className="mySwiper2"
            >
              <SwiperSlide>
                <img
                  src={`${Global.urlImages}/productos/${producto.imagen1}`}
                  alt={producto.imagen1}
                  className="w-full h-[500px] mx-auto object-contain"
                />
              </SwiperSlide>

              {producto.imagen2 && producto.imagen2 != null
                ? (
                <SwiperSlide>
                  <img
                    src={`${Global.urlImages}/productos/${producto.imagen2}`}
                    alt={producto.imagen2}
                    className="w-full h-[500px] mx-auto object-contain"
                  />
                </SwiperSlide>
                  )
                : (
                    ''
                  )}

              {producto.imagen3 && producto.imagen3 != null
                ? (
                <SwiperSlide>
                  <img
                    src={`${Global.urlImages}/productos/${producto.imagen3}`}
                    alt={producto.imagen3}
                    className="w-full h-[500px] mx-auto object-contain"
                  />
                </SwiperSlide>
                  )
                : (
                    ''
                  )}
            </Swiper>
            <Swiper
              // @ts-expect-error: Type 'any' has no properties in common with type 'PaginationOptions'
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className=" w-full mx-auto mt-10 h-40 swiper-77"
            >
              <SwiperSlide>
                <img
                  src={`${Global.urlImages}/productos/${producto.imagen1}`}
                  alt={producto.imagen1}
                  className="w-full h-full opacity-100 object-contain"
                />
              </SwiperSlide>

              {producto.imagen2 && producto.imagen2 != null
                ? (
                <SwiperSlide>
                  <img
                    src={`${Global.urlImages}/productos/${producto.imagen2}`}
                    alt={producto.imagen2}
                    className="w-full h-full opacity-100 object-contain"
                  />
                </SwiperSlide>
                  )
                : (
                    ''
                  )}

              {producto.imagen3 && producto.imagen3 != null
                ? (
                <SwiperSlide>
                  <img
                    src={`${Global.urlImages}/productos/${producto.imagen3}`}
                    alt={producto.imagen3}
                    className="w-full h-full opacity-100 object-contain"
                  />
                </SwiperSlide>
                  )
                : (
                    ''
                  )}
            </Swiper>
          </div>
          <div className="w-full md:w-1/2">
            <div className="section_product-rigth-contain pt-16 md:pt-0 md:pl-20">
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 className="font-semibold text-sm">
                  {producto.nombre.toUpperCase()}
                </h1>
                <div className="producto_detalle_rating mt-10">
                  <div className="detalle_rating_pro">
                    <i className="fa fa-star text-yellow-400"></i>
                    <i className="fa fa-star text-yellow-400"></i>
                    <i className="fa fa-star text-yellow-400"></i>
                    <i className="fa fa-star text-yellow-400"></i>
                    <i className="fa fa-star text-yellow-400"></i>
                  </div>
                </div>
                <span className="text-5xl text-main mt-14">
                  S/. {producto.precio}
                </span>
                <del className="text-3xl">S/. {producto.oferta}</del>
                <span className="section_product-rigth-contain-detail my-14">
                  {producto.descripcion}
                </span>
                <hr />
                <span className="section_product-rigth-contain-detail mt-10">
                  Unidades disponibles {producto.cantidad}
                </span>
                <div className="flex items-center justify-center gap-5">
                  <div className="section_product-rigth-contain-cantidad">
                    <FaMinus onClick={ressContador} />
                    <div className="section_product-rigth-contain-cantidad-contador">
                      <span>{contador}</span>
                    </div>
                    <FaPlus onClick={addContador} />
                  </div>
                  <div className="section_carrito_detalle">
                    <AddProducto
                      producto={producto}
                      contador={contador}
                      setContador={setContador}
                    />
                  </div>
                </div>
                <hr />
                <div className="producto_detalle_option my-5">
                  <ul className="flex flex-col gap-5">
                    <li>
                      <span>Envió Delivery ó Recojo en Tienda</span>
                    </li>
                    <li>
                      <span>Atención Al Cliente</span>
                    </li>
                    <li>
                      <span>Puedes pagar con Tarjeta o Pago en Efectivo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="w-full flex flex-col gap-5 justify-center items-center container px-32 mb-5">
          <h2 className="w-full text-left text-gray-600 text-3xl font-semibold ">
            DESCRIPCIÓN
          </h2>
          <div className="border border-gray-200 w-full p-6 max-h-96">
            <div
              className="descripcion-producto"
              dangerouslySetInnerHTML={{ __html: producto.descripcion }}
            ></div>
          </div>
        </section>
      </section>
      <section className="container section_paquetes_relacionados">
        <div className="section_paquetes_relacionados-content">
          <div className="section_paquetes_relacionados-content-h2">
            <h2>PRODUCTOS RELACIONADOS</h2>
          </div>
          <div className="section_paquetes_relacionados-content-swiper">
            <Swiper
              slidesPerView={5}
              spaceBetween={30}
              loop={true}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                500: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30
                },
                1200: {
                  slidesPerView: 4,
                  spaceBetween: 30
                }
              }}
              className="mySwiper section_paquetes_relacionados-content-swiper-swiper_relacionados"
            >
              {productoCategories.map((pro: productosValues) => (
                <SwiperSlide key={pro.id}>
                  <Link
                    to={`/producto-descripcion/${pro.id}-${formatearURL(
                      pro.nombre
                    )}`}
                  >
                    <img
                      src={`${Global.urlImages}/productos/${pro.imagen1}`}
                      alt={pro.imagen1}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'contain'
                      }}
                    />
                    <h3>{pro.nombre}</h3>
                    <div className="list_stars mx-auto w-full flex justify-center my-10 ">
                      <i className="fa fa-star text-yellow-300"></i>
                      <i className="fa fa-star text-yellow-300"></i>
                      <i className="fa fa-star text-yellow-300"></i>
                      <i className="fa fa-star text-yellow-300"></i>
                      <i className="fa fa-star text-yellow-300"></i>
                    </div>
                    <span>S/ {pro.precio}</span>
                    <del className="text-xl block text-center">
                      {pro.oferta}
                    </del>
                  </Link>
                  <input
                    type="button"
                    value={'Ver Producto'}
                    onClick={() => {
                      navigate(
                        `/producto-descripcion/${pro.id}-${formatearURL(
                          pro.nombre
                        )}`
                      )
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  )
}
export default ViewProducto
