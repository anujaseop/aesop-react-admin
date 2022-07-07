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
                        <img src={userDetails.image} alt='' width='50' />
                      </th>
                    </tr>
                    <tr>
                      <th>Group Name</th>
                      <td>{userDetails?.group_name}</td>
                    </tr>
                    <tr>
                      <th>Group Image</th>
                      <th>
                        <img src={userDetails.group_pic} alt='' width='75' />
                      </th>
                    </tr>
                    <tr>
                      <th>PanCard</th>
                      <td>
                        <p>
                          {userDetails?.pancard_number !== '.' &&
                            userDetails?.pancard_number}
                        </p>
                        <img
                          src={userDetails.pancard_photo}
                          alt='img'
                          width='75'
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>SEBI Registration number</th>
                      <td>
                        {userDetails?.sebi_registration_number !== '.'
                          ? userDetails.sebi_registration_number
                          : '-'}
                      </td>
                    </tr>{' '}
                    <tr>
                      <th>Phone Number </th>
                      <td>
                        {userDetails?.phone_number !== '.'
                          ? userDetails.phone_number
                          : '-'}
                      </td>
                    </tr>
                    <tr>
                      <th>Subscription</th>
                      <td>
                        {userDetails.subscription !== 1 ? 'Free' : 'Paid'}
                      </td>
                    </tr>{' '}
                    <tr>
                      <th>Tag</th>
                      <td>{userDetails.tag}</td>
                    </tr>{' '}
                    <tr>
                      <th>Category</th>
                      <td>
                        {' '}
                        {Number(userDetails.category) === 1
                          ? 'Intraday Trading'
                          : Number(userDetails.category) === 2
                          ? 'Swing Trading'
                          : Number(userDetails.category) === 3
                          ? 'Longterm Trading'
                          : '-'}
                      </td>
                    </tr>{' '}
                    <tr>
                      <th>Expertise</th>
                      <td>
                        {Number(userDetails.expertise) === 1
                          ? 'Experts in the option expert'
                          : Number(userDetails.expertise) === 2
                          ? 'Experts in the equity wizard'
                          : Number(userDetails.expertise) === 3
                          ? 'Experts in the futures pro'
                          : Number(userDetails.expertise) === 4
                          ? 'Experts in the swing Maestro'
                          : Number(userDetails.expertise) === 5
                          ? 'Experts in the swing ninja'
                          : Number(userDetails.expertise) === 6
                          ? 'Experts in the swing champion'
                          : Number(userDetails.expertise) === 7
                          ? 'Experts in the fundamental grandmaster'
                          : Number(userDetails.expertise) === 8
                          ? 'Experts in the delivery start/professional'
                          : '-'}
                      </td>
                    </tr>{' '}
                    <tr>
                      {userDetails.subscription !== 1 ? null : (
                        <>
                          <th>Price</th>

                          <td>
                            {userDetails?.forOneMonth ? '1 Month  Rs.' : null}
                            {userDetails?.forOneMonth
                              ? `${userDetails.forOneMonth}  `
                              : null}
                            {userDetails?.forOneMonth && <br />}
                            {userDetails?.forThreeMonth
                              ? `3 Months  Rs.${userDetails?.forThreeMonth}`
                              : null}
                            {userDetails?.forThreeMonth && <br />}

                            {userDetails?.forSixMonth &&
                              `6 Months Rs. ${userDetails?.forSixMonth}  \n`}
                            {userDetails?.forSixMonth && <br />}
                            {userDetails?.forOneYear
                              ? `1 Year  Rs. ${userDetails?.forOneYear}  \n`
                              : null}
                          </td>
                        </>
                      )}
                    </tr>
                    <tr>
                      <th>About</th>
                      <td>{!userDetails?.about ? '-' : userDetails?.about}</td>
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
