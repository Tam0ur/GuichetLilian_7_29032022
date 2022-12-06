<template>

        <div class="form">
                <div>
                        <label for="inputText">Texte</label>
                        <input type="texte" id="inputText" v-model="text" placeholder="">
                </div>
                <div>
                        <input style="display: none" type="file" @change="fileSelected" ref="fileInput">
                        <button @click="$refs.fileInput.click()">Pick file</button>
                        <button @click="onUpload">Upload</button>
                </div>

                <button @click="createPost">Post</button>
        </div>
</template>

<script>
import axios from 'axios'
export default {
        name: 'homePage',
        data() {
                return {
                        texte: null,
                        selectedFile: null
                }
        },
        methods: {
                createPost() {
                        axios.post("http://localhost:3000/api/createPost", {
                                texte: this.text
                        }).then(response => {
                                console.log(response)
                        }).catch(error => {
                                console.log(error)
                        })
                },
                fileSelected(event){
                        this.selectedFile = event.target.file[0]
                },
                onUpload(){
                        const fd = new FormData
                        fd.append('image', this.selectedFile, this.selectedFile.name)
                        axios.post('', fd, {
                                onUploadProgress: uploadEvent => {
                                        console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
                                }
                        })
                        .then(res => {
                                console.log(res)
                        })
                }
        }
}
</script>

<style>

</style>