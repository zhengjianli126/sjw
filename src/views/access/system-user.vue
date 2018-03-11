<style lang="less" scoped>
    .zjl-content{
        padding: 20px 10px;
        background: #fff;
    }
    .zjl-table{
        margin-top:20px; 
        button{
            margin-right: 10px;
        }
    }
    .modal-content{
        text-align: center;
    }
</style>
<template>
    <div class="zjl-content">
        <Row>
            <Col span="2" align="center"><div style="height:32px;line-height:32px;font-size:14px;min-width:70px;margin-right:10px;">登陆名称:</div></Col>
            <Col span="6"><Input v-model="ssJsmc" placeholder="登陆名称"></Input></Col>
            <Col span="2" align="center"><div style="height:32px;line-height:32px;font-size:14px;min-width:70px;margin-right:10px;">姓名:</div></Col>
            <Col span="6"><Input v-model="ssJsmc" placeholder="姓名"></Input></Col>
            <Col span="2"><Button v-show="searchFlag" type="primary" style="margin-left:20px;">搜索</Button></Col>
        </Row>
        <div class="zjl-table"> 
            <Button icon="android-create">修改</Button>
            <Button icon="android-add"@click="addTable">添加</Button>
            <Button icon="android-delete" @click="cxtableDelete">删除</Button> 
            
            <Table style="margin-top:20px" :loading="isloading" :border="true" :stripe="true" :show-header="true"   :data="tableData3" :columns="tableColumns3"></Table>
            <Row style="margin-top:40px;padding:10px;line-height:20px;background:#f2f2f2;">
               
                <Col span="24" align="right">
                    <Page :total="40" size="small" show-elevator show-sizer></Page>
                </Col>
            </Row>
            
       </div> 
       <!-- 删除弹框 -->
        <Modal v-model="modal2" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:center;">
                <p>是否确定删除该行信息？</p>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modal2 = false">取消</Button>
                <Button type="error" @click="tableDelete">删除</Button>
            </div>
        </Modal>
        <!-- 新增 -->
        <Modal  v-model="modal1" title="新增用户">
            <p slot="header">
                <span>新增用户</span>
            </p>
            <Row style="margin-top:10px;">
                <Col align="right" span="6">
                    <div>机构名称：</div>
                </Col>
                <Col>
                    <div>恋家</div>
                </Col>
                </Row>
                <Row style="margin-top:10px;">
                    <Col align="right" span="6">
                        <div>角色名称：</div>
                    </Col>
                    <Col span="">
                        <Select v-model="model1" style="width:200px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Row>
                  <Row style="margin-top:10px;">
                   <Col align="right" span="6">
                        <div>子分部名称：</div>
                    </Col>
                    <Col span="">
                        <Select v-model="model1" style="width:200px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                </Row>
                  <Row style="margin-top:10px;">
                     <Col align="right" span="6">
                        <div>分部名称：</div>
                    </Col>
                    <Col span="">
                        <Select v-model="model1" style="width:200px">
                            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </Col>
                 </Row>
                  <Row style="margin-top:10px;">
                        <Col align="right" span="6">
                            <div>登陆名称：</div>
                        </Col>
                        <Col span="">
                            <Input v-model="dlName" style="width:200px;" placeholder=""></Input>
                        </Col>
                 </Row>
                 <Row style="margin-top:10px;">
                    <Col align="right" span="6">
                        <div>姓名：</div>
                    </Col>
                    <Col span="">
                        <Input v-model="ptName" style="width:200px;" placeholder=""></Input>
                    </Col>
                </Row>
                
                
            </Row>
            <div slot="footer">
                <Button type="primary" @click="modal1 = false">取消</Button>
                <Button type="success" @click="tableDelete">提交</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
    export default {
         mounted(){
              // 摁扭权限
      let curMeunList =JSON.parse(localStorage.menuList); 
            for (let a in curMeunList){
            if(curMeunList[a].id==30){
                this.searchFlag = true
            }
          
            }
        },
        data () {
            return {
                searchFlag:false,
                dlName:'',
                ptName:'',
                ssJsmc:'',
                xzJsmc:'',
                xzbz:'',
                modal1:false,//新增
                modal2: false,//删除弹框
                tableData3: [//表格
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                ],
                treeData: [
                    {
                        title: 'parent',
                        loading: false,
                        children: [{
                            title: 'parent 1-1',
                            expand: true,
                        },{
                            title: 'parent 1-1',
                            expand: true,
                        },{
                            title: 'parent 1-1',
                            expand: true,
                        },{
                            title: 'parent 1-1',
                            expand: true,
                        },{
                            title: 'parent 1-1',
                            expand: true,
                        },{
                            title: 'parent 1-1',
                            expand: true,
                        }]
                    }
                ],
                showCheckbox: true,
                showIndex:true,
                isloading :true
            }
        },
        methods: {
            //查询表格是否选中 
            /**@description
             * 如果没有选中，提示未选中，
             * 如果选中，打开删除弹框
             */
            cxtableDelete:function(){
                 this.modal2 = true;
            },
            /**@description
             * 删除 选中的表格行
             */
            tableDelete:function(){
                setTimeout(() => {
                    this.modal2 = false;
                    this.$Message.success('删除成功');
                }, 2000);
            
            },
            /**@description
             * 树
             */
            /**@description
             * 添加
             */
            addTable:function(){
                this.modal1 = true;
            }
        },
        computed: {
            tableColumns3 () {
                let columns = [];
                if (this.showIndex) {
                    columns.push({
                        title:'序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    })
                }
                 if (this.showCheckbox) {
                    columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    })
                }
                columns.push({
                    title: '角色名称',
                    key: 'date',
                });
                   columns.push({
                    title: '创建时间',
                    key: 'date',
                
                });
                columns.push({
                    title: '修改时间',
                    key: 'name'
                });
                columns.push({
                    title: '备注',
                    key: 'name'
                });
                this.isloading = false;
                return columns;
            }
        }
    }
</script>
