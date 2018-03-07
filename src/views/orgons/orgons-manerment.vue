<template>
     <div style="padding:15px;background:#FFF;overflow:hidden">
        <div style="width:1000px">
            <Table border :columns="column1" :data="data1"></Table>
        </div>
        <div style="margin-top:10px;">     
            <row>
                <span>分部详情</span>
                <Button type="primary" @click="addFlag" icon="plus-round">添加</Button>
                <Button type="primary" @click="editFlag" icon="edit">修改</Button>
                <Button type="error" @click="deleteFlag" icon="trash-a">删除</Button>
                <Modal v-model="modifyTip" :closable="false">
                    <div class="modal-content"  style="margin: 40px 160px; font-size:16px;">
                        <span>请选择要操作的条目。</span>
                    </div>
                    <div slot="footer">
                        <Button type="warning" size="large" @click="tipConfirm">我知道了</Button>
                    </div>
                </Modal>
                <Modal v-model="modifyTip2" :closable="false">
                    <div class="modal-content"  style="margin: 40px 110px; font-size:16px;">
                        <span>该分部下面有理财师，不能删除。</span>
                    </div>
                    <div slot="footer">
                        <Button type="warning" size="large" @click="tipConfirm2">我知道了</Button>
                    </div>
                </Modal>
                <Modal v-model="addFlagShow">
                    <p slot="header">
                        <span>添加分部</span>
                    </p>
                    <div class="modal-content">
                        <span>机构名称：</span><span v-model="organize">{{organize}}</span>
                    </div>
                    <div style="margin-top:20px;">
                        <span>分部名称：</span><Input v-model="newName" style="width:200px;" placeholder=""></Input>
                    </div>
                    <div v-show="errorTip" style="margin-top:10px; margin-left:80px; color: #FF7F50">
                            <span>请输入分部名称</span>
                    </div>
                    <div v-show="errorTip2" style="margin-top:10px; margin-left:80px; color: #FF7F50">
                        <span>此分部名称已存在，请重新输入</span>
                    </div>
                    <div slot="footer">
                        <Button type="primary" @click="addFlagClose">关闭</Button>
                        <Button type="success" @click="addSave">保存</Button>
                    </div>
                </Modal>
                <Modal v-model="editFlagShow">
                    <p slot="header">
                        <span>修改分部</span>
                    </p>
                    <div class="modal-content">
                        <span>机构名称：</span><span v-model="organize">{{organize}}</span>
                    </div>
                    <div style="margin-top:20px;">
                        <span>分部名称：</span><Input v-model="newName" style="width:200px;" placeholder=""></Input>
                    </div>
                    <div slot="footer">
                        <Button type="primary" @click="editFlagClose">关闭</Button>
                        <Button type="success" @click="editSave">保存</Button>
                    </div>
                </Modal>
                <Modal v-model="deleteFlagShow" width="360">
                    <p slot="header" style="color:#f60;text-align:center">
                        <Icon type="information-circled"></Icon>
                        <span>删除</span>
                    </p>
                    <div style="text-align:center">
                        <p>确定要删除吗</p>
                    </div>
                    <div slot="footer">
                        <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
                    </div>
                </Modal>
             </row>
             <div style="margin-top:10px;">
                <Table :columns="column2" :data="data2"></Table>
             </div>
              <div style="margin-top:10px;float:right">
      <Page :total="40" size="small" show-elevator show-sizer></Page>
    </div>
    <div style="margin-top:10px;float:right;line-height:22px;">显示？？条到？？条记录，总共？？条记录。</div>
        </div>
    </div>
</template>
<script>
import util from 'utils';
    export default {
        data () {
            return {
                modifyTip: false,
                modifyTip2: false,
                errorTip: false,
                errorTip2: false,
                addFlagShow: false,
                editFlagShow: false,
                deleteFlagShow: false,
                column1: [
                    {
                        title: '机构名称',
                        key: 'organize',
                        align: 'center'
                    },
                    {
                        title: '分部数量',
                        align: 'center',
                        key: 'organizeCount'
                    },
                    {
                        title: '子分部数量',
                        align: 'center',
                        key: 'sonOrganizeCount'
                    },
                    {
                        title: '理财师数量',
                        align: 'center',
                        key: 'sonOrganizeCount'
                    },
                    {
                        title: '客户数量',
                        align: 'center',
                        key: 'customerCount'
                    }
                ],
                data1: [],
                 column2: [
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
                        title: '分部名称',
                        align: 'center',
                        key: 'newName'
                    },
                    {
                        title: '子分部数量',
                        align: 'center',
                        key: 'sonOrganizeCount'
                    },
                    {
                        title: '理财师数量',
                        align: 'center',
                        key: 'sonOrganizeCount'
                    },
                    {
                        title: '客户数量',
                        align: 'center',
                        key: 'customerCount'
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
                                }, '查看详情')
                            ]);
                        }
                    }
                ],
                data2: []
            }
        },
        mounted() {
            this.initOrganize();
        },
        methods:{
            initOrganize() {
                util.ajax({
                    // url: '/SJWCRM/InitOragnizeMess', 
                    url: 'https://easy-mock.com/mock/5a575c98ab5bcb1957178265/example/jigouguanli',
                    method:'post',
                    params: {
                        
                    }
                }).then(res => {
                    this.data2 = res.data.data.rows;
                }).catch(err => {

                });
            },

            addFlag () {
                this.addFlagShow = true;
            },
            addFlagClose () {
                this.addFlagShow = false;
                this.errorTip=false;
                this.errorTip2=false;
            },
            editFlag () {
                this.editFlagShow = true;
            },
            editFlagClose () {
                this.editFlagShow = false;
            },
            deleteFlag () {
                this.deleteFlagShow = true;
            },
            tipConfirm () {
                this.modifyTip = false;
            },
            tipConfirm2 () {
                this.modifyTip2 = false;
            },
            addSave () {this.errorTip=true;this.errorTip2=true
                util.ajax({
                    url: '/SJWCRM/addOrganize', 
                    method:'post',
                    params: {
                        organizeId: this.organizeId,
                        newName: this.newName
                    }
                }).then(res => {
                    this.initOrganize();
                    this.addFlag = false
                }).catch(err => {

                });
            },
            editSave () { this.errorTip=true;this.errorTip2=true
                util.ajax({
                    url: '/SJWCRM/ModifyOrganizeName', 
                    method:'post',
                    params: {
                        organizeId: this.organizeId,
                        newName: this.newName
                    }
                }).then(res => {
                    this.initOrganize();
                    this.editFlag = false
                }).catch(err => {

                });
            },
            del () {
                util.ajax({
                    url: '/SJWCRM/deleteOrganize', 
                    method:'post',
                    params: {
                        organizeId: this.organizeId,
                        newName: this.newName
                    }
                }).then(res => {
                    this.initOrganize();
                    this.modal_loading = false;
                    this.deleteFlag = false;
                    this.$Message.success('删除成功');
                }).catch(err => {

                });
            },
            async  getData (){
            
              // let result = await util.ajax.get('/list');
               let result = await util.ajax.post('/listp',{a:"b"});
               if(result.data.success){
                    this.data1 = result.data.data;
                    this.data2 = result.data.data;
               }else {

               }
              
            }       
        },
        add () {
            this.$Modal.confirm({
                title: 'Title',
                content: '<p>Content of dialog</p><p>Content of dialog</p>',
                okText: 'OK',
                cancelText: 'Cancel'
            });
        },
        created(){
            this.getData();
        }
    }
</script>
