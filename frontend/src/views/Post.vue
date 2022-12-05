<template>

    <div class="form">
    <div>
        <label for="inputText">Texte</label>
        <input type="texte" id="inputText" v-model="text" placeholder="" >
    </div>
    <div>
        <label for="inputDesc">Description</label>
        <input type="description" id="inputDesc" v-model="desc" placeholder="" >
    </div>

    <button @click="createPost">Post</button>
</div>
</template>

<script>
    import axios from 'axios'
    export default {
            name: 'homePage',
            data (){
                    return{
                            texte : this.text,
                            description : this.desc,
                    }
            },
            methods : {
                    createPost(){
                            axios.post("http://localhost:3000/api/createPost", {
                            }) 
                    }
            }
    }
</script>

<style>
</style>