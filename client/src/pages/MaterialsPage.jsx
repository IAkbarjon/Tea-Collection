import MaterialView from '../components/ui/MaterialView'
import useData from '../hooks/useData'

function MaterialsPage() {
    const { materials } = useData()

    return (
        <div className='flex flex-col'>
            <hr />
            <div className='flex items-center justify-between w-[86%] self-center'>
                <h3>Все материалы</h3>
                <button
                    className='bg-main-accent text-white p-2 rounded shadow-md'
                >Добавить</button>
            </div>
            <hr />
            <div className='flex flex-wrap justify-center gap-3'>
                {materials.map(material => (
                    <MaterialView
                        key={material.id}
                        material={material}
                    />
                ))}
            </div>
        </div>
    )
}

export default MaterialsPage
