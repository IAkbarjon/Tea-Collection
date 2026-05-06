import { Card } from "react-bootstrap"

function MaterialView({ material }) {
    return (
        <Card className="w-[400px]">
            <Card.Header>
                <Card.Title>{material.material_name}</Card.Title>
            </Card.Header>
            <Card.Body>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card>
    )
}

export default MaterialView
