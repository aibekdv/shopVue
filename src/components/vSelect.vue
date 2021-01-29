<template>
  <div class="select">
    <p class="title" @click="areOptionsVisible = !areOptionsVisible">
      {{ selected }}
    </p>
    <div class="options" v-if="areOptionsVisible">
      <p
        v-for="option of options"
        :key="option.value"
        @click="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "vSelect",
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    selected: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      areOptionsVisible: false
    };
  },
  methods: {
    selectOption(option) {
      this.$emit("select", option);
      this.areOptionsVisible = false;
    },
    hideSelect() {
      this.areOptionsVisible = false;
    }
  },
  beforeDestroy() {
    document.addEventListener("click", this.hideSelect);
  },

  mounted() {
    document.addEventListener("click", this.hideSelect.bind(this), true);
  }
};
</script>

<style lang="scss">
.select {
  position: relative;
  width: 200px;
  cursor: pointer;
  text-align: left;
  background-color: #fff;
  p {
    margin: 0;
  }
}
.title {
  border: solid 1px #aeaeae;
  padding: 8px;
}

.options {
  border: 1px solid #aeaeae;
  border-top: 0;
  p {
    padding: 5px 0px 5px 8px;
    &:hover {
      background: #e7e7e7;
    }
  }
}
</style>
