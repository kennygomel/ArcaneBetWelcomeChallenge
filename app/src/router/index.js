import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import Profile from '@/components/Profile'
import StockList from '@/components/stock/List'
import StockEdit from '@/components/stock/Edit'
import StockView from '@/components/stock/View'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/stock',
      name: 'StockList',
      component: StockList
    },
    {
      path: '/stock/add',
      name: 'StockAdd',
      component: StockEdit
    },
    {
      path: '/stock/edit/:id',
      name: 'StockEdit',
      component: StockEdit
    },
    {
      path: '/stock/:id',
      name: 'StockView',
      component: StockView
    }
  ]
})
