<template>
  <div class="popup-wrapper" ref="popup_wrapper">
    <div class="v-popup">
      <div class="v-popup__header">
        <span>{{ popupTitle }}</span>
        <span>
          <i class="material-icons" @click="closePopup">close</i>
        </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button class="close_modal btn" @click="closePopup">Закрыт</button>
        <button class="submit_btn btn" @click="rightBtnAction">
          В Корзину
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vPopup",
  methods: {
    closePopup() {
      this.$emit("closePopup");
    },
    rightBtnAction() {
      this.$emit("rightBtnAction");
    }
  },
  props: {
    popupTitle: {
      type: String,
      default: "popup name"
    },
    rightBtnTitle: {
      type: String,
      default: "Ok"
    }
  },
  mounted() {
    let vm = this;
    document.addEventListener("click", function(item) {
      if (item.target === vm.$refs.popup_wrapper) {
        vm.closePopup();
      }
    });
  }
};
</script>

<style lang="scss">
.popup-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: -100vh;
  right: 0;
  background-color: rgba(122, 122, 122, 0.466);
}
.v-popup {
  width: 400px;
  padding: 16px;
  position: fixed;
  background-color: #fff;
  box-shadow: 0px 0px 17px 0px rgb(170, 170, 170);
  top: 50px;
  z-index: 3;
  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
  }
  .submit_btn {
    padding: 8px;
    color: white;
    background-color: &green_bg;
  }
  .close_modal {
    padding: 8px;
    background-color: rgb(235, 118, 118) !important;
    margin: 0px 10px 0px 0px;
    &:hover {
      background-color: rgb(245, 43, 43) !important;
    }
  }
}
</style>
