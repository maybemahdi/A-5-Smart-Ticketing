// scroll to view function for buy-btn button
document.getElementById("buy-btn").addEventListener("click", function (e) {
  e.preventDefault();
  let href = this.getAttribute("href");
  document.querySelector(href).scrollIntoView({
    behavior: "smooth",
  });
});

// max seat
let maxSeat = 5;

// seat selection function

//disable button-apply
let applyButton = document.getElementById("apply-btn");
applyButton.disabled = true;

let nextButton = document.getElementById("next-btn");
nextButton.disabled = true;

//   validate phone number and ticket for enable the next button
const phoneInput = document.getElementById("phone-input");
const phoneNumber = phoneInput.value.trim();
const phoneRegex = /^\d+$/;

// click event
let seats = document.querySelectorAll(".seat");
let count = 1;
let totalPrice = 0;
for (let i = 0; i < seats.length; i++) {
  let seat = seats[i];
  seat.addEventListener("click", function () {
    if (!this.classList.contains("selected")) {
      let ticketName = this.innerText;
      this.classList.add("selected");
      this.style.backgroundColor = "#1DD100";
      let seatElement = document.getElementById("number-of-seat");
      seatElement.classList.remove("hidden");
      seatElement.innerText = count;
      count++;

      //show selected ticket
      let tBody = document.getElementById("tbody");
      let tr = document.createElement("tr");
      tr.classList.add(
        "transition-colors",
        "hover:bg-muted/50",
        "[&amp;:has([role=checkbox])]:pr-0"
      );

      let td = document.createElement("td");
      td.classList.add(
        "p-4",
        "align-middle",
        "[&amp;:has([role=checkbox])]:pr-0"
      );
      td.innerText = ticketName;
      tr.appendChild(td);

      let td2 = document.createElement("td");
      td2.classList.add(
        "p-4",
        "align-middle",
        "[&amp;:has([role=checkbox])]:pr-0"
      );
      td2.innerText = "Economy";
      tr.appendChild(td2);

      let td3 = document.createElement("td");
      td3.classList.add(
        "p-4",
        "align-middle",
        "[&amp;:has([role=checkbox])]:pr-0"
      );
      let price = "550";
      td3.innerText = parseInt(price);
      tr.appendChild(td3);

      tBody.appendChild(tr);

      //show total price
      let totalPriceShowElement = document.getElementById("total-price");
      let totalPriceText = parseInt(
        totalPriceShowElement.innerText.split(" ")[1]
      );
      totalPrice += parseInt(td3.innerText);
      totalPriceText = totalPrice;
      totalPriceShowElement.innerText = "BDT " + totalPrice;

      //   validate phone number
      phoneInput.addEventListener("input", function () {
        const phoneNumber = phoneInput.value.trim();
        if (phoneRegex.test(phoneNumber)) {
          nextButton.disabled = false;
        } else {
          nextButton.disabled = true;
        }
      });

      // coupon validation
      if (count === maxSeat) {
        applyButton.disabled = false;
        disableAllSeats();
      }
    }
  });
}

// Function to disable all seats after a certain number
function disableAllSeats() {
  for (let i = 0; i < seats.length; i++) {
    seats[i].classList.add("disabled");
  }
}
