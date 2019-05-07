import Cookies from 'js-cookie'
export const login = ({ username, password, vm }) => {
  const data = {
    name: username,
    password: password
  }
  vm.$axios.post('/shi/manager/login', data)
    .then(rep => {
      Cookies.set('JWT-Token', rep.data)
      console.log('登录', rep)
      if (rep === false) {
        vm.$Message.error('用户名或密码错误，请重新登录！')
      } else if (rep === true) {
        vm.$Message.success('登录成功')
        Cookies.set('name', username)
        vm.$router.push({path: '/manager'})
      }
    })
    .catch(e => {
      vm.$Message.error('用户名或密码错误，请重新登录！')
    })
}
