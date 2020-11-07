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
      .form__button(@click="toDisplay") 確認
    .warning-wrapper(ref="warning")
      .warning
        .warning__icon
        .warning__text {{ warningText }}
</template>

<script>
export default {
  data() {
    return {
      textVal: "慢",
      warningText: null,
      wordingCheckList: [
        "幹",
        "淦",
        "幹你娘",
        "雞掰",
        "耖",
        "靠杯",
        "靠腰",
        "fuck",
        "bitch"
      ]
    };
  },
  mounted() {
    this.$refs.inputText.focus();
  },
  methods: {
    toDisplay() {
      // 太多字
      if (this.textVal.length > 10) {
        this.setWarning(true, "字數過多，請重新輸入");
        setTimeout(() => {
          this.setWarning(false);
        }, 2000);
        return;
      }
      // 夾帶髒話
      if (this.checkWording(this.textVal)) {
        this.setWarning(true, "請勿夾帶髒話");
        setTimeout(() => {
          this.setWarning(false);
        }, 2000);
        return;
      }

      window.localStorage.setItem("displayText", this.textVal);
      this.$router.push("display");
    },
    setFocusStyle(bool) {
      if (bool) {
        this.$refs.deco.style.width = "100%";
      } else {
        this.$refs.deco.style.width = "0px";
      }
    },
    checkWording(sentence) {
      const checkSentence = sentence.toLowerCase();
      return this.wordingCheckList.some(word => {
        return checkSentence.includes(word);
      });
    },
    setWarning(bool, message) {
      if (bool) {
        this.warningText = message;
        this.$refs.warning.style.bottom = "0";
      } else {
        this.warningText = null;
        this.$refs.warning.style.bottom = "-54px";
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
  bottom: -54px;
  left: 0;
  width: 100%;
  height: 54px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.5s;
  .warning {
    width: 96%;
    height: 90%;
    background: rgb(255, 71, 71);
    display: flex;
    align-items: center;
    padding: 0 12px;
    &__icon {
      width: 24px;
      height: 24px;
      background-color: white;
      mask-image: url("~@/assets/error-black-18dp.svg");
      mask-repeat: no-repeat;
      mask-position: center;
      margin-right: 6px;
    }
    &__text {
      color: white;
      font-weight: bold;
    }
  }
}
</style>
