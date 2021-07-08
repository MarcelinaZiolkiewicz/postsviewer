<template>
  <div id="app">
    <div class="postsAmount">
      <p>Załadowane posty: {{allPosts.length}}</p>
    </div>
    <SinglePost
      v-for="post in allPosts"
      :key="post.id"
      :post="post"
    >
      <h3>{{ post.title }}</h3>
    </SinglePost>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SinglePost from "./assets/components/SinglePost";

export default {
  name: 'app',
  components: {SinglePost},
  methods: {
    ...mapActions(["loadPosts"]),
  },
  computed: {
    ...mapGetters(["allPosts"]),
  },
  created() {
    this.loadPosts();
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap')
@import "./assets/sass/_variables.sass"

*
  margin: 0
  padding: 0
  font-family: "Montserrat", sans-serif

#app
  display: flex
  flex-flow: column wrap
  justify-content: center
  align-items: center
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
