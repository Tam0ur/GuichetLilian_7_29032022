<template>

        <form class="form_post" @submit.prevent="onSubmit">
                <div>
                        <input type="text" id="inputText" v-model="texte" placeholder="Votre texte :">
                </div>
                <input type="file" @change="onFileUpload">
                <button>Poster</button>
        </form>

</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
        name: 'postPage',
        data() {
                return {
                        texte: '',
                        FILE: null,
                }
        },
        methods: {
                onFileUpload (event) {
                        this.FILE = event.target.files[0]
                },
                onSubmit() {
                        const today = new Date();
                        const formattedDate = today.toLocaleDateString(); // format the date in the desired format

                        var formData = new FormData()
                        formData.append('image', this.FILE)
                        formData.append('texte', this.texte)
                        formData.append('date', formattedDate)
                        axios.post("http://localhost:3000/api/post/createPost", formData, {
                                headers : {
                                        "Content-Type": "multipart/form-data"
                                }}
                        ).then(response => {
                                console.log(response)
                                router.push('/')
                        }).catch(error => {
                                console.log(error)
                        })
                },
        },
        
}
</script>

<style lang="scss">
.form_post {
        width: 400px;
        display: flex;
        flex-flow: column nowrap;
        margin-top: 35vh;
	align-self: center;
        align-items: center;
        text-align: center;
	border: 2px solid rgb(167, 167, 167);
	padding: 10px;
	border-radius: 5px;
	&:hover{
                cursor: pointer;
                transition-duration: 0.3s;
                box-shadow: 0px 0px 10px 0px #7bb99d;
        }
        & button {
                width: fit-content;
        }
        & input {
                width: 300px;
        }
}
body{
        height: 100vh;
}
</style>

