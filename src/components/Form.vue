<template>
  <form class="form" novalidate>
    <h2 class="form__title">Личные данные</h2>
    <div class="form__box">
      <Input
        :requiredToggle="true"
        class="form__input"
        :placeholder="'Фамилия'"
        :type="'text'"
        :nameInput="'name'"
        :regExp="patterns.name"
        @vModel="
          (value) => {
            formData.surname = value;
          }
        "
      />
      <Input
        :requiredToggle="true"
        class="form__input"
        :placeholder="'Имя'"
        :type="'text'"
        :nameInput="'name'"
        :regExp="patterns.name"
        @vModel="
          (value) => {
            formData.name = value;
          }
        "
      />
      <Input
        :requiredToggle="true"
        class="form__input"
        :placeholder="'Отчество'"
        :type="'text'"
        :nameInput="'name'"
        :regExp="patterns.name"
        @vModel="
          (value) => {
            formData.patronymic = value;
          }
        "
      />
    </div>
    <div class="form__box">
      <Input
        :requiredToggle="true"
        class="form__input"
        :placeholder="'Дата рождения'"
        :nameInput="'text'"
        :type="'date'"
        @vModel="
          (value) => {
            formData.dateBirth = value;
          }
        "
      />
    </div>
    <div class="form__box">
      <Input
        :requiredToggle="true"
        class="form__input"
        :placeholder="'E-mail'"
        :type="'email'"
        :nameInput="'email'"
        :regExp="patterns.mail"
        @vModel="
          (value) => {
            formData.mail = value;
          }
        "
      />
    </div>
    <h2 class="form__title">Пол</h2>
    <div class="form__box form__radio-box">
      <Radio
        class="form__input"
        :radioName="'gender'"
        :placeholder="'Мужcкой'"
        :value="'Мужской'"
        @checked="genderRadio"
      />
      <Radio
        class="form__input"
        :radioName="'gender'"
        :placeholder="'Женский'"
        :value="'Женский'"
        @checked="genderRadio"
      />
    </div>
    <h2 class="form__title">Паспортные данные</h2>
    <div class="form__box">
      <InputSearch
        :requiredToggle="true"
        :nameInput="'search'"
        :data="citizen"
        @clicks="logChange"
        :regExp="patterns.notEmpty"
      />
    </div>
    <div v-if="rusPass" class="passport-box">
      <div class="form__box">
        <Input
          :requiredToggle="true"
          class="form__input"
          :placeholder="'Серия'"
          :type="'text'"
          :nameInput="'passportSeries'"
          :regExp="patterns.passportSeries"
          @vModel="
            (value) => {
              formData.passportSeries = value;
            }
          "
        />
        <Input
          :requiredToggle="true"
          class="form__input"
          :placeholder="'Номер'"
          :type="'text'"
          :nameInput="'passportNumber'"
          :regExp="patterns.passportNumber"
          @vModel="
            (value) => {
              formData.passportNumber = value;
            }
          "
        />
        <Input
          :requiredToggle="true"
          class="form__input"
          :placeholder="'Дата выдачи'"
          :nameInput="'date'"
          :type="'date'"
          @vModel="
            (value) => {
              formData.dateRelease = value;
            }
          "
        />
      </div>
    </div>
    <div v-if="otherPass" class="passport-box">
      <div class="form__box">
        <Input
          :requiredToggle="true"
          class="form__input"
          :placeholder="'Фамилия на латинице'"
          :type="'text'"
          :nameInput="'nameEn'"
          :regExp="patterns.nameEn"
          @vModel="
            (value) => {
              formData.surnameEn = value;
            }
          "
        />
        <Input
          :requiredToggle="true"
          class="form__input"
          :placeholder="'Имя на латинице'"
          :type="'text'"
          :nameInput="'nameEn'"
          :regExp="patterns.nameEn"
          @vModel="
            (value) => {
              formData.nameEn = value;
            }
          "
        />
      </div>
      <div class="form__box">
        <Input
          :requiredToggle="true"
          class="form__input"
          :placeholder="'Номер'"
          :type="'text'"
          :nameInput="'passportNumber'"
          :regExp="patterns.passportNumber"
          @vModel="
            (value) => {
              formData.surname = value;
            }
          "
        />
        <Select
          class="form__input"
          :nameInput="'select'"
          :defaultSelect="'Страна выдачи'"
          :requiredToggle="true"
          :data="citizen"
          @selected="countryIssues"
        />
        <Select
          class="form__input"
          :nameInput="'select'"
          :requiredToggle="true"
          :data="passportTypes"
          :defaultSelect="'Тип паспорта'"
          @selected="typePassport"
        />
      </div>
    </div>
    <h2 class="form__title">Меняли ли фамилию или имя?</h2>
    <div class="form__box form__radio-box">
      <Radio
        class="form__input"
        :radioName="'surname'"
        :value="'No'"
        :placeholder="'Нет'"
        @checked="checkedRadio"
      />
      <Radio
        class="form__input"
        :radioName="'surname'"
        :value="'Yes'"
        :placeholder="'Да'"
        @checked="checkedRadio"
      />
    </div>

    <div v-if="changed" class="form__box">
      <Input
        :requiredToggle="true"
        class="form__input"
        :placeholder="'Предыдущая Фамилия'"
        :type="'text'"
        :nameInput="'name'"
        :regExp="patterns.name"
        @vModel="
          (value) => {
            formData.prevSurname = value;
          }
        "
      />
      <Input
        :requiredToggle="true"
        class="form__input"
        :placeholder="'Предыдущee Имя'"
        :type="'text'"
        :nameInput="'name'"
        :regExp="patterns.name"
        @vModel="
          (value) => {
            formData.prevName = value;
          }
        "
      />
    </div>
    <button @click="submit()" type="submit button-dis" class="button">
      Показать в консоли
    </button>
  </form>
