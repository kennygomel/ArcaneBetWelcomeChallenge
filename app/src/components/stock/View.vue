<template>
  <div class="container">
    <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>
    <template v-if="stock">
      <h1 class="mb-4">
        <router-link tag="b-button" class="mb-2 mr-2" :to="{ name: 'StockList'}"
                     replace>
          <font-awesome-icon icon="chevron-left" class="mr-1"/> Go Back
        </router-link>
        <span>{{stock.name}}</span>
      </h1>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4">
          <b>Unit Price</b>
          <div id="price">{{stock.price | currency(2)}}</div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <b>Interest</b>
          <div id="interest">{{stock.interest}}%</div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-4">
          <b>Duration</b>
          <div id="duration">{{stock.duration}} year{{stock.duration > 1 ? 's' : ''}}</div>
        </div>
      </div>
      <hr>
      <Chart :stock="stock"/>
    </template>
    <template v-if="!stock">
      <div class="text-center">
        <font-awesome-icon icon="spinner" class="mr-2" spin/> Loading...
      </div>
    </template>
  </div>
</template>

<script>
import Chart from '../common/Chart'

export default {
  name: 'StockView',
  components: {Chart},
  data () {
    return {
      stock: null,
      error: null
    }
  },
  computed: {
    signedIn: {
      get: function () {
        return this.$store.state.signedIn
      }
    }
  },
  created () {
    if (this.signedIn) {
      this.$http.secured.get(`/stock/${this.$route.params.id}`)
        .then(response => {
          this.stock = response.data
        })
        .catch(error => this.setError(error, 'Cannot get stock'))
    } else {
      this.$store.commit('unsetCurrentUser')
      this.$router.replace('/signin')
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    }
  }
}
</script>
