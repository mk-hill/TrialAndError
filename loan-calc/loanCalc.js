// Show error if number is not finite
const clearError = () => {
  document.querySelector('.alert').remove();
};

const showError = (error) => {
  // Prevent results from showing up if there is an error
  document.getElementById('results').style.display = 'none';
  document.getElementById('loading').style.display = 'none';
  const errorDiv = document.createElement('div');
  // Add classes for bootstrap
  errorDiv.className = 'alert alert-danger';
  // Get parent and sibling for insertion
  const cardEl = document.querySelector('.card');
  const headingEl = document.querySelector('.heading');

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // Insert error in card above heading
  cardEl.insertBefore(errorDiv, headingEl);

  // clear error after 2 seconds
  setTimeout(clearError, 2000);

  // ? Separate function cleaner ?
  // setTimeout(() => {
  //   document.querySelector('.alert').remove();
  // }, 2000);
};

const calculateResults = () => {
  // Declare UI element variables
  const amountEl = document.getElementById('amount');
  const interestEl = document.getElementById('interest');
  const yearsEl = document.getElementById('years');
  const monthlyPaymentEl = document.getElementById('monthly-payment');
  const totalPaymentEl = document.getElementById('total-payment');
  const totalInterestEl = document.getElementById('total-interest');

  // Declare values
  const principal = parseFloat(amountEl.value);
  const calculatedInterest = parseFloat(interestEl.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsEl.value) * 12;

  // Calculate monthly payment
  const x = (1 + calculatedInterest) ** calculatedPayments;
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (Number.isFinite(monthly)) {
    monthlyPaymentEl.value = monthly.toFixed(2);
    totalPaymentEl.value = (monthly * calculatedPayments).toFixed(2);
    totalInterestEl.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    // Show results and hide loader
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please check your numbers.');
  }
};

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', (e) => {
  // Ensure results remain hidden with multiple clicks
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 1000);
  e.preventDefault();
});
