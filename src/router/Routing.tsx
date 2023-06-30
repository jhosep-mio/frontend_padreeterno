import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PublicLayout } from '../components/public/PublicLayout'
import { Index } from '../components/public/Index'

export const Routing = (): JSX.Element => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Index/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}
