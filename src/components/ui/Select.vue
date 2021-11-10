<template>
  <p class="select-box">
    <select
      id="select"
      :name="nameInput"
      :required="requiredToggle"
      class="input"
      v-model="value"
      @blur="selected"
    >
      <option selected disabled>{{ defaultSelect }}</option>
      <option
        :value="item.type || item.capital"
        v-for="item in data"
        :key="item.id"
      >
        {{ item.type || item.capital }}
      </option>
    </select>
  </p>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
  props: {
    data: Array,
    nameInput: String,
    requiredToggle: Boolean,
    defaultSelect: String,
  },
  methods: {
    inputFocus(event) {
      event.target.parentElement.querySelector("input").focus();
      console.log(event.target.parentElement.querySelector("input").value);
    },
    selected() {
      this.$emit("selected", this.value);
    },
  },
};
</script>

<style>
.select {
  font-size: 16px;
  width: 100%;
  height: 30px;
  background-color: transparent;
  padding-left: 3px;
  border: none;
  border-bottom: 2px solid #818081;
}

.select-box {
  width: 100%;
  max-width: 480px;
}
.input-invalid {
  border-bottom: 2px solid red;
}

.input-valid {
  border-bottom: 2px solid green;
}
</style>
