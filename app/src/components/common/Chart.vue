<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['stock'],
  data () {
    return {
      labels: [],
      data: []
    }
  },
  mounted () {
    const yearFrom = (new Date(this.stock.created_at)).getFullYear()
    const yearTo = yearFrom + this.stock.duration
    this.labels = [yearFrom]
    this.data = [this.stock.price.toFixed(2)]
    for (let year = yearFrom + 1; year <= yearTo; year++) {
      this.labels.push(year)
      this.data.push((this.stock.price * Math.pow(1 + (this.stock.interest / 100), year - yearFrom)).toFixed(2))
    }
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: 'Unit Price',
          backgroundColor: '#007bff',
          data: this.data
        }
      ]
    }, {
      maintainAspectRatio: false
    })
  }
}
</script>
