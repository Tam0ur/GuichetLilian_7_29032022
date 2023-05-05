<template>

        <div class="form">
                <div>
                        <label for="inputText">Texte</label>
                        <input type="text" id="inputText" v-model="texte" placeholder="">
                </div>

                <form @submit.prevent="onSubmit">
                        <div>
                                <input type="file" @change="onFileUpload">
                        </div>
                        <div>
                                <button>Post</button>
                        </div>
                </form>
        </div>
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
                                console.log(formattedDate)
                                console.log(response)
                                router.push('/')
                        }).catch(error => {
                                console.log(error)
                        })
                },
        },
        
}
</script>

<style>

</style>

