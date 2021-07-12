import axios from 'axios'

//sprawdzanie czy wpisana wartość nie jest pusta
function isEmptyOrSpaces(str){
  return str === null || str.match(/^ *$/) !== null;
}

const state = {
  posts: [],
  postToSearch: [],
  users: [],
  searchValue: '',
  limit: 10,
  start: 0,
  alert: false,
}

const getters = {
  allPosts: state => state.posts,
  allUsers: state => state.users,
  start: state => state.start,
  limit: state => state.limit,
  alert: state => state.alert,
  searchValue: state => state.searchValue
}

const actions = {
  async loadPosts({commit}) {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(({data}) => {
        commit('setPosts', data);
        commit('setPostsToSearch', data);
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
    console.log('id' + id);
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    commit('deletePost', id);
  }
}

const mutations = {
  setPosts: (state, posts) => (state.posts = posts),
  setPostsToSearch: (state, posts) => (state.postToSearch = posts),
  setUsers: (state, users) => (state.users = users),
  deletePost(state, id){
    state.posts = state.posts.filter(post => post.id !== id);
    state.postToSearch = state.postToSearch.filter(post => post.id !== id);
  },
  sortByName(state, sortKey) {
    const posts = state.posts;

    if (sortKey === 'titleDesc'){
      posts.sort((a,b) => a.title < b.title ? 1 : -1);
    } else if (sortKey === 'titleAsc') {
      posts.sort((a,b) => a.title > b.title ? 1 : -1);
    }

    state.posts = posts;
  },
  updateValue (state, value) {
    state.searchValue = value;
  },
  searchValueInArrays (state, key) {

    if (!isEmptyOrSpaces(state.searchValue)){
      state.start = 0;
      state.limit = 10;
      state.alert = false;

      let posts = state.postToSearch;
      let searchValue = state.searchValue;
      searchValue = searchValue.toLowerCase();

      const found = [];

      posts.map(post => {
        let title = post.title;
        title = title.toLowerCase();
        let body = post.body;
        body = body.toLowerCase();

        let isFoundTitle = title.search(searchValue);
        let isFoundBody = body.search(searchValue);

        if (key.searchBody && key.searchTitle){

          if (isFoundTitle >= 0 || isFoundBody >= 0) {
            found.push(post);
          }
          state.posts = found;

        } else if (key.searchTitle){

          if (isFoundTitle >= 0) {
            found.push(post);
          }
          state.posts = found;

        } else if (key.searchBody){
          if (isFoundBody >= 0) {
            found.push(post);
          }
          state.posts = found;

        } else {
          state.alert = true;
        }
      })
    }
    else {
      state.alert = true;
    }

  },
  pagination(state, dir) {
    if (dir === 'next'){
      state.start += 10;
      state.limit += 10;
    } else if (dir === 'previous'){
      state.start -= 10;
      state.limit -= 10;
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
