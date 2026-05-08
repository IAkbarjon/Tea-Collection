import { createContext, useEffect, useState } from 'react'
import httpService from '../services/httpService'
import useNotification from '../hooks/useNotification'

const DataContext = createContext()

function DataProvider({ children }) {
    const [materials, setMaterials] = useState([])
    const [products, setProducts] = useState([])
    const [materialTypes, setMaterialTypes] = useState([])
    const [productTypes, setProductTypes] = useState([])

    const notification = useNotification()
    const [isLoading, setIsLoading] = useState(true)
    const [loads, setLoads] = useState({
        materials: true,
        products: true,
        materialTypes: true,
        productTypes: true
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

    // Загрузка всех данных при первой инициализации
    useEffect(() => {
        loadAllData()
    }, [])

    const loadAllData = () => {
        loadMaterials()
        loadProducts()
        loadMaterialTypes()
        loadProductTypes()
    }

    const loadMaterials = () => {
        setLoads(prev => ({
            ...prev,
            materials: true
        }))

        httpService.get('/materials')
            .then(res => {
                setMaterials(res)
                dataRepository.materials = res
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
                setProducts(res)
                dataRepository.products = res
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

    const loadMaterialTypes = () => {
        setLoads(prev => ({
            ...prev,
            materialTypes: true
        }))

        httpService.get('/materials/types')
            .then(res => {
                setMaterialTypes(res)
                dataRepository.materialTypes = res
            })
            .catch(err => {
                notification.error('Не удалось загрузить типы материалов')
                console.error(err)
            })
            .finally(() => {
                setLoads(prev => ({
                    ...prev,
                    materialTypes: false
                }))
            })
    }

    const loadProductTypes = () => {
        setLoads(prev => ({
            ...prev,
            productTypes: true
        }))

        httpService.get('/products/types')
            .then(res => {
                setProductTypes(res)
                dataRepository.productTypes = res
            })
            .catch(err => {
                notification.error('Не удалось загрузить типы материалов')
                console.error(err)
            })
            .finally(() => {
                setLoads(prev => ({
                    ...prev,
                    productTypes: false
                }))
            })
    }
    
    const value = {
        isLoading,
        materials,
        products,
        materialTypes,
        productTypes,
        setMaterials,
        setProducts,
        setMaterialTypes,
        setProductTypes,
        loadMaterials,
        loadProducts,
        loadMaterialTypes,
        loadProductTypes,
    }
    
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

const dataRepository = {
    materials: [],
    products: [],
    materialTypes: [],
    productTypes: [],
}

export { dataRepository, DataContext, DataProvider as default }
