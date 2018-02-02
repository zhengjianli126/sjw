<style lang="less">
    @import './turnover.less';
</style>
<template>
<div>
    <div class="tradeVolumeSta">
        <div class="tradeV_left">
            <div><span>2</span><br/><span>今日交易额（元）</span></div>
            <div><span>1</span><br/><span>昨日交易额（元）</span></div>
            <div><span>2000</span><br/><span>本月交易额（元）</span></div>
            <div><span>3000</span><br/><span>上月交易额（元）</span></div>
        </div>
        <div class="tradeV_right">
            <div><span>4000</span><br/><span>累计交易额（元）</span></div>
            <div><span>5000</span><br/><span>累计年化交易额（元）</span></div>
        </div>
    </div>
    <div style="padding:15px;background:#FFF;overflow:hidden">
        <row style="margin-top:10px">
            <Col span="8">
                查询日期 ：<Date-picker type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
                至<Date-picker type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
            </Col>
        </row>
        <row style="margin-top:10px">
            <Col span="6">
                分部名称 ：
                <Select :model.sync="model1" span="6" style="width:200px">
                    <Option v-for="item in cityList" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="6">
                子分部名称 ：
                <Select :model.sync="model1" span="6" style="width:200px">
                    <Option v-for="item in cityList2" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="6">
                理财师 ：
                <Select :model.sync="model1" span="6" style="width:200px">
                    <Option v-for="item in cityList3" :value="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Button type="primary" icon="ios-search">搜索</Button>
        </row>
        <h2 style="margin-top:40px">总数据<Span style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2>
        <div style="width:600px;margin-top:10px;">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
    </div>
</div>
</template>
<script>
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
            model1: '',
            model2: '',
            columns1: [
                {title: ' ',key: 'name'},
                {title: '总交易额（元）',key: 'age'},
                {title: '总年化交易额（元）',key: 'address'}
            ],
            data1: [
                {name: '总计',age: 111222,address: '333444'}
            ]
        }
    }
}
</script>