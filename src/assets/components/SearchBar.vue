<template>
  <div>
    <div class="wrapper">
      <input
        type="text"
        :value="searchValue"
        @input="update"
        placeholder="Szukaj..."
      >
      <button @click="sendValue(data)">Zatwierdź</button>

      <div class="options">
        <label>
          <p>Tytuły</p>
          <input type="checkbox" v-model="data.searchTitle">
        </label>
        <label>
          <p>Treść</p>
          <input type="checkbox" v-model="data.searchBody">
        </label>
      </div>

      <select v-model="sortOptions" @change="setSort(sortOptions)">
        <option selected disabled value="">Sortuj</option>
        <option value="titleAsc">Rosnąco po tytule</option>
        <option value="titleDesc">Malejąco po tytule</option>
      </select>
    </div>
    <div v-if="alert" class="alert">
      <p>Brak wpisanej frazy lub odzanczone opcje przeszukiwania</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "SearchBar",
  data() {
    return {
      sortOptions: '',
      data: {
        searchTitle: true,
        searchBody: true,
      }
    }
  },
  computed: {
    ...mapGetters(["alert", "searchValue"])
  },
  methods: {
    setSort (sortOptions) {
      this.$store.commit('sortByName', sortOptions)
    },
    update(e) {
      this.$store.commit('updateValue', e.target.value)
    },
    sendValue(key) {
      this.$store.commit('searchValueInArrays', key);
    }
  }
}
</script>

<style scoped lang="sass">
@import "../sass/_variables.sass"

.alert
  background-color: $bg-delete
  font-size: 20px
  color: white
  font-weight: bold
  text-align: center
  padding: 10px

.wrapper
  width: 70vw
  display: flex
  flex-flow: row wrap
  justify-content: center
  padding: 20px

  @media (max-width: 768px)
    flex-direction: column

  input, button, select
    background-color: transparent
    border: 2px solid $font-color
    padding: 5px 10px
    color: $font-color
    font-size: 16px
    outline: none
    cursor: pointer
    margin: 10px 10px

  select
    padding: 4px

  button
    transition: .3s
    &:hover
      background-color: $font-color
      color: white

  .options
    text-align: center
    label
      padding: 8px 0
      font-size: 16px
      p
        display: inline
      input
        display: inline
</style>
