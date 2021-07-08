import axios from 'axios'

const state = {
  posts: [],
}

const getters = {
  allPosts: state => state.posts
}

const actions = {
  async loadPosts({commit}) {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(({data}) => {
        commit('setPosts', data)
      })
      .catch(err => {
        throw new Error(err)
      })
  }
}

const mutations = {
  setPosts: (state, posts) => (state.posts = posts)
}

export default {
  state,
  getters,
  actions,
  mutations
}
