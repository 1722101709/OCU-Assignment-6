<template>
    <div class="main-form">
        <span class="heading">Person Details</span>
        <div class="row">
            <span>Name</span>
            <input type="text" v-model="person.Name" spellcheck="false">
        </div>
        <div class="row">
            <span>Age</span>
            <input type="text" v-model="person.Age">
        </div>
        <div class="row">
            <span>Gender</span>
            <input type="text" v-model="person.Gender">
        </div>

        <div class="buttons">
            <button @click="Update()" class="update-button">
                <i class="bi bi-pencil-square"></i> Update
            </button>
            <button @click="Delete()" class="delete-button">
                <i class="bi bi-trash-fill"></i> Delete
            </button>
        </div>

        <div>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script>
    import DataSender from '../DataSender';
    export default {
        name: "Update-Data",
        data(){
            return {
                person: {
                    Id: null,
                    Name: '',
                    Age: -11,
                    Gender: ''
                },
                message: ''
            };
        },
        methods: {
            getData(id){
                DataSender.get(id)
                .then(response => {
                    this.person = response.data[0];
                    console.log(this.person);
                })
                .catch(e => {
                    console.log(e);
                })
            },
            Update(){
                DataSender.update(this.person.Id, this.person)
                .then(response => {
                    this.person = response.data[0];
                    console.log(this.person);
                    this.message = "Data Updated Successfully!!!";
                })
                .catch(e => {
                    console.log(e);
                })
            },
            Delete(){
                DataSender.delete(this.person.Id)
                .then(response => {
                    this.person = {};
                    this.$router.push('/ShowData');
                    this.message = response.data.message;
                })
                .catch(e => {
                    console.log(e);
                })
            }
        },
        mounted(){
            this.getData(this.$route.params.id);
            this.message = '';
        }
    }
</script>

<style>
    @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");
    .main-form{
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        margin-left: 75px;
    }
    .main-form .heading{
        font-size: 39px;
        font-weight: 900;
        color: darkblue;
        font-style: italic;
        text-decoration: 2px double yellow underline;
        margin-bottom: 30px;
        margin-left: 50px;
    }
    .main-form .row{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width : 300px;
        margin: 20px 0px;
    }
    .main-form .row span{
        font-size: 23px;
        width: 100px;
    }
    .main-form .row input{
        outline: none;
        border: none;
        border-bottom: 1px solid #AAA;
        text-align: center;
        font-size: 16px;
        background: transparent;
    }
    .main-form .row input:focus{
        border-color: orange;
        border-width: 2px;
    }
    .main-form .buttons{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 300px;
        margin-top: 20px;
        font-size: 19px;
    }
    .main-form .buttons button{
        outline: none;
        border: none;
        font-size: 19px;
        width: 100px;
        aspect-ratio: 3 / 1.7;
        cursor: pointer;
        border-radius: 11px;
        color: azure;
    }
    .update-button{
        background: #51d41e;
    }
    .main-form .buttons .update-button:hover{
        color: #51d41e;
        background: azure;
        text-shadow: 0 0 7px #51d41e;
    }
    .delete-button{
        background: #e22323;
    }
    .main-form .buttons .delete-button:hover{
        color: #e22323;
        text-shadow: 0 0 7px #e22323;
        background: azure;
    }
</style>