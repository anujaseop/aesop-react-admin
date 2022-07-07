export const checkRequiredValidationWithMinMax = (
  text,
  field,
  min,
  max,
  required = true
) => {
  let error = "";
  if (required === true) {
    if (text === "") {
      return (error = `${field} field is required`);
    }
  }
  if (text.length < min) {
    error = `${field} must be greater then ` + min + " characters";
  }
  if (text.length > max) {
    error = `${field} field must be less then ` + max + " characters";
  }
  return error;
};

export const validURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  let error = "";
  const isValid = !!pattern.test(str);
  if (!isValid) {
    error = "Please enter a valid URL";
  }

  return error;
};
export const checkEmailValidation = (emailText, name, required = true) => {
  let error = "";

  if (required === true) {
    if (emailText === "") {
      return (error = `${name} field is required`);
    }
  }

  const pattern =
    /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-z0-9]+([a-z0-9]+)*(\.[a-z0-9]+([a-z0-9]+)*)*\.[a-z]{2,4}$/;
  if (pattern.test(emailText)) {
    return "";
  } else {
    error = "Enter a valid email: " + emailText;
  }
  return error;
};

export const checkMultipleChekboxSelectionWithMinMax = (
  array,
  min = 0,
  max = 10000000
) => {
  let ids = [];
  array.forEach((element, index) => {
    if (element === true) {
      ids.push(index);
    }
  });
  let response = {};
  response.error = "";
  response.data = ids;
  if (ids.length < min) {
    response.error = "Minimum " + min + " item selections is required";
  }

  if (ids.length > max) {
    response.error = "Maximum item selections is " + min;
  }
  return response;
};

export const checkEmptyValidation = (field, text) => {
  let error = "";
  if (field === "" || field === undefined || field === null) {
    error = `${text} field is required`;
  }
  return error;
};

export const isUrlValid = (emailText, name, required = true) => {
  let error = "";
  if (required === true) {
    if (emailText === "") {
      return (error = `${name} field is required`);
    }
  }
  const pattern =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if (pattern.test(emailText)) {
    return "";
  } else {
    error = "Enter a valid Url: " + emailText;
  }
  return error;
};

export const checkMobileNumberValidation = (
  field,
  text,
  min,
  max,
  minNumber = false
) => {
  let error = "";
  if (field === "" || field === undefined || field === null) {
    return (error = `${text} field is required`);
  }
  let field1 = parseInt(field);
  if (!Number.isInteger(field1)) {
    return (error = `${text} field must be a number`);
  }
  if (field.length < min) {
    return (error = `${text} must be greater then ` + min + " digit");
  }
  if (field.length > max) {
    return (error = `${text} field must be less then ` + max + " digit");
  }
  if (minNumber && field <= 0) {
    return (error = `${text} field must be greater then 1`);
  }
  return error;
};
