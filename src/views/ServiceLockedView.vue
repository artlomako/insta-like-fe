<template>
  <div>
    <h1>Serwis niedostępny</h1>
    {{message}}
  </div>
</template>

<script>
import { fetchLock as apiFetchLock } from "../api/settings";

export default {
  data() {
    return { message: "" };
  },
  async created() {
    const response = await apiFetchLock();
    const { message } = await response.json();
    this.message = message;
  }
};
</script>
