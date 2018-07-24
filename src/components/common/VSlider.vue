<template>
  <div class="slider">
    <div class="slider__details">
      <span class="slider__title">{{title}}</span>
      <input class="slider__input" type="number" @change="onChange" :value="localValue"/>
    </div>
    <input class="slider__control" type="range" :min="min" :max="max" @input="onChange" :value="localValue"/>
  </div>

</template>

<script>
  export default {
    name: "VSlider",
    props: {
      title: {
        required: true,
        type: String
      },
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
        required: true,
        type: Number,
      }
    },
    data() {
      return {localValue: this.value}
    },
    methods: {
      onChange(event) {
        let newValue = Number.parseInt(event.target.value) || this.min;
        this.localValue = newValue;
        if (newValue < this.min) {
          newValue = this.min;
        }
        if (newValue > this.max) {
          newValue = this.max;
        }
        this.localValue = newValue;
        this.$emit("change", newValue);
      }
    }
    // watch: {
    //   localValue(value) {
    //     let newValue = Number.parseInt(value) || this.min;
    //
    //     if (newValue < this.min) {
    //       newValue = this.min;
    //     }
    //     if (newValue > this.max) {
    //       newValue = this.max;
    //     }
    //     this.localValue = newValue;
    //     this.$emit("change", newValue);
    //   }
    // }
  }
</script>

<style>
  .slider {
    display: flex;
    flex-direction: column;
  }

  .slider__details {
    margin-bottom: 0.3rem;
    display: flex;
    align-items: flex-end;
  }

  .slider__input {
    border: 0;
    border-bottom: solid 1px #3f3f3f;
    text-align: center;
    outline: 0;
    font-size: 1rem;
    width: 4rem;
    background: none;
    margin-left: 0.5rem;
  }

  .slider__input::-webkit-inner-spin-button,
  .slider__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .slider__control {
    -webkit-appearance: none;
    width: 100%;
    height: 15px;
    background: #d1d3c0;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    transition: opacity .2s;
  }

  .slider__control::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #2980b9;
    cursor: pointer;
  }

</style>