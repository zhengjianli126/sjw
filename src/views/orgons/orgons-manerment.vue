<template>
     <div style="padding:15px;background:#FFF;overflow:hidden">
        <div style="width:1000px">
            <Table :columns="column1" :data="data1"></Table>
        </div>
        <div style="margin-top:10px;">     
            <row>
                <span>分部详情</span>
                <Button type="primary" @click="addFlag = true" icon="plus-round">添加</Button>
                <Button type="primary" @click="editFlag = true" icon="edit">修改</Button>
                <Button type="error" @click="deleteFlag = true" icon="trash-a">删除</Button>

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
                        title: '机构名称',
                        key: 'name',
                        align: 'center'
                    },
                    {
                        title: '分部数量',
                        align: 'center',
                        key: 'age'
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
                        title: '分部名称',
                        align: 'center',
                        key: 'name'
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
        methods:{
            addFlag () {
                this.$Modal.confirm({
                    okText: '保存',
                    cancelText: '关闭'
                });
            },
            addOk () {
                this.$Message.info('Clicked ok');
            },
            addCancel () {
                this.$Message.info('Clicked cancel');
            },

            editOk () {
                this.$Message.info('Clicked ok');
            },
            editCancel () {
                this.$Message.info('Clicked cancel');
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
