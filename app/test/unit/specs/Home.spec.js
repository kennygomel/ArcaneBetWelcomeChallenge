import Vue from 'vue'
import Home from '@/components/Home'

describe('Home', () => {
  const Constructor = Vue.extend(Home)
  const vm = new Constructor().$mount()

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Stock productivity calculator')
  })

  it('sets the correct default data', () => {
    expect(vm.stock).equal(null)
    expect(vm.price).equal(null)
    expect(vm.interest).equal(null)
    expect(vm.duration).equal(null)
    expect(vm.profit).equal(null)
  })

  it('provides a invalid data to chart', () => {
    vm.price = 10000
    vm.interest = null
    vm.duration = null
    vm.updateStock()
    expect(vm.stock).equal(null)
    expect(vm.profit).equal(null)
  })

  it('provides a valid data to chart', () => {
    vm.price = 10000
    vm.interest = 5
    vm.duration = 10
    vm.updateStock()
    expect(vm.stock).equal(null)
    expect(vm.profit).equal(null)
    setTimeout(() => {
      expect(vm.stock.price).equal(vm.price)
      expect(vm.stock.interest).equal(vm.interest)
      expect(vm.stock.duration).equal(vm.duration)
      console.log(vm.stock.created_at)
      expect(vm.profit).equal((vm.price * Math.pow(1 + (vm.interest / 100), vm.duration)).toFixed(2))
    }, 20)
  })
})
