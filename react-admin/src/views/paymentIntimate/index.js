import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tippy'
import { toast, ToastContainer } from 'react-toastify'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
  Table,
} from 'reactstrap'
import swal from 'sweetalert'
import { paymentIntimate } from '../../actions/paymentIntimateAction'
import { deleteUser, getUserList } from '../../actions/userActions'

const Index = (props) => {
  const payment_intimate = useSelector((state) => state.payment_intimate)

  const { paymentIntimate } = props
  const [search, setSearch] = useState('')
  const [pageLimit, setPageLimit] = useState(10)
  const [pageLength, setPageLength] = useState(1)

  useEffect(() => {
    paymentIntimate(1, pageLimit, '')
  }, [pageLength, pageLimit])

  const onFieldKeyPress = (e) => {
    if (e.target.name === 'search') {
      if (e.key === 'Enter') {
        paymentIntimate(pageLength, pageLimit, e.target.value)
      }
    }
  }

  const onPageClick = (page) => {
    paymentIntimate(page, pageLimit, '')
  }

  const paginationSection = (data) => {
    const { page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
      data

    let Pages = []
    let skipped = 0
    for (var i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        (page < 4 && i <= 5) ||
        i === page - 1 ||
        i === page + 1 ||
        i === page ||
        i === totalPages ||
        (page >= totalPages - 3 && i >= totalPages - 4)
      ) {
        const test = i
        const item = (
          <React.Fragment key={i}>
            {skipped === 1 ? (
              <PaginationItem>
                <PaginationLink disabled tag='button'>
                  ...
                </PaginationLink>
              </PaginationItem>
            ) : null}
            <PaginationItem
              active={page === i ? true : false}
              onClick={page === i ? () => null : () => onPageClick(test)}
              key={i}>
              <PaginationLink tag='button'>{i}</PaginationLink>
            </PaginationItem>
          </React.Fragment>
        )
        skipped = 0
        Pages.push(item)
      } else {
        skipped = 1
      }
    }

    return (
      <nav className='float-right'>
        <Pagination>
          <PaginationItem
            onClick={hasPrevPage === true ? () => onPageClick(prevPage) : null}>
            <PaginationLink
              previous
              disabled={hasPrevPage === true ? false : true}
              tag='button'>
              Prev
            </PaginationLink>
          </PaginationItem>
          {Pages}

          <PaginationItem
            onClick={hasNextPage === true ? () => onPageClick(nextPage) : null}>
            <PaginationLink
              next
              tag='button'
              disabled={hasNextPage === true ? false : true}>
              Next
            </PaginationLink>
          </PaginationItem>
        </Pagination>
      </nav>
    )
  }

  const { payment_intimate_list, loading } = payment_intimate

  let { page } = payment_intimate_list
  page = page - 1

  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12'>
          <Card className='card-style shadow'>
            <CardHeader>
              <i className='fas fa-users'></i>
              <strong>Payment Intimate</strong>
            </CardHeader>
            <CardBody>
              <Col md='12'>
                <Row>
                  <Col md='6' className='pl-0'>
                    <div className='text-left'>
                      <span className=''>Show</span>
                      <select
                        type='text'
                        name='pageLimit'
                        value={pageLimit}
                        onChange={(e) => setPageLimit(e.target.value)}
                        className='form-control list-style  d-inline  mx-2'>
                        <option value={10}>10 </option>
                        <option value={20}>20 </option>
                        <option value={50}>50 </option>
                        <option value={100}>100 </option>
                      </select>
                    </div>
                  </Col>
                  <Col md='6' className='pr-0'>
                    <div className='text-right'>
                      <span className=''>Search : </span>
                      <input
                        type='text'
                        name='search'
                        className='form-control w-50 input  d-inline'
                        onKeyPress={(e) => onFieldKeyPress(e)}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Table responsive striped className='mt-2 customDataTable'>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {payment_intimate_list.docs.length > 0 && !loading ? (
                    payment_intimate_list.docs.map((user, i) => (
                      <tr key={i}>
                        <td>{page * pageLength + (i + 1)}</td>
                        <td>
                          {user?.userData?.first_name}
                          {user?.userData?.last_name}
                        </td>
                        <td>{user?.userData?.email}</td>
                        <td>{user.comment}</td>
                      </tr>
                    ))
                  ) : loading ? (
                    <tr>
                      <td colSpan='6' className='middle-align text-center'>
                        <Spinner type='grow' />
                      </td>
                    </tr>
                  ) : payment_intimate_list.docs.length === 0 && !loading ? (
                    <tr>
                      <td colSpan='6' className='middle-align text-center'>
                        No payment intimate found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Comment</th>
                  </tr>
                </tfoot>
              </Table>
              <div className='row float-right'>
                <div className='col-md-12 '>
                  {paginationSection(payment_intimate_list)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default connect(null, {
  paymentIntimate,
})(Index)
