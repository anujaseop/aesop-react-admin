import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Card, Col, Row } from 'reactstrap'
import { getUserTips } from '../../actions/userActions'

const UserTips = (props) => {
  const { getUserTips } = props
  const { id } = useParams()
  // const [search, setSearch] = useState('');
  const [pageLimit, setPageLimit] = useState(10)
  const [loadTips, setLoadTips] = useState(false)
  const [size, setSize] = useState('')
  useEffect(() => {
    if (!loadTips) {
      getUserTips(id).then((res) => {
        setSize(res.data.result)
      })
      setLoadTips(true)
    }
  }, [id, loadTips, getUserTips])

  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12'>
          <Card body>
            <h4>Total tips followed {size} </h4>
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
  getUserTips,
})(UserTips)
