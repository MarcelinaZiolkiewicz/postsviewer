<template>
  <div class="post">
    <div class="left">
      <h2 class="title"> {{ post.title }} </h2>
      <h5> {{ author }} </h5>
      <p class="contents">
        {{ halfText }} {{ notLoadedYet && '...'}}
        <button @click="toggleTextVisible">
          {{ notLoadedYet ? 'Pokaż więcej' : 'Pokaż mniej'}}
        </button>
      </p>
    </div>
    <div class="right" @click="removePost(post.id)">
      <div class="trash"></div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "SinglePost",
  props: {
    post: Object,
    author: String
  },
  data() {
    return {
      notLoadedYet: true,
      body: this.post.body
    }
  },
  methods: {
    ...mapActions(["removePost"]),
    toggleTextVisible() {
      this.notLoadedYet = !this.notLoadedYet
    },
    deletePost() {
      console.log(this.post.id)
    }
  },
  computed: {
    halfText() {
      if (this.notLoadedYet){
        return this.body.slice(0, 60);
      }
      return this.post.body
    }
  }
}
</script>

<style scoped lang="sass">
@import "../sass/_variables.sass"

.post
  display: flex
  flex-flow: row nowrap
  justify-content: space-between
  width: 70vw
  background-color: $bg-post
  margin: 10px 0
  border-radius: 15px
  opacity: .8
  transition: .3s

  &:hover
    opacity: 1

  button
    background-color: transparent
    border: none
    border-bottom: 1px solid $font-color
    cursor: pointer

  p,button
    font-size: 16px
    font-weight: 400
    color: $font-color

  h5,p
    margin-top: 5px

  .right
    width: 12vw
    transition: .3s ease-in
    border-top-right-radius: inherit
    border-bottom-right-radius: inherit

    .trash
      height: 100%
      background-image: url("../icons/trash-alt-regular.svg")
      background-repeat: no-repeat
      background-position: center
      background-size: 40px
      transition: .3s

    &:hover
      background-color: $bg-delete

      .trash
        transform: scale(1.1) rotate(10deg)

  .left
    height: 100%
    width: 90vw
    padding: 20px 30px

@media screen and (max-width: 1050px)
   .post
    width: 90vw
    p, button
      font-size: 18px


</style>
