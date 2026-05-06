import { createContext, useEffect, useState } from 'react'
import httpService from '../services/httpService'
import useNotification from '../hooks/useNotification'

const DataContext = createContext()

function DataProvider({ children }) {
    const [materials, setMaterials] = useState([])
    const [products, setProducts] = useState([])

    const notification = useNotification()
    const [isLoading, setIsLoading] = useState(true)
    const [loads, setLoads] = useState({
        materials: true,
        products: true,
    })

    useEffect(() => {
        for (const data in Object.keys(loads)) {
            if (loads[data]) {
                setIsLoading(true)
                return
            }
        }
        setIsLoading(false)
    }, [loads])

    useEffect(() => {
        loadAllData()
    }, [])

    const loadAllData = () => {
        loadMaterials()
        loadProducts()
    }

    const loadMaterials = () => {
        setLoads(prev => ({
            ...prev,
            materials: true
        }))

        httpService.get('/materials')
            .then(res => {
                setMaterials(res)
            })
            .catch(err => {
                notification.error('Не удалось загрузить материалы')
                console.log(err)
            })
            .finally(() => setLoads(prev => ({
                ...prev,
                materials: false
            })))
    }

    const loadProducts = () => {
        setLoads(prev => ({
            ...prev,
            products: true
        }))

        httpService.get('/products')
            .then(res => {
                setMaterials(res)
            })
            .catch(err => {
                notification.error('Не удалось загрузить товары')
                console.log(err)
            })
            .finally(() => setLoads(prev => ({
                ...prev,
                products: false
            })))
    }
    
    const value = {
        isLoading,
        materials,
        products,
        loadMaterials,
        loadProducts
    }
    
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const dataRepository = {
    materials: [],
    products: []
}

export { dataRepository, DataContext, DataProvider as default }
