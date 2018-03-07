<style lang="less">
    @import './turnover.less';
</style>
<template>
<div>
    <div class="tradeVolumeSta">
        <div class="tradeV_left">
            <div><span>{{todayTurnovalCount}}</span><br/><span>今日交易额（元）</span></div>
            <div><span>{{yestodayTurnovalCount}}</span><br/><span>昨日交易额（元）</span></div>
            <div><span>{{thisMonthTurnovalCount}}</span><br/><span>本月交易额（元）</span></div>
            <div><span>{{lastMonthTurnovalCount}}</span><br/><span>上月交易额（元）</span></div>
        </div>
        <div class="tradeV_right">
            <div><span>{{totalTurnovalCount}}</span><br/><span>累计交易额（元）</span></div>
            <div><span>{{totalYearTuranovalCount}}</span><br/><span>累计年化交易额（元）</span></div>
        </div>
    </div>
    <div style="padding:15px;background:#FFF;overflow:hidden">
        <row style="margin-top:10px">
            <Col span="12">
                查询日期 ：<Date-picker type="date" v-model="StarTime"  placeholder="选择日期" style="width: 200px"></Date-picker>
                至&nbsp;&nbsp;<Date-picker v-model="EndTime" type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
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
                <Select v-model="userName" span="6" style="width:200px">
                    <Option v-for="item in cityList3" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Button type="primary" @click="searchBtn" icon="ios-search">搜索</Button>
        </row>
        <h2 style="margin-top:40px">总数据<Span style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2>
        <div style="width:100%;margin-top:10px;">
            <Table border :columns="columns1" :data="totalData"></Table>
        </div>
    </div>
</div>
</template>
<script>
import util from '../../libs/util';
export default {
    data () {
        return {
            StarTime: '',
            EndTime: '',
            organize: '',
            sonOrganize: '',
            userName: '',
            todayTurnovalCount: '',
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
            model1: '',
            model2: '',
            model3: '',
            columns1: [
                {title: ' ',key: 'totalOrder'},
                {title: '总交易额（元）',key: 'totalTurnover'},
                {title: '总年化交易额（元）',key: 'totalTurnover_year'}
            ],
            totalData: [
                {totalOrder: '总计',totalTurnover: '',totalTurnover_year: ''}
            ]
        }
    },
    mounted() {
        util.ajax({
            // url: '/SJWCRM/initTurnovalCount', 
            url: 'https://easy-mock.com/mock/5a575c98ab5bcb1957178265/example/jiaoyie',
            method:'post',
            params: {
                userID: this.userID,
                levelArent: this.levelArent
            }
        }).then(res => {
            this.todayTurnovalCount = res.data.data.todayTurnovalCount,
            this.yestodayTurnovalCount = res.data.data.yestodayTurnovalCount,
            this.thisMonthTurnovalCount = res.data.data.thisMonthTurnovalCount,
            this.lastMonthTurnovalCount = res.data.data.lastMonthTurnovalCount,
            this.totalTurnovalCount = res.data.data.totalTurnovalCount,
            this.totalYearTuranovalCount = res.data.data.totalYearTuranovalCount,
            this.totalData[0].totalTurnover = res.data.data.totalData.totalTurnover,
            this.totalData[0].totalTurnover_year = res.data.data.totalData.totalTurnover_year,
            this.Id = res.data.Id
        }).catch(error => {
            
        });
    },
    methods: {
        searchBtn() {
            util.ajax({
                url: '/SJWCRM/getTuranovalCount',
                method: 'post',
                params: {
                    StarTime: this.StarTime,
                    EndTime: this.EndTime,
                    Id: this.Id,
                    userName: this.userName,
                    organize: this.organize,
                    sonOrganize: this.sonOrganize
                }
            }).then(res => {
                this.todayTurnovalCount = res.data.data.todayTurnovalCount,
                this.yestodayTurnovalCount = res.data.data.yestodayTurnovalCount,
                this.thisMonthTurnovalCount = res.data.data.thisMonthTurnovalCount,
                this.lastMonthTurnovalCount = res.data.data.lastMonthTurnovalCount,
                this.totalTurnovalCount = res.data.data.totalTurnovalCount,
                this.totalYearTuranovalCount = res.data.data.totalYearTuranovalCount,
                this.totalData[0].totalTurnover = res.data.data.rows[0].totalData.totalTurnover,
                this.totalData[0].totalTurnover_year = res.data.data.rows[0].totalData.totalTurnover_year
            }).catch(error => {
            
            });
        },
    }
}
</script>