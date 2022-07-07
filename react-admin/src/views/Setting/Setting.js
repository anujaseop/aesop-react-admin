import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { checkEmptyValidation } from '../../Helpers/Validation'
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap'

import classnames from 'classnames'
import { getSetting, addSetting } from '../../actions/settingAction'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Setting = (props) => {
  const { getSetting } = props
  const [state, setState] = useState({
    no_days_reminders: '',
    no_limit_to_send_notification: '',
    no_days_ago_leave: '',
    no_classes_send_reminder: '',
  })
  const [errors, setError] = useState({
    error_no_days_reminders: '',
    error_no_limit_to_send_notification: '',
    error_no_days_ago_leave: '',
    error_no_classes_send_reminder: '',
  })

  useEffect(() => {
    getSetting().then((res) => {
      setState({
        no_days_reminders: res.no_days_reminders,
        no_days_ago_leave: res.no_days_ago_leave,
        no_classes_send_reminder: res.no_classes_send_reminder,
        no_limit_to_send_notification: res.no_limit_to_send_notification,
      })
    })
  }, [])
  const onSubmitForm = async (e) => {
    e.preventDefault()
    const {
      no_days_reminders,
      no_limit_to_send_notification,
      no_days_ago_leave,
      no_classes_send_reminder,
    } = state
    let validationFlag = true
    let errNo_days_reminders = ''
    let errNo_days_ago_leave = ''
    let errNo_limit_to_send_notification = ''
    let errNo_classes_send_reminder = ''
    errNo_days_reminders = checkEmptyValidation(
      no_days_reminders,
      'No of days reminders'
    )
    errNo_days_ago_leave = checkEmptyValidation(
      no_days_ago_leave,
      'Number of days ago leave application required'
    )
    errNo_limit_to_send_notification = checkEmptyValidation(
      no_limit_to_send_notification,
      'Leave lower limit to send notification'
    )
    errNo_classes_send_reminder = checkEmptyValidation(
      no_classes_send_reminder,
      'Number of classes to send reminder'
    )
    if (
      errNo_days_reminders ||
      errNo_days_ago_leave ||
      errNo_classes_send_reminder ||
      errNo_limit_to_send_notification
    ) {
      validationFlag = false
      setError({
        error_no_days_reminders: errNo_days_reminders,
        error_no_limit_to_send_notification: errNo_limit_to_send_notification,
        error_no_days_ago_leave: errNo_days_ago_leave,
        error_no_classes_send_reminder: errNo_classes_send_reminder,
      })
    } else {
      validationFlag = true
      setError({
        error_no_days_reminders: '',
        error_no_limit_to_send_notification: '',
        error_no_days_ago_leave: '',
        error_no_classes_send_reminder: '',
      })
    }
    if (validationFlag) {
      let newData = {
        no_days_reminders,
        no_limit_to_send_notification,
        no_days_ago_leave,
        no_classes_send_reminder,
      }
      try {
        const res = await props.addSetting(newData)
        toast.success(res.data.message)
      } catch (err) {
        toast.error(err.response.data.message)
      }
    }
  }
  // const
  // const onFileChange = (e) => {
  //   setState({ [e.target.name]: e.target.value })
  // }
  // clg

  // set
  const containerStyle = {
    zIndex: 1999,
  }
  return (
    <div className='animated fadeIn'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        style={containerStyle}
      />
      <Row>
        <Col xs='12'>
          <Card>
            <CardHeader>
              <i className='fa fa-cog'></i>
              <strong>Settings</strong>
            </CardHeader>
            <CardBody>
              <form onSubmit={(e) => onSubmitForm(e)}>
                <Row>
                  <Col xs='12'>
                    <div className='form-group'>
                      <label>No of days reminders </label>
                      <span className='required'>*</span>
                      <input
                        type='number'
                        name='no_days_reminders'
                        placeholder='Enter no of days reminders'
                        value={state.no_days_reminders}
                        onChange={(e) =>
                          setState({
                            ...state,
                            no_days_reminders: e.target.value,
                          })
                        }
                        style={{ height: 'auto' }}
                        className={classnames(
                          { 'form-control input': true },
                          {
                            'is-invalid':
                              errors.error_no_days_reminders.length > 0,
                          }
                        )}
                        min='1'
                      />
                      <em>
                        <span className='text-danger'>
                          {errors.error_no_days_reminders}
                        </span>
                      </em>
                    </div>
                    <div className='form-group'>
                      <label>Leave lower limit to send notification</label>
                      <span className='required'>*</span>

                      <input
                        type='number'
                        name='no_limit_to_send_notification'
                        value={state.no_limit_to_send_notification}
                        placeholder='Enter leave lower limit to send notification'
                        onChange={(e) =>
                          setState({
                            ...state,
                            no_limit_to_send_notification: e.target.value,
                          })
                        }
                        style={{ height: 'auto' }}
                        className={classnames(
                          { 'form-control input': true },
                          {
                            'is-invalid':
                              errors.error_no_limit_to_send_notification
                                .length > 0,
                          }
                        )}
                        min='1'
                      />
                      <em>
                        <span className='text-danger'>
                          {errors.error_no_limit_to_send_notification}
                        </span>
                      </em>
                    </div>
                    <div className='form-group'>
                      <label>
                        Number of days ago leave application required
                      </label>
                      <span className='required'>*</span>

                      <input
                        type='number'
                        name='no_days_ago_leave'
                        value={state.no_days_ago_leave}
                        onChange={(e) =>
                          setState({
                            ...state,
                            no_days_ago_leave: e.target.value,
                          })
                        }
                        placeholder='Enter number of days ago leave application required'
                        style={{ height: 'auto' }}
                        className={classnames(
                          { 'form-control input': true },
                          {
                            'is-invalid':
                              errors.error_no_days_ago_leave.length > 0,
                          }
                        )}
                        min='1'
                      />
                      <em>
                        <span className='text-danger'>
                          {errors.error_no_days_ago_leave}
                        </span>
                      </em>
                    </div>
                    <div className='form-group'>
                      <label>Number of classes to send reminder</label>
                      <span className='required'>*</span>

                      <input
                        type='number'
                        name='no_classes_send_reminder'
                        value={state.no_classes_send_reminder}
                        onChange={(e) =>
                          setState({
                            ...state,
                            no_classes_send_reminder: e.target.value,
                          })
                        }
                        placeholder='Enter number of classes to send reminder'
                        style={{ height: 'auto' }}
                        className={classnames(
                          { 'form-control input': true },
                          {
                            'is-invalid':
                              errors.error_no_classes_send_reminder.length > 0,
                          }
                        )}
                        min='1'
                      />
                      <em>
                        <span className='text-danger'>
                          {errors.error_no_classes_send_reminder}
                        </span>
                      </em>
                    </div>
                    <div className='w-100 float-left mt-3'>
                      <button className='btn btnColor'>Save</button>
                    </div>
                  </Col>
                </Row>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => ({
  setting: state.setting,
})

export default connect(mapStateToProps, { getSetting, addSetting })(Setting)
