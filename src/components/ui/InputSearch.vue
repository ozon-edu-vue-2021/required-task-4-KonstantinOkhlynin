<template>
  <div class="search-box">
    <input
      id="search"
      type="search"
      :name="nameInput"
      placeholder=" "
      ref="ab"
      :required="requiredToggle"
      autocomplete="off"
      class="search"
      pattern=".{1,}"
      @click="trues()"
      @blur="clicks($event)"
      v-click-outside="hideDropdown"
      v-model="selected"
    />
    <label class="search__label" @click="inputFocus($event)" :for="nameInput">
      Гражданство
    </label>
    <ul v-if="foundNation" v-show="isDropdownOpen" class="dropdown-list">
      <li
        v-for="item in foundNation"
        @click="select($event)"
        :key="item.id"
        class="dropdown-item"
      >
        {{ item }}
      </li>
    </ul>
    <ul v-else v-show="isDropdownOpen" class="dropdown-list">
      <li
        v-for="item in data"
        @click="select($event)"
        :key="item.id"
        class="dropdown-item"
      >
        {{ item.nationality }}
      </li>
    </ul>
    <span id="search-error" class="input__error"></span>
  </div>
</template>

<script>
import { debounce } from "../../classes/helpers.js";
import ClickOutside from "vue-click-outside";
export default {
  directives: {
    ClickOutside,
  },
  data() {
    return {
      isDropdownOpen: false,
      nationality: [],
      foundNation: null,
      selected: "",
      debouncedSearchSkills: null,
    };
  },
  props: {
    data: Array,
    nameInput: String,
    requiredToggle: Boolean,
  },
  methods: {
    trues() {
      this.isDropdownOpen = true;
    },
    getNation(searchWord) {
      const arr = [];
      this.nationality.filter(function (el) {
        if (el.toLowerCase().indexOf(searchWord.toLowerCase()) !== -1) {
          arr.push(el);
        }
      });
      this.foundNation = arr;
    },
    hideDropdown() {
      this.isDropdownOpen = false;
    },
    select(event) {
      this.selected = event.target.textContent.trim();
      event.target.parentElement.parentElement.querySelector("input").focus();
    },
    inputFocus(event) {
      this.isDropdownOpen = true;
      event.target.parentElement.querySelector("input").focus();
    },
    clicks() {
      this.$emit("clicks", [this.selected]);
    },
  },
  mounted() {
    this.data.forEach((item) => {
      this.nationality.push(item.nationality);
    });
    this.debouncedSearchSkills = debounce(this.getNation, 2000);
  },
  watch: {
    selected(newValue) {
      this.debouncedSearchSkills(newValue);
    },
  },
};
</script>

<style>
.dropdown-list {
  position: absolute;
  width: 100%;
  padding: 5px 10px;
  background: white;
  top: 34px;
  border: 1px solid steelblue;
  border-radius: 5px;
  overflow: auto;
  max-height: 118px;
  z-index: 1;
}

.dropdown-item {
  margin-bottom: 2px;
  padding: 0 0 2px 2px;
  cursor: pointer;
}

.li:hover {
  background: #818081;
  color: #fff;
}
.search {
  font-size: 16px;
  width: 100%;
  height: 30px;
  background-color: transparent;
  padding-left: 3px;
  border: none;
  border-bottom: 2px solid #818081;
}

.search::placeholder {
  font-size: 14px;
  color: #c2c2c2;
}

.search:focus:placeholder-shown + .search__label,
.search:not(:placeholder-shown) + .search__label {
  color: #000;
  top: -16px;
  left: 0;
  font-size: 14px;
  transition: 0.2s;
  padding-left: 2px;
  padding-right: 2px;
}

.search__error {
  position: absolute;
  top: 33px;
  left: 3px;
  color: red;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 480px;
}

.search__label {
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
