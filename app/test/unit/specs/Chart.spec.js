import Vue from 'vue'
import Chart from '@/components/common/Chart'

describe('Chart', () => {
  const stock = {
    price: 10000,
    interest: 5,
    duration: 10,
    created_at: (new Date()).toDateString()
  }
  const Constructor = Vue.extend(Chart)
  const vm = new Constructor({
    propsData: {
      stock: stock
    }
  }).$mount()

  it('successfully mounted', () => {
    expect(vm.stock).equal(stock)
    const yearFrom = (new Date()).getFullYear()
    const mockLabels = [yearFrom]
    const mockData = [stock.price.toFixed(2)]
    for (let year = yearFrom + 1; year <= yearFrom + stock.duration; year++) {
      mockLabels.push(year)
      mockData.push((stock.price * Math.pow(1 + (stock.interest / 100), year - yearFrom)).toFixed(2))
    }
    expect(JSON.stringify(vm.labels)).equal(JSON.stringify(mockLabels))
    expect(JSON.stringify(vm.data)).equal(JSON.stringify(mockData))
  })
})
