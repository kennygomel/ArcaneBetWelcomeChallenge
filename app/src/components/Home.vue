<template>
  <div class="container">
    <h1 class="mb-4">Stock productivity calculator</h1>
    <div class="row mb-4">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="form-group">
          <label for="price">Unit Price</label>
          <input @input="updateStock" v-model="price" type="number" class="form-control" id="price" placeholder="0" min="0">
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="form-group">
          <label for="interest">Interest</label>
          <input @input="updateStock" v-model="interest" type="number" class="form-control" id="interest" placeholder="0" min="0">
        </div>
      </div>
      <div class="col-xs-12 col-md-4">
        <div class="form-group">
          <label for="duration">Duration in years</label>
          <input @input="updateStock" v-model="duration" type="number" class="form-control" id="duration" placeholder="0" min="0">
        </div>
      </div>
    </div>
    <Chart v-if="stock" :stock="stock"/>
    <h3 v-if="stock" class="text-center mt-4">Approximately profit: ${{profit}}</h3>
  </div>
</template>

<script>
import Chart from './common/Chart'
export default {
  name: 'Home',
  components: {Chart},
  data () {
    return {
      stock: null,
      price: null,
      interest: null,
      duration: null,
      profit: null
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
      this.$router.replace('/stock')
    }
  },
  methods: {
    updateStock: function () {
      if (this.price && this.interest && this.duration) {
        this.stock = null
        this.profit = null
        setTimeout(() => {
          this.stock = {
            price: this.price,
            interest: this.interest,
            duration: this.duration,
            created_at: (new Date()).toDateString()
          }
          this.profit = (this.price * Math.pow(1 + (this.interest / 100), this.duration)).toFixed(2)
        }, 10)
      } else {
        this.stock = null
        this.profit = null
      }
    }
  }
}
</script>
