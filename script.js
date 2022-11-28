const billInput = document.querySelector("#bill");
const percentInput = document.querySelectorAll("input[name='tip_percent']");
const partyInput = document.querySelector("#percent");

const resetBtn = document.querySelector("#reset");
const [invalidBill, invalidParty] = document.querySelectorAll(".input-warning");

const tipAmount = document.querySelector("#tip_amount");
const total = document.querySelector("#total");

class TipCalculator {
  constructor(bill = 0, tipPercent = 0, size = 0) {
    this.bill = bill;
    this.tipPercent = tipPercent;
    this.size = size;
  }

  clear() {
    this.bill = 0;
    this.size = 0;
  }

  get tip() {
    if (this.size === 0) return;
    return ((this.bill * this.tipPercent) / this.size).toFixed(2);
  }

  get total() {
    if (this.size === 0) return;
    return ((this.bill * this.tipPercent + this.bill) / this.size).toFixed(2);
  }

  get tipPercent() {
    return this._tipPercent;
  }

  set tipPercent(val) {
    this._tipPercent = val / 100;
  }
}

const data = new TipCalculator();
let prevTipIndex;

billInput.addEventListener("keyup", () => {
  const temp = parseInt(billInput.value);
  console.log(temp);
  if (!temp) {
    billInput.classList.add("warning");
    invalidBill.classList.remove("invisible");
  } else {
    billInput.classList.remove("warning");
    invalidBill.classList.add("invisible");
    data.bill = temp;
    updateDisplay();
  }
});

percentInput.forEach((percent, index) => {
  percent.addEventListener("click", () => {
    if (prevTipIndex)
      percentInput[prevTipIndex].classList.remove("btn--active");
    prevTipIndex = index;

    if (index < 5) percent.classList.add("btn--active");
    data.tipPercent = parseInt(percent.value) ? parseInt(percent.value) : 0;
    console.log(data.tipPercent);
    updateDisplay();
  });
});

partyInput.addEventListener("keyup", () => {
  const temp = parseInt(partyInput.value);
  if (!temp) {
    partyInput.classList.add("warning");
    invalidParty.classList.remove("invisible");
  } else {
    partyInput.classList.remove("warning");
    invalidParty.classList.add("invisible");
  }
  data.size = temp ? temp : 0;
  updateDisplay();
});

resetBtn.addEventListener("click", () => {
  data.clear();
  tipAmount.innerHTML = Number(0).toFixed(2);
  total.innerHTML = Number(0).toFixed(2);
  partyInput.value = "";
  billInput.value = "";
  percentInput[prevTipIndex].classList.remove("btn--active");
  prevTipIndex = undefined;
  invalidParty.classList.add("invisible");
  partyInput.classList.remove("warning");
  invalidBill.classList.add("invisible");
  billInput.classList.remove("warning");
});

function updateDisplay() {
  if (!data.tip || !data.total) return;
  tipAmount.innerHTML = data.tip;
  total.innerHTML = data.total;
}
