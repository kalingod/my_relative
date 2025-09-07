export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/search/index',
    'pages/invite/index',
    'pages/profile/index',
    'pages/relations/index',
    'pages/invite/detail',
    'pages/user/public'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Relative Net',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999',
    selectedColor: '#0066ff',
    backgroundColor: '#fff',
    list: [
      { pagePath: 'pages/home/index', text: '我的图谱' },
      { pagePath: 'pages/search/index', text: '搜索' },
      { pagePath: 'pages/invite/index', text: '邀请' },
      { pagePath: 'pages/profile/index', text: '我的' }
    ]
  }
});
