<template>
  <p class="list__no-data" v-if="items.length === 0">Brak danych</p>
  <ul v-else class="list">
    <li :class="itemClasses(item)" v-for="item in items" :key="item.id" @click.self="onSelect && onSelect(item)">
      <span class="item__text" @click.self="onSelect && onSelect(item)">{{item.text}}</span>
      <v-button class="item__remove-button" v-if="onDelete" size="small" @click="onDelete(item)"
                icon="minus.svg"/>
    </li>
  </ul>
</template>

<script>
  import VButton from "./VButton";

  export default {
    name: "VList",
    props: {
      items: {
        type: Array,
        required: true
      },
      onDelete: {
        type: Function,
        required: false
      },
      onSelect: {
        type: Function,
        required: false
      },
      isSelected: {
        type: Function,
        required: false
      }
    },
    methods: {
      itemClasses(item) {
        return [
          "list__item",
          {
            "list__item--selected": this.isSelected && this.isSelected(item),
            "list__item--hoverable": this.onSelect
          }
        ];
      }
    },
    components: {
      VButton
    }
  };
</script>

<style>
  .list {
    list-style-type: none;
    padding: 0;
    overflow: auto;
  }

  .list__no-data {
    text-align: center;
  }

  .list__item {
    border-bottom: 1px solid #ccc;
    transition: 0.5s ease;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list__item:last-of-type {
    border: none;
  }

  .list__item--hoverable:hover, .list__item--selected {
    background-color: #d1d3c0;
    font-size: 1.2em;
    font-weight: 400;
  }

  .item__text {
    max-width: 95%;
    word-break: break-all;
  }

  .item__remove-button {
    opacity: 0.4;
    transition: 0.5s;
  }

  .item__remove-button:hover {
    opacity: 1;
  }
</style>
