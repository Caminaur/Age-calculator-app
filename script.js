let day = document.getElementById("day");
let month = document.getElementById("month");
let year = document.getElementById("year");
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();
let error = false;
const yearsLabel = document.getElementById("years");
const monthsLabel = document.getElementById("months");
const daysLabel = document.getElementById("days");

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
  const monthValue = parseInt(month.value) - 1; // Meses van de 0 a 11
  const dayValue = parseInt(day.value);

  const date = new Date(0); // 1900 - 01 - 01
  date.setFullYear(yearValue, monthValue, dayValue);

  const isValid =
    date.getFullYear() === yearValue &&
    date.getMonth() === monthValue &&
    date.getDate() === dayValue;

  // console.log("Fecha generada:", date);
  // console.log("Año esperado vs año generado:", yearValue, date.getFullYear());
  // console.log("Mes esperado vs mes generado:", monthValue, date.getMonth());
  // console.log("Día esperado vs día generado:", dayValue, date.getDate());
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
  if (error) return;
  const ageDetails = calculateAge();
  setAgeDetails(ageDetails);
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
  let ageYears = currentYear - year.value;
  let ageMonths = currentMonth - (parseInt(month.value) - 1);
  let ageDays = currentDay - day.value;

  // Adjust for negative months or days
  if (ageMonths < 0) {
    ageMonths += 12;
    ageYears--;
  }
  if (ageDays < 0) {
    // Cuando el día es 0, JavaScript retrocede al último día del mes anterior.
    let lastMonth = new Date(currentYear, currentMonth - 1, 0);

    ageDays += lastMonth.getDate();
    ageMonths--;

    if (ageMonths < 0) {
      ageMonths = 11;
      ageYears--;
    }
  }
  // console.log(`${ageYears} years, ${ageMonths} months, ${ageDays} days`);
  return { years: ageYears, months: ageMonths, days: ageDays };
}

function setAgeDetails(ageDetails) {
  yearsLabel.innerHTML = `${ageDetails.years}`;
  monthsLabel.innerHTML = `${ageDetails.months}`;
  daysLabel.innerHTML = `${ageDetails.days}`;
}
