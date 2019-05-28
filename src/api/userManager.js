/* 显示全部用户 */
export const getUserList = (vm) => {
  vm.$axios.get('/shi/user/getUserList')
    .then((rep) => {
      vm.managerData = rep
      console.log('rep', vm.managerData[0].id)
    })
}

/* 根据用户名模糊查询 */
export const findLikeUsername = (vm) => {
  let data = {
    username: vm.searchUsername
  }
  vm.$axios.post('/shi/user/findLikeUsername', data)
    .then((rep) => {
      vm.managerData = rep
      console.log('rep', vm.managerData[0].id)
    })
}
/* 用户的修改 */
export const updateUser = (vm) => {
  let data = {
    id: vm.managerData[vm.nowIndex].id,
    address: vm.updateUserFormItem.address,
    balance: vm.updateUserFormItem.balance,
    password: vm.updateUserFormItem.password,
    trueName: vm.updateUserFormItem.trueName,
    username: vm.updateUserFormItem.username,
    phone: vm.updateUserFormItem.phone
  }
  vm.$axios.post('/shi/user/updateUser', data)
    .then((rep) => {
      vm.$Message.success('修改成功')
      getUserList(vm)
    })
}
/* 删除用户 */
export const deleteUser = (vm) => {
  let data = vm.managerData[vm.nowIndex].id
  vm.$axios.delete('/shi/user/deleteUser/' + data)
    .then((rep) => {
      vm.$Message.success('删除成功')
      getUserList(vm)
    })
}
