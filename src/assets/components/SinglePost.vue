<template>
  <div class="post">
    <div class="left">
      <h2 class="title"> {{ post.title }} </h2>
      <h5>Imię Nazwisko</h5>
      <p class="contents">
        {{ halfText }} {{ notLoadedYet && '...'}}
        <button @click="toggleTextVisible">
          {{ notLoadedYet ? 'Pokaż więcej' : 'Pokaż mniej'}}
        </button>
      </p>
    </div>
    <div class="right" @click="deletePost">
      <div class="trash"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SinglePost",
  props: {
    post: Object
  },
  data() {
    return {
      notLoadedYet: true,
      body: this.post.body
    }
  },
  methods: {
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
  overflow: hidden
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
    width: 10vw
    transition: .3s ease-in

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
    width: 90vw
    padding: 20px 30px

</style>
