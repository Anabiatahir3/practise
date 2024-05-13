export function isEmail(value) {
  return value.includes("@");
}
export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function isEqualsToAnotherValue(value, othervalue) {
  return value === othervalue;
}
