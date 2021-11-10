<template>
  <div class="app" id="app">
    <Form />
  </div>
</template>

<script>
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Form,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap");

.app {
  background-color: #fafafa;
  padding: 24px;
  display: flex;
  justify-content: center;
}

html,
body,
#app {
  height: 100%;
}

* {
  font-family: "Roboto Slab", serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  color: black;
  outline: none;
}
</style>
