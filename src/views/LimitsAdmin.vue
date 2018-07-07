<template>
  <div class="cont">
    <h2>Limity</h2>
    <input class="editor__text-area" :value="adminPassword"
           @change="changeAdminPassword($event.target.value)" placeholder="Hasło"></input>
    Polubienia:
    <counter :max="999" class="likes-control__number" :value="limits.likes" @change="changeLikesLimit"/>
    Komentarze:
    <counter :max="999" class="likes-control__number" :value="limits.comments" @change="changeCommentsLimit"/>

    <div class="btn">
      <v-switch class="refresh-btn" icon="save.svg" :on-click="submitLimits"/>
    </div>
  </div>
</template>


<script>
  import Counter from "@/components/Counter";
  import VSwitch from "@/components/VSwitch";
  import {mapState, mapGetters, mapActions, mapMutations} from "vuex";

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
      VSwitch
    },
    beforeMount() {
      this.fetchLimits();
    }
  }

</script>

<style>

  .editor__text-area {
    resize: none;
    height: 2rem;
    border: none;
    background-color: #d1d3c0;
    font-size: 1rem;
    width: 100%;
    margin-top: 1rem;
  }

  .btn {
    text-align: center;
  }

  .cont {
    display: flex;
    flex-direction: column;
    align-items: center;

  }
</style>