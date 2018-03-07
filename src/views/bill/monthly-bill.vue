<style lang="less" scoped>
.tradeVolumeSta{float: left;width:100%;background:#FFF;height:100px;margin-top:10px;}
.tradeV_left{display: block;margin: 1%;width: 98%;height: 90px;border: 1px solid #cccccc;float:left;}
.tradeV_left{div{display: block;float: left;width:33.33%;height: 100px;line-height: 20px;text-align: center;margin-top:25px;}}
</style>
<template>
<div>
    <div class="tradeVolumeSta">
        <div class="tradeV_left">
            <div><span>{{this.thisMonthCommition}}</span><br/><span>本月佣金（元）</span></div>
            <div><span>{{this.lastMonthCommition}}</span><br/><span>上月佣金（元）</span></div>
            <div><span>{{this.totalCommition}}</span><br/><span>累计佣金（元）</span></div>
        </div>
    </div>
    <div style="padding:15px;background:#FFF;overflow:hidden">
        <row style="margin-top:10px">
            <Col span="8">
                选择月份 ：<Date-picker v-model="DateTime" type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
            </Col>
        </row>
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
                    <Option v-for="item in cityList2" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="6">
                理财师 ：
                <Select :v-model="userName" span="6" style="width:200px">
                    <Option v-for="item in cityList3" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Button @click="searchBtn" type="primary" icon="ios-search">搜索</Button>
        </row>
        <h2 style="margin-top:40px">总数据<Span style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2>
        <div style="width:600px;margin-top:10px;">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>

        <div style="margin-top:40px;">
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
</div>
</template>
<script>
import util from '../../libs/util';
export default {
    data () {
        return {
            cityList: [
                {value: 'fenbu1',label: '分部1区'},
                {value: 'fenbu2',label: '分部2区'},
                {value: 'fenbu3',label: '分部3区'}
            ],
            cityList2: [
                {value: 'zifenbu1',label: '子分部1区'},
                {value: 'zifenbu2',label: '子分部2区'},
                {value: 'zifenbu3',label: '子分部3区'}
            ],
            cityList3: [
                {value: 'licaishi1',label: '理财师1号'},
                {value: 'licaishi2',label: '理财师2号'},
                {value: 'licaishi3',label: '理财师3号'}
            ],
            organize: '',
            sonOrganize: '',
            userName: '',
            pageSize: '',
            total: '',
            DateTime: '',
            columns1: [
                {title: '交易总额（元）',key: 'totalTurnover'},
                {title: '年化交易总额（元）',key: 'totalTurnover_year'},
                {title: '佣金总额（元）',key: 'totalCommition'}
            ],
            data1: [
                {totalTurnover: '',totalTurnover_year: '',totalCommition: ''}
            ],
            columns8: [
                {"title": "序号", "type": "index", "fixed": "left", "width": 100},
                {"title": "佣金月份", "key": "commitionMonth", "width": 150},
                {"title": "交易额（元）", "key": "totalTurnover", "width": 150},
                {"title": "年化交易额（元）", "key": "totalTurnover_year", "width": 150},
                {"title": "佣金（元）", "key": "commition", "width": 150},
                {"title": "理财师", "key": "userName", "width": 150},
                {"title": "子分部名称", "key": "sonOrganize", "width": 150},
                {"title": "分部名称", "key": "organize", "width": 150},
            ],
            data8: [
                
            ]
        }
    },
    mounted() {
        util.ajax({
            url: '/SJWCRM/initCheckMonthAccount', 
            // url: 'https://easy-mock.com/mock/5a575c98ab5bcb1957178265/example/meiyueduizhang',
            method:'post',
            params: {
                
            }
        }).then(res => {
            this.total = res.data.data.total,
            this.pageNum = res.data.data.pageNum,
            this.pageSize = res.data.data.pageSize,
            this.thisMonthCommition = res.data.data.rows[0].thisMonthCommition,
            this.lastMonthCommition = res.data.data.rows[0].lastMonthCommition,
            this.totalCommition = res.data.data.rows[0].totalCommition,
            this.commition = res.data.data.rows[0].commition,
            this.data1[0].totalCommition = res.data.data.rows[0].totalCommition,
            this.data1[0].totalTurnover = res.data.data.rows[0].totalTurnover,
            this.data1[0].totalTurnover_year = res.data.data.rows[0].totalTurnover_year,
            this.data8 = res.data.data.rows,

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
        searchBtn() {
            util.ajax({
                url: '/SJWCRM/getCheckMonthAccount',
                method: 'post',
                params: {
                    DateTime: this.DateTime,
                    Id: '123',
                    userName: this.userName,
                    organize: this.organize,
                    sonOrganize: this.sonOrganize
                }
            }).then(res => {
                this.thisMonthCommition = res.data.data.rows[0].thisMonthCommition,
                this.lastMonthCommition = res.data.data.rows[0].lastMonthCommition,
                this.totalCommition = res.data.data.rows[0].totalCommition,
                this.commition = res.data.data.rows[0].commition,
                this.pageNum = res.data.data.pageNum,
                this.pageSize = res.data.data.pageSize,
                this.data1[0].totalCommition = res.data.data.rows[0].totalCommition,
                this.data1[0].totalTurnover = res.data.data.rows[0].totalTurnover,
                this.data1[0].totalTurnover_year = res.data.data.rows[0].totalTurnover_year,
                this.data8 = res.data.data.rows
            }).catch(err => {

            });
        },
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
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.data8.filter((data, index) => index < 4)
                });
            }
        }
    }
}
</script>