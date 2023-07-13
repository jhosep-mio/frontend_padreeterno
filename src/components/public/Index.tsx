import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useState } from 'react'

import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
// @ts-expect-error: Type 'any' has no properties in common with type 'PaginationOptions'
import { Pagination, Autoplay } from 'swiper'
import { getData } from '../shared/FetchData'
import useAuth from '../../hooks/useAuth'
import { Global } from '../../helper/Global'
import {
  type productosValues,
  type bannersValues,
  type categoriasValues
} from '../shared/Interfaces'
import { Link, useNavigate } from 'react-router-dom'
import { cliente1, cliente2, cliente3, cliente4, cliente5, cliente6, cliente7, t3 } from '../shared/images'
import Loading from '../shared/Loading'

export const Index = (): JSX.Element => {
  const { loadingComponents, setLoadingComponents } = useAuth()
  const [banners, setBanners] = useState<never[]>([])
  const [favorites, setFavorites] = useState<never[]>([])
  const [nuevos, setNuevos] = useState<never[]>([])
  const [categorias, setCategorias] = useState<never[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    setLoadingComponents(true)
    Promise.all([
      getData('allBanners', setBanners),
      getData('productosWhereFavorites', setFavorites),
      getData('productosNuevos', setNuevos),
      getData('allCategorias', setCategorias)
    ]).then(() => {
      setLoadingComponents(false)
    })
  }, [])

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

  return (
    <>
      {loadingComponents && <Loading />}
      <section id="slider" className="topsectglobal wow slideInRight">
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="swp_slider"
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
        >
          {banners.map((banner: bannersValues) => (
            <SwiperSlide key={banner.id}>
              <li className="relative">
                <img
                  loading="lazy"
                  src={`${Global.urlImages}/banner/${banner.imagen1}`}
                  className="w-full h-[520px] object-cover -z-10"
                  alt={banner.imagen1}
                />
                <div className="caption right-align">
                  <h3 className="">{banner.titulo}</h3>
                  <h5 className="light grey-text text-lighten-3 subtitle__banner2">
                    {banner.subtitulo}
                  </h5>
                </div>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="wex-bgmisvis1">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 flex flex-row items-center justify-center pb-10">
              <i className="wex-nmber1x1 fa fa-truck"></i>
              <div className="wex-wrapvmis1" style={{ paddingBottom: '0' }}>
                <p className="text-justify">
                  Envió Delivery ó Recojo en Tienda
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 flex flex-row items-center justify-center pb-10">
              <i className="wex-nmber1x1 fa fa-credit-card"></i>
              <div className="wex-wrapvmis1" style={{ paddingBottom: '0' }}>
                <p className="text-justify">Aceptamos todas las tarjetas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="modelos">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="mode-titlep1">Los Destacados</h2>
              <h3 className="mode-subtitlep1">
                ¡Tenemos miles de accesorios nuevos para hombres y mujeres en la
                tienda!
              </h3>
            </div>
          </div>
          <div className="producc">
            <div className="row">
              <div className="col-md-12">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                  }}
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
                  modules={[Autoplay]}
                  className="mySwiper produc"
                >
                  {favorites.map((pro: productosValues) => (
                    <SwiperSlide className="boxmodel" key={pro.id}>
                      <div
                        className="div_img"
                        onClick={() => {
                          navigate(
                            `/producto-descripcion/${pro.id}-${formatearURL(
                              pro.nombre
                            )}`
                          )
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <img
                          src={`${Global.urlImages}/productos/${pro.imagen1}`}
                          alt={pro.nombre}
                          title={pro.nombre}
                          style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <ul className="text-main text-center text-md">
                        <li>
                          <a href="#" rel="tag">
                            {pro.categoria}
                          </a>
                        </li>
                      </ul>
                      <h3
                        onClick={() => {
                          navigate(
                            `/producto-descripcion/${pro.id}-${formatearURL(
                              pro.nombre
                            )}`
                          )
                        }}
                        style={{ cursor: 'pointer', marginBottom: '25px' }}
                      >
                        <a href="#" className="text-black text-4xl">
                          {pro.nombre}
                        </a>
                      </h3>
                      <span className="price ">
                        <span className="precio">S/ {pro.precio}</span>
                      </span>
                      <del className="w-full block">
                        <span className="w-full block text-center">
                          S/ {pro.oferta}
                        </span>
                      </del>
                      <div className="strella">
                        <ul>
                          <li>
                            <span className="material-icons naranj">
                              star_rate
                            </span>
                          </li>
                          <li>
                            <span className="material-icons naranj">
                              star_rate
                            </span>
                          </li>
                          <li>
                            <span className="material-icons naranj">
                              star_rate
                            </span>
                          </li>
                          <li>
                            <span className="material-icons naranj">
                              star_rate
                            </span>
                          </li>
                          <li>
                            <span className="material-icons plom">
                              star_rate
                            </span>
                          </li>
                        </ul>
                      </div>
                      <Link
                        to={`/producto-descripcion/${pro.id}-${formatearURL(
                          pro.nombre
                        )}`}
                        className="button vemasprod"
                      >
                        VER PRODUCTO
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flows">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Swiper
                pagination={true}
                modules={[Pagination, Autoplay]}
                slidesPerView={3}
                className="oferta"
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
                }}
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
              >
                {categorias.map((categoria: categoriasValues) => (
                  <SwiperSlide key={categoria.id} className="py-14">
                    <div className="flowstitle">
                      <Link to={`/categorias/${categoria.id}-${formatearURL(categoria.nombre)}`}>
                        <h2>{categoria.nombre}</h2>
                        <p className="flowscuerpo">
                          Envía un obsequio a quien más quieres.
                        </p>
                        <div className="flowsimage h-[350px]">
                          <img
                            loading="lazy"
                            src={`${Global.urlImages}/categorias/${categoria.imagen1}`}
                            alt=""
                            className="h-full object-cover"
                            width="100%"
                          />
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="modelos">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2 className="mode-titlep1">Nuevos Modelos</h2>
              <h6 className="mode-subtitlep1">
                ¡Nunca hay demasiados accesorios, especialmente cuando estos son
                tan buenos y elegantes!
              </h6>
            </div>
          </div>
          <div className="producc">
            <div className="row">
              <div className="col-md-12">
                <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  modules={[Pagination, Autoplay]}
                  loop={true}
                  autoplay={{
                    delay: 3500,
                    disableOnInteraction: false
                  }}
                  breakpoints={{
                    0: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                      pagination: true
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
                  className="mySwiper produc"
                >
                  {nuevos.map((pro: productosValues) => (
                    <SwiperSlide className="boxmodel" key={pro.id}>
                      <div
                        className="div_img"
                        onClick={() => {
                          navigate(
                            `/producto-descripcion/${pro.id}-${formatearURL(
                              pro.nombre
                            )}`
                          )
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <img
                          src={`${Global.urlImages}/productos/${pro.imagen1}`}
                          alt={pro.nombre}
                          title={pro.nombre}
                          style={{
                            width: '100%',
                            height: '250px',
                            objectFit: 'contain'
                          }}
                        />
                      </div>
                      <ul className="text-main text-center text-md">
                        <li>
                          <a href="#" rel="tag">
                            {pro.categoria}
                          </a>
                        </li>
                      </ul>
                      <h3
                        onClick={() => {
                          navigate(
                            `/producto-descripcion/${pro.id}-${formatearURL(
                              pro.nombre
                            )}`
                          )
                        }}
                        style={{ cursor: 'pointer', marginBottom: '25px' }}
                      >
                        <a href="#" className="text-black text-4xl">
                          {pro.nombre}
                        </a>
                      </h3>
                      <span className="price ">
                        <span className="precio">S/ {pro.precio}</span>
                      </span>
                      <del className="w-full block">
                        <span className="w-full block text-center">
                          S/ {pro.oferta}
                        </span>
                      </del>
                      <div className="strella">
                        <ul>
                          <li>
                            <span className="material-icons naranj">
                              star_rate
                            </span>
                          </li>
                          <li>
                            <span className="material-icons naranj">
                              star_rate
                            </span>
                          </li>
                          <li>
                            <span className="material-icons naranj">
                              star_rate
                            </span>
                          </li>
                          <li>
                            <span className="material-icons naranj">
                              star_rate
                            </span>
                          </li>
                          <li>
                            <span className="material-icons plom">
                              star_rate
                            </span>
                          </li>
                        </ul>
                      </div>
                      <Link
                        to={`/producto-descripcion/${pro.id}-${formatearURL(
                          pro.nombre
                        )}`}
                        className="button vemasprod"
                      >
                        VER PRODUCTO
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-5">
        <div className="container">
          <div className="row md:flex items-center">
            <div className="col-md-6">
              <img className="testimg" src={t3} />
            </div>
            <div className="col-md-6 testigo w-full lg:w-1/2">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper testimoniosss h-full "
              >
                <SwiperSlide className="py-24">
                  <h2 className="text-justify">
                    ¡Entender un poco mejor las flores y el simbolismo oculto
                    detrás de ellas me ayudó a organizar mucho mejor los ramos
                    de flores para mi esposa!
                  </h2>
                  <h3 className="mt-5">John Perez</h3>
                </SwiperSlide>
                <SwiperSlide className="py-24">
                  <h2 className="text-justify">
                    Siempre me ha gustado comprar flores, incluso cuando
                    simplemente no hay una ocasión específica para ello, solo
                    para sentirme mejor. ¡Esta tienda ofrece la mejor gama!
                  </h2>
                  <h3 className="mt-5">Mary Gonzales</h3>
                </SwiperSlide>
                <SwiperSlide className="py-24">
                  <h2 className="text-justify">
                    Como hombre, no tengo absolutamente ningún conocimiento de
                    flores. ¡Por eso me siento tan bien cuando los asesores de
                    esta tienda me ayudan a elegir un ramo!
                  </h2>
                  <h3 className="mt-5">Andrew Zamora</h3>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="colection">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="boxcolect">
                <div className="colectitle">
                  <h6>
                    Flores frescas. Precios accesibles. Tu mejor elección.
                  </h6>
                </div>
                <div className="colecuer mb-16">
                  <span style={{ color: '#e5b253' }}>Bouquets</span>
                  <p
                    style={{
                      textAlign: 'center',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: 'lighter'
                    }}
                  >
                    Son únicos y vale la pena tenerlos.
                  </p>
                </div>

                <a href="#" className="button vemascolec">
                  Nuestra Colección
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="client-pad1">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Swiper
                slidesPerView={5}
                spaceBetween={30}
                loop={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false
                }}
                  modules={[Pagination, Autoplay]}
                className="mySwiper clients1 xhm-client1 owl-theme owl-loaded owl-drag"
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    pagination: true
                  },
                  500: {
                    slidesPerView: 2,
                    spaceBetween: 30
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 30
                  },
                  1200: {
                    slidesPerView: 5,
                    spaceBetween: 30
                  }
                }}
              >
                <SwiperSlide className="py-24">
                  <div className="owl-item cloned">
                    <div>
                      <img
                        loading="lazy"
                        className="img-responsive center-block clietam"
                        src={cliente1}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="py-24">
                  <div className="owl-item cloned">
                    <div>
                      <img
                        loading="lazy"
                        className="img-responsive center-block clietam"
                        src={cliente2}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="py-24">
                  <div className="owl-item cloned">
                    <div>
                      <img
                        loading="lazy"
                        className="img-responsive center-block clietam"
                        src={cliente3}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="py-24">
                  <div className="owl-item cloned">
                    <div>
                      <img
                        loading="lazy"
                        className="img-responsive center-block clietam"
                        src={cliente4}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="py-24">
                  <div className="owl-item cloned">
                    <div>
                      <img
                        loading="lazy"
                        className="img-responsive center-block clietam"
                        src={cliente5}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="py-24">
                  <div className="owl-item cloned">
                    <div>
                      <img
                        loading="lazy"
                        className="img-responsive center-block clietam"
                        src={cliente6}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="py-24">
                  <div className="owl-item cloned">
                    <div>
                      <img
                        loading="lazy"
                        className="img-responsive center-block clietam"
                        src={cliente7}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section className="boletin">
        <div className="container">
          <div className="row">
            <div className="col-md-8 text-center">
              <h2 className="bol-titlet1">Sigue nuestras actualizaciones!</h2>
              <h6>
                Si desea recibir un correo electrónico de nosotros cada vez que
                tenemos una nueva oferta especial, ¡suscríbase aquí!
              </h6>
            </div>
          </div>
          <div className="row mt-16">
            <div className="col-md-8 boxbole">
              <form method="POST" action="#">
                <div className="subscribebol flex">
                  <div className="subscribeblock">
                    <i className="fa fa-envelope-open-o"></i>
                    <input
                      className="subscribeinpu"
                      type="email"
                      name="subscribe-mail"
                      value=""
                      placeholder="Introduzca su correo electrónico aquí.."
                    />
                  </div>
                  <a href="#" className="subscribebuton button">
                    SUSCRIBETE
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
