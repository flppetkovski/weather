const btn = document.getElementById("btn");
const input = document.getElementById("input");
const form = document.getElementById("form1");
let value;
const place = document.getElementById("location");
const forecast = document.getElementById("forecast");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  value = input.value;
  input.value = "";

  place.textContent = "Loading...";

  fetch("/weather?address=" + value).then(response => {
    response.json().then(data => {
      if (data.error) {
        place.textContent = "";
        forecast.textContent = "Please Provide Valid City";
        setTimeout(() => {
          forecast.textContent = "";
        }, 2000);
      } else {
        place.textContent = data.location;
        forecast.textContent = data.forecast;
      }
    });
  });
});
