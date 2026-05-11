import { useEffect, useState } from 'react'
import MaterialView from '../components/ui/MaterialView'
import useData from '../hooks/useData'
import MaterialInputModal from '../components/modal/MaterialInputModal'
import LoadingPage from './LoadingPage'
import MaterialProducts from '../components/modal/MaterialProducts'

function MaterialsPage() {
    const [mode, setMode] = useState(null)
    const [selectedMaterial, setSelectedMaterial] = useState(null)
    
    const { isLoading, materials } = useData()

    useEffect(() => {
        if (!selectedMaterial) {
            setMode(null)
        }
    }, [selectedMaterial])
    
    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div className='flex flex-col'>
            <hr />
            <div className='flex items-center justify-between w-[86%] self-center'>
                <h3>Все материалы</h3>
                <button
                    onClick={() => {
                        setMode('input')
                    }}
                    className='bg-main-accent text-white p-2 rounded shadow-md'
                >Добавить материал</button>
            </div>
            <hr />
            <div className='flex flex-wrap justify-center gap-3'>
                {materials.map(material => (
                    <MaterialView
                        key={material.id}
                        material={material}
                        onEdit={editedMaterial => {
                            setSelectedMaterial(editedMaterial)
                            setMode('input')
                        }}
                        onSelect={selectedMaterial => {
                            setSelectedMaterial(selectedMaterial)
                            setMode('products')
                        }}
                    />
                ))}
            </div>

            {mode === 'input' && (
                <MaterialInputModal
                    onClose={() => {
                        setMode(null)
                        setSelectedMaterial(null)
                    }}
                    editedMaterial={selectedMaterial}
                />
            )}

            {mode === 'products' && (
                <MaterialProducts
                    onClose={() => {
                        setMode(null)
                        setSelectedMaterial(null)
                    }}
                    material={selectedMaterial}
                />
            )}
        </div>
    )
}

export default MaterialsPage
