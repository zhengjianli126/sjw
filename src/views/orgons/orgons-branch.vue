<template>
     <div style="padding:15px;background:#FFF;overflow:hidden">
        <div style="width:800px">
            <Table :columns="column1" :data="data1"></Table>
        </div>
        <div style="margin-top:10px;">
            <row>
                <span>分部详情</span>
                <Button type="primary" icon="plus-round" @click="addFlag = true">添加</Button>
                <Button type="primary" icon="edit" @click="editFlag = true">修改</Button>
                <Button type="error" icon="trash-a" @click="deleteFlag = true">删除</Button>
                <Modal
                    v-model="addFlag"
                    title="添加分部"
                    @on-ok="addOk"
                    @on-cancel="addCancel">
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                    <p>Content of dialog</p>
                </Modal>
                <Modal
                    v-model="editFlag"
                    title="修改分部"
                    @on-ok="editOk"
                    @on-cancel="editCancel">
                    <p>修改内容</p>
                </Modal>
                <Modal v-model="deleteFlag" width="360">
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
                addFlag: false,
                editFlag: false,
                deleteFlag: false,
                column1: [
                    {
                        title: '分部名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '子分部数量',
                        align: 'center',
                        key: 'address'
                    },
                    {
                        title: '理财师数量',
                        align: 'center',
                        key: 'address'
                    },
                    {
                        title: '客户数量',
                        align: 'center',
                        key: 'address'
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
                    title: '子分部数量',
                    align: 'center',
                    key: 'age'
                },
                {
                    title: '理财师数量',
                    align: 'center',
                    key: 'address'
                },
                {
                    title: '客户数量',
                    align: 'center',
                    key: 'address'
                }
            ],
            data2: []
            }
        },
        methods:{
            addFlag () {
                this.$Modal.confirm({
                    okText: '保存',
                    cancelText: '关闭'
                });
            },
            addOk () {
                this.$Message.info('');
            },
            addCancel () {
                this.$Message.info('');
            },

            editOk () {
                this.$Message.info('');
            },
            editCancel () {
                this.$Message.info('');
            },

            del () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.deleteFlag = false;
                    this.$Message.success('删除成功');
                }, 1000);
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
        created(){
            this.getData();
        }
    }
</script>
