
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'

// @ts-expect-error: Type 'any' has no properties in common with type 'PaginationOptions'
import { Grid, Pagination } from 'swiper'

import slider1 from '../../assets/sliders/slider1.jpg'
import slider2 from '../../assets/sliders/slider2.jpg'

import categoria1 from '../../assets/categorias/categoria1.jpg'
import categoria2 from '../../assets/categorias/categoria2.jpg'
import categoria3 from '../../assets/categorias/categoria3.jpg'
import categoria4 from '../../assets/categorias/categoria4.jpg'
import categoria5 from '../../assets/categorias/categoria5.jpg'

export const Index = (): JSX.Element => {
  return (
    <>
      <section id="slider">
        <Swiper pagination={{ dynamicBullets: true, clickable: true }} modules={[Pagination]} className="swp_slider" loop={true}>
          <SwiperSlide><img src={slider1} alt="" /></SwiperSlide>
          <SwiperSlide><img src={slider2} alt="" /></SwiperSlide>
        </Swiper>
      </section>
      <section className="sectCategorias">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          pagination={{
            clickable: true
          }}
          modules={[Pagination]}
          className="sectCategorias__slide"
        >
          <SwiperSlide>
            <div className="sectCategorias__slide__card">
              <div className="sectCategorias__slide__card__img">
                <img src={categoria1} alt="" />
              </div>
              <div className="sectCategorias__slide__card__title">
                <h5>Luminarias Acuáticas</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sectCategorias__slide__card">
              <div className="sectCategorias__slide__card__img">
                <img src={categoria2} alt="" />
              </div>
              <div className="sectCategorias__slide__card__title">
                <h5>Luminarias de Alumbrado público</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sectCategorias__slide__card">
              <div className="sectCategorias__slide__card__img">
                <img src={categoria3} alt="" />
              </div>
              <div className="sectCategorias__slide__card__title">
                <h5>Luminarias de Emergencia LED</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sectCategorias__slide__card">
              <div className="sectCategorias__slide__card__img">
                <img src={categoria4} alt="" />
              </div>
              <div className="sectCategorias__slide__card__title">
                <h5>Luminarias industriales</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sectCategorias__slide__card">
              <div className="sectCategorias__slide__card__img">
                <img src={categoria5} alt="" />
              </div>
              <div className="sectCategorias__slide__card__title">
                <h5>Paneles LED</h5>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="sectCategorias__slide__card">
              <div className="sectCategorias__slide__card__img">
                <img src={categoria5} alt="" />
              </div>
              <div className="sectCategorias__slide__card__title">
                <h5>Reflectores LED</h5>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="nuevosProductos">
        <Swiper
          slidesPerView={3}
          grid={{
            rows: 2
          }}
          spaceBetween={30}
          pagination={{
            clickable: true
          }}
          modules={[Grid, Pagination]}
          className="swiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </section>
    </>
  )
}
