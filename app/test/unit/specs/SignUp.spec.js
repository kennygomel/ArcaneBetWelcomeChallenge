import Vue from 'vue'
import SignUp from '@/components/SignUp'

describe('SignUp', () => {
  const Constructor = Vue.extend(SignUp)
  const vm = new Constructor().$mount()

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('button[type="submit"] span').textContent)
      .to.equal('Sign Up')
  })

  it('sets the correct default data', () => {
    expect(vm.signingUp).equal(false)
    expect(vm.email).equal(null)
    expect(vm.password).equal(null)
    expect(vm.passwordConfirmation).equal(null)
    expect(vm.error).equal(null)
  })

  it('form is invalid by default', () => {
    expect(vm.valid).equal(null)
  })

  it('test invalid form', () => {
    vm.email = 'unittest'
    vm.password = 'unit'
    vm.passwordConfirmation = 'unit'
    expect(vm.valid).equal(false)
  })

  it('test fulfilled form', () => {
    vm.email = 'unit@test.com'
    vm.password = 'unit'
    vm.passwordConfirmation = 'unit'
    expect(vm.valid).equal(true)
  })
})
