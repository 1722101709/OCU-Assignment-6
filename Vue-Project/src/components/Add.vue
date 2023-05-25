<template>
    <div>
        <div v-if="!submitted" class="insert-form">
            <label>
                <span>Name</span>
                <input type="text" placeholder="Ex: N.T. Ramaroa" v-model="person.Name">
            </label>
            <label>
                <span>Age</span>
                <input type="text" placeholder="Ex: 38" v-model="person.Age">
            </label>
            <label>
                <span>Gender</span>
                <input type="text" placeholder="Ex: Male" v-model="person.gender">
            </label>
            <button class="submit" @click="submitForm()">Submit</button>
        </div>

        <div v-else class="response">
            <span>Data Submitted Successfully!!!</span>
            <button class="new-button" @click="Addnew()">Add More</button>
        </div>
    </div>
</template>

<script>
    import DataSender from '../DataSender.js'
    export default {
        name : "Add-Person",
        data(){
            return {
                person : {
                    Id : null,
                    Name : '',
                    Age : '',
                    gender : ''
                },
                submitted : false
            };
        },
        methods : {
            submitForm(){
                let data = {
                    Name : this.person.Name,
                    Age : parseInt(this.person.Age),
                    gender : this.person.gender
                };
                // Send request to Server with this data and submitted = true

                DataSender.create(data)
                .then(response => {
                    this.person.Id = response.data.Id;
                    console.log(this.person);
                    this.submitted = true
                })
                .catch( e => {
                    console.log(e)
                });
            },
            Addnew(){
                this.submitted = false;
                this.person = {
                    id : null,
                    Name : '',
                    Age : '',
                    gender : ''
                }
            }
        }
    }
</script>

<style>
    .insert-form{
        display: flex;
        flex-direction: column;
        align-items: center;
        width : 300px;
    }
    .insert-form label{
        display: flex;
        flex-direction: column;
        align-items: start;
        margin: 20px 0;
    }
    .insert-form label span{
        font-size: 27px;
        margin-bottom: 13px;
    }
    .insert-form label input{
        border: none;
        outline: none;
        font-size: 21px;
        text-align: center;
        border-bottom : 1px solid #555;
        background: transparent;
    }
    .insert-form label input::placeholder{
        font-size: 15px;
        opacity: 0.7;
    }
    .insert-form label input:focus{
        border-color: orange;
        border-width: 2px;
    }
    .submit{
        width: 100px;
        aspect-ratio: 3 / 1.7;
        border-radius: 5px;
        outline: none;
        border: none;
        cursor: pointer;
        background: wheat;
        color: blue;
        margin: 30px;
        font-size: 19px;
        box-shadow: 0 0 7px #555;
    }
    .submit:hover{
        background: blue;
        color: wheat;
    }
    .response{
        font-size: 23px;
        color: green;
        margin-right: auto;
    }
    .new-button{
        margin-left: 20px;
        width: 95px;
        aspect-ratio: 3 / 1.9;
        border-radius: 11px;
        outline: none;
        border: none;
        cursor: pointer;
        color: deeppink;
        animation: scale 1s ease-in-out infinite alternate;
        text-shadow: 0 0 9px deeppink;
    }
    @keyframes scale {
        from{
            font-size: 7px;
        }
        to{
            font-size: 12px;
        }
    }
    .new-button:hover{
        border: 1px solid orange;
    }
</style>