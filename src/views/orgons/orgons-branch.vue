<style lang="less">
    @import './orgons-branch.less';
</style>

<template>
     <div style="padding:15px;background:#FFF;overflow:hidden">
        <div style="width:1000px">
            <Table border :columns="column1" :data="data1"></Table>
        </div>
        <div style="margin-top:10px;">
            <row>
                <span>分部详情</span>
                <Button type="primary" icon="plus-round" @click="addFlag">添加</Button>
                <Button type="primary" icon="edit" @click="editFlag">修改</Button>
                <Button type="error" icon="trash-a" @click="deleteFlag">删除</Button>
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
                        <span>该子分部下面有理财师，不能删除。</span>
                    </div>
                    <div slot="footer">
                        <Button type="warning" size="large" @click="tipConfirm2">我知道了</Button>
                    </div>
                </Modal>
                <Modal v-model="addFlagShow">
                    <p slot="header">
                        <span>添加子分部</span>
                    </p>
                    <div class="modal-content">
                        <span>机构名称：</span><span v-model="organize">{{organize}}</span>
                    </div>
                    <div style="margin-top:20px;">
                        <span>分部名称：</span><span v-model="newName">{{newName}}</span>
                    </div>
                    <div style="margin-top:20px;">
                        <span>子分部名称：</span><Input v-model="sonNewName" style="width:200px;" placeholder=""></Input>
                    </div>
                    <div v-show="errorTip" style="margin-top:10px; margin-left:80px; color: #FF7F50">
                            <span>请输入子分部名称</span>
                    </div>
                    <div v-show="errorTip2" style="margin-top:10px; margin-left:80px; color: #FF7F50">
                        <span>此子分部名称已存在，请重新输入</span>
                    </div>
                    <div slot="footer">
                        <Button type="primary" @click="addFlagClose">关闭</Button>
                        <Button type="success" @click="addSave">保存</Button>
                    </div>
                </Modal>
                <Modal v-model="editFlagShow">
                    <p slot="header">
                        <span>修改子分部</span>
                    </p>
                    <div class="modal-content">
                        <span>机构名称：</span><span v-model="organize">{{organize}}</span>
                    </div>
                    <div style="margin-top:20px;">
                        <span>分部名称：</span>
                        <i-select v-model="newName" span="6" style="width:200px">
                            <i-option v-for="item in cityList1" :value="item.value">{{ item.label }}</i-option>
                        </i-select>
                    </div>
                    <div style="margin-top:20px;">
                        <span>子分部名称：</span><Input v-model="sonNewName" style="width:200px;" placeholder=""></Input>
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
            <Page :total="40" size="small" show-elevator show-sizer show-total></Page>
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
                        title: '分部名称',
                        key: 'newName',
                        align: 'center'
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
                cityList1: [
                    {
                        value: 'nanjing',
                        label: '链家'
                    },
                    {
                        value: 'woaiwojia',
                        label: '我爱我家'
                    }
                ],
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
            data2: []
            }
        },
        mounted() {
            this.initBranchOrganize();
        },
        methods:{
            initBranchOrganize() {
                util.ajax({
                    url: '/SJWCRM/InitOragnizeSonMess', 
                    method:'post',
                    params: {
                        
                    }
                }).then(res => {
                    this.data2 = res.data.data.data2;
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
            addSave () { this.errorTip=true;this.errorTip2=true
                util.ajax({
                    url: '/SJWCRM/addOrganizeSon', 
                    method:'post',
                    params: {
                        organizeId: this.organizeId,
                        newName: this.newName
                    }
                }).then(res => {
                    this.initOrganize();
                    this.addFlagShow = false
                }).catch(err => {

                });
            },
            editSave () {this.errorTip=true;this.errorTip2=true
                util.ajax({
                    url: '/SJWCRM/ModifyOrganizeSonName', 
                    method:'post',
                    params: {
                        organizeId: this.organizeId,
                        newName: this.newName
                    }
                }).then(res => {
                    this.initOrganize();
                    this.editFlagShow = false
                }).catch(err => {

                });
            },
            del () {
                util.ajax({
                    url: '/SJWCRM/deleteOrganizeSon', 
                    method:'post',
                    params: {
                        organizeId: this.organizeId,
                        newName: this.newName
                    }
                }).then(res => {
                    this.initOrganize();
                    this.modal_loading = false;
                    this.deleteFlagShow = false;
                    this.$Message.success('删除成功');
                }).catch(err => {

                });
            }      
        },
        created(){
            
        }
    }
</script>
