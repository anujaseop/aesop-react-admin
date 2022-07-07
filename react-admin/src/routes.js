import React from 'react'

// Setting Component
import Setting from './views/Setting/Setting'

const FAQ = React.lazy(() => import('./views/Setting/FAQ/FAQ'))
const CMS = React.lazy(() =>
  import('./views/Setting/CMS/ContentManagementSystem')
)
const News = React.lazy(() => import('./views/Setting/News/News'))
const MediaManagement = React.lazy(() =>
  import('./views/Setting/MediaManagement/MediaManagement')
)
// User
const User = React.lazy(() => import('./views/User/User'))
const UserView = React.lazy(() => import('./views/User/View'))
const AddUser = React.lazy(() => import('./views/User/AddUser'))
const PaymentHistory = React.lazy(() =>
  import('./views/PaymenyHistory/PaymentHistory')
)
// consultant

const Consultant = React.lazy(() => import('./views/Consultant/View'))
const PaymentIntimate = React.lazy(() =>
  import('./views/paymentIntimate/index')
)
const UserSubscribe = React.lazy(() => import('./views/Subscribe'))
const routes = [
  {
    path: '/settings',
    exact: true,
    name: 'Settings',
    component: Setting,
  },

  {
    path: '/settings/faq',
    exact: true,
    name: 'FAQ',
    component: FAQ,
  },
  {
    path: '/settings/content-management',
    exact: true,
    name: 'Content Management',
    component: CMS,
  },
  {
    path: '/news',
    exact: true,
    name: 'News',
    component: News,
  },

  {
    path: '/notification',
    exact: true,
    name: 'Notifications',
    component: Notification,
  },
  {
    path: '/user',
    exact: true,
    name: 'User',
    component: User,
  },
  {
    path: '/user/investor/view/:id',
    exact: true,
    name: 'User detail',
    component: UserView,
  },
  {
    path: '/user/consultant/view/:id',
    exact: true,
    name: 'Consultant detail',
    component: Consultant,
  },
  {
    path: '/user/edit/:_id',
    exact: true,
    name: 'Edit user',
    component: AddUser,
  },
  {
    path: '/user/add',
    exact: true,
    name: 'Add user',
    component: AddUser,
  },
  {
    path: '/payment-history',
    exact: true,
    name: 'Payment history',
    component: PaymentHistory,
  },
  {
    path: '/payment-intimate',
    exact: true,
    name: 'Payment Intimate',
    component: PaymentIntimate,
  },
  {
    path: '/user-payment-history',
    exact: true,
    name: 'User Payment History ',
    component: UserSubscribe,
  },
]

export default routes
