<template>
  <modal name="processes" @before-open="fetchData">
    <div class="wrapper">
      <p class="header">Aktualne procesy</p>
      <ul class="processes">
        <li class="processes__item" v-for="process in processes">
          <p class="processes__item-text--primary">{{process.url}}</p>
          <p class="processes__item-text--secondary">{{completedActions(process)}}/{{totalActions(process)}}. Błędy:
            {{errors(process)}}</p>
        </li>
      </ul>
      <v-switch class="refresh-btn" icon="refresh.svg" :on-click="fetchData"/>
    </div>
  </modal>
</template>

<script>
  import VSwitch from "./VSwitch";
  import {apiStatus} from "../api";
  import {createNamespacedHelpers} from "vuex";


  const {mapState, mapMutations} = createNamespacedHelpers("service");

  export default {
    name: "StatusModal",
    data() {
      return {
        processes: []
      }
    },
    methods: {
      totalActions(process) {
        let total = 0;

        if (process.likes) {
          total += process.likes.error;
          total += process.likes.waiting;
          total += process.likes.success;
        }
        if (process.comments) {
          total += process.comments.error;
          total += process.comments.waiting;
          total += process.comments.success;
        }

        return total;
      },
      errors(process) {
        let result = 0;
        if (process.likes) {
          result += process.likes.error;
        }
        if (process.comments) {
          result += process.comments.error;
        }
        return result;
      },
      completedActions(process) {
        let completed = 0;

        if (process.likes) {
          completed += process.likes.error;
          completed += process.likes.success;
        }
        if (process.comments) {
          completed += process.comments.error;
          completed += process.comments.success;
        }

        return completed;
      },
      fetchData() {
        apiStatus().then(res => {
          this.processes = res
        })
      }
    },
    components: {
      VSwitch
    }
  }
</script>

<style scoped>
  .processes {
    list-style-type: none;
    padding-left: 0;
    height: 100%;
    overflow: auto;
  }

  .processes__item {
    border-bottom: 1px solid #ccc;
    transition: font-size 0.3s ease, background-color 0.3s ease;
    padding: 0.3rem 0.3rem 0.3rem 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .processes__item-text--primary {
    word-break: break-all;
    max-width: 73%;
    border-right: 1px solid #ccc;
    font-weight: 500;
    padding-right: 0.5rem;
    /* display: inline-block; */
  }

  .processes__item-text--secondary {
    font-weight: bold;
  }

  .processes__item:last-of-type {
    border: none;
  }

  .header {
    margin: 0.5rem 0 0 0.5rem;
    font-weight: bold;
    text-align: center;
  }

  .wrapper {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    height: 100%;
  }

  .refresh-btn {
    margin: 0.5rem;
  }
</style>