
<template>
    <div style="padding:15px;background:#FFF;overflow:hidden">
      <row style="margin-top:10px">
      <Col span="6">
        分部名称 ：
        <Select v-model="organize" span="6" style="width:200px">
          <Option v-for="item in cityList" :value="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6">
        子分部名称 ：
        <Select v-model="sonOrganize" span="6" style="width:200px">
          <Option v-for="item in cityList" :value="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6">
        理财师 ：
        <Select v-model="userName" span="6" style="width:200px">
            <Option v-for="item in cityList" :value="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Button type="primary" icon="ios-search">搜索</Button>
    </row>
    <row>
        <Button type="primary" icon="arrow-swap" style="margin-top:10px;">转移</Button>
    </row>
    <div style="clear:both;padding-top:20px;">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
       <div style="margin-top:10px;float:right">
      <Page :total="40" size="small" show-elevator show-sizer></Page>
    </div>
    <div style="margin-top:10px;float:right;line-height:22px;">显示？？条到？？条记录，总共？？条记录。</div>
    </div>    
</template>
<script>
import util from 'utils';
    export default {
        data () {
            return {
                cityList: [
                    {
                        value: 'beijing',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing',
                        label: '重庆市'
                    }
                ],
                columns1: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: "序号",
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '理财师',
                        key: 'userName',
                        align: 'center'
                    },
                    {
                        title: '客户数量',
                        key: 'customerCount',
                        align: 'center'
                    },
                    {
                        title: '子分部名称',
                        align: 'center',
                        key: 'sonOrganize'
                    },
                    {
                        title: '分布名称',
                        align: 'center',
                        key: 'organize'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '绑定')
                            ]);
                        }
                    }

                ],
                data1: []
            }
        },
        mounted () {
            this.initManage();
        },
        methods:{
            initManage() {
                util.ajax({
                    // url: '/SJWCRM/InitAuthoriMess', 
                    url: 'https://easy-mock.com/mock/5a575c98ab5bcb1957178265/example/licaishi',
                    method:'post',
                    params: {
                        
                    }
                }).then(res => {
                    this.data1 = res.data.data.rows;
                }).catch(err => {

                });
            },
            async getData (){
              // let result = await util.ajax.get('/list');
               let result = await util.ajax.post('/listp',{a:"b"});
               if(result.data.success){
                    this.data1 = result.data.data.rows;
               }else {

               }
            }       
        },
        created(){
            this.getData();
        }
    }
</script>
