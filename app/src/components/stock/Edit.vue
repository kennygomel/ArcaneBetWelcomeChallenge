<template>
  <div class="container">
    <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>
    <template v-if="!loading">
      <h1 class="mb-4">
        <router-link tag="b-button" class="mb-2 mr-2" :to="{ name: 'StockList'}"
                     replace>
          <font-awesome-icon icon="chevron-left" class="mr-1"/> Go Back
        </router-link>
        <span>
          {{$route.params.id ? 'Edit Stock' : 'Add New Stock'}}
        </span>
      </h1>
      <hr>
      <form class="form-stock-edit" @submit.prevent="save">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="name" class="form-control" id="name">
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="form-group">
              <label for="price">Unit Price</label>
              <input v-model="price" type="number" class="form-control" id="price" placeholder="0" min="0">
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="form-group">
              <label for="interest">Interest</label>
              <input v-model="interest" type="number" class="form-control" id="interest" placeholder="0" min="0">
            </div>
          </div>
          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="duration">Duration in years</label>
              <input v-model="duration" type="number" class="form-control" id="duration" placeholder="0" min="0">
            </div>
          </div>
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
export default {
  name: 'StockEdit',
  data () {
    return {
      loading: true,
      saving: false,
      stock: null,
      name: null,
      price: null,
      interest: null,
      duration: null,
      error: null
    }
  },
  computed: {
    id: {
      get: function () {
        return this.$route.params.id
      }
    },
    valid: {
      get: function () {
        return this.name && this.price && this.interest && this.duration && (
          !this.stock || (
            this.name !== this.stock.name ||
            this.price.toString() !== this.stock.price.toString() ||
            this.interest.toString() !== this.stock.interest.toString() ||
            this.duration.toString() !== this.stock.duration.toString()
          )
        )
      }
    }
  },
  created () {
    if (localStorage.signedIn) {
      if (this.id) {
        this.$http.secured.get(`/stock/${this.id}`)
          .then(response => {
            this.stock = response.data
            this.name = this.stock.name
            this.price = this.stock.price
            this.interest = this.stock.interest
            this.duration = this.stock.duration
            this.loading = false
          })
          .catch(error => this.setError(error, 'Cannot get stock'))
      } else {
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
      var stockData = {}
      stockData.name = this.name
      stockData.price = this.price
      stockData.interest = this.interest
      stockData.duration = this.duration
      if (this.id) {
        this.$http.secured.patch(`/stock/${this.id}`, stockData)
          .then(() => {
            this.$router.replace('/stock')
          })
          .catch(error => {
            this.setError(error, 'Cannot update stock')
            this.saving = false
          })
      } else {
        this.$http.secured.post('/stock', stockData)
          .then(() => {
            this.$router.replace('/stock')
          })
          .catch(error => {
            this.setError(error, 'Cannot create stock')
            this.saving = false
          })
      }
    }
  }
}
</script>
