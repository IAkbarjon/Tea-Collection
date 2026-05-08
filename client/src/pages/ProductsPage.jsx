import ProductView from '../components/ui/ProductView'
import useData from '../hooks/useData'
import LoadingPage from './LoadingPage'

function ProductsPage() {
    const { isLoading, products } = useData()

    if (isLoading) {
        return <LoadingPage />
    }
    
    return (
        <div className='flex flex-col'>
            <hr />
            <div className='flex items-center justify-between w-[86%] self-center'>
                <h3>Все товары</h3>
            </div>
            <hr />
            <div className='flex flex-wrap justify-center gap-3'>
                {products.map(product => (
                    <ProductView
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductsPage
