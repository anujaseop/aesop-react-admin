import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Card, Col, Input, Row } from 'reactstrap'
import { addRating } from '../../actions/userActions'

const UserRating = (props) => {
  const { id } = useParams()

  const onChange = (e) => {
    let data = {
      group: id,
      rating: e.target.value,
    }
    props.addRating(data).then((res) => {
      toast.success(res.data.message)
    })
  }
  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12'>
          <Card body>
            <Row>
              <Col md='2'>
                <label>Update Rating</label>
              </Col>
              <Col md='2'>
                <select onChange={(e) => onChange(e)} className='form-control'>
                  <option value=''>Select</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user_details: state.users,
})
export default connect(mapStateToProps, {
  addRating,
})(UserRating)
