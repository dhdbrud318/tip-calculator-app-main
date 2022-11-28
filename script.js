const form = document.querySelector(".main");
const billInput = document.querySelector("#bill");
const percentInput = document.querySelectorAll("input[name='tip_percent']");
const partyInput = document.querySelector("#percent");

const tipAmount = document.querySelector("#tip_amount");
const total = document.querySelector("#total");

class TipCalculator {
  constructor(bill = 0, tipPercent = 0, size = 0) {
    this.bill = bill;
    this.tipPercent = tipPercent;
    this.size = size;
  }

  clac() {
    console.log(((this.bill * this.tipPercent) / this.size).toFixed(2));
  }

  clear() {
    this.bill = 0;
    this.tipPercent = 0;
    this.size = 0;
  }

  get total() {
    if (this.size === 0) return;
    return ((this.bill * this.tipPercent) / this.size).toFixed(2);
  }
}

const data = new TipCalculator(100, 0, 5);

billInput.addEventListener("keyup", () => {
  data.bill = parseInt(billInput.value);

  console.log(billInput.value);
});

percentInput.forEach((percent) => {
  percent.addEventListener("click", () => {
    data.tipPercent = parseInt(percent.value) / 100;
    console.log(data.total);
  });

  percent.addEventListener("keyup", () => {
    console.log(percent.value);
  });
});

partyInput.addEventListener("keyup", () => {
  const temp = partyInput.value;
  if (!temp) {
    partyInput.classList.add("warning");
  } else {
    partyInput.classList.remove("warning");
    console.log(temp);
  }

  //   else partyInput.classList.remove("warning");
});

form.addEventListener("onreset", () => {
  data.clear();
  partyInput.value = "";
  tipAmount.value = "";
  total.value = "";
  billInput.value = "";
  percentInput.forEach((opt) => {
    // if (opt.type ==='button') opt.
  });
});
