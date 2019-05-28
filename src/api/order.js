
export const getOrderList = (vm) => {
  vm.$axios.get('/shi/order/getOrderList')
    .then((rep) => {
      vm.orderData = rep
    })
}
/* 订单修改 */
export const updateOrder = (vm) => {
  let data = {
    id: vm.orderData[vm.nowIndex].id,
    address: vm.updateOrderFormItem.address,
    bookName: vm.updateOrderFormItem.bookName,
    name: vm.updateOrderFormItem.name,
    number: vm.updateOrderFormItem.number,
    totalPrice: vm.updateOrderFormItem.totalPrice,
    phone: vm.updateOrderFormItem.phone
  }
  vm.$axios.post('/shi/order/updateOrder', data)
    .then((rep) => {
      vm.$Message.success('修改成功')
      getOrderList(vm)
    })
}
/* 删除订单 */
export const deleteOrder = (vm) => {
  let data = vm.orderData[vm.nowIndex].id
  vm.$axios.delete('/shi/order/deleteOrder/' + data)
    .then((rep) => {
      vm.$Message.success('删除成功')
      getOrderList(vm)
    })
}
/* 模糊查询 */
export const findLikeName = (vm) => {
  let data = {
    name: vm.searchName
  }
  vm.$axios.post('/shi/order/findLikeName', data)
    .then((rep) => {
      vm.orderData = rep
    })
}
