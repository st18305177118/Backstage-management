
export const getBookList = (vm) => {
  vm.$axios.get('/shi/book/getBookList')
    .then((rep) => {
      vm.bookData = rep
    })
}
/* 根据书名模糊查询 */
export const findLikeBookname = (vm) => {
  let data = {
    bookName: vm.searchBookName
  }
  vm.$axios.post('/shi/book/findLike', data)
    .then((rep) => {
      vm.bookData = rep
      console.log('rep', vm.bookData[0].id)
    })
}
/* 书籍编辑 */
export const updateBook = (vm) => {
  let data = {
    id: vm.bookData[vm.nowIndex].id,
    bookName: vm.updateBookFormItem.bookName,
    introduce: vm.updateBookFormItem.introduce,
    author: vm.updateBookFormItem.author,
    nowPrice: vm.updateBookFormItem.nowPrice,
    price: vm.updateBookFormItem.price,
    bigType: vm.updateBookFormItem.bigType,
    smaType: vm.updateBookFormItem.smaType
  }
  vm.$axios.post('/shi/book/updateBook', data)
    .then((rep) => {
      vm.$Message.success('修改成功')
      getBookList(vm)
    })
}
/* 删除书籍 */
export const deleteBook = (vm) => {
  let data = vm.bookData[vm.nowIndex].id
  vm.$axios.delete('/shi/book/deleteBook/' + data)
    .then((rep) => {
      vm.$Message.success('删除成功')
      getBookList(vm)
    })
}
