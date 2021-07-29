const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SPACE_REGEX = /[ ]/;

const IMAGE_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
const email = (message) => (value) => {
  return EMAIL_REGEX.test(value) || message;
};

const required = (message) => (value) => {
  return (value && value.length > 0) || Number.isInteger(value) || message;
};
const requiredPositiveNumber = (message) => (value) => {
  return (value && value > 0) || message;
};
const min = (message, minimum) => (value) => {
  return (value && value.length > minimum - 1) || message;
};
const space = (message) => (value) => {
  return !SPACE_REGEX.test(value) || message;
};

const maxLength = (message, maximum) => (value) => {
  return (value && value.length < maximum + 1) || message;
};

const mustMatch = (errorMessage, matchTo) => (value) => {
  const password = typeof matchTo === "function" ? matchTo() : matchTo;
  return value === password || errorMessage;
};
const mustNotMatch = (errorMessage, notMatchTo) => (value) => {
  const notMatchValue =
    typeof notMatchTo === "function" ? notMatchTo() : notMatchTo;
  return value !== notMatchValue || errorMessage;
};

const mustBeImage = (message) => (value) => {
  const imageName = value.name;
  return IMAGE_REGEX.test(imageName) || message;
};

const mustNotExistTwice = (errorMessage, notExistTwice) => (value) => {
  const notExistTwiceValue =
    typeof notExistTwice === "function" ? notExistTwice() : notExistTwice;
  const filteredValues = notExistTwiceValue.filter((item) => item === value);

  return filteredValues.length < 2 || errorMessage;
};

const NUMBER_REGEX = /^[0-9]+$/;
const number = (message) => (value) => {
  return NUMBER_REGEX.test(value) || message;
};

export default {
  email,
  required,
  min,
  space,
  maxLength,
  mustMatch,
  mustNotMatch,
  mustBeImage,
  mustNotExistTwice,
  requiredPositiveNumber,
  number,
};
