<template>
  <div id="home">
    <div class="postsAmount">
      <p>Załadowane posty: {{allPosts.length}}</p>
      <p>Posty na stronie: {{ allPosts.length > 10 ? "10" : allPosts.length}}</p>
    </div>
    <SinglePost
      v-for="post in allPosts.slice(start, limit)"
      :key="post.id"
      :post="post"
      :author="getAuthor(post.userId, allUsers)"
    >
      <h3>{{ post.title }}</h3>
    </SinglePost>
    <PaginationButtons
      :start="start"
      :limit="limit"
      :postsLength="allPosts.length"
      @previousPage="previousPage"
      @nextPage="nextPage"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SinglePost from "../components/SinglePost";
import PaginationButtons from "../components/PaginationButtons";

export default {
  name: 'HomePage',
  components: {PaginationButtons, SinglePost},
  data() {
    return{
      start: 0,
      limit: 10
    }},
  computed: {
    ...mapGetters(["allPosts", "allUsers"]),
  },
  created() {
    this.loadPosts();
    this.loadUsers();
  },
  methods: {
    ...mapActions(["loadPosts", "loadUsers", "removePost"]),
    getAuthor(id, users) {
      const foundIndex = users.findIndex(user => user.id === id);
      return `${users[foundIndex].name}`
    },
    nextPage() {
      this.start += 10;
      this.limit += 10;
    },
    previousPage() {
      this.start -= 10;
      this.limit -= 10;
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
