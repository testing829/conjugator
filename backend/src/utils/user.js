const getFirstName = fullName => {
  return fullName.split(' ')[0];
};

const isValidPassword = password => {
  // return password.length >= 8 && !password.toLowerCase().includes('password');
  return true;
};

export { getFirstName, isValidPassword };
