<template>
  <div id="home">
    <div class="postsAmount">
      <p>Załadowane posty: {{allPosts.length}}</p>
      <p>Posty na stronie: {{ allPosts.length > 10 ? "10" : allPosts.length}}</p>
    </div>
    <SearchBar/>
     <h2 v-if="allPosts <= 0">Brak postów do wyświetlenia</h2>
    <SinglePost
      v-for="post in allPosts.slice(start, limit)"
      :key="post.id"
      :post="post"
      :author="getAuthor(post.userId, allUsers)"
    />
    <PaginationButtons
      :start="start"
      :limit="limit"
      :postsLength="allPosts.length"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SinglePost from "../components/SinglePost";
import PaginationButtons from "../components/PaginationButtons";
import SearchBar from "../components/SearchBar";

export default {
  name: 'HomePage',
  components: {SearchBar, PaginationButtons, SinglePost},
  computed: {
    ...mapGetters(["allPosts", "allUsers", "start", "limit"]),
  },
  created() {
    this.loadPosts();
    this.loadUsers();
  },
  methods: {
    ...mapActions(["loadPosts", "loadUsers", "removePost"]),
    getAuthor(id, users) {
      if (users.length > 0) {
        const foundIndex = users.findIndex(user => user.id === id);
        let author = users[foundIndex];
        return author.name
      }
    }
  }
}
</script>

<style lang="sass">
@import "../sass/_variables.sass"

#home
  display: flex
  flex-flow: column nowrap
  justify-content: flex-start
  align-items: center
  min-height: 100vh
  height: 100%
  background-color: $bg-top
  color: #2c3e50
  max-width: 1440px
  margin: 0 auto

  .postsAmount
    text-align: left
    padding: 20px 0
    width: 70vw

    p
      font-weight: bolder

</style>
