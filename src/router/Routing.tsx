import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PublicLayout } from '../components/public/PublicLayout'
import { Index } from '../components/public/Index'
import { AuthProvider } from '../context/AuthProvider'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Index />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
