import { Card } from 'react-bootstrap'

function ProductView({ product, footer }) {
  return (
    <Card className='w-[420px]'>
      <Card.Header className="flex justify-between flex-wrap-reverse">
        <Card.Subtitle>{product.type_name}</Card.Subtitle>
        <Card.Title>{product.product_name}</Card.Title>
      </Card.Header>
      <Card.Body className='bg-main-secondary'>
        <div className='flex justify-between flex-wrap'>
          <Card.Text>Артикул:</Card.Text>
          <Card.Text>{product.article}</Card.Text>
        </div>
        <div className='flex justify-between flex-wrap'>
          <Card.Text>Минимальная стоимость для партнера:</Card.Text>
          <Card.Text>{product.min_price_for_partners} ₽</Card.Text>
        </div>
      </Card.Body>
      {footer && (
        <Card.Footer>
          {footer}
        </Card.Footer>
      )}
    </Card>
  )
}

export default ProductView
