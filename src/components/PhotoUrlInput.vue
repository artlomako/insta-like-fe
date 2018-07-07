<template>
  <v-text-field type="primary" :text="photoUrl" :valid="photoUrlValid" @change="changePhotoUrl" placeholder="Link do zdjęcia"/>
</template>


<script>
  import {mapGetters, mapState, mapMutations} from "vuex";
  import VTextField from "./common/VTextField";

  export default {
    name: "PhotoUrlInput",
    computed: {
      ...mapGetters("settings", ["photoUrlValid"]),
      ...mapState("settings", ["photoUrl"])
    },
    methods: {
      ...mapMutations("settings", ["changePhotoUrl"])
    },
    components: {
      VTextField
    }
  };
</script>