import { Spinner } from 'react-bootstrap'

function LoadingPage() {
  return (
    <div className="w-screen h-1/3 flex items-center justify-center">
      <Spinner
        animation='border'
        role='status'
        title='Загрузка данных'
      />
    </div>
  )
}

export default LoadingPage
