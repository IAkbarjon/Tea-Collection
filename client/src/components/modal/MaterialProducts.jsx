import { Button, Card, Modal } from 'react-bootstrap'
import { dataRepository } from '../../contexts/DataContext'
import { useCallback, useState } from 'react'
import useData from '../../hooks/useData'
import ProductView from '../ui/ProductView'

function MaterialProducts({ onClose, material }) {
  const [isCalculate, setIsCalculate] = useState(false)
  const { products } = useData()

  const getProductsByMaterial = useCallback(() => {
    return dataRepository.products.filter(product => product.materials.some(m => m.id === material.material_id))
  }, [material, products])
  
  const materialProducts = getProductsByMaterial()
  
  return (
    <Modal show size='xl' onHide={onClose} className='relative'>
      <Modal.Header>
        <Modal.Title>Продукты, использующие материал {material.material_name} в своем производстве</Modal.Title>
      </Modal.Header>
      <Modal.Body className='flex flex-wrap justify-center gap-2'>
        {
          materialProducts.length === 0 ? (
            <span>Продуктов нет</span>
          ) : (
            materialProducts.map(product => (
              <ProductView
                key={product.id}
                product={product}
                footer={
                  <div className='flex'>
                    <Button
                      variant='outline-warning'
                      className='opacity-90'
                      disabled={!isCalculate}
                    >Расчитать</Button>
                  </div>
                }
              />
            ))
          )
        }
      </Modal.Body>
      <Modal.Footer className='flex gap-3 sticky bottom-0 bg-gray-50!'>
        <button
          onClick={() => setIsCalculate(prev => !prev)}
          className='bg-main-accent text-white p-2 rounded shadow-sm'
        >{isCalculate ? 'Выключить' : 'Включить'} режим расчета</button>
        <Button
          onClick={onClose}
          variant='secondary'
        >Закрыть</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default MaterialProducts
