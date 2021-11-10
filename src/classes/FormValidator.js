export class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = Array.from(this.form.elements);
  }

  checkInputValidly = (input, singleField = true) => {
    let valid = true;
    input.setCustomValidity("");
    const validity = input.validity;

    if (input.getAttribute("name") === "name") {
      if (validity.patternMismatch) {
        input.setCustomValidity(
          "Только кириллица, первая заглавная, не меньше двух символов"
        );
        valid = false;
        input.classList.add("input-invalid");
      }
      if (validity.valueMissing) {
        input.setCustomValidity("Это обязательное поле");
        valid = false;
      }
    }

    if (input.getAttribute("name") === "nameEn") {
      if (validity.patternMismatch) {
        input.setCustomValidity(
          "Только латиница, первая заглавная, не меньше двух символов"
        );
        valid = false;
        input.classList.add("input-invalid");
      }
      if (validity.valueMissing) {
        input.setCustomValidity("Это обязательное поле");
        valid = false;
      }
    }

    if (input.getAttribute("name") === "email") {
      if (validity.patternMismatch) {
        input.setCustomValidity("Некорректно введённый адрес почты");
        valid = false;
        input.classList.add("input-invalid");
      }
      if (validity.valueMissing) {
        input.setCustomValidity("Это обязательное поле");
        valid = false;
      }
    }

    if (input.getAttribute("name") === "passportSeries") {
      if (validity.patternMismatch) {
        input.setCustomValidity("Через пробел '12 34'");
        valid = false;
        input.classList.add("input-invalid");
      }
      if (validity.valueMissing) {
        input.setCustomValidity("Это обязательное поле");
        valid = false;
      }
    }

    if (input.getAttribute("name") === "passportNumber") {
      if (validity.patternMismatch) {
        input.setCustomValidity("Шесть цифр");
        valid = false;
        input.classList.add("input-invalid");
      }
      if (validity.valueMissing) {
        input.setCustomValidity("Это обязательное поле");
        valid = false;
      }
    }

    // if (validity.valueMissing) {
    //   input.setCustomValidity("Это обязательное поле");
    //   valid = false;
    //   input.classList.add("input-invalid");
    // }

    if (!singleField) {
      const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
      if (errorElem) {
        errorElem.textContent = input.validationMessage;
      }
    }

    if (valid) {
      input.classList.add("input-valid");
    }
    return valid;
  };

  setSubmitButtonState = (valid) => {
    const button = this.form.querySelector(".button");
    if (valid) {
      button.removeAttribute("disabled");
      button.classList.add("popup__button_valid");
      button.classList.remove("popup__button_invalid");
    } else {
      button.setAttribute("disabled", "disabled");
      button.classList.remove("popup__button_valid");
      button.classList.add("popup__button_invalid");
    }
  };
  setEventListener = () => {
    this.form.addEventListener("focusout", (event) => {
      const [...inputs] = event.currentTarget.elements;
      this.checkInputValidly(event.target, false);
      if (inputs.every(this.checkInputValidly)) {
        this.setSubmitButtonState(true);
      } else {
        this.setSubmitButtonState(false);
      }
    });

    this.form.addEventListener("focusin", (event) => {
      const errorElem = event.target.parentNode.querySelector(
        `#${event.target.id}-error`
      );
      if (errorElem) {
        errorElem.textContent = "";
      }
      event.target.classList.remove("input-invalid");
      event.target.classList.remove("input-valid");
    });
  };
}
