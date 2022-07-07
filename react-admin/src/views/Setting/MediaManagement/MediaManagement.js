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
  getMediaDetails,
  changeMediaStatus,
  addMedia,
  updateMedia,
  getMediaDetailsById,
  deleteMedia,
} from '../../../actions/mediaActions'
import { checkEmptyValidation } from '../../../Helpers/Validation'
// import '../Dashboard/Dashboard.css'
import { Tooltip } from 'react-tippy'

class MediaManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageLength: 10,
      showModal: false,
      saveLoading: false,
      type: '',
      fields: {
        _id: null,
        image_name: '',
        imageType: '',
        cover_photo: '',
        cover_photo_preview: '',
      },
      errors: {
        error_image_name: '',
        error_imageType: '',
        error_cover_photo: '',
      },
    }
  }

  componentDidMount() {
    let { page, pageLength, type } = this.state
    this.props.getMediaDetails(page, pageLength, type)
  }

  /**
   * Function called for pageLimit and onchnage method update the text.
   * @param {*} e
   * @memberof MediaManagement
   */
  onFieldChange = (e) => {
    const { page, type } = this.state
    if (e.target.name === 'pageLength') {
      this.props.getMediaDetails(page, e.target.value, type)
    }
    this.setState({
      [e.target.name]: e.target.value,
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    })
  }

  /**
   * For changing the enbale / disable method.
   * @param {*} cms grtting the flag value
   * @memberof MediaManagement
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
    this.props
      .changeMediaStatus(id, cmsFlag)
      .then((res) => {
        toast.success(res.data.message)
      })
      .catch((err) => {
        swal('Error!', `Error occurred, Please try again later!`, 'error')
      })
  }

  /**
   * For toggling the modal of update and add.
   * @param {*} e
   * @memberof MediaManagement
   */
  toggleMediaModal = (e) => {
    this.setState({
      ...this.state,
      showModal: false,
      fields: {
        _id: null,
        imageType: '',
        cover_photo: '',
        cover_photo_preview: '',
        image_name: '',
      },
      errors: {
        error_image_name: '',
        error_imageType: '',
        error_cover_photo: '',
      },
    })
  }

  /**
   * for opening the modal for add and update
   * @param {*} e
   * @memberof MediaManagement
   */
  openModal = (e) => {
    this.setState({
      ...this.state,
      showModal: true,
      fields: {
        _id: null,
        imageType: '',
        cover_photo: '',
        cover_photo_preview: '',
      },
      errors: {
        error_image_name: '',
        error_imageType: '',
        error_cover_photo: '',
      },
    })
  }

  /**
   * To validate and upload photo in the upload field
   * @param {*} e
   * @memberof MediaManagement
   */
  onPhotoChange = async (e) => {
    let validateImage = true
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      validateImage = false
      if (!file) {
        validateImage = false
        this.setState({
          errors: {
            ...this.state.errors,
            error_cover_photo: 'Please select image.',
          },
        })
      } else if (!file.name.match(/\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF)$/)) {
        validateImage = false
        this.setState({
          ...this.state,
          fields: {
            ...this.state.fields,
            cover_photo: '',
          },
          errors: {
            ...this.state.errors,
            error_cover_photo: 'Please select valid image.',
          },
        })
      } else {
        validateImage = true
        this.setState({
          ...this.state,
          fields: {
            ...this.state.fields,
            cover_photo: file,
            cover_photo_preview: URL.createObjectURL(file),
          },
          errors: {
            ...this.state.errors,
            error_cover_photo: '',
          },
        })
      }
    }
  }

  /**
   * To get the value in the edit modal form the api
   * @param {*} data
   * @memberof MediaManagement
   */
  onEditMediaModal(data) {
    this.setState({
      ...this.state,
      showModal: true,
      fields: {
        _id: data._id,
        image_name: data.image_name,
        imageType: data.type,
        cover_photo: data.image_path,
        cover_photo_preview: data.image_path,
      },
    })
  }

  /**
   * To get the value in the edit modal form the api
   * @param {*} media
   * @memberof MediaManagement
   */
  onDeleteMedia = (media) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete ${media.image_name}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const { page, pageLength, type } = this.state

        this.props
          .deleteMedia(media._id)
          .then((res) => {
            this.props.getMediaDetails(page, pageLength, type)
            toast.success(res.data.message)
          })
          .catch((err) => {
            toast.error(err.response.data.message)
          })
      }
    })
  }

  /**
   * Function called for updating and adding the fields in the update and add api.
   * @param {*} e
   * @memberof MediaManagement
   */
  onSaveTour = (e) => {
    e.preventDefault()
    const { _id, imageType, image_name, cover_photo } = this.state.fields
    const { errors, page, pageLength, type } = this.state
    let validationFlag = true
    let errImageTitle = null
    let errImageType = null
    let errCoverPhoto = null
    errImageTitle = checkEmptyValidation(image_name, 'Image Title ')
    errCoverPhoto = checkEmptyValidation(cover_photo, 'Image ')
    errImageType = checkEmptyValidation(imageType, 'Image Type ')
    if (errImageTitle || errCoverPhoto || errImageType) {
      validationFlag = false
      this.setState({
        errors: {
          error_image_name: errImageTitle,
          error_imageType: errImageType,
          error_cover_photo: errCoverPhoto,
        },
      })
    } else {
      this.setState({
        errors: {
          error_image_name: '',
          error_imageType: '',
          error_cover_photo: '',
        },
      })
    }
    if (validationFlag) {
      this.setState({ saveLoading: true })
      const tourData = new FormData()
      tourData.append('image_name', image_name)
      tourData.append('type', imageType)
      tourData.append('image_path', cover_photo)
      if (_id === null) {
        this.props
          .addMedia(tourData)
          .then((result) => {
            this.props.getMediaDetails(page, pageLength, type).then((res) => {
              toast.success(result.data.message)
              this.setState({ saveLoading: false, showModal: false })
            })
          })
          .catch((err) => {
            this.setState({ saveLoading: false, showModal: false })
            toast.error(err.response.data.message)
            swal('Error!', `Error occurred, Please try again later!`, 'error')
          })
      } else {
        let id = _id
        this.props
          .updateMedia(id, tourData)
          .then((result) => {
            this.props.getMediaDetails(page, pageLength, type)
            toast.success(result.data.message)
            this.setState({ saveLoading: false, showModal: false })
          })
          .catch((err) => {
            toast.error(err.response.data.message)
            this.setState({ saveLoading: false, showModal: false })
          })
      }
      this.setState({
        errors,
      })
    }
  }

  /**
   * Function called for pagination: page number dropdown
   * @param {*} page
   * @memberof MediaManagement
   */
  onPageClick = (page) => {
    const { pageLength } = this.state
    this.props.getMediaDetails(page, pageLength)
  }

  /**
   * Function called for pagination: moving into next page
   * @param {*} page
   * @memberof MediaManagement
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
    const { imageType, image_name, cover_photo_preview } = this.state.fields
    const { mediaDetails, mediaLoading } = this.props.mediaDetails
    let { page } = mediaDetails
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
                <i className='fa fa-picture-o'></i>
                <strong>Media Management</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md='6' className='pl-3'>
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
                  <Col md='6' className='mb-2'>
                    <div className='text-right'>
                      <Tooltip
                        title='Add new media'
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
                      <th>Image Name</th>
                      <th>Image Type</th>
                      <th className='text-left'>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!mediaLoading && mediaDetails.docs.length > 0 ? (
                      mediaDetails.docs.map((data, i) => (
                        <tr key={i}>
                          <td>{page * pageLength + (i + 1)}</td>
                          <td>{data.image_name}</td>
                          <td>
                            {data.type === 1
                              ? 'Home'
                              : data.type === 2
                              ? 'Favicon'
                              : ''}
                          </td>
                          <td>
                            <AppSwitch
                              className='d-block mt-1'
                              variant='3d'
                              color='primary'
                              name='status'
                              checked={data.flag === 1 ? true : false}
                              label
                              dataOn={'\u2715'}
                              dataOff={'\u2713'}
                              onClick={() => this.onMediaStatusChange(data)}
                            />
                          </td>
                          <td>
                            <Tooltip
                              title='Edit media'
                              position='bottom'
                              arrow={true}
                              distance={15}
                              trigger='mouseenter'>
                              <Button
                                size='md'
                                className='btn-behance btn-brand ml-2'
                                onClick={() => this.onEditMediaModal(data)}
                                type='button'>
                                <i className='fa fa-pencil'></i>
                              </Button>
                            </Tooltip>
                            <Tooltip
                              position='bottom'
                              arrow={true}
                              distance={15}
                              trigger='mouseenter'
                              title='Delete media'>
                              <Button
                                size='md'
                                className='btn-youtube btn-brand ml-2'
                                onClick={() => this.onDeleteMedia(data)}
                                type='button'>
                                <i className='fa fa-trash'></i>
                              </Button>
                            </Tooltip>
                          </td>
                        </tr>
                      ))
                    ) : mediaLoading ? (
                      <tr>
                        <td colSpan='6' className='middle-align text-center'>
                          <Spinner type='grow' />
                        </td>
                      </tr>
                    ) : mediaDetails.docs.length === 0 && !mediaLoading ? (
                      <tr>
                        <td colSpan='6' className='middle-align text-center'>
                          No Media found
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>No.</th>
                      <th>Image Name</th>
                      <th>Image Type</th>
                      <th className='text-left'>Status</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </Table>
                <div className='row float-right'>
                  <div className='col-md-12'>
                    {this.paginationSection(mediaDetails)}
                  </div>
                </div>
              </CardBody>
            </Card>
            {/* ================ Modal Start ============== */}
            <Modal isOpen={showModal} size='lg'>
              <ModalHeader toggle={this.toggleMediaModal}>
                {this.state.fields._id !== null ? (
                  <span>Edit Media Management</span>
                ) : (
                  <span>Add Media Management</span>
                )}
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Col xs='6'>
                    <label>Image Name</label>
                    <input
                      placeholder='Enter Image Name'
                      rows='3'
                      type='text'
                      name='image_name'
                      onChange={(e) => this.onFieldChange(e)}
                      defaultValue={image_name}
                      className={classnames('form-control', {
                        'form-control input': true,
                      })}
                    />
                    {errors.error_image_name.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_image_name}
                      </em>
                    ) : null}
                  </Col>
                  <Col xs='6'>
                    <label>Image Type</label>
                    <select
                      type='text'
                      name='imageType'
                      value={imageType}
                      onChange={(e) => this.onFieldChange(e)}
                      className={classnames('form-control', {
                        'form-control input': true,
                      })}>
                      <option value=''>Select Type</option>
                      <option value={1}>Home</option>
                      <option value={2}>Favicon</option>
                    </select>

                    {errors.error_imageType.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_imageType}
                      </em>
                    ) : null}
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs='6'>
                    <label>Image</label>
                    <input
                      type='file'
                      name='cover_photo'
                      className=' file-input form-control'
                      style={{ height: '42px' }}
                      onChange={this.onPhotoChange}
                    />
                    <div className='file-info'>
                      <em>
                        (Note: Only JPEG, JPG, PNG, GIF image type allowed)
                      </em>
                    </div>
                    {cover_photo_preview !== '' && (
                      <img
                        src={cover_photo_preview}
                        alt='cover'
                        className='w-50'
                      />
                    )}
                    {errors.error_cover_photo.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_cover_photo}
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
                  onClick={this.onSaveTour}>
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
  mediaDetails: state.mediaDetails,
})

export default connect(mapStateToProps, {
  getMediaDetails,
  changeMediaStatus,
  addMedia,
  updateMedia,
  getMediaDetailsById,
  deleteMedia,
})(MediaManagement)
