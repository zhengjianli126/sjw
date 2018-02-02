<style lang="less">
    @import './order-details.less';
    
</style>
<template>
  <div style="padding:15px;background:#FFF;overflow:hidden">
    <row style="margin-top:10px">
        <i-col span="6">
            查询日期 ：
            <Date-picker type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
        </i-col>
        <i-col span="5">
          至 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Date-picker type="date"  placeholder="选择日期" style="width: 200px"></Date-picker>
        </i-col>
    </row>
    <row style="margin-top:10px">
      <i-col span="6">
        分部名称 ：
        <i-select :model.sync="model1" span="6" style="width:200px">
          <i-option v-for="item in cityList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
      </i-col>
      <i-col span="6">
        子分部名称 ：
        <i-select :model.sync="model1" span="6" style="width:200px">
          <i-option v-for="item in cityList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
      </i-col>
      <i-col span="6">
        理财师 ：
        <i-select :model.sync="model1" span="6" style="width:200px">
            <i-option v-for="item in cityList" :value="item.value">{{ item.label }}</i-option>
        </i-select>
      </i-col>
      <i-button type="primary" icon="ios-search">搜索</i-button>
    </row>
    <h2 style="margin-top:40px">总数据</h2>
    <div style="width:600px;margin-top:10px;">
      <Table border :columns="columns1" :data="data1"></Table>
    </div>
    <div  style="margin-top:40px;">
      <i-col span="2">
        <h2>订单详情</h2>
      </i-col>
      <i-col span="2">
        <i-button type="primary" icon="ios-cloud-download" @click="exportData(1)">导出</i-button>
      </i-col>
    </div>
    <div style="clear:both;padding-top:20px;">
      <Table border :columns="columns8" :data="data7" size="small" ref="table"></Table>
    </div>
    <div style="margin-top:10px;float:right">
      <Page :total="40" size="small" show-elevator show-sizer></Page>
    </div>
    <div style="margin-top:10px;float:right;line-height:22px;">显示？？条到？？条记录，总共？？条记录。</div>
  </div>
</template>
<script>
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
                model1: '',
                columns1: [
                    {
                        title: '订单笔数',
                        key: 'name'
                    },
                    {
                        title: '交易额（元）',
                        key: 'age'
                    },
                    {
                        title: '年华交易总额（元）',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
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
                        "key": "show",
                        "width": 150,
                      //  "sortable": true,
                      //  filters: [
                        //     {
                        //         label: 'Greater than 4000',
                        //         value: 1
                        //     },
                        //     {
                        //         label: 'Less than 4000',
                        //         value: 2
                        //     }
                        // ],
                        //filterMultiple: false,
                        // filterMethod (value, row) {
                        //     if (value === 1) {
                        //         return row.show > 4000;
                        //     } else if (value === 2) {
                        //         return row.show < 4000;
                        //     }
                        // }
                    },
                    {
                        "title": "订单号",
                        "key": "weak",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "产品名称",
                        "key": "signin",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "产品期限",
                        "key": "click",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "交易金额",
                        "key": "active",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "投资年华金额",
                        "key": "day7",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "投资时间",
                        "key": "day30",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "理财师",
                        "key": "tomorrow",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "子分部名称",
                        "key": "day",
                        "width": 150,
                  //      "sortable": true
                    },
                    {
                        "title": "分部名称",
                        "key": "week",
                        "width": 150,
                    //    "sortable": true
                    },
                    {
                        "title": "Month Active",
                        "key": "month",
                        "width": 150,
                    //    "sortable": true
                    }
                ],
                data7: [
                    {
                    //    "name": "Name1",
                        "fav": 0,
                        "show": 7302,
                        "weak": 5627,
                        "signin": 1563,
                        "click": 4254,
                        "active": 1438,
                        "day7": 274,
                        "day30": 285,
                        "tomorrow": 1727,
                        "day": 558,
                        "week": 4440,
                        "month": 5610
                    },
                    {
                    //    "name": "Name2",
                        "fav": 0,
                        "show": 4720,
                        "weak": 4086,
                        "signin": 3792,
                        "click": 8690,
                        "active": 8470,
                        "day7": 8172,
                        "day30": 5197,
                        "tomorrow": 1684,
                        "day": 2593,
                        "week": 2507,
                        "month": 1537
                    },
                    {
                    //    "name": "Name3",
                        "fav": 0,
                        "show": 7181,
                        "weak": 8007,
                        "signin": 8477,
                        "click": 1879,
                        "active": 16,
                        "day7": 2249,
                        "day30": 3450,
                        "tomorrow": 377,
                        "day": 1561,
                        "week": 3219,
                        "month": 1588
                    },
                    {
                      //  "name": "Name4",
                        "fav": 0,
                        "show": 9911,
                        "weak": 8976,
                        "signin": 8807,
                        "click": 8050,
                        "active": 7668,
                        "day7": 1547,
                        "day30": 2357,
                        "tomorrow": 7278,
                        "day": 5309,
                        "week": 1655,
                        "month": 9043
                    },
                    {
                      //  "name": "Name5",
                        "fav": 0,
                        "show": 934,
                        "weak": 1394,
                        "signin": 6463,
                        "click": 5278,
                        "active": 9256,
                        "day7": 209,
                        "day30": 3563,
                        "tomorrow": 8285,
                        "day": 1230,
                        "week": 4840,
                        "month": 9908
                    },
                    {
                    //    "name": "Name6",
                        "fav": 0,
                        "show": 6856,
                        "weak": 1608,
                        "signin": 457,
                        "click": 4949,
                        "active": 2909,
                        "day7": 4525,
                        "day30": 6171,
                        "tomorrow": 1920,
                        "day": 1966,
                        "week": 904,
                        "month": 6851
                    },
                    {
                    //    "name": "Name7",
                        "fav": 0,
                        "show": 5107,
                        "weak": 6407,
                        "signin": 4166,
                        "click": 7970,
                        "active": 1002,
                        "day7": 8701,
                        "day30": 9040,
                        "tomorrow": 7632,
                        "day": 4061,
                        "week": 4359,
                        "month": 3676
                    },
                    {
                    //    "name": "Name8",
                        "fav": 0,
                        "show": 862,
                        "weak": 6520,
                        "signin": 6696,
                        "click": 3209,
                        "active": 6801,
                        "day7": 6364,
                        "day30": 6850,
                        "tomorrow": 9408,
                        "day": 2481,
                        "week": 1479,
                        "month": 2346
                    },
                    {
                    //    "name": "Name9",
                        "fav": 0,
                        "show": 567,
                        "weak": 5859,
                        "signin": 128,
                        "click": 6593,
                        "active": 1971,
                        "day7": 7596,
                        "day30": 3546,
                        "tomorrow": 6641,
                        "day": 1611,
                        "week": 5534,
                        "month": 3190
                    },
                    {
                    //    "name": "Name10",
                        "fav": 0,
                        "show": 3651,
                        "weak": 1819,
                        "signin": 4595,
                        "click": 7499,
                        "active": 7405,
                        "day7": 8710,
                        "day30": 5518,
                        "tomorrow": 428,
                        "day": 9768,
                        "week": 2864,
                        "month": 5811
                    }
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
