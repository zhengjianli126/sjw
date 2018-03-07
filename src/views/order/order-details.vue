<style lang="less">
    @import './order-details.less';
    
</style>
<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <row style="margin-top:10px">
        <i-col span="6">
            查询日期 ：
            <Date-picker v-model="StarTime" type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
        </i-col>
        <i-col span="5">
          至 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Date-picker type="date" v-model="EndTime" placeholder="选择日期" style="width: 200px"></Date-picker>
        </i-col>
    </row>
    <row style="margin-top:10px">
      <i-col span="6">
        分部名称 ：
        <i-select :disabled="organizeDisabled" v-model="organize" span="6" style="width:200px">
          <i-option v-for="item in cityList1" :value="item.value">{{ item.label }}</i-option>
        </i-select>
      </i-col>
      <i-col span="6">
        子分部名称 ：
        <i-select :disabled="sonOrganizeDisabled" v-model="sonOrganize" span="6" style="width:200px">
          <i-option v-for="item in cityList2" :value="item.value">{{ item.label }}</i-option>
        </i-select>
      </i-col>
      <i-col span="6">
        理财师 ：
        <i-select :disabled="userNameDisabled" v-model="userName" span="6" style="width:200px">
            <i-option v-for="item in cityList3" :value="item.value">{{ item.label }}</i-option>
        </i-select>
      </i-col>
      <i-button type="primary" icon="ios-search" @click="searchData()">搜索</i-button>
    </row>
    <h2 style="margin-top:40px">总数据<Span style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2>
    <div style="width:600px;margin-top:10px;">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <div  style="margin-top:40px;">
      <Col span="5"><h2>订单详情<Span style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2></Col>
      <Col span="3"><Button type="primary" icon="ios-cloud-download" @click="exportData(3)">导出</Button></Col>
    </div>
    <div style="clear:both;padding-top:20px;">
      <Table border :columns="columns8" :data="data8" size="small" ref="table"></Table>
    </div>
    <div style="margin-top:10px;float:right">
      <Page :total="total" :page-size="pageSize" show-total show-elevator @on-change="changepage"></Page>
    </div>
  </div>
