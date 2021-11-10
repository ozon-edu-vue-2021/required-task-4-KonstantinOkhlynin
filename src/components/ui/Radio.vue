<template>
  <p class="radio-box">
    <input
      id="radio"
      :name="radioName"
      :value="value"
      type="radio"
      class="radio"
      v-model="gendere"
      @change="checked"
    />
    <label class="radio-box__label" for="radio">{{ placeholder }}</label>
    <span :id="`radio-error`" class="radio__error"></span>
  </p>
</template>

<script>
export default {
  data() {
    return {
      gendere: "",
    };
  },
  props: {
    placeholder: String,
    radioName: String,
    value: String,
  },
  methods: {
    checked() {
      this.$emit("checked", this.gendere);
    },
  },
};
</script>

<style>
.radio-box {
  display: flex;
  align-items: center;
}
.radio {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
</style>
