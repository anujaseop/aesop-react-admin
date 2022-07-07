import React, { Component } from "react";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import PropTypes from "prop-types";
import classnames from "classnames";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { editSetting, getSetting } from "../../../actions/settingAction";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import "ladda/dist/ladda-themeless.min.css";

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingId: null,
      privacypolicy: "",
      updateLoading: false,
      errors: {
        error_privacypolicy: "",
      },
    };
    this.modules = {
      toolbar: [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"], // remove formatting button
      ],
    };
  }
  componentDidMount() {
    this.props.getSetting();
    setTimeout(() => {
      const { getSettings, loading } = this.props.setting;

      if (getSettings !== null && !loading) {
        this.setState({
          settingId: getSettings._id,
          privacypolicy: getSettings.privacypolicy,
        });
      }
    }, 1000);
  }

  onSubmitForm = (e, id) => {
    e.preventDefault();

    let { privacypolicy, errors, settingId } = this.state;
    let validationFlag = true;
    let error;
    for (var key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (key) {
          errors[key] = "";
        }
      }
    }
    if (
      privacypolicy === "<p><br></p>" ||
      privacypolicy.length === 0 ||
      privacypolicy === '<p class="ql-align-justify"><br></p>'
    ) {
      error = "Privacy Policy Fields is required";
      if (error) {
        validationFlag = false;
        errors.error_privacypolicy = error;
      }
    }

    if (validationFlag) {
      this.setState({
        updateLoading: true,
      });
      const data = {
        privacypolicy,
      };

      this.props
        .editSetting(settingId, data)
        .then((res) => {
          this.setState({
            updateLoading: false,
          });
          toast.success(res.data.message);
          this.props.getSetting();
        })
        .catch((err) => {
          this.setState({
            updateLoading: false,
          });
          toast.error(err.response.data.message);
        });
      this.setState({
        errors,
      });
    } else {
      this.setState({
        errors,
      });
    }
  };
  onFieldChange = (privacypolicy) => {
    this.setState({
      privacypolicy,
    });
  };

  render() {
    const containerStyle = {
      zIndex: 1999,
    };
    const { errors, privacypolicy, updateLoading } = this.state;

    return (
      <div className="animated fadeIn">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          style={containerStyle}
        />
        <Row>
          <Col xs="12">
            <Card className="shadow">
              <CardHeader>
                <i class="fas fa-question-circle"></i>
                <strong>Privacy Policy</strong>
              </CardHeader>
              <CardBody>
                <form
                  onSubmit={(e) =>
                    this.onSubmitForm(e, "5f8d7327db37de1ebc614095")
                  }
                >
                  <Row>
                    <Col xs="12">
                      <div className="form-group">
                        <label>Privacy Policy </label>
                        <ReactQuill
                          name="privacypolicy"
                          value={privacypolicy}
                          placeholder="Enter Privacy Policy"
                          onChange={(e) => this.onFieldChange(e)}
                          modules={this.modules}
                          className={classnames({
                            "is-invalid": errors.error_privacypolicy.length > 0,
                          })}
                        />
                        {errors.error_privacypolicy.length > 0 ? (
                          <span className="invalid-feedback d-block">
                            {errors.error_privacypolicy}
                          </span>
                        ) : null}
                      </div>

                      <div className="w-100 float-left mt-3">
                        <LaddaButton
                          className="btn btnColor btn-brand  btn-ladda"
                          loading={updateLoading}
                          data-color="blue"
                          data-style={ZOOM_OUT}
                          onClick={this.onSaveLanguage}
                        >
                          Update
                        </LaddaButton>
                      </div>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

Setting.propTypes = {
  editSetting: PropTypes.func.isRequired,
  getSetting: PropTypes.func.isRequired,
  setting: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  setting: state.setting,
});
export default connect(mapStateToProps, { editSetting, getSetting })(Setting);
