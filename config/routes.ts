export default [
  {path:'/',name:'主页',icon:'smile', component:'./Index'},
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register'}
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: '接口分析', icon: 'analysis', path: '/admin/interface_chart', component: './Admin/InterfaceChart' },

    ],
  },
  {
    // 动态路由
    path: '/interface_info/:id',
    name: '查看接口',
    component: './InterfaceInfo',
    // 不在菜单页显示
    hideInMenu: true
  },
  { path: '*', layout: false, component: './404' },
];
