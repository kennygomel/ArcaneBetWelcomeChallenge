<template>
  <form class="form-signin" @submit.prevent="signin">
    <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>
    <div class="form-group">
      <label for="email">Email address</label>
      <input v-model="email" type="email" class="form-control" id="email" placeholder="email@example.com">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary mb-3" :disabled="!valid || signingIn">
      <template v-if="!signingIn">
        <font-awesome-icon icon="sign-in-alt" class="mr-2"/> <span>Sign In</span>
      </template>
      <template v-if="signingIn">
        <font-awesome-icon icon="spinner" class="mr-2" spin/> <span>Signing In...</span>
      </template>
    </button>
    <div class="mb-3">
        <router-link to="/signup">
          <font-awesome-icon icon="user-plus" class="mr-2"/> Sign Up
        </router-link>
    </div>
    <div class="text-center">
      <router-link to="/">
        <font-awesome-icon icon="home" class="mr-2"/> Back to homepage
      </router-link>
    </div>
  </form>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      signingIn: false,
      email: null,
      password: null,
      error: null
    }
  },
  computed: {
    valid: {
      get: function () {
        // eslint-disable-next-line
        var emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        return this.email && this.password && emailRegExp.test(String(this.email).toLowerCase())
      }
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signin () {
      this.signingIn = true
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error, 'Cannot sign you in'))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response, 'Cannot sign you in')
        return
      }
      this.$http.plain.get('/me')
        .then(meResponse => {
          this.$store.commit('setCurrentUser',
            { currentUser: meResponse.data.data.attributes, csrf: response.data.csrf })
          this.$router.replace('/stock')
          window.location.reload()
        })
        .catch(error => this.signinFailed(error, 'Cannot get your profile'))
    },
    signinFailed (error, message) {
      this.setError(error, message)
      this.signingIn = false
      this.$store.commit('unsetCurrentUser')
    },
    checkSignedIn () {
      if (this.$store.state.signedIn) {
        this.$router.replace('/stock')
      }
    }
  }
}
</script>

<style scoped>
  .form-signin {
    width: 70%;
    max-width: 500px;
    padding: 10% 15px;
    margin: 0 auto;
  }
</style>
