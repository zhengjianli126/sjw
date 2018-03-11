<style lang="less" scoped>
    .zjl-content {
        padding: 20px 10px;
        background: #fff;
    }
    
    .zjl-table {
        margin-top: 20px;
        button {
            margin-right: 10px;
        }
    }
    
    .modal-content {
        text-align: center;
    }
</style>

<template>
    <div class="zjl-content">
        <Row>
            <Col span="2" align="center">
            <div style="height:32px;line-height:32px;font-size:14px;min-width:70px;margin-right:10px;">角色名称:</div>
            </Col>
            <Col span="6">
            <Input v-model="ssJsmc" placeholder="角色名称"></Input>
            </Col>
            <Col span="2">
            <Button v-show="searchFlag" @click="getData" type="primary" style="margin-left:20px;">搜索</Button>
            </Col>
        </Row>
        <div class="zjl-table">
            <Button icon="android-create">修改</Button>
            <Button icon="android-add" @click="addTable">添加</Button>
            <Button icon="android-delete" @click="cxtableDelete">删除</Button>
            <Table style="margin-top:20px" @on-selection-change	="selectTable" :loading="isloading" :border="true" :stripe="true" :show-header="true" :data="tableData3" :columns="tableColumns3"></Table>
            <Row style="margin-top:40px;padding:10px;line-height:20px;background:#f2f2f2;">
                
                <Col span="24" align="right">
                <Page :total="100" @on-change="pageChange" size="small" show-elevator show-sizer></Page>
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
        <Modal v-model="modal1" title="新增角色">
            <p slot="header">
                <span>新增角色</span>
            </p>
            <div class="modal-content">
                <span>角色名称：</span>
                <Input v-model="xzJsmc" style="width:200px;" placeholder=""></Input>
            </div>
            <div style="margin-left:135px;margin-top:20px;">
                <span>备注：</span>
                <Input v-model="xzbz" placeholder="" type="textarea" style="width:200px;"></Input>
            </div>
            <div style="margin-left:112px;margin-top:20px;">
                <span>功能权限：</span>
                <Tree style="width:300px;" :data="treeData" show-checkbox></Tree>
            </div>
            <div slot="footer">
                <Button type="primary" @click="modal1 = false">取消</Button>
                <Button type="success" @click="tableDelete">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import util from '@/libs/util';
    export default {
        mounted() {
            // 摁扭权限
            let curMeunList = JSON.parse(localStorage.menuList);
            for (let a in curMeunList) {
                if (curMeunList[a].id == 25) {
                    this.searchFlag = true
                }
    
            }
        },
        created: function() {
            // 请求数据
            this.getData()
        },
        data() {
            return {
                // 选中状态
                selectionData:[],
                pageTotal: '1',
                searchFlag: false,
                ssJsmc: '',
                xzJsmc: '',
                xzbz: '',
                modal1: false, //新增
                modal2: false, //删除弹框
                tableData3: [],
                treeData: [{
                    title: '订单详情',
                    children: [{
                        title: '搜索',
                        children:[{
                            title:'adad',
                             expand: true,
                        }],
                        menuType:'button',
                        id:'3',
                        expand: true,
                    }, {
                        title: '导出',
                        menuType:'button',
                        id:'4',
                        expand: true,
                    }]
                },{
                    title: '交易额统计',
                    id:'5',
                    children: [{
                        title: '搜索',
                        menuType:'button',
                        id:'6',
                        expand: true,
                    }]
                }],
                showCheckbox: true,
                showIndex: true,
                isloading: true
            }
        },
        methods: {
            //查询表格是否选中 
            /**@description
             * 如果没有选中，提示未选中，
             * 如果选中，打开删除弹框
             */
            cxtableDelete() {
                if(this.selectionData.length){
                    
                    this.modal2 = true;
                }else{
                    this.$Message.warning('请选择至少选择一项！');
                  
                }
                
            },
            /**@description
             * 删除 选中的表格行
             */
            tableDelete() {
                let curData = []
                for(let a in this.selectionData){
                   curData.push(this.selectionData[a].id)
                }
                util.ajax('/SJWCRM/deleteRoleMess',{
                    method:'post',
                    params:{
                        RoleID : curData
                    }
                }).then(res=>{
                        //  表格
                        this.modal2 = false;
                        this.getData()
                        this.$Message.success('删除成功');
                })
                   
                
    
            },
    
            addTable: function() {
                this.modal1 = true;
            },
            // 分页
            pageChange(index) {
                this.getData(index);
            },
            // 获取数据
            getData(s) {
                let curIndex = s|| '1'
                this.isloading = true
                 util.ajax('/SJWCRM/getMenuListByRoleId', {
                        method: 'post',
                        params:{
                            Roleid:10
                        }
                    })
                util.ajax('/SJWCRM/InitRoleMess', {
                        method: 'post',
                        params:{
                            index:curIndex,
                            ssJsmc:this.ssJsmc
                        }
                    })
                    .then(res => {
                        this.tableData3 = res.data.data.rows;
                        this.pageTotal = res.data.data.total;
                        this.isloading = false;
                        
                    })
                    .catch(function(error) {
                        console.log(error);
    
                    });
            },
            selectTable(selection){
               this.selectionData = selection;
            }
            
        },
        computed: {
            tableColumns3() {
                let columns = [];
                if (this.showIndex) {
                    columns.push({
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    })
                }
                if (this.showCheckbox) {
                    columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        
                    })
                }
                columns.push({
                    title: '角色名称',
                    key: 'roleName',
                    align: 'center'
                });
                columns.push({
                    title: '创建时间',
    
                    align: 'center',
                    render: (h, params) => {
                        let a = util.formatDate(params.row.updateTime);
                        return h('div', a)
                    }
                });
                columns.push({
                    title: '修改时间',
                    align: 'center',
                    render: (h, params) => {
                        let a = util.formatDate(params.row.updateTime);
    
                        return h('div', a)
                    }
                });
                columns.push({
                    title: '备注',
                    key: 'remarks',
                    align: 'center'
                });
                this.isloading = false;
                return columns;
            }
        }
    }
</script>
