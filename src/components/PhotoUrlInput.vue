<template>
  <v-text-field type="primary" :text="photoUrl" :valid="photoUrlValid" @change="changePhotoUrl"
                placeholder="Link do zdjęcia"/>
</template>


<script>
  import {createNamespacedHelpers} from "vuex";

  const {mapGetters, mapState, mapMutations} = createNamespacedHelpers("worker");
  import VTextField from "./common/VTextField";

  export default {
    name: "PhotoUrlInput",
    computed: {
      ...mapGetters(["photoUrlValid"]),
      ...mapState(["photoUrl"])
    },
    methods: {
      ...mapMutations(["changePhotoUrl"])
    },
    components: {
      VTextField
    }
  };
</script>