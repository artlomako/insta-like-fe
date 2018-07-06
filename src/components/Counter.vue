<template>
  <div :class="['container', {'container--disabled': disabled}]">
    <span>{{label}}</span>
    <div class="counter">
      <button class="counter__button counter__button--decrement" @click="decrement" :disabled="disabled">-</button>
      <input class="counter__input" type="number" v-model="localValue" @change="onChange" :disabled="disabled"/>
      <button class="counter__button counter__button--increment" @click="increment" :disabled="disabled">+</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Counter",
    data() {
      return {
        localValue: this.value || 0
      }
    },
    props: {
      value: {
        required: true,
        type: Number
      },
      min: {
        required: false,
        type: Number,
        default: 0
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
      },
      label: {
        required: false,
        type: String
      }
    },
    methods: {
      increment() {
        if (this.value < this.max) {
          this.$emit("change", this.value + 1);
          this.localValue = this.value + 1;
        }
      },
      decrement() {
        if (this.value > this.min) {
          this.$emit("change", this.value - 1);
          this.localValue = this.value - 1;
        }
      },
      onChange(event) {
        const newValue = Number.parseInt(event.target.value || 0);
        if (newValue > this.max) {
          this.$emit("change", this.max);
          this.localValue = this.max;
          return;
        }
        if (newValue < this.min) {
          this.$emit("change", this.min);
          this.localValue = this.min;
          return;
        }
        this.$emit("change", newValue);
        this.localValue = newValue;

      }
    }
  }
</script>

<style scoped>
  .counter {
    display: flex;
    height: 1.4rem;
  }

  .container {
    transition: 0.5s;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .container--disabled {
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