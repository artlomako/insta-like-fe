<template>
  <input :class="['url-input', {'url-input--error': !valid}]" :value="value" @keyup="onChange"
         placeholder="URL do zdjęcia"/>
</template>


<script>
  export default {
    name: "PhotoUrlInput",
    props: {
      value: {
        type: String,
        required: true
      }
    },
    computed: {
      valid() {
        return (
            this.value.trim().length === 0 ||
            /^(https?:\/\/)?(www\.)?instagram\.com\/.+/.test(
                this.value.trim().toLowerCase()
            )
        );
      }
    },
    methods: {
      onChange(e) {
        const newValue = e.target.value;
        this.$emit("change", newValue);
      }
    }
  };
</script>

<style>
  .url-input {
    border-width: 0 0 1px 0;
    border-color: #3f3f3f;
    background: transparent;
    transition: all 300ms ease-out;
    height: 2rem;
    font-size: 1.5rem;
    width: 100%;
  }

  .url-input--error {
    background: #fc7674;
  }

  .url-input:focus {
    /* background: #d1d8e0; */
    outline: none;
  }
</style>
