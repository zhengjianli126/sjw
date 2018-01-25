<template>
    <i-table stripe :columns="columns1" :data="data1"></i-table>
</template>
<script>
import util from 'utils';
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    }
                ],
                data1: []
            }
        },
        methods:{
            async  getData (){
            
              // let result = await util.ajax.get('/list');
               let result = await util.ajax.post('/listp',{a:"b"});
               if(result.data.success){
                    this.data1 = result.data.data;
               }else {

               }
              
            }       
        },
        created(){
            this.getData();
        }
    }
</script>
