import {Row, Col, Card} from 'react-bootstrap';

export default function Highlights(){
	return(
		<Row className="mt-3 mb-3">
            <Col xs={12} md={6}>
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title>
                            <h2>Learn from Straw Hats</h2>
                        </Card.Title>
                        <Card.Text>
                            In One Piece, everyone's trying to achieve their dreams. However, the series brilliantly highlights how someone chooses to go after their dreams will ultimately define them. Those who choose underhanded methods will ultimately fail in the end and forever be remembered as cheaters.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col xs={12} md={6}>
                <Card className="cardHighlight p-3">
                    <Card.Body>
                        <Card.Title>
                            <h2>Join Straw Hat Community</h2>
                        </Card.Title>
                        <Card.Text>
                           The Straw Hat Pirates, also known as the Mugiwara Pirates, Straw Hat Crew or simply the Straw Hats, are a very infamous and powerful pirate crew that originated from the East Blue. The crew sailed on the Going Merry, their first official Straw Hat ship.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
	)
}