import React, { useEffect, useState } from 'react'

import { connect, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import {
  Card,
  CardBody,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
} from 'reactstrap'

import { getAllSubscribe } from '../../actions/userActions'

const UserBlog = (props) => {
  const { getAllSubscribe } = props

  const { id } = useParams()
  const [pageLength, setpageLength] = useState(10)
  const user_subscribe = useSelector((state) => state.user_subscribe)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAllSubscribe(id, 1, pageLength, '')
  }, [id])

  const onFieldKeyPress = (e) => {
    if (e.target.name === 'search') {
      if (e.key === 'Enter') {
        getAllSubscribe(id, 1, pageLength, e.target.value)
      }
    }
  }

  const onPageClick = (page) => {
    getAllSubscribe(id, page, pageLength, search)
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
      <nav>
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

  const { subscribeList, loading } = user_subscribe

  let { page } = subscribeList
  page = page - 1

  return (
    <div className='animated fadeIn'>
      <Row>
        <Col xs='12'>
          <Card body className='px-0 py-0'>
            <CardBody className='px-3 py-3'>
              <Col md='12'>
                <Row>
                  <Col md='6' className='pl-0'>
                    <div className='text-left'>
                      <span className=''>Show</span>
                      <select
                        type='text'
                        name='pageLimit'
                        value={pageLength}
                        onChange={(e) => setpageLength(e.target.value)}
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
                    <th>Group Name</th>
                    <th>Image</th>
                    <th>Paid Date</th>
                    <th>Expiry Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && subscribeList.docs.length > 0 ? (
                    subscribeList.docs.map((sub, i) => (
                      <tr>
                        <td>{page * pageLength + i + 1}</td>
                        <td>
                          <img
                            src={sub.group_pic}
                            alt={sub.group_name}
                            width='50px'
                          />
                        </td>
                        <td>{sub.group_name}</td>

                        <td>{sub.paid_date}</td>
                        <td>{sub.expiry_date}</td>
                        <td>{sub.amount === 0 ? 'Free' : sub.amount}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className='text-center'>
                        No subscription found
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Group Name</th>
                    <th>Image</th>
                    <th>Paid Date</th>
                    <th>Expiry Date</th>
                    <th>Amount</th>
                  </tr>
                </tfoot>
              </Table>
              <div className='row float-right'>
                <div className='col-md-12 '>
                  {paginationSection(subscribeList)}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user_details: state.user_details,
})

export default connect(mapStateToProps, { getAllSubscribe })(UserBlog)
