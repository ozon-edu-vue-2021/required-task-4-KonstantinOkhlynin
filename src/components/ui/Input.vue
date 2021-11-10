<template>
  <p class="input-box">
    <input
      id="input"
      :name="nameInput"
      :required="requiredToggle"
      :type="type"
      autocomplete="off"
      v-model="value"
      @blur="vModel"
      placeholder=" "
      :pattern="regExp"
      class="input"
      :max="
        type === 'date'
          ? `${date.getFullYear()}-${date.getMonth() + 1}-${
              date.getDate() <= 9 ? '0' : ''
            }${date.getDate()}`
          : false
      "
    />
    <label class="input__label" @click="inputFocus($event)" :for="nameInput">{{
      placeholder
    }}</label>
    <span id="input-error" class="input__error"></span>
  </p>
</template>

<script>
export default {
  props: {
    type: String,
    placeholder: String,
    requiredToggle: Boolean,
    nameInput: String,
    regExp: String,
    maxDate: String,
  },
  data() {
    return {
      date: new Date(),
      value: "",
    };
  },
  methods: {
    inputFocus(event) {
      event.target.parentElement.querySelector("input").focus();
    },
    vModel() {
      this.$emit("vModel", this.value);
    },
  },
  mounted() {
    console.log(this.password);
  },
};
</script>

<style>
.input {
  font-size: 16px;
  width: 100%;
  height: 30px;
  background-color: transparent;
  padding-left: 3px;
  border: none;
  border-bottom: 2px solid #818081;
}

.input::placeholder {
  font-size: 14px;
  color: #c2c2c2;
}

.input:focus:placeholder-shown + .input__label,
.input:not(:placeholder-shown) + .input__label {
  color: #000;
  top: -16px;
  left: 0;
  font-size: 14px;
  transition: 0.2s;
  padding-left: 2px;
  padding-right: 2px;
}

.input__error {
  position: absolute;
  top: 33px;
  left: 3px;
  color: red;
}

.input-box {
  position: relative;
  width: 100%;
  max-width: 480px;
}

.input__label {
  font-size: 16px;
  color: #818081;
  position: absolute;
  top: 8px;
  left: 3px;
  transition: 0.2s;
}

.input-invalid {
  border-bottom: 2px solid red;
}

.input-valid {
  border-bottom: 2px solid green;
}
</style>
