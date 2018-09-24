import Vue from 'vue'
import SignIn from '@/components/SignIn'

describe('SignIn', () => {
  const Constructor = Vue.extend(SignIn)
  const vm = new Constructor().$mount()

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('button[type="submit"] span').textContent)
      .to.equal('Sign In')
  })

  it('sets the correct default data', () => {
    expect(vm.signingIn).equal(false)
    expect(vm.email).equal(null)
    expect(vm.password).equal(null)
    expect(vm.error).equal(null)
  })

  it('form is invalid by default', () => {
    expect(vm.valid).equal(null)
  })

  it('test invalid form', () => {
    vm.email = 'unittest'
    vm.password = 'unit'
    expect(vm.valid).equal(false)
  })

  it('test fulfilled form', () => {
    vm.email = 'unit@test.com'
    vm.password = 'unit'
    expect(vm.valid).equal(true)
  })
})
