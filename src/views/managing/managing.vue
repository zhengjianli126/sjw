
<template>
    <div style="padding:15px;background:#FFF;overflow:hidden">
      <row style="margin-top:10px">
      <Col span="6">
        分部名称 ：
        <Select :disabled="organizeDisabled" v-model="organize" span="6" style="width:200px">
          <Option v-for="item in cityList" :value="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6">
        子分部名称 ：
        <Select :disabled="sonOrganizeDisabled" v-model="sonOrganize" span="6" style="width:200px">
          <Option v-for="item in cityList" :value="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6">
        理财师 ：
        <Select :disabled="userNameDisabled" v-model="userName" span="6" style="width:200px">
            <Option v-for="item in cityList" :value="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Button type="primary" icon="ios-search" @click="searchData()">搜索</Button>
    </row>
    <row>
        <Button type="primary" icon="arrow-swap" style="margin-top:10px;">转移</Button>
    </row>
    <div style="clear:both;padding-top:20px;">
      <Table border :columns="columns1" :data="data8"></Table>
    </div>
    <div style="margin-top:10px;float:right">
      <Page :total="total" :page-size="pageSize" show-total show-elevator @on-change="changepage"></Page>
    </div>
    </div>    
</template>
<script>
import util from 'utils';
import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                total: '',
                pageNum: '',
                pageSize: '',
                organize: '',
                sonOrganize: '',
                userName: '',
                organizeDisabled: false,
                sonOrganizeDisabled: false,
                userNameDisabled: false,
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
                data8: []
            }
        },
        mounted () {
            util.ajax({
                // url: '/SJWCRM/InitAuthoriMess', 
                url: 'https://easy-mock.com/mock/5a575c98ab5bcb1957178265/example/licaishi',
                method:'post',
                params: {
                    
                }
            }).then(res => {
                this.total = res.data.data.total,
                this.pageNum = res.data.data.pageNum,
                this.pageSize = res.data.data.pageSize,
                this.data8 = res.data.data.rows;

                // 保存一份请求的总数据
                this.detailtotal = res.data.data.total,
                this.detailpageNum = res.data.data.pageNum,
                this.detailpageSize = res.data.data.pageSize,
                this.detailData = res.data.data.rows;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                this.handleList();
            }).catch(err => {

            });
            
        },
        methods:{
            handleList(){
                this.total = this.total ;
                this.pageSize = this.pageSize;
                this.data8= this.data8;
                if(this.total  < this.pageSize){
                    this.data8 = this.data8;
                }else{
                    this.data8 = this.data8.slice(0,this.pageSize);
                }
            },
            changepage(index){
                this.detailtotal = this.detailtotal,
                this.detailpageNum = this.detailpageNum,
                this.detailpageSize = this.detailpageSize,
                this.detailData = this.detailData;
                
                var _start = ( index - 1 ) * this.detailpageSize;
                var _end = index * this.detailpageSize;
                this.data8 = this.detailData.slice(_start,_end);
            },
            searchData() {
                util.ajax({
                    url: '/SJWCRM/searchOrderDetails',
                    method: 'post',
                    params: {
                        LevelArent: Cookies.get('levelArent'),
                        userName: this.userName,
                        sonOrganize: this.sonOrganize,
                        organize: this.organize
                    }
                }).then(res => {
                    this.data8 = res.data.data.rows,

                    this.handleList();
                }).catch(error => {

                });
            }
            // async getData (){
            //   // let result = await util.ajax.get('/list');
            //    let result = await util.ajax.post('/listp',{a:"b"});
            //    if(result.data.success){
            //         this.data8 = result.data.data.rows;
            //    }else {

            //    }
            // }       
        },
        created(){
            // this.getData();
        }
    }
</script>
