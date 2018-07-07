<template>
  <div class="cont">
    <h2>Limity</h2>
    <v-text-field :text="adminPassword"
                  @change="changeAdminPassword"
                  type="secondary"
                  placeholder="Hasło"/>
    Polubienia:
    <counter :max="999" :value="limits.likes" @change="changeLikesLimit"/>
    Komentarze:
    <counter :max="999" :value="limits.comments" @change="changeCommentsLimit"/>

    <div class="btn">
      <v-switch icon="save.svg" :on-click="submitLimits"/>
    </div>
  </div>
</template>


<script>
  import Counter from "@/components/Counter";
  import VSwitch from "@/components/VSwitch";
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
      VSwitch,
      VTextField
    },
    beforeMount() {
      this.fetchLimits();
    }
  }

</script>

<style>
  .btn {
    text-align: center;
  }

  .cont {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>