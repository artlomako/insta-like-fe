<template>
  <ul class="list">
    <li class="list__item" v-for="comment in defaultComments" :key="comment.id" @click="onCommentClick(comment)">
      <span class="list__item-text">{{comment.text}}</span>
    </li>
  </ul>
</template>


<script>
  import {mapState, mapActions} from "vuex";

  export default {
    name: "DefaultCommentList",
    computed: {
      ...mapState(["defaultComments"])
    },
    methods: {
      ...mapActions(["addDefaultComment"]),
      onCommentClick(comment) {
        this.addDefaultComment(comment);
        this.$modal.hide("hello-world");
      }
    }
  };
</script>

<style scoped>
  .list {
    list-style-type: none;
    padding-left: 0;
    overflow: auto;
  }

  .list__item {
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
    transition: font-size 0.3s ease, background-color 0.3s ease;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list__item-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 92%;
    /* display: inline-block; */
  }

  .list__item:last-of-type {
    border: none;
  }

  .list__item:hover,
  .list__item--selected {
    background-color: #d1d3c0;
    font-size: 1.2em;
    font-weight: 400;
  }

  .item__remove-btn {
    width: 1.2rem;
    height: 1.2rem;
    background: none;
    opacity: 0.4;
    transition: 0.5s;
  }

  .item__remove-btn:hover {
    opacity: 1;
  }
</style>
