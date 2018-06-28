<template>
  <div :class="['counter', {'counter--disabled': disabled}]">
    <button class="counter__button counter__button--decrement" @click="decrement" :disabled="disabled">-</button>
    <input class="counter__input" type="number" :value="value" @blur="onChange" :disabled="disabled"/>
    <button class="counter__button counter__button--increment" @click="increment" :disabled="disabled">+</button>
  </div>
</template>

<script>
  export default {
    name: "Counter",
    props: {
      value: {
        required: true,
        type: Number
      },
      min: {
        required: false,
        type: Number,
        default: 1
      },
      max: {
        required: false,
        type: Number,
        default: 10
      },
      disabled: {
        required: false,
        type: Boolean,
        default: false
      }
    },
    methods: {
      increment() {
        if (this.value < this.max) {
          this.$emit("change", this.value + 1);
        }
      },
      decrement() {
        if (this.value > this.min) {
          this.$emit("change", this.value - 1);
        }
      },
      onChange(event) {
        const newValue = event.target.value;
        if (newValue > this.max) {
          this.$emit("change", this.max);
          return;
        }
        if (newValue < this.min) {
          this.$emit("change", this.min);
          return;
        }
        this.$emit("change", Number.parseInt(newValue));
      }
    }
  }
</script>

<style scoped>
  .counter {
    display: flex;
    height: 1.4rem;
    transition: 0.5s;

  }

  .counter--disabled {
    opacity: 0.5;
  }

  .counter__button {
    border: 0;
    outline: 0;
    padding: 0;
    background-color: #34ace0;
    font-size: 1rem;
    font-weight: bold;
    width: 1.2rem;
  }

  .counter__button--increment {
    border-radius: 0 2px 2px 0;
  }

  .counter__button--decrement {
    border-radius: 2px 0 0 2px;
  }

  .counter__input {
    border: 0;
    text-align: center;
    outline: 0;
    font-size: 1rem;
    width: 2rem;
  }

  .counter__input::-webkit-inner-spin-button,
  .counter__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

</style>