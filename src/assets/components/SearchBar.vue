<template>
  <div>
    <input
      type="text"
      :value="searchValue"
      @input="update"
      placeholder="Szukaj..."
    >
    <button @click="sendValue">Zatwierdź</button>

    <select v-model="sortOptions" @change="setSort(sortOptions)">
      <option selected disabled value="">Sortuj</option>
      <option value="titleAsc">Rosnąco po tytule</option>
      <option value="titleDesc">Malejąco po tytule</option>
    </select>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "SearchBar",
  data() {
    return {
      sortOptions: '',
    }
  },
  computed: {
    ...mapState({
      searchValue: state => state.searchValue
    })
  },
  methods: {
    setSort (sortOptions) {
      this.$store.commit('sortByName', sortOptions)
    },
    update(e) {
      this.$store.commit('updateValue', e.target.value)
    },
    sendValue() {
      this.$store.commit('searchValueInArrays')
    }
  }
}
</script>

<style scoped lang="sass">
@import "../sass/_variables.sass"

div
  width: 70vw
  display: flex
  flex-flow: row wrap
  justify-content: center
  padding: 20px

  input, button, select
    background-color: transparent
    border: 2px solid $font-color
    padding: 5px 10px
    color: $font-color
    font-size: 16px
    outline: none
    cursor: pointer
    margin: 0 10px

  select
    padding: 4px

  button
    transition: .3s
    &:hover
      background-color: $font-color
      color: white

</style>