</template>

<script>
import Input from "./ui/Input.vue";
import InputSearch from "./ui/InputSearch.vue";
import Radio from "./ui/Radio.vue";
import Select from "./ui/Select.vue";
import citizenships from "../assets/data/citizenships.json";
import passportTypes from "../assets/data/passport-types.json";
import { FormValidator } from "../classes/FormValidator.js";
export default {
  data() {
    return {
      citizen: citizenships,
      passportTypes: passportTypes,
      patterns: {
        name: "^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)*$",
        nameEn: "^[A-Z][a-z]+(-[A-Z][a-z]+)*$",
        mail: "^([\\w\\-\\.]+)@(\\w+([\\-\\.]\\w+)?)\\.([a-zA-Z]{2,5})$",
        passportSeries: "^([0-9]{2}\\s{1}[0-9]{2})?$",
        passportNumber: "^([0-9]{6})?$",
        notEmpty: ".{1,}",
      },
      formData: {
        name: "",
        surname: "",
        patronymic: "",
        dateBirth: "",
        mail: "",
        surnameEn: "",
        nameEn: "",
        passportSeries: "",
        passportNumber: "",
        dateRelease: "",
        prevSurname: "",
        prevName: "",
        citizenship: "",
        changed: "",
        gender: "",
        typePass: "",
        countryIssue: "",
      },
      rusPass: false,
      otherPass: false,
      changed: false,
      password: "",
    };
  },
  components: {
    Input,
    Radio,
    InputSearch,
    Select,
  },
  methods: {
    logChange(value) {
      if (value === "Russia") {
        this.rusPass = true;
        this.otherPass = false;
      } else if (value === "") {
        this.rusPass = false;
        this.otherPass = false;
      } else {
        this.rusPass = false;
        this.otherPass = true;
      }
      this.formData.citizenship = value;
    },
    submit() {
      console.log(`
        Имя: ${this.formData.name}
        Фамилия: ${this.formData.surname}
        Отчество: ${this.formData.patronymic}
        Дата рождения: ${this.formData.dateBirth}
        Почта: ${this.formData.mail}
        Серия паспорта: ${this.formData.passportSeries}
        Номер паспорта: ${this.formData.passportNumber}
        Дата выдачи: ${this.formData.dateRelease}
        Предыдущая Фамилия: ${this.formData.prevSurname}
        Предыдущее Имя: ${this.formData.prevName}
        Гражданство: ${this.formData.citizenship}
        Менял Имя,Фамилию: ${this.formData.changed}
        Пол: ${this.formData.gender}
        Тип паспорта: ${this.formData.typePass}
        Страна выдачи: ${this.formData.countryIssue}
        Фамилия на латинице: ${this.formData.surnameEn}
        Имя на латинице: ${this.formData.nameEn}
      `);
    },
    checkedRadio(value) {
      if (value === "No") {
        this.changed = false;
      } else {
        this.changed = true;
      }
      this.formData.changed = value;
    },
    genderRadio(value) {
      this.formData.gender = value;
    },
    typePassport(value) {
      this.formData.typePass = value;
    },
    countryIssues(value) {
      this.formData.countryIssue = value;
    },
  },
  mounted() {
    console.log(this.password);
    const form = document.querySelector(".form");
    const validatorFormCard = new FormValidator(form);
    validatorFormCard.setEventListener();
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      validatorFormCard.setSubmitButtonState(false);
    });
    validatorFormCard.setSubmitButtonState(false);
  },
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1500px;
}

.form__input:not(:last-child) {
  margin-right: 20px;
}

.form__box {
  display: flex;
  justify-content: space-between;
}

.passport-box {
  margin-bottom: 50px;
}

.form__box:not(:last-child) {
  margin-bottom: 50px;
}

.form__title {
  margin-bottom: 30px;
}

.form__radio-box {
  justify-content: initial;
}

.button {
  font-family: "Open Sans Regular";
  font-size: 16px;
  color: #ffffff;
  background: #e30614;
  border-radius: 5px;
  width: 100%;
  height: 50px;
  border: none;
}

.button-dis {
  background: #f98e94;
}
</style>
