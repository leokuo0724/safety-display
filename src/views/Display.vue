<template lang="pug">
  .display-root
    .display-text(ref="displayText") {{ displayText }}
    router-link(class="back-btn" to="/")
      .back-btn__img
</template>

<script>
export default {
  data() {
    return {
      timer: null
    };
  },
  computed: {
    displayText() {
      let text = window.localStorage.getItem("displayText");
      if (!text || text === "") {
        text = "慢";
      }
      return text;
    }
  },
  mounted() {
    const size = screen.width >= screen.height ? screen.height : screen.width;
    this.$refs.displayText.style.fontSize = size + "px";

    // exceed width, fire marquee effect
    if (window.localStorage.getItem("displayText").length > 1) {
      console.log("width: ", this.$refs.displayText.offsetWidth);
      this.marqueeEffect();
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    marqueeEffect() {
      const text = this.$refs.displayText;
      this.timer = setInterval(() => {
        text.scrollLeft += 10;
        if (text.scrollLeft >= text.scrollWidth - screen.width) {
          text.scrollLeft = 0;
        }
      }, 30);
    }
  }
};
</script>

<style lang="scss" scoped>
.display-root {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .display-text {
    overflow: scroll;
    white-space: nowrap;
    animation: breath 0.7s;
    animation-iteration-count: infinite;
  }
}
@keyframes breath {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.back-btn {
  position: fixed;
  top: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 5px 20px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  &__img {
    width: 50%;
    height: 50%;
    background-image: url("~@/assets/close-24px.svg");
    background-position: center;
    background-repeat: no-repeat;
  }
}
</style>
