<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="secondary" class="mb-4">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <router-link tag="a" class="navbar-brand" :to="{ name: 'Home'}" replace>
        <font-awesome-icon icon="home" class="mr-2"/> <span>ArcaneBet</span>
      </router-link>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <router-link v-if="signedIn" tag="a" class="nav-link" :to="{ name: 'StockList'}" active-class="active"
            replace>
            <font-awesome-icon icon="list" class="mr-2"/> Stocks
          </router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link v-if="!signedIn" tag="a" class="nav-link" :to="{ name: 'SignIn'}" replace>
            Sign In / Sign Up
          </router-link>
          <b-nav-item-dropdown v-if="signedIn" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <img v-if="currentUser" :src="gravatarUrl" class="avatar mr-2" alt="Avatar"/>
              <em>
                {{currentUser && currentUser.first && currentUser.first !== '' ?
                currentUser.first : 'User'}}
              </em>
            </template>
            <router-link tag="a" class="dropdown-item" role="menuitem" :to="{ name: 'Profile'}"
                         replace>
              Profile
            </router-link>
            <b-dropdown-item href="#" @click="signOut">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  name: 'App',
  computed: {
    signedIn: {
      get: function () {
        return localStorage.signedIn
      }
    },
    currentUser: {
      get: function () {
        return localStorage.currentUser ? JSON.parse(localStorage.currentUser) : null
      }
    },
    gravatarUrl: {
      get: function () {
        const hash = this.currentUser ? md5(this.currentUser.email.toLowerCase()) : md5('')
        return `https://www.gravatar.com/avatar/${hash}?s=18&d=mp&r=g`
      }
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.signedIn
          delete localStorage.currentUser
          delete localStorage.csrf
          this.$router.replace('/')
          window.location.reload()
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>

<style scoped>
  .avatar {
    display: inline-block;
    margin-top: -.25rem;
    border-radius: 50%;
  }
</style>
