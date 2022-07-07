export default {
  items: [
    {
      name: 'Users',
      url: '/user',
      icon: 'fas fa-users',
    },
    // {
    //   name: "Community Forum",
    //   url: "/community-forum",
    //   icon: "fa fa-users",
    // },
    // {
    //   name: 'Content Management',
    //   url: '/content-management',
    //   icon: 'fas fa-file-alt',
    // },
    {
      name: 'News',
      url: '/news',
      icon: 'fas fa-newspaper',
    },
    {
      name: 'User Payment History',
      url: '/user-payment-history',
      icon: 'fas fa-money',
    },
    {
      name: 'Payment History',
      url: '/payment-history',
      icon: 'fas fa-list',
    },
    {
      name: 'Payment Intimate',
      url: '/payment-intimate',
      icon: 'fas fa-money',
    },
    {
      name: 'Settings',
      url: '/settings',
      icon: 'icon-settings',
      children: [
        {
          name: 'Content Management',
          url: '/settings/content-management',
          // icon: 'fa fa-list-alt',
        },
      ],
    },
  ],
}
