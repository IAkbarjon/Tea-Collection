import { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import useData from '../../hooks/useData'
import httpService from '../../services/httpService'
import useNotification from '../../hooks/useNotification'

function MaterialInputModal({ onClose, editedMaterial }) {
  // Данные материала
  const [name, setName] = useState(editedMaterial?.material_name ?? '')
  const [typeId, setTypeId] = useState(editedMaterial?.type_id ?? 0)
  const [price, setPrice] = useState(editedMaterial?.unit_price ?? 0)
  const [stockQuantity, setStockQuantity] = useState(editedMaterial?.stock_quantity ?? 0)
  const [minQuantity, setMinQuantity] = useState(editedMaterial?.min_quantity ?? 0)
  const [packageQuantity, setPackageQuantity] = useState(editedMaterial?.package_quantity ?? 0)
  const [measurementUnit, setMeasurementUnit] = useState(editedMaterial?.measurement_unit ?? 0)

  const { materialTypes, setMaterials, loadMaterialTypes } = useData()
  const notification = useNotification()

  useEffect(() => {
    loadMaterialTypes()
  }, [])

  const measurementUnites = ['кг', 'л', 'шт']

  const handleSaveMaterial = (e) => {
    e.preventDefault()
    ;(editedMaterial ?
      httpService.patch(`/materials/${editedMaterial.id}`, {
        material_name: name,
        type_id: typeId,
        unit_price: price,
        stock_quantity: stockQuantity,
        min_quantity: minQuantity,
        package_quantity: packageQuantity,
        measurement_unit: measurementUnit
      }) :
      httpService.post('/materials', {
        material_name: name,
        type_id: typeId,
        unit_price: price,
        stock_quantity: stockQuantity,
        min_quantity: minQuantity,
        package_quantity: packageQuantity,
        measurement_unit: measurementUnit
      }))
      .then(res => {
        setMaterials(prev => {
          if (editedMaterial)
            return prev.map(m => m.id === res.id ? res : m)
          else
            return [...prev, res]
        })
        notification.success(`Материал ${res.material_name} успешно добавлен`)
      })
      .catch(err => {
        notification.error(`Не удалось ${editedMaterial ? 'сохранить' : 'создать'} материал`)
        console.error(err)
      })
  }
  
  return (
    <Modal show size='lg' onHide={onClose}>
      <Modal.Header>
        <Modal.Title>{editedMaterial ? 'Редактирование' : 'Добавление'} материала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id='main-form' onSubmit={handleSaveMaterial}>
          <Form.Group>
            <Form.Label>Название материала</Form.Label>
            <Form.Control
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Тип материала</Form.Label>
            <Form.Select
              value={typeId}
              onChange={e => setTypeId(e.target.value)}
              required
            >
              <option key={0} value={0} disabled>Выберите тип материала</option>
              {materialTypes.map(type => (
                <option
                  key={type.id}
                  value={type.id}
                >{type.type_name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Цена материала</Form.Label>
            <Form.Control
              type='number'
              value={price || ''}
              onChange={e => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Количество на складе</Form.Label>
            <Form.Control
              type='number'
              value={stockQuantity || ''}
              onChange={e => setStockQuantity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Минимальное количество</Form.Label>
            <Form.Control
              value={minQuantity || ''}
              onChange={e => setMinQuantity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Количество в упаковке</Form.Label>
            <Form.Control
              type='number'
              value={packageQuantity || ''}
              onChange={e => setPackageQuantity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Единица измерения</Form.Label>
            <Form.Select
              value={measurementUnit}
              onChange={e => setMeasurementUnit(e.target.value)}
              required
            >
              <option key={0} value={0} disabled>Выберите единицу измерения</option>
              {measurementUnites.map((unit, idx) => (
                <option
                  key={idx}
                  value={unit}
                >{unit}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='flex gap-4'>
        <Button variant='secondary' onClick={onClose}>Закрыть</Button>
        <button
          type='submit'
          form='main-form'
          className='bg-main-accent text-white p-2 rounded shadow-md hover:shadow-inner'
        >{editedMaterial ? 'Сохранить' : 'Добавить'}</button>
      </Modal.Footer>
    </Modal>
  )
}

export default MaterialInputModal
