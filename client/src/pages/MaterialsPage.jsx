import { useEffect, useState } from 'react'
import MaterialView from '../components/ui/MaterialView'
import useData from '../hooks/useData'
import MaterialInputModal from '../components/modal/MaterialInputModal'

function MaterialsPage() {
    const [isEditMode, setIsEditMode] = useState(false)
    const [selectedMaterial, setSelectedMaterial] = useState(null)
    
    const { materials } = useData()

    useEffect(() => {
        setIsEditMode(selectedMaterial)
    }, [selectedMaterial])

    return (
        <div className='flex flex-col'>
            <hr />
            <div className='flex items-center justify-between w-[86%] self-center'>
                <h3>Все материалы</h3>
                <button
                    onClick={() => {
                        setIsEditMode(true)
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
                        onSelect={material => setSelectedMaterial(material)}
                    />
                ))}
            </div>

            {isEditMode && (
                <MaterialInputModal
                    onClose={() => {
                        setIsEditMode(false)
                        setSelectedMaterial(null)
                    }}
                    editedMaterial={selectedMaterial}
                />
            )}
        </div>
    )
}

export default MaterialsPage
