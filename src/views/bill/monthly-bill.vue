<style lang="less" scoped>
.tradeVolumeSta{float: left;width:100%;background:#FFF;height:100px;margin-top:10px;}
.tradeV_left{display: block;margin: 1%;width: 98%;height: 90px;border: 1px solid #cccccc;float:left;}
.tradeV_left{div{display: block;float: left;width:33.33%;height: 100px;line-height: 20px;text-align: center;margin-top:25px;}}
</style>
<template>
<div>
    <div class="tradeVolumeSta">
        <div class="tradeV_left">
            <div><span>2</span><br/><span>本月佣金（元）</span></div>
            <div><span>1</span><br/><span>上月佣金（元）</span></div>
            <div><span>2000</span><br/><span>累计佣金（元）</span></div>
        </div>
    </div>
    <div style="padding:15px;background:#FFF;overflow:hidden">
        <row style="margin-top:10px">
            <Col span="8">
                选择月份 ：<Date-picker type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
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
        

        <div style="margin-top:40px;">
            <Col span="3"><h2>订单详情<Span style="font-size:12px;color: #c9c9c9;">（默认显示本月数据）</Span></h2></Col>
            <Col span="3"><Button type="primary" icon="ios-cloud-download" @click="exportData(1)">导出</Button></Col>
        </div>
        <div style="clear:both;padding-top:20px;">
            <Table border :columns="columns8" :data="data7" size="small" ref="table"></Table>
        </div>
        <div style="margin-top:10px;float:right">
            <Page :total="40" size="small" show-elevator show-sizer></Page>
        </div>
        <div style="margin-top:10px;float:right;line-height:22px;">显示？？条到？？条记录，总共？？条记录。</div>




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
            columns1: [
                {title: ' ',key: 'name'},
                {title: '总交易额（元）',key: 'age'},
                {title: '总年化交易额（元）',key: 'address'}
            ],
            data1: [
                {name: '总计',age: 111222,address: '333444'}
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
            data7: [
                {"fav": 0, "show": 7302, "weak": 5627, "signin": 1563, "click": 4254, "active": 1438, "day7": 274, "day30": 285, "tomorrow": 1727, "day": 558, "week": 4440, "month": 5610},
                {"fav": 0, "show": 4720, "weak": 4086, "signin": 3792, "click": 8690, "active": 8470, "day7": 8172, "day30": 5197, "tomorrow": 1684, "day": 2593, "week": 2507, "month": 1537},
                {"fav": 0, "show": 7181, "weak": 8007, "signin": 8477, "click": 1879, "active": 16, "day7": 2249, "day30": 3450, "tomorrow": 377, "day": 1561, "week": 3219, "month": 1588},
                {"fav": 0, "show": 9911, "weak": 8976, "signin": 8807, "click": 8050, "active": 7668, "day7": 1547, "day30": 2357, "tomorrow": 7278, "day": 5309, "week": 1655, "month": 9043},
                {"fav": 0, "show": 934, "weak": 1394, "signin": 6463, "click": 5278, "active": 9256, "day7": 209, "day30": 3563, "tomorrow": 8285, "day": 1230, "week": 4840, "month": 9908},
                {"fav": 0, "show": 6856, "weak": 1608, "signin": 457, "click": 4949, "active": 2909, "day7": 4525, "day30": 6171, "tomorrow": 1920, "day": 1966, "week": 904, "month": 6851},
                {"fav": 0, "show": 5107, "weak": 6407, "signin": 4166, "click": 7970, "active": 1002, "day7": 8701, "day30": 9040, "tomorrow": 7632, "day": 4061, "week": 4359, "month": 3676},
                {"fav": 0, "show": 862, "weak": 6520, "signin": 6696, "click": 3209, "active": 6801, "day7": 6364, "day30": 6850, "tomorrow": 9408, "day": 2481, "week": 1479, "month": 2346},
                {"fav": 0, "show": 567, "weak": 5859, "signin": 128, "click": 6593, "active": 1971, "day7": 7596, "day30": 3546, "tomorrow": 6641, "day": 1611, "week": 5534, "month": 3190},
                {"fav": 0, "show": 3651, "weak": 1819, "signin": 4595, "click": 7499, "active": 7405, "day7": 8710, "day30": 5518, "tomorrow": 428, "day": 9768, "week": 2864, "month": 5811}
            ]
        }
    },
    methods: {
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
                    data: this.data7.filter((data, index) => index < 4)
                });
            }
        }
    }
}
</script>