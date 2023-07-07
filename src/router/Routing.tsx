import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PublicLayout } from '../components/public/PublicLayout'
import { Index } from '../components/public/Index'
import { AuthProvider } from '../context/AuthProvider'
import Contacto from '../components/public/Contacto'
import Tienda from '../components/public/Tienda'
import Categorias from '../components/public/Categorias'
import ViewProducto from '../components/public/ViewProducto'
import Carrito from '../components/public/Carrito'
import Servicios from '../components/public/Servicios'
import Login from '../components/public/Login'
import Registro from '../components/public/Registro'
import Compra from '../components/public/Compra'
import { SuccesPago } from '../components/public/SuccesPago'
import { ErrorPago } from '../components/public/ErrorPago'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Index />} />
            <Route path='home' element={<Index />} />
            <Route path='contacto' element={<Contacto />} />
            <Route path='tienda' element={<Tienda />} />
            <Route path='categorias/:id' element={<Categorias />} />
            <Route path='producto-descripcion/:id' element={<ViewProducto />} />
            <Route path='servicios' element={<Servicios/>}/>
            <Route path='carrito' element={<Carrito/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='registro' element={<Registro/>}/>
            <Route path='compra' element={<Compra/>}/>
            <Route path='success-pago' element={<SuccesPago/>}/>
            <Route path='error-pago' element={<ErrorPago/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
