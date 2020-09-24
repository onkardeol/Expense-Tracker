import React, { useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';
import { numberWithCommas } from '../utils/Format';
import { Container, Row, Col } from 'react-bootstrap'

export const Balance = () => {
    const { expenses } = useContext(GlobalContext);

    const costs = expenses.map(expense => expense.cost);
    const total = costs.reduce((acc, item) => (acc+= item), 0).toFixed(2);

    return (
        <Container fluid className="total-container">
            <Row>
                <Col>
                    <h4>Total</h4>
                    <h1>${numberWithCommas(total)}</h1>
                </Col>
            </Row>
        </Container>
    )
}
