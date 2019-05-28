<template>
    <div class="manager">
      <div class="search">
        <Input v-model="searchUsername"  placeholder="请输入用户的用户名" style="width: 260px" />
        <Button type="primary" style="margin-left: 15px" @click="findUsername">搜索</Button>
      </div>
      <Modal
        v-model="updateUserModal"
        title="修改用户信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="updateUserFormItem"   :label-width="80">
          <FormItem label="用户名:" style="width: 340px" >
            <Input v-model="updateUserFormItem.username" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码:" style="width: 340px;" >
            <Input v-model="updateUserFormItem.password" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem label="收货地址:" style="width: 340px;" >
            <Input v-model="updateUserFormItem.address" placeholder="请输入收货地址"></Input>
          </FormItem>
          <FormItem label="联系方式:" style="width: 340px;" >
            <Input v-model="updateUserFormItem.phone" placeholder="请输入联系方式"></Input>
          </FormItem>
          <FormItem label="真实姓名:" style="width: 340px;" >
            <Input v-model="updateUserFormItem.trueName" placeholder="请输入真实姓名"></Input>
          </FormItem>
          <FormItem label="余额:" style="width: 340px;" >
            <Input v-model="updateUserFormItem.balance" disabled placeholder="请输入余额"></Input>
          </FormItem>
        </Form>
      </Modal>
      <div class="table" style="margin-top: 20px">
        <Table :columns="managerColumns" :data="managerData" border></Table>
      </div>
    </div>
</template>

<script>
import * as manager from '../../api/userManager'
export default {
  created () {
    manager.getUserList(this)
  },
  data () {
    return {
      updateUserModal: false, // 修改用户信息模态框
      searchUsername: '', // 输入的用户名
      nowIndex: 0,
      managerColumns: [
        {
          type: 'index',
          title: '序号',
          width: 80,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'username',
          align: 'center'
        },
        {
          title: '密码',
          key: 'password',
          align: 'center'
        },
        {
          title: '收货地址',
          key: 'address',
          align: 'center'
        },
        {
          title: '余额',
          key: 'balance',
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          align: 'center'
        },
        {
          title: '真实姓名',
          key: 'trueName',
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
                    this.updateUserModal = true
                    this.nowIndex = params.index
                    this.updateUserFormItem.username = this.managerData[params.index].username
                    this.updateUserFormItem.password = this.managerData[params.index].password
                    this.updateUserFormItem.address = this.managerData[params.index].address
                    this.updateUserFormItem.balance = this.managerData[params.index].balance
                    this.updateUserFormItem.phone = this.managerData[params.index].phone
                    this.updateUserFormItem.trueName = this.managerData[params.index].trueName
                    console.log('用户名', this.managerData[params.index].username)
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
                    console.log('yonghu', params.index)
                    console.log('yonghuss', params.index)
                    manager.deleteUser(this)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      managerData: [],
      updateUserFormItem: {
        address: '',
        balance: '',
        password: '',
        trueName: '',
        username: '',
        phone: ''
      }
    }
  },
  methods: {
    findUsername () {
      manager.findLikeUsername(this)
    },
    ok () {
      manager.updateUser(this)
    },
    cancel () {}
  }
}
</script>

<style lang="less">
@import "manager";
</style>
