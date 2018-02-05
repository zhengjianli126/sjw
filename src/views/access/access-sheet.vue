<style scoped>
    .zjl-content{
        background: #fff;
        padding: 40px 20px;
        height: 100%;
    }
</style>
<template>
    <div class="zjl-content">
        <h2>权限表</h2>
        <Table border :columns="columns1" :data="data1" style="margin-top:40px;"></Table>
    </div>  
</template>
<script>
export default {
    
    data () {
            return {
                columns1: [
                    {
                        title: '序号',
                        align:'center',
                        type:'index',
                        width:'10%'
                    },
                    {
                        title: '角色名称',
                        key: 'js',
                        align:'center'
                    },
                    {
                        title: '权限',
                        key: 'qs',
                        align:'center'
                    },{
                        title:'备注',
                        key:'bz',
                        align:'center'
                    }
                ],
                data1: [
                    {
                        js: '管理员',
                        qs:'订单详情、交易额统计、每月对账、机构管理（进入汇总信息为机构的页面）、理财师信息',
                        bz: '包括所有按钮操作权限'
                    },
                    {
                        
                        js: '机构',
                        qs: '订单详情、交易额详情、每月对账、机构管理（进入汇总信息为对应分部的页面）、理财师信息',
                        bz: '可以看本机构所有信息权限，无操作权限'
                    },
                    {
                        
                        js: '分部',
                        qs: '订单详情、交易额详情、每月对账、理财师信息（可查看对应子分部下所有理财师信息）',
                        bz: '查看所属分部的所有信息权限，无查看所在机构整体信息权限，无操作权限'
                    },
                    {
                        
                        js: '子分部',
                        qs: '订单详情、交易额详情、每月对账、理财师信息（可查看对应子分部下所有理财师信息）',
                        bz: '查看所属子分部的所有信息权限，无查看所在分部及机构整体信息权限，无操作权限'
                    },
                    {
                        js: '理财师',
                        qs: '订单详情、交易额详情、每月对账、理财师信息（仅可查看自己的信息）',
                        bz: '查看所属子分部的所有信息权限，无查看所在分部及机构整体信息权限，无操作权限'
                    }
                ]
            }
        },
        methods:{
        
        }
    }
</script>
