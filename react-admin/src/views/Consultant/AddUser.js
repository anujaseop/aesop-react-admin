import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import LaddaButton, { ZOOM_OUT } from "react-ladda";
import "ladda/dist/ladda-themeless.min.css";
import classnames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import {
  addNewUser,
  updateUserDetails,
  getUserDetailsById,
} from "../../actions/userActions";
import {
  checkEmptyValidation,
  checkEmailValidation,
} from "../../Helpers/Validation";
import { useParams } from "react-router";

const AddUser = (props) => {
  const { _id } = useParams();
  const { addNewUser, updateUserDetails, getUserDetailsById } = props;

  const [saveLoading, setSaveLoading] = useState(false);
  const [photoLogoError, setPhotoLogoError] = useState("");
  const [logoPreview, setlogoPreview] = useState("");
  const [logoUrl, setlogoUrl] = useState("");

  const [photoError, setPhotoError] = useState("");
  const [imagePreview, setPreview] = useState("");
  const [imagePreviewUrl, setUrl] = useState("");

  const [state, setstate] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    about_us: "",
    facebook: "",
    twitter: "",
    instagram: "",
    linkdin: "",
    youtube: "",
  });

  const [errors, seterrors] = useState({
    error_first_name: "",
    error_last_name: "",
    error_email: "",
    error_password: "",
    error_address: "",
    error_about_us: "",
    error_facebook: "",
    error_twitter: "",
    error_instagram: "",
    error_linkdin: "",
    error_youtube: "",
  });

  useEffect(() => {
    if (_id) {
      getUserDetailsById(_id).then((res) => {
        let response = res.data.result;
        setstate({
          ...state,
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          address: response.address,
          about_us: response.about_us,
          facebook: response.facebook,
          twitter: response.twitter,
          instagram: response.instagram,
          linkdin: response.linkdin,
          youtube: response.youtube,
        });
        setlogoPreview(response.logo);
        setlogoUrl(response.logo);
        setPreview(response.banner);
        setUrl(response.banner);
      });
    }
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files.length) {
      let file = e.target.files[0];
      setUrl(file);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLogoChange = (e) => {
    e.preventDefault();
    if (e.target.files.length) {
      let file = e.target.files[0];
      setlogoUrl(file);
      setlogoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleInputChange = (e) => {
    setstate({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      password,
      address,
      about_us,
      facebook,
      twitter,
      instagram,
      linkdin,
      youtube,
    } = state;
    let validationFlag = true;
    let errFirstName = "";
    let errLastName = "";
    let errEmail = "";
    let errAddress = "";
    let errPassword = "";
    let errAboutUs = "";
    let errFaceBook = "";
    let errTwitter = "";
    let errLinkdin = "";
    let errYoutube = "";
    let errInstagram = "";
    let errImage = "";
    let errLogo = "";
    errFirstName = checkEmptyValidation(first_name, "First Name");
    errLastName = checkEmptyValidation(last_name, "Last Name");
    errEmail = checkEmailValidation(email, "Email");
    errAddress = checkEmptyValidation(address, "Address");
    if (!_id) {
      errPassword = checkEmptyValidation(password, "Password");
    }
    errAboutUs = checkEmptyValidation(about_us, "About Us");
    errFaceBook = checkEmptyValidation(facebook, "Facebook");
    errTwitter = checkEmptyValidation(twitter, "Twitter");
    errLinkdin = checkEmptyValidation(linkdin, "Linkdin");
    errInstagram = checkEmptyValidation(instagram, "Instagram");
    errYoutube = checkEmptyValidation(youtube, "Youtube");
    errImage = checkEmptyValidation(imagePreviewUrl, "Banner Image");
    errLogo = checkEmptyValidation(logoUrl, "Logo");
    if (
      errFirstName ||
      errLastName ||
      errEmail ||
      errAddress ||
      errPassword ||
      errAboutUs ||
      errFaceBook ||
      errTwitter ||
      errLinkdin ||
      errInstagram ||
      errYoutube ||
      errImage ||
      errLogo
    ) {
      validationFlag = false;
      seterrors({
        error_first_name: errFirstName,
        error_last_name: errLastName,
        error_email: errEmail,
        error_password: errPassword,
        error_address: errAddress,
        error_about_us: errAboutUs,
        error_facebook: errFaceBook,
        error_twitter: errTwitter,
        error_instagram: errInstagram,
        error_linkdin: errLinkdin,
        error_youtube: errYoutube,
      });
      setPhotoError(errImage);
      setPhotoLogoError(errLogo);
    } else {
      validationFlag = true;
      seterrors({
        error_first_name: "",
        error_last_name: "",
        error_email: "",
        error_password: "",
        error_address: "",
        error_about_us: "",
        error_facebook: "",
        error_twitter: "",
        error_instagram: "",
        error_linkdin: "",
        error_youtube: "",
      });
      setPhotoError("");
      setPhotoLogoError("");
    }
    if (validationFlag === true) {
      setSaveLoading(true);
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("about_us", about_us);
      formData.append("facebook", facebook);
      formData.append("twitter", twitter);
      formData.append("instagram", instagram);
      formData.append("linkdin", linkdin);
      formData.append("youtube", youtube);
      formData.append("banner", imagePreviewUrl);
      formData.append("logo", logoUrl);
      if (_id) {
        updateUserDetails(_id, formData)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setTimeout(() => {
              props.history.push(`/user`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      } else {
        addNewUser(formData)
          .then((res) => {
            setSaveLoading(false);
            toast.success(res.data.message);
            setTimeout(() => {
              props.history.push(`/user`);
            }, 1300);
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    }
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader>
              <i className="fas fa-user"></i>
              <strong>{_id ? "Edit User" : "Add User"}</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <Col md="12">
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label>First Name</Label>
                        <span className="required">*</span>
                        <input
                          type="text"
                          name="first_name"
                          placeholder="Enter First Name"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.first_name || ""}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_first_name.length > 0,
                            },
                            {
                              valid: errors.error_first_name.length === 0,
                            }
                          )}
                        />
                        {errors.error_first_name && (
                          <span className="invalid-text ">
                            {errors.error_first_name}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Last Name</Label>
                        <span className="required">*</span>
                        <input
                          type="text"
                          name="last_name"
                          placeholder="Enter Last Name"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.last_name || ""}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_last_name.length > 0,
                            },
                            {
                              valid: errors.error_last_name.length === 0,
                            }
                          )}
                        />
                        {errors.error_last_name && (
                          <span className="invalid-text ">
                            {errors.error_last_name}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Email</Label>
                        <span className="required">*</span>
                        <input
                          type="text"
                          name="email"
                          placeholder="Enter Email"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.email || ""}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_email.length > 0,
                            },
                            {
                              valid: errors.error_email.length === 0,
                            }
                          )}
                        />
                        {errors.error_email && (
                          <span className="invalid-text ">
                            {errors.error_email}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Password</Label>
                        <span className="required">*</span>
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter Password"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.password || ""}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_password.length > 0,
                            },
                            {
                              valid: errors.error_password.length === 0,
                            }
                          )}
                        />
                        {errors.error_password && (
                          <span className="invalid-text ">
                            {errors.error_password}
                          </span>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label>Banner</Label>
                        <span className="required">*</span>
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          capture="camera"
                          onChange={(e) => {
                            handleFileChange(e);
                          }}
                          style={{ height: "auto" }}
                          className={classnames(
                            "form-control py-1 my-0 image-picker-input",
                            {
                              invalid: photoError.length > 0,
                            },
                            {
                              valid: photoError.length === 0,
                            }
                          )}
                        />
                        {photoError.length > 0 && (
                          <div className="w-100">
                            <span className="invalid-text ">{photoError}</span>
                          </div>
                        )}
                        {imagePreview !== "" && (
                          <img
                            src={imagePreview}
                            className="border-rounded"
                            alt=""
                            style={{
                              width: "400px",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Logo</Label>
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          capture="camera"
                          onChange={(e) => {
                            handleLogoChange(e);
                          }}
                          style={{ height: "auto" }}
                          className={classnames(
                            "form-control py-1 my-0 image-picker-input",
                            {
                              invalid: photoLogoError.length > 0,
                            },
                            {
                              valid: photoLogoError.length === 0,
                            }
                          )}
                        />
                        {photoLogoError.length > 0 && (
                          <div className="w-100">
                            <span className="invalid-text ">
                              {photoLogoError}
                            </span>
                          </div>
                        )}
                        {logoPreview !== "" && (
                          <img
                            src={logoPreview}
                            className="border-rounded"
                            alt=""
                            style={{
                              width: "200px",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <Label>Address</Label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Enter Address"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.address || ""}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_address.length > 0,
                            },
                            {
                              valid: errors.error_address.length === 0,
                            }
                          )}
                        />
                        {errors.error_address && (
                          <span className="invalid-text ">
                            {errors.error_address}
                          </span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>About</Label>
                        <input
                          type="text"
                          name="about_us"
                          placeholder="Enter About us"
                          onChange={(e) => handleInputChange(e)}
                          style={{ height: "auto" }}
                          value={state.about_us || ""}
                          className={classnames(
                            "form-control input",
                            {
                              invalid: errors.error_about_us.length > 0,
                            },
                            {
                              valid: errors.error_about_us.length === 0,
                            }
                          )}
                        />
                        {errors.error_about_us && (
                          <span className="invalid-text ">
                            {errors.error_about_us}
                          </span>
                        )}
                      </FormGroup>
                    </Col>

                    <Col md="12">
                      <fieldset className="scheduler-border">
                        <legend className="scheduler-border">Social:</legend>
                        <Row>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Facebook</Label>
                              <input
                                type="url"
                                name="facebook"
                                placeholder="Enter Facebook"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.facebook || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_facebook.length > 0,
                                  },
                                  {
                                    valid: errors.error_facebook.length === 0,
                                  }
                                )}
                              />
                              {errors.error_facebook && (
                                <span className="invalid-text ">
                                  {errors.error_facebook}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Instagram</Label>
                              <input
                                type="url"
                                name="instagram"
                                placeholder="Enter Instagram Url"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.instagram || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_instagram.length > 0,
                                  },
                                  {
                                    valid: errors.error_instagram.length === 0,
                                  }
                                )}
                              />
                              {errors.error_instagram && (
                                <span className="invalid-text ">
                                  {errors.error_instagram}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Twitter</Label>
                              <input
                                type="url"
                                name="twitter"
                                placeholder="Enter Twitter Url"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.twitter || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_twitter.length > 0,
                                  },
                                  {
                                    valid: errors.error_twitter.length === 0,
                                  }
                                )}
                              />
                              {errors.error_twitter && (
                                <span className="invalid-text ">
                                  {errors.error_twitter}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Linkdin</Label>
                              <input
                                type="url"
                                name="linkdin"
                                placeholder="Enter Linkdin Url"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.linkdin || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_linkdin.length > 0,
                                  },
                                  {
                                    valid: errors.error_linkdin.length === 0,
                                  }
                                )}
                              />
                              {errors.error_linkdin && (
                                <span className="invalid-text ">
                                  {errors.error_linkdin}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                          <Col md={6}>
                            <FormGroup>
                              <Label>Youtube</Label>
                              <input
                                type="url"
                                name="youtube"
                                placeholder="Enter Youtube Url"
                                onChange={(e) => handleInputChange(e)}
                                style={{ height: "auto" }}
                                value={state.youtube || ""}
                                className={classnames(
                                  "form-control input",
                                  {
                                    invalid: errors.error_youtube.length > 0,
                                  },
                                  {
                                    valid: errors.error_youtube.length === 0,
                                  }
                                )}
                              />
                              {errors.error_youtube && (
                                <span className="invalid-text">
                                  {errors.error_youtube}
                                </span>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                      </fieldset>
                    </Col>
                  </Row>
                </Col>
                <Col md="2">
                  <LaddaButton
                    className="btn btnColor btn-brand w-100  btn-ladda"
                    loading={saveLoading}
                    data-color="blue"
                    data-style={ZOOM_OUT}
                    onClick={(e) => onSubmitForm(e)}
                  >
                    {_id ? "Update" : "Save"}
                  </LaddaButton>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {
  addNewUser,
  updateUserDetails,
  getUserDetailsById,
})(AddUser);
