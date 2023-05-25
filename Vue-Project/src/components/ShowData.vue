<template>
    <div class="main">
        <div class="search">
            <span class="heading">Search Names</span>
            <input type="search" placeholder="Search Here" v-model="searchQuery" @input="Filter()">
        </div>
        <div class="container">
            <div class="data">
                <div v-for="(item, index) in items" 
                    class="item" 
                    :class="{ active: index == currentIndex}" 
                    :key="index" 
                    @click="Activate(index, item)"
                >
                    {{ item.Name }}
                </div>
                <button @click="RemoveAll()" class="remove-button">
                    <i class="bi bi-trash-fill"></i> Remove All
                </button>
            </div>

            <div class="currentItem">
                <div v-if="currentItem" class="details">
                    <span class="heading">{{currentItem.Name}} Details</span>
                    <div>
                        <span>Name: </span>
                        <span>{{ currentItem.Name }}</span>
                    </div>
                    <div>
                        <span>Age: </span>
                        <span>{{ currentItem.Age }}</span>
                    </div>
                    <div>
                        <span>Gender: </span>
                        <span>{{ currentItem.Gender }}</span>
                    </div>
                    <div>
                        <router-link :to="'/Update/' + currentItem.Id" class="edit">
                            <i class="bi bi-pencil-square"></i> Edit
                        </router-link>
                    </div>
                </div>
                <div v-else class="message">
                    <p>
                        <i class="bi bi-hand-index"></i> Click On Any Name...
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DataSender from '../DataSender.js'

    export default {
        name: "ShowData",
        data(){
            return {
                items: [],
                currentItem: null,
                currentIndex: -1,
                searchQuery: ''
            };
        },
        methods: {
            getAll(){
                DataSender.getAll()
                .then(response => {
                    this.items = response.data;
                    console.log(this.items);
                })
                .catch(e => {
                    console.log(e);
                });
            },
            Activate(index, item){
                this.currentItem = item;
                this.currentIndex = item ? index : -1;
            },
            RemoveAll(){
                DataSender.deleteAll()
                .then(() => {
                    this.items = [];
                    this.currentIndex = -1;
                    this.currentItem = null;
                    this.searchQuery = ''
                })
                .catch(e => {
                    console.log(e);
                })
            },

            Filter(){
                if (this.searchQuery !== ''){
                    DataSender.findByName(this.searchQuery)
                    .then(response => {
                        this.items = response.data;
                        console.log(this.items);
                        this.Activate(-1, null);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                }
                else{
                    this.getAll();
                }
            }
        },
        mounted(){
            this.getAll();
        }
    }
</script>

<style>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");
    .main{
        display: flex;
        justify-content: start;
        flex-direction: column;
    }
    .search{
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .search .heading{
        font-size: 29px;
        font-weight: 900;
        margin-left: 60px;
        margin-bottom: 10px;
    }
    .search input{
        height: 30px;
        outline: none;
        text-align: center;
        border: 1px solid #333;
        border-radius: 7px;
        width: 300px;
    }
    .search input:focus{
        border-color: orangered;
        box-shadow: 0 0 7px orangered;
    }
    .container{
        margin-left: 50px;
        display: flex;
        justify-content: space-evenly;
        width: 600px;
        margin-top: 50px;
    }
    .data{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .item{
        background: #cbcb26;
        color: #777;
        width: 200px;
        height: 37px;
        margin: 1px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .item:nth-child(1){
        border-top-right-radius: 11px;
        border-top-left-radius: 11px;
    }
    .item:hover{
        background:mediumspringgreen;
    }
    .item.active, .item.active:hover{
        background: green;
        color: aliceblue;
    }
    .remove-button{
        width: 110px;
        aspect-ratio: 3 / 1.7;
        outline: none;
        border: none;
        background: #e22323;
        color: white;
        border-radius: 7px;
        margin-top: 20px;
        cursor: pointer;
    }
    .remove-button:hover{
        background: #979191;
        color: #e22323;
        box-shadow: 0 0 7px #e22323;
    }
    .currentItem{
        margin-left: 100px;
        width: 300px;
    }
    .details{
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .details > .heading{
        font-size: 27px;
        font-weight: 700;
        margin-bottom: 13px;
        color:darkgreen;
        text-decoration: 2px double black underline;
        text-shadow: 0 0 7px greenyellow;
    }
    .details div{
        margin: 5px 0;
        width: 100%;
    }
    .details div span:nth-child(1){
        font-size: 21px;
        font-style: italic;
        font-weight: 500;
    }
    .details div span:nth-child(2){
        display: inline-block;
        font-size: 19px;
        font-style: italic;
        font-family: 600;
    }
    .edit{
        text-decoration: none;
        font-size: 25px;
        color: blue;
    }
    .message p{
        font-size: 27px;
        color: #280ca7;
    }
</style>