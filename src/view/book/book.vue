<template>
    <div class="book">
      <div class="search">
        <Input v-model="searchBookName"  placeholder="请输入图书名" style="width: 260px" />
        <Button type="primary" style="margin-left: 15px" @click="findBookName">搜索</Button>
      </div>
      <Modal
        v-model="updateBookModal"
        title="修改图书信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="updateBookFormItem"   :label-width="80">
          <FormItem label="图书名称:" style="width: 340px" >
            <Input v-model="updateBookFormItem.bookName" placeholder="请输入图书名称"></Input>
          </FormItem>
          <FormItem label="图书简介:" style="width: 340px;" >
            <Input v-model="updateBookFormItem.introduce" placeholder="请输入图书简介"></Input>
          </FormItem>
          <FormItem label="作者:" style="width: 340px;" >
            <Input v-model="updateBookFormItem.author" placeholder="请输入作者"></Input>
          </FormItem>
          <FormItem label="单价:" style="width: 340px;" >
            <Input v-model="updateBookFormItem.price" placeholder="请输入联系单价"></Input>
          </FormItem>
          <FormItem label="现价:" style="width: 340px;" >
            <Input v-model="updateBookFormItem.nowPrice" placeholder="请输入现价"></Input>
          </FormItem>
          <FormItem label="小类:" style="width: 340px;" >
            <Input v-model="updateBookFormItem.smaType" placeholder="请输入小类"></Input>
          </FormItem>
          <FormItem label="大类:" style="width: 340px;" >
            <Input v-model="updateBookFormItem.bigType"  placeholder="请输入大类"></Input>
          </FormItem>
        </Form>
      </Modal>
      <div class="table" style="margin-top: 20px">
        <Table :columns="bookColumns" :data="bookData" border></Table>
      </div>
    </div>
</template>

<script>
import * as book from '../../api/book'
export default {
  created () {
    book.getBookList(this)
  },
  data () {
    return {
      searchBookName: '',
      updateBookModal: false,
      nowIndex: 0,
      bookColumns: [
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '图书名',
          key: 'bookName',
          align: 'center',
          width: 120
        },
        {
          title: '图书简介',
          key: 'introduce',
          align: 'center'
        },
        {
          title: '单价',
          key: 'price',
          align: 'center'
        },
        {
          title: '现价',
          key: 'nowPrice',
          align: 'center'
        },
        {
          title: '作者',
          key: 'author',
          align: 'center'
        },
        {
          title: '图书小类',
          key: 'smaType',
          align: 'center'
        },
        {
          title: '图书大类',
          key: 'bigType',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 160,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.updateBookModal = true
                    this.nowIndex = params.index
                    this.updateBookFormItem.bookName = this.bookData[params.index].bookName
                    this.updateBookFormItem.introduce = this.bookData[params.index].introduce
                    this.updateBookFormItem.author = this.bookData[params.index].author
                    this.updateBookFormItem.nowPrice = this.bookData[params.index].nowPrice
                    this.updateBookFormItem.price = this.bookData[params.index].price
                    this.updateBookFormItem.bigType = this.bookData[params.index].bigType
                    this.updateBookFormItem.smaType = this.bookData[params.index].smaType
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.nowIndex = params.index
                    book.deleteBook(this)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      bookData: [
      ],
      updateBookFormItem: {
        bookName: '',
        introduce: '',
        author: '',
        nowPrice: '',
        price: '',
        bigType: '',
        smaType: ''
      }
    }
  },
  methods: {
    findBookName () {
      book.findLikeBookname(this)
    },
    ok () {
      book.updateBook(this)
    },
    cancel () {}
  }
}
</script>

<style lang="less">
@import "book";
</style>
