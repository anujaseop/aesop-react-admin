import { AppSwitch } from '@coreui/react'
// import 'antd/dist/antd.css'
import classnames from 'classnames'
import 'ladda/dist/ladda-themeless.min.css'
import 'quill/dist/quill.snow.css'
import React, { Component } from 'react'
import LaddaButton, { ZOOM_OUT } from 'react-ladda'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Spinner,
  Table,
} from 'reactstrap'
import swal from 'sweetalert'
import {
  getConsultantPayment,
  addConsultantPayment,
} from '../../actions/paymentActions'
import { consultantDrop, getUserList } from '../../actions/userActions'
import { checkEmptyValidation } from '../../Helpers/Validation'

// import '../Dashboard/Dashboard.css'
import { Tooltip } from 'react-tippy'
import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

class PaymentHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageLimit: 10,
      pageLength: 10,
      showModal: false,
      saveLoading: false,
      type: '',
      fields: {
        _id: null,
        date: [null, null],
        amount: '',
        group: '',
        userid: '',
      },
      errors: {
        error_group: '',
        error_date: '',
        error_amount: '',
      },
      userList: [],
    }
  }

  componentDidMount() {
    let { pageLimit, page, pageLength } = this.state

    // this.props.getUserList(page, pageLimit, '').then((res) => {
    //   if (res) {
    //     const firstUser = res.data.result.docs[0]
    //     this.setState({
    //       ...this.state,
    //       fields: {
    //         ...this.state.fields,
    //         group: firstUser._id,
    //       },
    //     })
    //   }
    // })
    this.props.consultantDrop().then(async (res) => {
      console.log(res.data.result)
      let result = res.data.result
      let data = await result.map((s) => {
        return {
          label: `${s.first_name} ${s.last_name}`,
          value: s._id,
        }
      })
      this.setState({ userList: data })
    })

    this.props.getConsultantPayment(1, 10)
    // this.props.getMediaDetails(page, pageLength, type);
  }

  /**
   * Function called for pageLimit and onchnage method update the text.
   * @param {*} e
   * @memberof PaymentHistory
   */
  onFieldChange = (e) => {
    const { page, pageLength, fields } = this.state

    if (e.target.name === 'pageLength') {
      this.props.getConsultantPayment(page, e.target.value, fields.userid)
    }
    this.setState({
      [e.target.name]: e.target.value,
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    })

    if (e.target.name === 'userid') {
      this.props.getConsultantPayment(page, pageLength, e.target.value)
    }
  }

  /**
   * For changing the enbale / disable method.
   * @param {*} cms grtting the flag value
   * @memberof PaymentHistory
   */
  onMediaStatusChange = (media) => {
    let { flag } = media
    media.flag = 1
    if (flag === 1) {
      media.flag = 2
    }
    let cmsFlag = {
      flag: media.flag,
    }
    let id = media._id
    // this.props
    //   .changeMediaStatus(id, cmsFlag)
    //   .then((res) => {
    //     toast.success(res.data.message);
    //   })
    //   .catch((err) => {
    //     swal('Error!', `Error occurred, Please try again later!`, 'error');
    //   });
  }

  /**
   * For toggling the modal of update and add.
   * @param {*} e
   * @memberof PaymentHistory
   */
  toggleMediaModal = (e) => {
    this.setState({
      ...this.state,
      showModal: false,
      fields: {
        _id: null,
        date: [null, null],
        amount: '',
        group: '',
      },
      errors: {
        error_group: '',
        error_date: '',
        error_amount: '',
      },
    })
  }

  /**
   * for opening the modal for add and update
   * @param {*} e
   * @memberof PaymentHistory
   */
  openModal = (e) => {
    this.setState({
      ...this.state,
      showModal: true,
      fields: {
        ...this.state.fields,
        _id: null,
        date: [null, null],
        amount: '',
      },
      errors: {
        error_group: '',
        error_date: '',
        error_amount: '',
      },
    })
  }

  /**
   * To get the value in the edit modal form the api
   * @param {*} media
   * @memberof PaymentHistory
   */
  // onDeleteMedia = (media) => {
  //   swal({
  //     title: 'Are you sure?',
  //     text: `Are you sure that you want to delete ${media.image_name}?`,
  //     icon: 'warning',
  //     buttons: true,
  //     dangerMode: true,
  //   }).then((willDelete) => {
  //     if (willDelete) {
  //       const { page, pageLength, type } = this.state;

  //       // this.props
  //       //   .deleteMedia(media._id)
  //       //   .then((res) => {
  //       //     this.props.getMediaDetails(page, pageLength, type);
  //       //     toast.success(res.data.message);
  //       //   })
  //       //   .catch((err) => {
  //       //     toast.error(err.response.data.message);
  //       //   });
  //     }
  //   });
  // };

  /**
   * Function called for updating and adding the fields in the update and add api.
   * @param {*} e
   * @memberof PaymentHistory
   */
  onSavePaymentHistory = (e) => {
    e.preventDefault()

    const { _id, amount, group, date, userid } = this.state.fields
    const { errors, page, pageLength, type } = this.state
    let validationFlag = true
    let errAmount = ''
    let errDate = ''
    let errGroup = ''
    if (date[0] === null || date[1] === null) {
      errDate = 'Please select date range'
    }
    errGroup = checkEmptyValidation(group, 'Group ')
    errAmount = checkEmptyValidation(amount, 'Amount ')
    if (errAmount || errGroup || errDate) {
      validationFlag = false
      this.setState({
        errors: {
          error_amount: errAmount,
          error_group: errGroup,
          error_date: errDate,
        },
      })
    } else {
      this.setState({
        errors: {
          error_amount: '',
          error_group: '',
          error_date: '',
        },
      })
    }
    if (validationFlag) {
      this.setState({ saveLoading: true })
      const paymentData = {
        user_id: group,
        from_date: new Date(date[0]).toISOString(),
        to_date: new Date(date[1]).toISOString(),
        amount: amount,
      }

      this.props
        .addConsultantPayment(paymentData)
        .then((result) => {
          this.setState({ saveLoading: false, showModal: false })
          this.props.getConsultantPayment(1, pageLength, userid).then((res) => {
            toast.success(result.data.message)
          })
        })
        .catch((err) => {
          this.setState({ saveLoading: false, showModal: false })
          toast.error(err.response.data.message)
          swal('Error!', `Error occured,please try again later!`, 'error')
        })
      // if (_id === null) {
      //
      // } else {
      //   let id = _id;
      //   this.props
      //     .updateMedia(id, tourData)
      //     .then((result) => {
      //       this.props.getMediaDetails(page, pageLength, type);
      //       toast.success(result.data.message);
      //       this.setState({ saveLoading: false, showModal: false });
      //     })
      //     .catch((err) => {
      //       toast.error(err.response.data.message);
      //       this.setState({ saveLoading: false, showModal: false });
      //     });
      // }
      this.setState({
        errors,
      })
    }
  }

  handleDateRange = (date, dateString) => {
    this.setState({
      fields: {
        ...this.state.fields,
        date: dateString,
      },
    })
  }
  /**
   * Function called for pagination: page number dropdown
   * @param {*} page
   * @memberof PaymentHistory
   */
  onPageClick = (page) => {
    const { pageLength, fields } = this.state
    this.props.getConsultantPayment(page, pageLength, fields.userid)
  }

  /**
   * Function called for pagination: moving into next page
   * @param {*} page
   * @memberof PaymentHistory
   */
  paginationSection(data) {
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
              onClick={page === i ? () => null : () => this.onPageClick(test)}
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
            onClick={
              hasPrevPage === true ? () => this.onPageClick(prevPage) : null
            }>
            <PaginationLink
              previous
              disabled={hasPrevPage === true ? false : true}
              tag='button'>
              Prev
            </PaginationLink>
          </PaginationItem>
          {Pages}

          <PaginationItem
            onClick={
              hasNextPage === true ? () => this.onPageClick(nextPage) : null
            }>
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

  render() {
    const containerStyle = {
      zIndex: 1999,
    }
    const { showModal, saveLoading, errors, pageLength } = this.state
    const { date, group, amount, userid } = this.state.fields

    const { allUsers, userDetailLoading } = this.props.users
    const { consultantPayment, consultantPaymentLoading } = this.props.payment

    let { page } = consultantPayment
    page = page - 1
    return (
      <div className='animated fadeIn'>
        <ToastContainer
          position='top-right'
          autoClose={3000}
          style={containerStyle}
        />
        <Row>
          <Col xs='12'>
            <Card className='card-style shadow'>
              <CardHeader>
                <i className='fas fa-list'></i>
                <strong>Payment History</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md='7' className='pl-3'>
                    <div className='text-left'>
                      <span className=''>Show</span>
                      <select
                        type='text'
                        name='pageLength'
                        value={pageLength}
                        onChange={(e) => this.onFieldChange(e)}
                        className='form-control list-width input  d-inline  mx-2'>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50 </option>
                        <option value={100}>100 </option>
                      </select>

                      <span className=''>Entries </span>
                    </div>
                  </Col>
                  <Col md='3' className='pl-3 float-end '>
                    <div className='text-right '>
                      <span>User</span>
                      <select
                        type='text'
                        name='userid'
                        value={userid}
                        onChange={(e) => this.onFieldChange(e)}
                        className='form-control list-style w-75 input d-inline mx-2 '>
                        <option value=''>All</option>
                        {this.state.userList.map((user, i) => (
                          <option key={i} value={user.value}>
                            {user.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Col>
                  <Col md='2' className='mb-2 pl-0'>
                    <div className='text-right'>
                      <Tooltip
                        title='Add payment history'
                        position='bottom'
                        arrow={true}
                        distance={15}
                        trigger='mouseenter'>
                        <Button
                          size='md'
                          className='btnColor btn-brand mr-1 '
                          onClick={this.openModal}>
                          <i className='fa fa-plus'></i>
                          <span>Add </span>
                        </Button>
                      </Tooltip>
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
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!consultantPaymentLoading &&
                    consultantPayment.docs.length > 0 ? (
                      consultantPayment.docs.map((data, i) => (
                        <tr key={i}>
                          <td>{page * pageLength + (i + 1)}</td>
                          <td>
                            {data.users.length > 0 && data.users[0].group_name
                              ? data.users[0].group_name
                              : '-'}
                          </td>
                          <td>
                            {data.from_date
                              ? data.from_date.split('T')[0]
                              : '-'}
                          </td>
                          <td>
                            {data.to_date ? data.to_date.split('T')[0] : '-'}
                          </td>
                          <td>
                            {data.amount ? data.amount.toLocaleString() : '-'}
                          </td>
                        </tr>
                      ))
                    ) : consultantPaymentLoading ? (
                      <tr>
                        <td colSpan='6' className='middle-align text-center'>
                          <Spinner type='grow' />
                        </td>
                      </tr>
                    ) : consultantPayment.docs.length === 0 &&
                      !consultantPaymentLoading ? (
                      <tr>
                        <td colSpan='6' className='middle-align text-center'>
                          No payment history found
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
                      <th>Amount (₹)</th>
                    </tr>
                  </tfoot>
                </Table>
                <div className='row float-right'>
                  <div className='col-md-12'>
                    {this.paginationSection(consultantPayment)}
                  </div>
                </div>
              </CardBody>
            </Card>
            {/* ================ Modal Start ============== */}
            <Modal isOpen={showModal}>
              <ModalHeader toggle={this.toggleMediaModal}>
                <span>Add Payment History</span>
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Col xs='12'>
                    <label>Group name</label>
                    <select
                      type='text'
                      name='group'
                      value={group}
                      onChange={(e) => this.onFieldChange(e)}
                      className={classnames('form-control', {
                        'form-control input': true,
                      })}>
                      {this.state.userList.map((user, i) => (
                        <option key={i} value={user.value}>
                          {user.label}
                        </option>
                      ))}
                    </select>

                    {errors.error_group.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_group}
                      </em>
                    ) : null}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs='12'>
                    <label>Select date range</label>
                    <div className='w-100'>
                      <RangePicker
                        className='w-100'
                        selectsRange={true}
                        startDate={date && date[0]}
                        endDate={date && date[1]}
                        onChange={this.handleDateRange}
                        placeholderText='Select Date Range'
                        isClearable={true}
                        dateFormat='dd MMM yyyy'
                      />
                    </div>
                    {errors.error_date.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_date}
                      </em>
                    ) : null}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs='12'>
                    <label>Amount</label>
                    <div className='w-100'>
                      <input
                        type='number'
                        className='form-control'
                        placeholder='Enter amount'
                        name='amount'
                        // onChange={(e) => {
                        //   this.setState({
                        //     fields: {
                        //       ...this.state.fields,
                        //       amount: e.target.value,
                        //     },
                        //   });
                        // }}
                        onChange={(e) => this.onFieldChange(e)}
                        value={amount}
                      />
                    </div>
                    {errors.error_amount.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_amount}
                      </em>
                    ) : null}
                  </Col>
                </FormGroup>
              </ModalBody>
              <ModalFooter className='px-4'>
                <LaddaButton
                  className='btn btnColor btn-brand  btn-ladda'
                  loading={saveLoading}
                  data-color='blue'
                  data-style={ZOOM_OUT}
                  onClick={this.onSavePaymentHistory}>
                  Save
                </LaddaButton>
                <button
                  className='btn btn-outline cancel'
                  onClick={this.toggleMediaModal}>
                  <span> Cancel</span>
                </button>
              </ModalFooter>
            </Modal>
            {/* ================  Modal Close ============== */}
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  payment: state.payment,
})

export default connect(mapStateToProps, {
  getUserList,
  addConsultantPayment,
  getConsultantPayment,
  consultantDrop,
})(PaymentHistory)
