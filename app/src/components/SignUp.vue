<template>
  <form class="form-signup" @submit.prevent="signup">
    <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>
    <div class="form-group">
      <label for="email">Email address</label>
      <input v-model="email" type="email" class="form-control" id="email"
        placeholder="email@example.com">
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input v-model="password" type="password" class="form-control" id="password"
        placeholder="Password">
    </div>
    <div class="form-group">
      <label for="password">Password Confirmation</label>
      <input v-model="passwordConfirmation" type="password" class="form-control"
        id="passwordConfirmation" placeholder="Password Confirmation">
    </div>
    <button type="submit" class="btn btn-primary mb-3" :disabled="!valid || signingUp">
      <template v-if="!signingUp">
        <font-awesome-icon icon="sign-in-alt" class="mr-2"/> <span>Sign Up</span>
      </template>
      <template v-if="signingUp">
        <font-awesome-icon icon="spinner" class="mr-2" spin/> <span>Signing Up...</span>
      </template>
    </button>
    <div class="mb-3">
        <router-link to="/signin">
          <font-awesome-icon icon="sign-in-alt" class="mr-2"/> Sign in
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
  name: 'SignUp',
  data () {
    return {
      signingUp: false,
      email: null,
      password: null,
      passwordConfirmation: null,
      error: null
    }
  },
  computed: {
    valid: {
      get: function () {
        // eslint-disable-next-line
        var emailRegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        return this.email && this.password && this.passwordConfirmation &&
          emailRegExp.test(String(this.email).toLowerCase()) &&
          this.password === this.passwordConfirmation
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
    signup () {
      this.signingUp = true
      const signUp = {
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation
      }
      this.$http.plain.post('/signup', signUp)
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error, 'Cannot sign you up'))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      this.$http.plain.get('/me')
        .then(meResponse => {
          this.$store.commit('setCurrentUser',
            { currentUser: meResponse.data.data.attributes, csrf: response.data.csrf })
          this.$router.replace('/stock')
          window.location.reload()
        })
        .catch(error => this.signupFailed(error, 'Cannot get your profile'))
    },
    signupFailed (error, message) {
      this.setError(error, message)
      this.$store.commit('unsetCurrentUser')
      this.signingUp = false
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/stock')
      }
    }
  }
}
</script>

<style scoped>
  .form-signup {
    width: 70%;
    max-width: 500px;
    padding: 10% 15px;
    margin: 0 auto;
  }
</style>
