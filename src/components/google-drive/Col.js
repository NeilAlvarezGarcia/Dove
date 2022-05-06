import React from 'react'
import { Col, Form } from 'react-bootstrap'

const ColComponent = ({id, type, label, updateProfile, handleChange, placeholder}) => {
  return (
    <Col sm>
        <Form.Group id={id}>
            <Form.Label className='fw-bolder'>{label}</Form.Label>
            <Form.Control className={`border  border-2 border-${updateProfile[id].border}`} type={type} name={id} value={updateProfile[id].value} onChange={handleChange}placeholder={placeholder && placeholder}/>
        </Form.Group>
    </Col>
  );
}

export default ColComponent