const validateName = () => {
  const nameEl = document.getElementById('name');
  const re = /^[a-zA-Z]{2,15}$/;

  if (!re.test(nameEl.value)) {
    nameEl.classList.add('is-invalid');
  } else {
    nameEl.classList.remove('is-invalid');
  }
};

const validateZip = () => {
  const zipEl = document.getElementById('zip');
  // 5 digits required. optional dash and 4 digits follow
  const re = /^[0-9]{5}(-[0-9]{4})?$/;

  if (!re.test(zipEl.value)) {
    zipEl.classList.add('is-invalid');
  } else {
    zipEl.classList.remove('is-invalid');
  }
};

const validateEmail = () => {
  const emailEl = document.getElementById('email');
  // Don't need to escape dash when its first/last in char set
  const re = /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-z]{2,5})$/;

  if (!re.test(emailEl.value)) {
    emailEl.classList.add('is-invalid');
  } else {
    emailEl.classList.remove('is-invalid');
  }
};

const validatePhone = () => {
  const phoneEl = document.getElementById('phone');
  // Support multiple number entry formats
  const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

  if (!re.test(phoneEl.value)) {
    phoneEl.classList.add('is-invalid');
  } else {
    phoneEl.classList.remove('is-invalid');
  }
};

// Form blur event listeners
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zip').addEventListener('blur', validateZip);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
