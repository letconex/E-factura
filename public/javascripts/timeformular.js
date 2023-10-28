const buttonsalute = document.querySelector('#salut');
buttonsalute.addEventListener('click', (event) => {
  const name = document.querySelector('#name').value;
  greeting.innerHTML = `Salut, ${name}!`;
  greeting.style.visibility = 'visible';
});

const nameInput = document.querySelector('#name');
const timeoutgreeting = document.querySelector('#timeoutgreeting');
let timeoutwait = 2000;
nameInput.addEventListener('input', () => {
  clearTimeout(timeoutwait);
  timeout = setTimeout(() => {
    const name = nameInput.value;
    timeoutgreeting.innerHTML = `Salut după ${timeoutwait/1000} secunde, ${name}!`;
    timeoutgreeting.style.visibility = 'visible';
  }, timeoutwait);
});

function refreshTime() {
        const timeDisplay = document.getElementById("time");
        const dateString = new Date().toLocaleString('ro-RO', {dateStyle: "short", timeStyle: "long"});
        const formattedString = dateString.replace(", ", " - ").replace("la", " - ");
        timeDisplay.textContent = formattedString;
    }
    setInterval(refreshTime, 1000);

function calculateAge(birthDate) {
  // Get the birth date from the input
  const birthDatenew = new Date(birthDate);
  // Get the current date
  const currentDate = new Date();
  // Calculate the difference between the two dates in years
  const age = currentDate.getFullYear() - birthDatenew.getFullYear();
  // Return the age
  const month = currentDate.getMonth() - birthDatenew.getMonth();
  // if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {age--;}
  document.querySelector('#showage').innerHTML = `Ai <b>${age}</b> ani și <b>${month}</b> luni!`;
    document.querySelector('#showage').innerHTML = `Ai <b>${age}</b> ani`;
  // return age;
}
// // Get the input element
// const birthDateInput = document.querySelector('input[type="date"]');
// console.log(birthDateInput)
// // Get the value of the input element
// const valuebirthDate = birthDateInput.value;
// console.log(valuebirthDate)
// // Calculate the age
// const outage = calculateAge(valuebirthDate);
// // Display the age
// console.log(outage);

// document.querySelector('#showage').innerHTML = calculateAge(valuebirthDate)