</template>
<script>
import util from '../../libs/util';
import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                StarTime: '',
                EndTime: '',
                organize: '',
                sonOrganize: '',
                userName: '',
                total: '',
                pageNum: '',
                pageSize: '',
                organizeDisabled: false,
                sonOrganizeDisabled: false,
                userNameDisabled: false,
                cityList1: [
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
                cityList2: [
                    {
                        value: 'beijing2',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai2',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen2',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou2',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing2',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing2',
                        label: '重庆市'
                    }
                ],
                cityList3: [
                    {
                        value: 'beijing3',
                        label: '北京市'
                    },
                    {
                        value: 'shanghai3',
                        label: '上海市'
                    },
                    {
                        value: 'shenzhen3',
                        label: '深圳市'
                    },
                    {
                        value: 'hangzhou3',
                        label: '杭州市'
                    },
                    {
                        value: 'nanjing3',
                        label: '南京市'
                    },
                    {
                        value: 'chongqing3',
                        label: '重庆市'
                    }
                ],
                columns1: [
                    {
                        title: '订单笔数',
                        key: 'totalOrder'
                    },
                    {
                        title: '交易额（元）',
                        key: 'totalTurnover'
                    },
                    {
                        title: '年华交易总额（元）',
                        key: 'totalTurnover_year'
                    }
                ],
                data1: [
                    {
                        totalOrder: '',
                        totalTurnover: '',
                        totalTurnover_year: ''
                    }
                ],
                columns8: [
                    {
                        "title": "序号",
                        "type": "index",
                       "fixed": "left",
                        "width": 100
                    },
                    {
                        "title": "用户名称",
                        "key": "customerName",
                        "width": 150,
                    },
                    {
                        "title": "订单号",
                        "key": "orderId",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "产品名称",
                        "key": "productName",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "产品期限",
                        "key": "productTime",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "交易金额",
                        "key": "orderMoney",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "投资年华金额",
                        "key": "annualinterestrate_money",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "投资时间",
                        "key": "orderDealTime",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "理财师",
                        "key": "userName",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "子分部名称",
                        "key": "sonOrganize",
                        "width": 150,
                  //      "sortable": true
                    },
                    {
                        "title": "分部名称",
                        "key": "organize",
                        "width": 150,
                    //    "sortable": true
                    }
                ],
                data8: [
                ]
        }
    },
    mounted() {console.log(Cookies.get('levelArent'))
        util.ajax({
            // url: '',
            url: 'https://easy-mock.com/mock/5a575c98ab5bcb1957178265/example/initdetail', 
            method:'post',
            params: {
                
            }
        }).then(res => {
            this.total = res.data.data.total,
            this.pageNum = res.data.data.pageNum,
            this.pageSize = res.data.data.pageSize,
            this.data1[0].totalOrder = res.data.data.rows[0].totalData.totalOrder,
            this.data1[0].totalTurnover = res.data.data.rows[0].totalData.totalTurnover,
            this.data1[0].totalTurnover_year = res.data.data.rows[0].totalData.totalTurnover_year,
            this.data8 = res.data.data.rows,
            this.Id = res.data.data.Id,
            this.LevelArent = res.data.data.LevelArent,

            // 保存一份请求的总数据
            this.detailtotal = res.data.data.total,
            this.detailpageNum = res.data.data.pageNum,
            this.detailpageSize = res.data.data.pageSize,
            this.detailData = res.data.data.rows;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            this.handleList();
            

        }).catch(error => {
            // alert('请求错误')
        });

    },
    created(){

        },
    methods: {
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
                    StarTime: this.StarTime,
                    EndTime: this.EndTime,
                    Id: this.Id,
                    LevelArent: this.LevelArent,
                    userName: this.userName,
                    sonOrganize: this.sonOrganize,
                    organize: this.organize
                }
            }).then(res => {
                this.data1[0].totalOrder = res.data.data.rows[0].totalData.totalOrder,
                this.data1[0].totalTurnover = res.data.data.rows[0].totalData.totalTurnover,
                this.data1[0].totalTurnover_year = res.data.data.rows[0].totalData.totalTurnover_year,
                this.data8 = res.data.data.rows,

                this.handleList();
            }).catch(error => {

            });
        },
        // getOrderList(p) {
        //     util.ajax({
        //         url: 'https://easy-mock.com/mock/5a575c98ab5bcb1957178265/example/init11111', 
        //         method:'post',
        //         params: {
        //             StarTime: this.StarTime,
        //             EndTime: this.EndTime,
        //             Id: '123',
        //             userName: this.userName,
        //             sonOrganize: this.sonOrganize,
        //             organize: this.organize
        //         }
        //     }).then(res => {
        //         this.totalPage = res.data.data.totalPage,
        //         this.total = res.data.data.total,
        //         this.pageNum = res.data.data.pageNum,
        //         this.pageSize = res.data.data.pageSize,
        //         this.data1[0].totalOrder = res.data.data.rows[0].totalData.totalOrder,
        //         this.data1[0].totalTurnover = res.data.data.rows[0].totalData.totalTurnover,
        //         this.data1[0].totalTurnover_year = res.data.data.rows[0].totalData.totalTurnover_year,
        //         this.data8 = res.data.data.rows
                
        //     }).catch(error => {
        //         // alert('请求错误')
        //     });
        // },
        exportData (type) {
            if (type === 1) {
                this.$refs.table.exportCsv({
                    filename: 'The original data'
                });
            } else if (type === 2) {
                this.$refs.table.exportCsv({
                    filename: 'Sorting and filtering data',
                    original: false
                });
            } else if (type === 3) {
                this.$refs.table.exportCsv({
                    filename: '订单详情',
                    columns: this.columns8,
                    data: this.detailData
                });
            }
        }
    }
  }
</script>
