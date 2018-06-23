<template>
  <ul class="list">
    <li :class="['list__item', {'list__item--selected': isSelected && isSelected(item)}]" v-for="item in items"
        :key="item.id" @click.capture="onSelect(item)">
      <span class="list__item-text">{{item.text}}</span>
      <v-icon-button v-if="typeof onDelete !== 'undefined'" class="item__remove-btn" @click="onDelete(item)"
                     icon="minus.svg"/>
    </li>
  </ul>

</template>


<script>
  import VIconButton from "./VIconButton";

  export default {
    name: "List",
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
    components: {
      VIconButton
    }
  };
</script>

<style scoped>
  .list {
    list-style-type: none;
    padding-left: 0;
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
