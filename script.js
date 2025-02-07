let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();
let error = false;
console.log({ currentYear, currentDay, currentMonth });

const calcButton = document.getElementById("btn");

function verifyFields() {
  const inputs = [day, month, year];
  error = false;

  for (const input of inputs) {
    if (input.value === "") {
      showError(input, "This field is required");
      error = true;
    }
  }
  if (day.value > 31) {
    showError(day, "Must be a valid Day");
    error = true;
  }
  if (month.value > 12) {
    showError(month, "Must be a valid month");
    error = true;
  }
  if (year.value > currentYear) {
    showError(year, "Must be in the past");
    error = true;
  }

  return true;
}

function isDateValid() {
  if (!verifyFields()) return;

  const yearValue = parseInt(year.value);
  const monthValue = parseInt(month.value); // Meses van de 0 a 11
  const dayValue = parseInt(day.value);

  const date = new Date(yearValue, monthValue, dayValue);

  const isValid =
    date.getFullYear() === yearValue &&
    date.getMonth() === monthValue &&
    date.getDate() === dayValue;

  // console.log("Fecha generada:", date);
  // console.log("Mes esperado vs mes generado:", monthValue, date.getMonth());
  // console.log("Es fecha válida:", isValid);

  return isValid;
}

[day, month, year].forEach((input) => {
  input.addEventListener("blur", () => removeError(input));
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  // Verificamos los campos con las reglas correspondientes
  verifyFields();

  // Verificamos que sea una fecha valida, para evitar fechas imposibles
  if (!isDateValid()) {
    showError(day, "Must be a valid date");
    error = true;
  } else {
    removeError(day);
  }

  calculateAge();
});

function showError(input, message) {
  dateDiv = input.parentElement.parentElement;
  if (dateDiv.querySelector("p") !== null) {
    dateDiv.querySelector("p").remove();
  }
  let errorP = document.createElement("p");
  errorP.innerHTML = message;
  errorP.style.color = "red";
  dateDiv.appendChild(errorP);
}

function removeError(input) {
  dateDiv = input.parentElement.parentElement;
  if (dateDiv.querySelector("p") !== null) {
    dateDiv.querySelector("p").remove();
  }
  return;
}

function calculateAge() {
  // Calculate the age in years
  let ageYears = currentYear - year.value;
  let ageMonths = currentMonth - parseInt(month.value) - 1;
  let ageDays = currentDay - day.value;
  console.log(parseInt(month.value) - 1);
  console.log(currentMonth);

  // Adjust for negative months or days
  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }
  if (ageDays < 0) {
    let lastMonth = new Date(currentYear, currentMonth - 1, 0);
    ageDays += lastMonth.getDate();
    ageMonths--;
  }

  console.log(`${ageYears} years, ${ageMonths} months, ${ageDays} days`);
  return { years: ageYears, months: ageMonths, days: ageDays };
}

// Posible problema
// Que pasa si resto al mes 1 el mes 0, no se percibe ningun cambio, pero si resto al mes 0 el mes 1, el resultado es -1, lo cual no es lo esperado, por lo que se debe ajustar el código para que el mes 0 sea diciembre y el mes 11 sea noviembre.
