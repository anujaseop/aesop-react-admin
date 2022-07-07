import React, { Component } from 'react'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
  Collapse,
} from 'reactstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { checkEmptyValidation } from '../../../Helpers/Validation'
import {
  getFAQ,
  addFAQ,
  updateFAQ,
  deleteFAQ,
} from '../../../actions/faqAction'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Tooltip } from 'react-tippy'
class FAQ extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _id: null,
      showModal: false,
      pageLength: 30,
      question: '',
      answer: '',
      accordion: [true, false, false],
      activeTab: null,
      errors: {
        error_question: '',
        error_answer: '',
      },
    }
  }

  componentDidMount() {
    const { pageLength } = this.state
    this.props.getFAQ(1, pageLength)
  }

  onFieldChange = (e) => {
    this.setState(
      {
        ...this.state,
        [e.target.name]: e.target.value,
      },
      function () {}
    )
  }

  toggleAccordion(tab) {
    const { activeTab } = this.state
    let currentTab = null

    if (activeTab === tab) {
      currentTab = null
    } else if (activeTab === null) {
      currentTab = tab
    } else if (activeTab !== null && activeTab !== tab) {
      currentTab = tab
    }

    this.setState({
      activeTab: currentTab,
    })
  }

  toggleCategoryModal = (e) => {
    this.setState({
      showModal: false,
      _id: null,
      question: '',
      answer: '',
      errors: {
        error_question: '',
        error_answer: '',
      },
    })
  }

  onSaveLanguage = (e) => {
    e.preventDefault()

    const { _id, question, answer, pageLength, errors } = this.state

    const {
      getfaq: { page },
    } = this.props.faqs
    let validationFlag = true
    let error
    for (var key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (key) {
          errors[key] = ''
        }
      }
    }

    error = checkEmptyValidation(question, 'Question')
    if (error) {
      validationFlag = false
      errors.error_question = error
    }

    error = checkEmptyValidation(answer, 'Answer')
    if (error) {
      validationFlag = false
      errors.error_answer = error
    }
    if (validationFlag) {
      const newFAQ = {
        question,
        answer,
      }
      this.setState({ _id: null })
      if (_id === null) {
        this.props
          .addFAQ(newFAQ)
          .then((res) => {
            console.log(res)
            toast.success(res.data.message)
            this.props.getFAQ(page, pageLength)
          })
          .catch((err) => {
            swal('Error!', `Error occurred, Please try again later!`, 'error')
          })
      } else {
        this.props
          .updateFAQ(newFAQ, _id)
          .then((res) => {
            toast.success(res.data.message)
            this.props.getFAQ(page, pageLength)
          })
          .catch((err) => {
            swal('Error!', `Error occurred, Please try again later!`, 'error')
          })
      }

      this.setState({
        showModal: false,
        _id: null,
        question: '',
        answer: '',
        errors,
      })
    } else {
      this.setState({
        errors,
      })
    }
  }

  onDeleteFAQ = (faq) => {
    const { pageLength } = this.state
    const {
      getfaq: { page },
    } = this.props.faqs

    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete ${faq.question} FAQ ?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // category.flag = 2
        this.props
          .deleteFAQ(faq._id)
          .then((res) => {
            toast.success(res.data.message)
            this.props.getFAQ(page, pageLength)
          })
          .catch((err) => {
            console.log(err)
            // toast  .success(res.message);

            // swal("Error!", `Error occurred, Please try again later!`, "error");
          })
      }
    })
  }

  showEditCategoryModal(e) {
    this.setState({
      showModal: true,
      _id: e._id,
      answer: e.answer,
      question: e.question,
    })
  }

  onPageClick = (page) => {
    const { pageLength } = this.state
    this.props.getFAQ(page, pageLength)
  }

  paginationSection(data) {
    // console.log('FAQ -> paginationSection -> data', data)

    const { page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
      data.result

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
              key={i}
            >
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
            }
          >
            <PaginationLink
              previous
              disabled={hasPrevPage === true ? false : true}
              tag='button'
            >
              Prev
            </PaginationLink>
          </PaginationItem>
          {Pages}

          <PaginationItem
            onClick={
              hasNextPage === true ? () => this.onPageClick(nextPage) : null
            }
          >
            <PaginationLink
              next
              tag='button'
              disabled={hasNextPage === true ? false : true}
            >
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

    const { showModal, _id, question, answer, errors, activeTab } = this.state
    const { getfaq, loading } = this.props.faqs

    return (
      <div className='animated fadeIn'>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          style={containerStyle}
        />
        <Row>
          <Col xs='12'>
            <Card className='shadow card-style'>
              <CardHeader>
                <i className='fas fa-question-circle'></i>
                <strong>FAQ</strong>
              </CardHeader>
              <CardBody>
                <Col md='12'>
                  <div className='text-right'>
                    <Tooltip
                      title='Add FAQ'
                      position='bottom'
                      arrow={true}
                      distance={15}
                      trigger='mouseenter'
                    >
                      <Button
                        size='md'
                        className='btnColor btn-brand mr-1 mb-4'
                        onClick={() =>
                          this.setState({ showModal: true, _id: null })
                        }
                      >
                        <i className='fa fa-plus'></i>
                        <span>Add</span>
                      </Button>
                    </Tooltip>
                  </div>
                </Col>
                {/* accordian start */}
                <div id='accordion'>
                  {!loading && getfaq.result.docs.length > 0 ? (
                    getfaq.result.docs.map((faq, id) => (
                      <Card className='mb-2 faq-card' key={id}>
                        <CardHeader id='headingOne'>
                          <div
                            color='link'
                            className='text-left m-0 pt-1'
                            aria-expanded={activeTab === faq.id ? true : false}
                            aria-controls='collapseOne'
                          >
                            <p
                              className=' d-inline font-weight-bold align-middle cursor-pointer'
                              onClick={() => this.toggleAccordion(faq._id)}
                            >
                              {faq.question}
                            </p>
                            {/* <Tooltip
                              title='Delete FAQ'
                              position='bottom'
                              arrow={true}
                              distance={15}
                              trigger='mouseenter'
                            > */}
                            <i
                              className='fa fa-trash  h5  btn-delete'
                              onClick={() => this.onDeleteFAQ(faq)}
                            />
                            {/* </Tooltip> */}
                            {/* <Tooltip
                              title='Edit FAQ'
                              position='bottom'
                              arrow={true}
                              distance={15}
                              trigger='mouseenter'
                            > */}
                            <i
                              className='fa fa-pencil update h5 mr-5'
                              onClick={() => this.showEditCategoryModal(faq)}
                            ></i>
                            {/* </Tooltip> */}
                          </div>
                        </CardHeader>
                        <Collapse
                          isOpen={activeTab === faq._id ? true : false}
                          data-parent='#accordion'
                          id='collapseOne'
                          aria-labelledby='headingOne'
                        >
                          <CardBody>{faq.answer}</CardBody>
                        </Collapse>
                      </Card>
                    ))
                  ) : loading ? (
                    <div className='middle-align text-center'>
                      <Spinner type='grow' />
                    </div>
                  ) : null}
                </div>
                {/* accordian end */}

                {/* {!loading && (
                  <div className="row  float-right mt-3 ">
                    <div className="col-md-6">
                      {this.paginationSection(getfaq)}
                    </div>
                  </div>
                )} */}
              </CardBody>
            </Card>
            {/* ================ Modal Start ============== */}

            <Modal isOpen={showModal}>
              <ModalHeader toggle={this.toggleCategoryModal}>
                {_id ? 'Edit FAQ' : 'ADD FAQ'}
                {/* Add FAQ */}
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Col xs='12'>
                    <label>Question</label>
                    <span className='required'>*</span>
                  </Col>
                  <Col xs='12'>
                    <input
                      placeholder='Enter Question'
                      rows='3'
                      type='text'
                      name='question'
                      onChange={(e) => this.onFieldChange(e)}
                      defaultValue={question}
                      className={classnames(
                        { 'form-control input': true },
                        {
                          'is-invalid': errors.error_question.length > 0,
                        }
                      )}
                    />
                    {errors.error_question.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_question}
                      </em>
                    ) : null}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs='12'>
                    <label>Answer</label>
                    <span className='required'>*</span>
                  </Col>
                  <Col xs='12'>
                    <input
                      placeholder='Enter Answer'
                      rows='3'
                      type='text'
                      name='answer'
                      onChange={(e) => this.onFieldChange(e)}
                      defaultValue={answer}
                      className={classnames(
                        { 'form-control input': true },
                        {
                          'is-invalid': errors.error_answer.length > 0,
                        }
                      )}
                    />
                    {errors.error_answer.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_answer}
                      </em>
                    ) : null}
                  </Col>
                </FormGroup>
              </ModalBody>
              <ModalFooter className='px-4'>
                <Button
                  className='btnColor btn-brand'
                  onClick={this.onSaveLanguage}
                >
                  {_id ? 'Update' : 'Submit'}
                </Button>
                <button
                  className='btn btn-outline cancel'
                  onClick={this.toggleCategoryModal}
                >
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
// class FAQ extends Component {

FAQ.propTypes = {
  getFAQ: PropTypes.func.isRequired,
  addFAQ: PropTypes.func.isRequired,
  deleteFAQ: PropTypes.func.isRequired,
  faqs: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  // categories: state.categories.categories,
  faqs: state.faq,
})

export default connect(mapStateToProps, {
  getFAQ,
  addFAQ,
  updateFAQ,
  deleteFAQ,
})(FAQ)
