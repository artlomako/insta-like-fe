<template>
  <input :class="['url-input', {'url-input--error': !photoUrlValid}]" :value="photoUrl" @keyup="onChange"
         placeholder="Link do zdjęcia"/>
</template>


<script>
  import {mapGetters, mapState, mapMutations} from "vuex";

  export default {
    name: "PhotoUrlInput",
    computed: {
      ...mapGetters("settings", ["photoUrlValid"]),
      ...mapState("settings", ["photoUrl"])
    },
    methods: {
      onChange(e) {
        const newUrl = e.target.value;
        this.changePhotoUrl(newUrl);
      },
      ...mapMutations("settings", ["changePhotoUrl"])
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
