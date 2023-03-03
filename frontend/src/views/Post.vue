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
                                <button>Upload File</button>
                        </div>
                </form>
        </div>
</template>

<script>
import axios from 'axios'
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
                        var formData = new FormData()
                        formData.append('image', this.FILE)
                        formData.append('texte', this.texte)
                        console.log(formData)
                        axios.post("http://localhost:3000/api/post/createPost", 
                                formData,
                                {headers : {
                                        "Content-Type": "multipart/form-data"
                                }}
                        ).then(response => {
                                console.log(response)
                        }).catch(error => {
                                console.log(error)
                        })
                },
        }
}
</script>

<style>

</style>

