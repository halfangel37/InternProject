const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const SPACE_REGEX = /[ ]/;

const email = (message) => (value) => {
  return EMAIL_REGEX.test(value) || message;
};

const required = (message) => (value) => {
  return (value && value.length > 0) || message;
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
export default {
  email,
  required,
  min,
  space,
  maxLength,
  mustMatch,
  mustNotMatch,
};
