<template>
  <div>
    <button v-if="start >= 10" @click="previousPage">Poprzednia strona</button>
    <button v-if="limit < postsLength" @click="nextPage">Następna strona</button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "PaginationButtons",
  props: {
    postsLength: Number
  },
  computed: {
    ...mapGetters(["start", "limit"])
  },
  methods: {
    nextPage() {
      this.$store.commit('pagination', 'next')
    },
    previousPage() {
      this.$store.commit('pagination', 'previous')
    }
  }
}
</script>

<style scoped lang="sass">
@import "../sass/_variables.sass"

div
  display: flex
  justify-content: space-around
  width: 90vw

  button
    background-color: transparent
    border: 2px solid $font-color
    color: $font-color
    font-size: 20px
    margin: 20px
    padding: 10px 20px
    font-weight: bold
    cursor: pointer
    transition: .3s
    outline: none
    border-radius: 15px

    &:hover
      background-color: $font-color
      color: white
</style>
