<template>
     <div style="padding:15px;background:#FFF;overflow:hidden">
        <div style="width:800px">
            <Table :columns="column1" :data="data1"></Table>
        </div>
        <div style="margin-top:10px;">
            <row>
                <span>分部详情</span>
                <Button type="primary" icon="plus-round">添加</Button>
                <Button type="primary" icon="edit">修改</Button>
                <Button type="error" icon="trash-a" @click="modal2 = true">删除</Button>
                <Modal v-model="modal2" width="360">
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
                modal2: false,
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
             del () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    this.modal2 = false;
                    this.$Message.success('Successfully delete');
                }, 2000);
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
