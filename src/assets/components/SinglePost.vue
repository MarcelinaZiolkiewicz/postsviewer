<template>
  <div class="post">
    <h2 class="title"> {{ post.title }} </h2>
    <h5>Imię Nazwisko</h5>
    <p class="contents">
      {{ halfText }}
      <button @click="toggleTextVisible">
        {{ notLoadedYet ? 'Pokaż więcej' : 'Pokaż mniej'}}
      </button>
    </p>
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
    }
  },
  computed: {
    halfText() {
      if (this.notLoadedYet){
        return this.body.slice(0, this.body.length / 2);
      }
      return this.post.body
    }
  }
}
</script>

<style scoped lang="sass">

$bg-post: #EAC5D8
$font-color: #2c3e50

.post
  width: 70vw
  padding: 20px 30px
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

</style>
