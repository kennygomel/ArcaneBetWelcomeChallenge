<template>
  <div class="container">
    <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>
    <template v-if="!loading">
      <h1 class="mb-4">Profile</h1>
      <hr>
      <form class="form-edit-profile" @submit.prevent="save">
        <div class="form-group">
          <label>Gravatar</label>
          <div>
            <a target="_blank" :href="gravatarProfile" title="Change on Gravatar.com">
              <img :src="gravatarUrl" class="avatar mb-2" alt="Avatar"/>
            </a>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input v-model="email" type="email" class="form-control" id="email" disabled>
        </div>
        <div class="form-group">
          <label for="first">First Name</label>
          <input v-model="first" class="form-control" id="first" placeholder="First Name">
        </div>
        <div class="form-group">
          <label for="last">Last Name</label>
          <input v-model="last" class="form-control" id="last" placeholder="Last Name">
        </div>
        <div class="form-group">
          <label>Date of Birth</label>
          <v-date-picker
            id="dob"
            mode="single"
            v-model="dob"></v-date-picker>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="password" type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <div class="form-group">
          <label for="password">Password Confirmation</label>
          <input v-model="password_confirmation" type="password" class="form-control" id="password_confirmation" placeholder="Password Confirmation">
        </div>
        <button type="submit" class="btn btn-primary mt-2" :disabled="!valid || saving">
          <template v-if="!saving">
            <font-awesome-icon icon="save" class="mr-2"/> Save
          </template>
          <template v-if="saving">
            <font-awesome-icon icon="spinner" class="mr-2" spin/> Saving...
          </template>
        </button>
      </form>
    </template>
    <template v-if="loading">
      <div class="text-center">
        <font-awesome-icon icon="spinner" class="mr-2" spin/> Loading...
      </div>
    </template>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'Profile',
  data () {
    return {
      loading: true,
      saving: false,
      email: null,
      first: null,
      last: null,
      dob: '',
      password: null,
      password_confirmation: null,
      error: null
    }
  },
  computed: {
    currentUser: {
      get: function () {
        return JSON.parse(localStorage.getItem('currentUser'))
      },
      set: function (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
      }
    },
    gravatarProfile: {
      get: function () {
        const hash = this.currentUser ? md5(this.currentUser.email.toLowerCase()) : md5('')
        return `https://www.gravatar.com/${hash}`
      }
    },
    gravatarUrl: {
      get: function () {
        const hash = this.currentUser ? md5(this.currentUser.email.toLowerCase()) : md5('')
        return `https://www.gravatar.com/avatar/${hash}?s=128&d=mp&r=g`
      }
    },
    valid: {
      get: function () {
        return this.email !== this.currentUser.email || this.first !== this.currentUser.first ||
          this.last !== this.currentUser.last || (this.dob !== '' && this.dob !== this.currentUser.dob) ||
          ((this.password || this.password_confirmation) && this.password === this.password_confirmation)
      }
    }
  },
  created () {
    if (localStorage.signedIn) {
      if (this.currentUser) {
        this.email = this.currentUser.email
        this.first = this.currentUser.first
        this.last = this.currentUser.last
        this.dob = this.currentUser.dob ? new Date(this.currentUser.dob) : null
        this.loading = false
      }
    } else {
      this.$router.replace('/signin')
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    save () {
      this.saving = true
      var userData = JSON.parse(JSON.stringify(this.currentUser))
      userData.first = this.first
      userData.last = this.last
      userData.dob = this.dob
      if (this.password && this.password_confirmation) {
        userData.password = this.password
        userData.password_confirmation = this.password_confirmation
      }
      this.$http.secured.patch(`/user/${this.currentUser.id}`, userData)
        .then(() => {
          this.currentUser = userData
          window.location.reload()
        })
        .catch(error => {
          this.setError(error, 'Cannot update profile')
          this.saving = false
        })
    }
  }
}
</script>

<style>
.popover-container input {
  display: block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}
.popover-container input:focus {
  color: #495057;
  background-color: #fff;
  border-color: #80bdff;
  outline: 0;
  -webkit-box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
