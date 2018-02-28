<style lang="less" scoped>
.tradeVolumeSta{float: left;width:100%;background:#FFF;height:100px;margin-top:10px;}
.tradeV_left{display: block;margin: 1%;width: 98%;height: 90px;border: 1px solid #cccccc;float:left;}
.tradeV_left{div{display: block;float: left;width:33.33%;height: 100px;line-height: 20px;text-align: center;margin-top:25px;}}
</style>
<template>
<div>
    <div class="tradeVolumeSta">
        <div class="tradeV_left">
            <div><span>{{thisMonthCommition}}</span><br/><span>本月佣金（元）</span></div>
            <div><span>{{lastMonthCommition}}</span><br/><span>上月佣金（元）</span></div>
            <div><span>{{totalCommition}}</span><br/><span>累计佣金（元）</span></div>
        </div>
    </div>
    <div style="padding:15px;background:#FFF;overflow:hidden">
        <row style="margin-top:10px">
            <Col span="8">
                选择月份 ：<Date-picker :model.sync="commitionMonth" type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
            </Col>
        </row>
        <row style="margin-top:10px">
            <Col span="6">
                分部名称 ：
                <Select :model.sync="organize" span="6" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="6">
                子分部名称 ：
                <Select :model.sync="sonOrganize" span="6" style="width:200px">
                    <Option v-for="item in cityList2" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="6">
                理财师 ：
                <Select :model.sync="userName" span="6" style="width:200px">
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
            <Col span="3"><Button type="primary" icon="ios-cloud-download" @click="exportData(1)">导出</Button></Col>
        </div>
        <div style="clear:both;padding-top:20px;">
            <Table border :columns="columns8" :data="data8" size="small" ref="table"></Table>
        </div>
        <div style="margin-top:10px;float:right">
            <Page :total="40" size="small" show-elevator show-sizer></Page>
            <!-- <Page :total="total" :page-size="pageSize"
            :current="pageNum" size="small" show-total></Page> -->
        </div>
        <div style="margin-top:10px;float:right;line-height:22px;">显示？？条到？？条记录，总共？？条记录。</div>
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
            pageNum: '',
            pageSize: '',
            total: '',
            commitionMonth: '',
            columns1: [
                {title: ' ',key: 'totalOrder'},
                {title: '总交易额（元）',key: 'totalTurnover'},
                {title: '总年化交易额（元）',key: 'totalTurnover_year'}
            ],
            data1: [
                {totalOrder: '总计',totalTurnover: '',totalTurnover_year: ''}
            ],
            columns8: [
                {"title": "序号", "type": "index", "fixed": "left", "width": 100},
                {"title": "用户名称", "key": "show", "width": 150},
                {"title": "订单号", "key": "weak", "width": 150},
                {"title": "产品名称", "key": "signin", "width": 150},
                {"title": "产品期限", "key": "click", "width": 150},
                {"title": "交易金额", "key": "active", "width": 150},
                {"title": "投资年华金额", "key": "day7", "width": 150},
                {"title": "投资时间", "key": "day30", "width": 150},
                {"title": "理财师", "key": "tomorrow", "width": 150},
                {"title": "子分部名称", "key": "day", "width": 150},
                {"title": "分部名称", "key": "week", "width": 150},
                {"title": "大大俄武器", "key": "month", "width": 150}
            ],
            data8: [
                
            ]
        }
    },
    mounted() {
        util.ajax({
            url: '/SJWCRM/initCheckMonthAccount', 
            method:'post',
            params: {
                userID: this.userID,
                levelArent: this.levelArent
            }
        }).then(res => {
            this.pageNum = res.data.pageNum,
            this.pageSize = res.data.pageSize,
            this.data1[0].totalOrder = res.data.totalOrder,
            this.data1[0].totalTurnover = res.data.data.totalTurnover,
            this.data1[0].totalTurnover_year = res.data.data.totalTurnover_year,
            this.data8 = res.data.data.data8
        }).catch(err => {

        });
    },
    methods: {
        searchBtn() {
            util.ajax({
                url: '/SJWCRM/getCheckMonthAccount',
                method: 'post',
                params: {
                    commitionMonth: this.commitionMonth && this.commitionMonth.getTime()/1000,
                    Id: '123',
                    userName: this.userName,
                    organize: this.organize,
                    sonOrganize: this.sonOrganize
                }
            }).then(res => {
                this.data1[0].totalOrder = res.data.data.totalOrder,
                this.data1[0].totalTurnover = res.data.data.totalTurnover,
                this.data1[0].totalTurnover_year = res.data.data.totalTurnover_year,
                this.data8 = res.data.data.data8
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
                    filename: 'Custom data',
                    columns: this.columns8.filter((col, index) => index < 4),
                    data: this.data8.filter((data, index) => index < 4)
                });
            }
        }
    }
}
</script>