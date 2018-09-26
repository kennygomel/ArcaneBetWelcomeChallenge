<template>
  <div class="container">
    <div v-if="error" class="alert alert-danger mb-4">{{ error }}</div>
    <div class="row">
      <div class="col-xs-12 col-sm-8">
        <h1 class="mb-4">Your Stocks</h1>
      </div>
      <div class="col-xs-12 col-sm-4 text-right">
        <router-link tag="a" class="btn btn-success mt-2 btn-stock-add" :to="{ name: 'StockAdd'}"
                     replace>
          <font-awesome-icon icon="plus" class="mr-1"/> Add New
        </router-link>
      </div>
    </div>
    <b-table striped hover :items="stocks" :fields="fields" v-if="!loading">
      <template slot="name" slot-scope="data">
        <router-link tag="a" class="link-stock-view" :to="{name: 'StockView', params: {id: data.item.id}}">
          {{data.item.name}}
        </router-link>
      </template>
      <template slot="actions" slot-scope="data">
        <b-button-group size="sm">
          <router-link tag="button" class="btn btn-primary btn-stock-view" :to="{ name: 'StockView', params: {id: data.item.id}}"
                       replace>
            <font-awesome-icon icon="eye"/>
          </router-link>
          <router-link tag="button" class="btn btn-success btn-stock-edit" :to="{ name: 'StockEdit', params: {id: data.item.id}}"
                       replace>
            <font-awesome-icon icon="pencil-alt"/>
          </router-link>
          <b-button variant="danger" class="btn-stock-delete" @click="removeStock(data.item)">
            <font-awesome-icon icon="trash-alt"/>
          </b-button>
        </b-button-group>
      </template>
    </b-table>
    <template v-if="loading">
      <div class="text-center">
        <font-awesome-icon icon="spinner" class="mr-2" spin/> Loading...
      </div>
    </template>
  </div>
</template>

<script>
import accounting from '../../common/accounting.min'

export default {
  name: 'StockList',
  data () {
    return {
      loading: true,
      stocks: [],
      newStock: [],
      error: '',
      editedStock: '',
      fields: [
        {
          key: 'name',
          sortable: true,
          isRowHeader: true,
          thStyle: {
            'min-width': '200px'
          }
        },
        {
          key: 'price',
          label: 'Unit Price',
          sortable: true,
          formatter: function (value) {
            return accounting.formatMoney(value, '$', 2)
          }
        },
        {
          key: 'interest',
          sortable: true,
          formatter: function (value) {
            return `${value}%`
          }
        },
        {
          key: 'duration',
          label: 'Duration',
          sortable: true,
          formatter: function (value) {
            return `${value} year${value > 1 ? 's' : ''}`
          }
        },
        {
          key: 'created_at',
          label: 'Created',
          sortable: true,
          sortingDirection: 'DESC',
          formatter: function (value) {
            return (new Date(value)).toLocaleString()
          }
        },
        {
          key: 'updated_at',
          label: 'Updated',
          sortable: true,
          formatter: function (value) {
            return (new Date(value)).toLocaleString()
          }
        },
        {
          key: 'actions',
          label: 'Actions',
          tdClass: 'text-center'
        }
      ]
    }
  },
  computed {
    signedIn: {
      get: function () {
        return this.$store.state.signedIn
      }
    }
  },
  created () {
    if (this.signedIn) {
      this.$http.secured.get('/stock')
        .then(response => {
          this.stocks = response.data
          this.loading = false
        })
        .catch(error => this.setError(error, 'Cannot get stocks'))
    } else {
      this.$store.commit('unsetCurrentUser')
      this.$router.replace('/signin')
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    removeStock (stock) {
      this.$http.secured.delete(`/stock/${stock.id}`)
        .then(() => {
          this.stocks.splice(this.stocks.indexOf(stock), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete stock'))
    }
  }
}
</script>
