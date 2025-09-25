const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equalsBtn = document.getElementById("equals");
const clearBtn = document.getElementById("clear");

let currentInput = "";

// Handle number & operator button clicks
buttons.forEach(button => {
  const value = button.getAttribute("data-value");

  if (value) {
    button.addEventListener("click", () => {
      if (display.value === "0" || display.value === "Error") {
        currentInput = value;
      } else {
        currentInput += value;
      }
      display.value = currentInput;
    });
  }
});

// Handle equals (=)
equalsBtn.addEventListener("click", () => {
  try {
    currentInput = eval(currentInput).toString();
    display.value = currentInput;
  } catch {
    display.value = "Error";
    currentInput = "";
  }
});

// Handle clear (C)
clearBtn.addEventListener("click", () => {
  currentInput = "";
  display.value = "0";
});
