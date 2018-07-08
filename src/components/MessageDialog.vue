<template>
  <v-dialog v-show="show" :text="message" :icon="icon" @close="hide"/>
</template>

<script>
  import {mapState, mapMutations} from "vuex";
  import VDialog from "./common/VDialog";

  export default {
    name: "MessageDialog",
    components: {VDialog},
    data() {
      return {
        message: "",
        icon: undefined,
        show: false
      }
    },
    computed: {
      ...mapState("service", ["status"]),
      ...mapState("settings", ["photoUrl"]),
      ...mapMutations("service", ["setStatus"])
    },
    methods: {
      hide() {
        this.show = false;
      }
    },
    watch: {
      status({value}) {
        this.icon = "warning.svg";
        switch (value) {
          case "OK":
            this.message = "Uruchomiono. Akcje ruszą do 5 minut.";
            this.icon = "deal.svg";
            break;
          case "UNAUTHORIZED":
            this.message = "Użytkownik, który udostępnił zdjęcie nie ma dostępu do serwisu";
            break;
          case "API_UNAVAILABLE":
            this.message = "Brak połączenia z serwisem";
            break;
          case "ALREADY_PROCESSING":
            this.message = "Zdjęcie już jest w trakcie przetwarzania";
            break;
          case "NO_COMMENTS":
            this.message = "Nie dodano komentarzy";
            break;
          case "INVALID_PHOTO_URL":
            this.message = "Niepoprawny link do zdjęcia";
            break;
          case "NO_OPTION_CHOSEN":
            this.message = "Wybierz przynajmniej jedną opcję: <strong>Like</strong> lub <strong>Komentarz</strong>";
            break;
          case "ERROR":
            this.message = "Wystąpił nieoczekiwany błąd";
            break;
        }
        this.show = true;
      }
    }
  }

</script>