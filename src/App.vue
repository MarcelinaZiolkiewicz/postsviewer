<template>
  <div id="app">
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

$bg-top: #DBD8F0
$font-color: #2c3e50

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


</style>
