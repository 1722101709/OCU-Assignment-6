<template>
    <div id="app">
        <nav class="nav">
                    <router-link to="/Add" class="link" :class="{ 'active': $route.path === '/Add' }">Add Data</router-link>
            
                    <router-link to="/ShowData" class="link" :class="{ 'active': $route.path === '/ShowData' }">Show Data</router-link>
            
                    <router-link to="/Update/2" class="link" :class="{ 'active': $route.path.includes('/Update/') }">Update Data</router-link>
        </nav>

        <div class="data-container">
            <router-view />
        </div>
    </div>
</template>
<style>
    #app{
        background: #E3E3E3;
        width: 100vw;
        height: 100vw;
    }
    .nav{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: 510px;
        height: 50px;
        background-color:#4682b4;
        color: midnightblue;
        border-radius: 10px;
    }
    .link{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 170px;
        height: 100%;
        cursor: pointer;
        font-size: 19px;
        text-decoration: none;
    }
    .link:nth-child(1){
        border-top-left-radius: 11px;
        border-bottom-left-radius: 11px;
    }
    .link:nth-child(3){
        border-top-right-radius: 11px;
        border-bottom-right-radius: 11px;
    }
    .link.active, .link.active:hover{
        background: goldenrod;
        color: aliceblue;
    }
    .link:hover{
        background: #aea;
    }
    .data-container{
        margin-top: 30px;
        margin-left: 100px;
    }
</style>

<script>
export default {
  name: "app"
};
</script>