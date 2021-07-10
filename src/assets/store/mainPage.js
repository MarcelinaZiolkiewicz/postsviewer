import axios from 'axios'

const state = {
  posts: [],
  users: []
}

const getters = {
  allPosts: state => state.posts,
  allUsers: state => state.users
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
  },
  async loadUsers({commit}) {
    return axios.get('https://jsonplaceholder.typicode.com/users')
      .then(({data}) => {
        commit('setUsers', data)
      })
      .catch(err => {
        throw new Error(err)
      })
  },
  async removePost({commit}, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    commit('deletePost', id);
  }
}

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setUsers: (state, users) => (state.users = users),
  deletePost: (state, id) => (state.posts = state.posts.filter(post => post.id !== id))
}

export default {
  state,
  getters,
  actions,
  mutations
}
