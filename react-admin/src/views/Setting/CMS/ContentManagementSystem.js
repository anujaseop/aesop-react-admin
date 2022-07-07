import { AppSwitch } from '@coreui/react';
// import 'antd/dist/antd.css'
import classnames from 'classnames';
import 'ladda/dist/ladda-themeless.min.css';
import 'quill/dist/quill.snow.css';
import React, { Component } from 'react';
import LaddaButton, { ZOOM_OUT } from 'react-ladda';
import ReactQuill, { Quill } from 'react-quill';
import { connect } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
} from 'reactstrap';
import swal from 'sweetalert';
import {
  changeCmsStatus,
  getCms,
  updateCms,
  addCms,
  deleteCms,
} from '../../../actions/cmsActions';
// import { checkEmptyValidation } from '../../Helpers/Validation'
import { checkEmptyValidation } from '../../../Helpers/Validation';
// import '../Dashboard/Dashboard.css'

import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);

class ContentManagementSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageLength: 10,
      showModal: false,
      saveLoading: false,
      fields: {
        _id: null,
        title: '',
        sub_title: '',
        content: '',
        cover_photo: '',
        cover_photo_preview: '',
      },
      errors: {
        error_title: '',
        error_content: '',
      },
    };

    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block', 'link'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['image', 'video'],
        ['clean'], // remove formatting button
      ],
      imageResize: {
        // parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    };
  }

  componentDidMount() {
    this.props.getCms({ limit: 10, page: 1 });
  }

  /**
   * Function called for pageLimit and onchnage method update the text.
   * @param {*} e
   * @memberof ContentManagementSystem
   */
  onFieldChange = (e) => {
    const { page } = this.state;
    if (e.target.name === 'pageLength') {
      const cmsObj = {
        page,
        limit: e.target.value,
      };
      this.props.getCms(cmsObj);
    }
    this.setState({
      [e.target.name]: e.target.value,
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value,
      },
    });
  };

  /**
   * For updating the content in the Quill
   * @param {*} content : text that we provide in the quill text field.
   * @memberof ContentManagementSystem
   */
  onContentChange = (content) => {
    this.setState({
      ...this.state,
      fields: {
        ...this.state.fields,
        content: content,
      },
    });
  };

  /**
   * For changing the enbale / disable method.
   * @param {*} cms grtting the flag value
   * @memberof ContentManagementSystem
   */
  onContentStatusChange = (cms) => {
    let { flag } = cms;
    cms.flag = 1;
    if (flag === 1) {
      cms.flag = 2;
    }
    let cmsFlag = {
      flag: cms.flag,
    };
    let id = cms._id;
    this.props
      .changeCmsStatus(id, cmsFlag)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        swal('Error!', `Error occurred, Please try again later!`, 'error');
      });
  };

  /**
   * For toggling the modal of update and add.
   * @param {*} e
   * @memberof ContentManagementSystem
   */
  toggleTourModal = (e) => {
    this.setState({
      ...this.state,
      showModal: false,
      fields: {
        _id: null,
        content: '',
        cover_photo: '',
        cover_photo_preview: '',
        sub_title: '',
        title: '',
      },
      errors: {
        error_title: '',
        error_content: '',
        error_sub_title: '',
        error_cover_photo: '',
      },
    });
  };

  /**
   * for opening the modal for add and update
   * @param {*} e
   * @memberof ContentManagementSystem
   */
  openModal = (e) => {
    this.setState({
      ...this.state,
      showModal: true,
      fields: {
        _id: null,
        content: '',
        cover_photo: '',
        cover_photo_preview: '',
        sub_title: '',
      },
      errors: {
        error_title: '',
        error_content: '',
        error_sub_title: '',
        error_cover_photo: '',
      },
    });
  };

  /**
   * To validate and upload photo in the upload field
   * @param {*} e
   * @memberof ContentManagementSystem
   */
  onPhotoChange = async (e) => {
    let validateImage = true;
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateImage = false;
      if (!file) {
        validateImage = true;
        // this.setState({
        //   errors: {
        //     ...this.state.errors,
        //     error_cover_photo: "Please select image.",
        //   },
        // });
      } else if (!file.name.match(/\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF)$/)) {
        validateImage = false;
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
        });
      } else {
        validateImage = true;
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
        });
      }
    }
  };

  /**
   * To get the value in the edit modal form the api
   * @param {*} data
   * @memberof ContentManagementSystem
   */
  onEditContentModal(data) {
    this.setState({
      ...this.state,
      showModal: true,
      fields: {
        _id: data._id,
        title: data.title,
        content: data.content,
        sub_title: data.sub_title,
        cover_photo: data.banner_image,
        cover_photo_preview: data.banner_image,
      },
    });
  }

  /**
   * To get the value in the edit modal form the api
   * @param {*} content
   * @memberof ContentManagementSystem
   */
  onDeleteCMS = (content) => {
    swal({
      title: 'Are you sure?',
      text: `Are you sure that you want to delete ${content.title}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const { page, pageLength } = this.state;

        this.props
          .deleteCms(content._id)
          .then((res) => {
            this.props.getCms(page, pageLength);
            toast.success(res.data.message);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    });
  };

  /**
   * Function called for updating and adding the fields in the update and add api.
   * @param {*} e
   * @memberof ContentManagementSystem
   */
  onSaveTour = (e) => {
    e.preventDefault();
    const { _id, content, title, sub_title, cover_photo } = this.state.fields;
    const { errors, page, pageLength } = this.state;
    let validationFlag = true;
    let errTitle = null;
    let errContent = null;
    let errDescription = null;
    errTitle = checkEmptyValidation(title, 'Title ');
    errContent = checkEmptyValidation(content, 'Content ');
    if (errTitle || errDescription || errContent) {
      validationFlag = false;
      this.setState({
        errors: {
          error_title: errTitle,
          error_content: errContent,
        },
      });
    } else {
      this.setState({
        errors: {
          error_title: '',
          error_content: '',
        },
      });
    }
    if (validationFlag) {
      const cmsObj = {
        page,
        limit: pageLength,
      };
      this.setState({ saveLoading: true });
      const tourData = new FormData();
      tourData.append('title', title);
      // tourData.append('sub_title', sub_title);
      tourData.append('content', content);
      // tourData.append('banner_image', cover_photo);
      if (_id === null) {
        this.props
          .addCms(tourData)
          .then((result) => {
            this.props.getCms(cmsObj).then((res) => {
              toast.success(result.data.message);
              this.setState({ saveLoading: false, showModal: false });
            });
          })
          .catch((err) => {
            this.setState({ saveLoading: false, showModal: false });
            toast.error(err.response.data.message);
            swal('Error!', `Error occurred, Please try again later!`, 'error');
          });
      } else {
        let id = _id;
        this.props
          .updateCms(id, tourData)
          .then((result) => {
            this.props.getCms(cmsObj);
            toast.success(result.data.message);
            this.setState({ saveLoading: false, showModal: false });
          })
          .catch((err) => {
            toast.error(err.response.data.message);
            this.setState({ saveLoading: false, showModal: false });
          });
      }
      this.setState({
        errors,
      });
    }
  };

  /**
   * Function called for pagination: page number dropdown
   * @param {*} page
   * @memberof ContentManagementSystem
   */
  onPageClick = (page) => {
    const { pageLength } = this.state;
    const cmsObj = {
      page,
      limit: pageLength,
    };
    this.props.getCms(cmsObj);
  };

  /**
   * Function called for pagination: moving into next page
   * @param {*} page
   * @memberof ContentManagementSystem
   */
  paginationSection(data) {
    const { page, totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } =
      data;
    let Pages = [];
    let skipped = 0;
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
        const test = i;
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
        );
        skipped = 0;
        Pages.push(item);
      } else {
        skipped = 1;
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
    );
  }

  render() {
    const containerStyle = {
      zIndex: 1999,
    };
    const { showModal, saveLoading, errors, pageLength } = this.state;
    const { content, title, sub_title, cover_photo_preview } =
      this.state.fields;
    const { cmsDetails, cmsLoading } = this.props.cmsDetails;
    let { page } = cmsDetails;
    page = page - 1;
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
                <i className='fas fa-file-alt'></i>
                <strong>Content Management</strong>
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
                        className='form-control list-width input  d-inline  mx-2'
                      >
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
                        title='Add new content'
                        position='bottom'
                        arrow={true}
                        distance={15}
                        trigger='mouseenter'
                      >
                        <Button
                          size='md'
                          className='btnColor btn-brand mr-1 '
                          onClick={this.openModal}
                        >
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
                  className='mt-2 customDataTable text-center'
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Slug</th>
                      <th className='text-left'>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!cmsLoading && cmsDetails.docs.length > 0 ? (
                      cmsDetails.docs.map((data, i) => (
                        <tr key={i}>
                          <td>{page * pageLength + (i + 1)}</td>
                          <td>{data.title}</td>
                          <td>{data.slug}</td>
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
                              onClick={() => this.onContentStatusChange(data)}
                            />
                          </td>
                          <td>
                            <Tooltip
                              title='Edit content'
                              position='bottom'
                              arrow={true}
                              distance={15}
                              trigger='mouseenter'
                            >
                              <Button
                                size='md'
                                className='btn-behance btn-brand ml-2'
                                onClick={() => this.onEditContentModal(data)}
                                type='button'
                              >
                                <i className='fa fa-pencil'></i>
                              </Button>
                            </Tooltip>
                            <Tooltip
                              title='Delete content'
                              position='bottom'
                              arrow={true}
                              distance={15}
                              trigger='mouseenter'
                            >
                              <Button
                                size='md'
                                className='btn-youtube btn-brand ml-2'
                                onClick={() => this.onDeleteCMS(data)}
                                type='button'
                              >
                                <i className='fa fa-trash'></i>
                              </Button>
                            </Tooltip>
                          </td>
                        </tr>
                      ))
                    ) : cmsLoading ? (
                      <tr>
                        <td colSpan='6' className='middle-align text-center'>
                          <Spinner type='grow' />
                        </td>
                      </tr>
                    ) : cmsDetails.docs.length === 0 && !cmsLoading ? (
                      <tr>
                        <td colSpan='6' className='middle-align text-center'>
                          No Content found
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>No.</th>
                      <th>Title</th>
                      <th>Slug</th>
                      <th className='text-left'>Status</th>
                      <th>Action</th>
                    </tr>
                  </tfoot>
                </Table>
                <div className='row float-right'>
                  <div className='col-md-12'>
                    {this.paginationSection(cmsDetails)}
                  </div>
                </div>
              </CardBody>
            </Card>
            {/* ================ Modal Start ============== */}
            <Modal isOpen={showModal} size='lg'>
              <ModalHeader toggle={this.toggleTourModal}>
                {this.state.fields._id !== null ? (
                  <span>Edit Content Management</span>
                ) : (
                  <span>Add Content Management</span>
                )}
              </ModalHeader>
              <ModalBody>
                <FormGroup row>
                  <Col xs='12'>
                    <label>Title</label>
                    <input
                      placeholder='Title'
                      rows='3'
                      type='text'
                      name='title'
                      onChange={(e) => this.onFieldChange(e)}
                      defaultValue={title}
                      className={classnames('form-control', {
                        'form-control input': true,
                      })}
                    />
                    {errors.error_title.length > 0 ? (
                      <em className='error invalid-feedback'>
                        {errors.error_title}
                      </em>
                    ) : null}
                  </Col>
                  {/* <Col xs='6'>
                    <label>Sub Title</label>
                    <input
                      placeholder='sub title'
                      rows='3'
                      type='text'
                      name='sub_title'
                      onChange={(e) => this.onFieldChange(e)}
                      defaultValue={sub_title}
                      className={classnames('form-control', {
                        'form-control input': true,
                      })}
                    />
                  </Col> */}
                </FormGroup>
                {/* <FormGroup row>
                  <Col xs='6'>
                    <label>Banner Image</label>
                    <input
                      type='file'
                      name='cover_photo'
                      className=' file-input form-control'
                      style={{ height: '42px' }}
                      onChange={this.onPhotoChange}
                    />
                    {cover_photo_preview !== '' && (
                      <img
                        src={cover_photo_preview}
                        alt='cover'
                        className='w-50'
                      />
                    )}
                    <div className='file-info'>
                      <em>
                        (Note: Only JPEG, JPG, PNG, GIF image type allowed)
                      </em>
                    </div>
                  </Col>
                </FormGroup> */}
                <FormGroup row>
                  <Col xs='12'>
                    <label>Content</label>
                    <ReactQuill
                      name='content'
                      placeholder='Enter Content'
                      value={content}
                      onChange={(e) => this.onContentChange(e)}
                      modules={this.modules}
                      style={{
                        insetInlineStart: '10',
                        height: '250px',
                        marginBottom: '59px',
                      }}
                    />
                    {errors.error_content.length > 0 ? (
                      <em className='error pt-3 invalid-feedback'>
                        {errors.error_content}
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
                  onClick={this.onSaveTour}
                >
                  Save
                </LaddaButton>
                <button
                  className='btn btn-outline cancel'
                  onClick={this.toggleTourModal}
                >
                  <span> Cancel</span>
                </button>
              </ModalFooter>
            </Modal>
            {/* ================  Modal Close ============== */}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cmsDetails: state.cmsDetails,
});

export default connect(mapStateToProps, {
  getCms,
  changeCmsStatus,
  updateCms,
  deleteCms,
  addCms,
})(ContentManagementSystem);
