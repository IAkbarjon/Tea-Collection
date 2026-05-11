import { Button, Card } from 'react-bootstrap'

function MaterialView({ material, onEdit, onSelect }) {
    return (
        <Card className='w-[420px]'>
            <Card.Header className='flex flex-wrap-reverse justify-between'>
                <Card.Subtitle>{material.type_name}</Card.Subtitle>
                <Card.Title>{material.material_name}</Card.Title>
            </Card.Header>
            <Card.Body className='bg-main-secondary'>
                <div className='flex justify-between'>
                    <Card.Text>Минимальное количество</Card.Text>
                    <Card.Text>{material.min_quantity} {material.measurement_unit}</Card.Text>
                </div>
                <div className="flex justify-between">
                    <Card.Text>Количество на складе</Card.Text>
                    <Card.Text>{material.stock_quantity} {material.measurement_unit}</Card.Text>
                </div>
                <div className="flex justify-between">
                    <Card.Text>Цена</Card.Text>
                    <Card.Text>{material.unit_price} ₽</Card.Text>
                </div>
            </Card.Body>
            <Card.Footer className='flex justify-end gap-3'>
                <Button
                    variant='outline-secondary'
                    onClick={() => onSelect(material)}
                >Товары материала</Button>
                <Button
                    variant='secondary'
                    onClick={() => onEdit(material)}
                >Редактировать</Button>
            </Card.Footer>
        </Card>
    )
}

export default MaterialView
