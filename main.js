// SIMPLE WAY
// First assign variables for each of the form inputs
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error msg code to trigger ibn event listener
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerHTML = message;
};

// Show input success msg code to trigger in event listener
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Enter a valid email address');
  }
};

/* REFACTORED if's AS REUSABLE FUNCTIONS */
function checkRequired(inputArray) {
  /* loop through input array and check each one for validity */
  /* (forEach() is a higher order function that takes in a function) */
  inputArray.forEach(function (input) {
    //console.log(input.value)
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} cannot be over ${max} characters`);
  } else {
    showSuccess(input)
  }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match')
  }
}

// Capitalize first letter of error msg
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Add event listeners for when the form is submitted
form.addEventListener('submit', function (e) {
  e.preventDefault();

  /* pass in array of inputs to check against */
  /* as opposed to having multiple checkRequired functions */
  checkRequired([username, email, password, password2]);

  /* Check length on username and password */
  /* 3 and 15 are the min and max username lengths allowed */
  checkLength(username, 3, 15)
  /* 6 and 25 are the min and max password lengths allowed */
  checkLength(password, 6, 25)

  checkEmail(email);

  checkPasswordsMatch(password, password2);


  /* 
  
  COMMENTING OUT TO REFACTOR AS ABOVE
  
  if (username.value === '') {
    showError(username, 'Username is required');
  } else {
    showSuccess(username);
  }

  if (email.value === '') {
    showError(email, 'Email is required');
  } else if (!isValidEmail(email.value)) {
    showError(email, 'Enter a valid email address');
  } else {
    showSuccess(email);
  }

  if (password.value === '') {
    showError(password, 'Password is required');
  } else {
    showSuccess(password);
  }

  if (password2.value === '') {
    showError(password2, 'Password do not match');
  } else {
    showSuccess(password2);
  }

  */
});