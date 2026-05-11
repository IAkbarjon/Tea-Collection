import { Button, Form, Modal } from 'react-bootstrap'
import { dataRepository } from '../../contexts/DataContext'
import { useCallback, useRef, useState } from 'react'
import useData from '../../hooks/useData'
import ProductView from '../ui/ProductView'
import { calculateProductCount } from '../../utils/productUtils'
import useNotification from '../../hooks/useNotification'

function MaterialProducts({ onClose, material }) {
  const [isCalculate, setIsCalculate] = useState(false)
  const formRef = useRef(null)
  
  const [materialCount, setMaterialCount] = useState(0)
  const [param1, setParam1] = useState(0)
  const [param2, setParam2] = useState(0)
  
  const { products } = useData()
  const notification = useNotification()

  const getProductsByMaterial = useCallback(() => {
    return dataRepository.products.filter(product => product.materials.some(m => m.id === material.material_id))
  }, [material, products])
  
  const materialProducts = getProductsByMaterial()

  const handleCalculate = (product) => {
    const form = formRef.current

    if (!form) {
      return
    }

    const isFormValid = form.checkValidity()

    if (!isFormValid) {
      form.reportValidity()
      return
    }
    
    const result = calculateProductCount(Number(material.type_id), Number(product.type_id), Number(materialCount), Number(param1), Number(param2))

    if (result === -1) {
      notification.info('Были переданы неправильные данные. Функция вернула: -1')
    } else {
      notification.info(`Можно изготовить ${result} ${material.measurement_unit} продукции`, 'Расчет количества продукции')
    }
  }
  
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
            <div className='flex flex-col gap-4'>
              {isCalculate && (
                <div className='flex flex-col justify-center'>
                  <h3>Расчет количества создаваемой продукции исходя из количества материала</h3>
                  <Form ref={formRef} className='flex justify-center gap-2' onSubmit={handleCalculate}>
                    <Form.Group>
                      <Form.Label>Количество материала</Form.Label>
                      <Form.Control
                        type='number'
                        value={materialCount || ''}
                        onChange={e => setMaterialCount(e.target.value)}
                        placeholder='200'
                        required
                        min={0}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Параметр 1</Form.Label>
                      <Form.Control
                        type='number'
                        value={param1 || ''}
                        onChange={e => setParam1(e.target.value)}
                        placeholder='20'
                        required
                        min={0}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Параметр 2</Form.Label>
                      <Form.Control
                        type='number'
                        value={param2 || ''}
                        onChange={e => setParam2(e.target.value)}
                        placeholder='40'
                        required
                        min={0}
                      />
                    </Form.Group>
                  </Form>
                </div>
              )}
              <div className='flex flex-wrap justify-center gap-2'>
                {materialProducts.map(product => (
                  <ProductView
                    key={product.id}
                    product={product}
                    footer={
                      <div className='flex'>
                        <Button
                          variant='outline-warning'
                          className='opacity-90'
                          disabled={!isCalculate}
                          onClick={() => handleCalculate(product)}
                        >Расчитать</Button>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
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
