<template>
    <div class="order">
      <div class="search">
        <Input v-model="searchName"  placeholder="请输入姓名" style="width: 260px" />
        <Button type="primary" style="margin-left: 15px" @click="findName">搜索</Button>
      </div>
      <Modal
        v-model="updateOrderModal"
        title="修改图书信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="updateOrderFormItem"   :label-width="80">
          <FormItem label="图书名称:" style="width: 340px" >
            <Input v-model="updateOrderFormItem.bookName" placeholder="请输入图书名称"></Input>
          </FormItem>
          <FormItem label="收货人:" style="width: 340px;" >
            <Input v-model="updateOrderFormItem.name" placeholder="请输入图书简介"></Input>
          </FormItem>
          <FormItem label="数量:" style="width: 340px;" >
            <Input v-model="updateOrderFormItem.number" placeholder="请输入作者"></Input>
          </FormItem>
          <FormItem label="联系方式:" style="width: 340px;" >
            <Input v-model="updateOrderFormItem.phone" placeholder="请输入联系单价"></Input>
          </FormItem>
          <FormItem label="总额:" style="width: 340px;" >
            <Input v-model="updateOrderFormItem.totalPrice" placeholder="请输入现价"></Input>
          </FormItem>
          <FormItem label="地址:" style="width: 340px;" >
            <Input v-model="updateOrderFormItem.address" placeholder="请输入小类"></Input>
          </FormItem>
        </Form>
      </Modal>
      <div class="table" style="margin-top: 20px">
        <Table :columns="orderColumns" :data="orderData" border></Table>
      </div>
    </div>
</template>

<script>
import * as order from '../../api/order'
export default {
  created () {
    order.getOrderList(this)
  },
  data () {
    return {
      updateOrderModal: false,
      searchName: '',
      orderColumns: [
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'name',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '收货地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '图书名称',
          key: 'bookName',
          align: 'center'
        },
        {
          title: '图书数量',
          key: 'number',
          align: 'center'
        },
        {
          title: '总额',
          key: 'totalPrice',
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
                    this.updateOrderModal = true
                    this.nowIndex = params.index
                    this.updateOrderFormItem.bookName = this.orderData[params.index].bookName
                    this.updateOrderFormItem.address = this.orderData[params.index].address
                    this.updateOrderFormItem.name = this.orderData[params.index].name
                    this.updateOrderFormItem.number = this.orderData[params.index].number
                    this.updateOrderFormItem.phone = this.orderData[params.index].phone
                    this.updateOrderFormItem.totalPrice = this.orderData[params.index].totalPrice
                    console.log('name', this.updateOrderFormItem.name)
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
                    order.deleteOrder(this)
                    console.log('id', this.orderData[params.index].id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      orderData: [
      ],
      updateOrderFormItem: {
        address: '',
        bookName: '',
        name: '',
        phone: '',
        number: '',
        totalPrice: ''
      }
    }
  },
  methods: {
    findName () {
      order.findLikeName(this)
    },
    ok () {
      order.updateOrder(this)
    },
    cancel () {}
  }
}
</script>

<style lang="less">
@import "order";
</style>
