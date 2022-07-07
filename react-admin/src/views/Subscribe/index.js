import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
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
import { consultantDrop, getUserList } from '../../actions/userActions'
import { AppSwitch } from '@coreui/react'
import { getUserSubscribeList } from '../../actions/userPaymentAction'
import Select from 'react-select'
import { useSelector } from 'react-redux'
const User = (props) => {
  const { getUserSubscribeList, users, deleteUser } = props
  const [search, setSearch] = useState('')
  const [pageLimit, setPageLimit] = useState(10)

  const [user, setuser] = useState('')
  const [options, setoptions] = useState([])
  const userSubscribe = useSelector((state) => state.userSubscribe)
  const { userSubscribeList, loading } = userSubscribe
  useEffect(() => {
    props.consultantDrop(1).then(async (res) => {
      console.log(res.data.result)
      let result = res.data.result
      let data = await result.map((s) => {
        return {
          label: `${s.first_name} ${s.last_name}`,
          value: s._id,
        }
      })
      setoptions(data)
    })
    getUserSubscribeList(1, pageLimit, '', user)
  }, [pageLimit, user])

  // const onDeleteUser = (user) => {
  //   swal({
  //     title: 'Are you sure?',
  //     text: `Are you sure that you want to delete user ${user.first_name} ${user.last_name} ?`,
  //     icon: 'warning',
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       deleteUser(user._id)
  //         .then((result) => {
  //           toast.success(result.data.message);
  //           getUserList(pageLength, pageLimit, '');
  //         })
  //         .catch((err) => {
  //           if (err.response !== undefined) {
  //             toast.error(err.response.data.message);
  //           }
  //         });
  //     }
  //   });
  // };

  const onFieldKeyPress = (e) => {
    if (e.target.name === 'search') {
      if (e.key === 'Enter') {
        getUserSubscribeList(1, pageLimit, e.target.value)
      }
    }
  }

  const onPageClick = (page) => {
    getUserSubscribeList(page, pageLimit, search, user)
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

  let { page } = userSubscribeList
  page = page - 1

  return (
    <div className='animated fadeIn'>
      <ToastContainer position='top-right' autoClose={3000} />
      <Row>
        <Col xs='12'>
          <Card className='card-style shadow'>
            <CardHeader>
              <i className='fas fa-money'></i>
              <strong>User Payment History</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md='8' className='pl-3'>
                  <div className='text-left'>
                    <span className=''>Show</span>
                    <select
                      type='text'
                      name='pageLength'
                      value={pageLimit}
                      onChange={(e) => setPageLimit(e.target.value)}
                      className='form-control list-width input  d-inline  mx-2'>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50 </option>
                      <option value={100}>100 </option>
                    </select>

                    <span className=''>Entries </span>
                  </div>
                </Col>
                <Col md='4' className='pl-3 float-end '>
                  <div className='d-flex align-items-center '>
                    <span className='mr-1'>User</span>
                    <Select
                      options={options}
                      className='w-100'
                      isClearable
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      onChange={(value) =>
                        setuser(value?.value ? value.value : '')
                      }
                    />
                  </div>
                </Col>
              </Row>
              <Table
                responsive
                striped
                className='mt-2 customDataTable text-center'>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Group</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>User</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && userSubscribeList.docs.length > 0 ? (
                    userSubscribeList.docs.map((data, i) => (
                      <tr key={i}>
                        <td>{page * pageLimit + (i + 1)}</td>
                        <td>{data.groupData.group_name}</td>
                        <td>{data.paid_date}</td>
                        <td>{data.expiry_date}</td>
                        <td>{data.userData.fullName}</td>
                        <td>{data.amount === 0 ? 'Free' : data.amount}</td>
                      </tr>
                    ))
                  ) : loading ? (
                    <tr>
                      <td colSpan='6' className='middle-align text-center'>
                        <Spinner type='grow' />
                      </td>
                    </tr>
                  ) : userSubscribeList.docs.length === 0 && !loading ? (
                    <tr>
                      <td colSpan='6' className='middle-align text-center'>
                        No User payment history found
                      </td>
                    </tr>
                  ) : null}
                </tbody>
                <tfoot>
                  <tr>
                    <th>No.</th>
                    <th>Group</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>User</th>
                    <th>Amount (₹)</th>
                  </tr>
                </tfoot>
              </Table>
              <div className='row float-right'>
                <div className='col-md-12'>
                  {paginationSection(userSubscribeList)}
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
  users: state.users,
})
export default connect(mapStateToProps, {
  getUserList,
  getUserSubscribeList,
  consultantDrop,
})(User)
