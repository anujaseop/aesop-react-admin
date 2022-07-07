import React, { Fragment, useEffect, useState } from 'react'
import { Row, Col, Card, CardBody, Table } from 'reactstrap'
import { useParams } from 'react-router-dom'

import { connect } from 'react-redux'
import { getUserDetailsById } from '../../actions/userActions'

const UserDetails = (props) => {
  const { id } = useParams()

  const { getUserDetailsById } = props
  const [userDetails, setUserDetails] = useState('')

  const [userLoading, setUserLoading] = useState(false)

  useEffect(() => {
    getUserDetailsById(id).then((res) => {
      let response = res.data.result
      setUserDetails(response)
      setUserLoading(true)
    })
  }, [id])

  return (
    <Row>
      <Col xs='12'>
        <Card>
          {userLoading ? (
            <CardBody>
              <Table responsive striped className='custome-table-th-td'>
                <tbody>
                  <Fragment>
                    <tr>
                      <th>Name</th>
                      <td>
                        {userDetails.first_name} {userDetails.last_name}
                      </td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{userDetails.email}</td>
                    </tr>
                    <tr>
                      <th>Profile</th>
                      <th>
                        <div>
                          <img src={userDetails.image} alt='' width='50px' />
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th>Subscription</th>
                      <td>{userDetails?.subscription_fee_limit} Months</td>
                    </tr>{' '}
                    <tr>
                      <th>Investmen amount</th>
                      <td>{userDetails?.investment_amount} </td>
                    </tr>{' '}
                    <tr>
                      <th>Phone Number</th>
                      <td>{userDetails.phone_number}</td>
                    </tr>{' '}
                    <tr>
                      <th>Dmat Account</th>
                      <td>{userDetails?.dmat_account_type}</td>
                    </tr>
                  </Fragment>
                </tbody>
              </Table>
            </CardBody>
          ) : (
            ''
          )}
        </Card>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, {
  getUserDetailsById,
})(UserDetails)
