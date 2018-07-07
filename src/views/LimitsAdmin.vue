<template>
  <div class="container">
    <h2>Limity</h2>
    <v-text-field :text="adminPassword"
                  @change="changeAdminPassword"
                  type="secondary"
                  placeholder="Hasło"/>
    Polubienia:
    <counter :max="999" :value="limits.likes" @change="changeLikesLimit"/>
    Komentarze:
    <counter :max="999" :value="limits.comments" @change="changeCommentsLimit"/>
    <v-button class="save-btn" icon="save.svg" size="medium" @click="submitLimits"/>
  </div>
</template>


<script>
  import Counter from "@/components/Counter";
  import VButton from "@/components/common/VButton";
  import VTextField from "@/components/common/VTextField";
  import {mapState, mapActions, mapMutations} from "vuex";

  export default {
    name: "DefaultCommentsAdmin",
    computed: {
      ...mapState("settings", ["limits", "adminPassword"])
    },
    methods: {
      ...mapActions("settings", ["fetchLimits", "submitLimits"]),
      ...mapMutations("settings", ["changeLikesLimit", "changeCommentsLimit", "changeAdminPassword"])
    },
    components: {
      Counter,
      VButton,
      VTextField
    },
    beforeMount() {
      this.fetchLimits();
    }
  }

</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .save-btn {
    margin: 1rem;
  }
</style>