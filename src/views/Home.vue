<template lang="pug">
  .home-root
    .form
      h1 APP 名稱
      .form__input-section
        p 請輸入欲顯示之文字
        input(
          type="text"
          v-model="textVal"
          ref="inputText"
          @focus="setFocusStyle(true)"
          @blur="setFocusStyle(false)"
        )
        .deco(ref="deco")
      //- router-link(class="form__button" to="/about") 確認
      .form__button(@click="toDisplay") 確認
    .warning-wrapper
      .warning
</template>

<script>
export default {
  data() {
    return {
      textVal: "慢"
    };
  },
  mounted() {
    this.$refs.inputText.focus();
  },
  methods: {
    toDisplay() {
      // TODO: 太多字
      // this.textVal.length 
      window.localStorage.setItem("displayText", this.textVal);
      this.$router.push("display");
    },
    setFocusStyle(bool) {
      if (bool) {
        this.$refs.deco.style.width = "100%";
      } else {
        this.$refs.deco.style.width = "0px";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home-root {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 300px;
    height: 230px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.2);
    &__input-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      > p:nth-child(1) {
        margin-bottom: 6px;
        text-align: center;
      }
      > input:nth-child(2) {
        height: 32px;
        border: none;
        padding: 0 8px;
        background: rgba(#e5e5e5, 0.4);
        // border-bottom: 2px solid #0047ff;
      }
      .deco {
        width: 10%;
        height: 3px;
        background: #0047ff;
        transition: width 0.2s;
      }
    }
    &__button {
      background: #0047ff;
      padding: 6px 12px;
      color: white;
      border-radius: 6px;
      box-shadow: 0px 5px 20px 3px rgba(#0047ff, 0.3);
      text-decoration: none;
    }
  }
}
.warning-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 54px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .warning {
    width: 96%;
    height: 90%;
    background: rgb(255, 71, 71);
  }
}
</style>
