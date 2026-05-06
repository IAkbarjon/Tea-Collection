import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NotificationProvider from './contexts/NotificationContext'
import Header from './components/layout/Header'
import MaterialsPage from './pages/MaterialsPage'
import ProductsPage from './pages/ProductsPage'
import DataProvider from './contexts/DataContext'

function App() {
    return (
        <NotificationProvider>
            <DataProvider>
                <BrowserRouter>
                    <Routes>
                        <Route element={<Header />}>
                            <Route path='/materials' element={<MaterialsPage />} />
                            <Route path='/products' element={<ProductsPage />} />
                            <Route path='*' element={<Navigate to='/materials' />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </DataProvider>
        </NotificationProvider>
    )
}

export default App
