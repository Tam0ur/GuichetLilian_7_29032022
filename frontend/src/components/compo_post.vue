<template lang="">
    <div >
        <p>{{ post.texte }}</p>
        <h4>User :{{ post.utilisateur }}</h4>
        <img v-if="post.image != null" :src="post.image">
        <p>Date : {{ post.date_Creation }}</p>
        <button v-on:click="getThisPost">&#xF5D4;</button>
        <button @click="deletePost">🗑</button>
    </div>
</template>


<script>
import axios from 'axios';
import router from '../router'

    export default {
        name:'component_post',
        props: {
            post : Object
        },
        methods: {
            getThisPost(){
                axios.get("http://localhost:3000/api/post/getThisPost", {
                }).then(res => {
                    router.push(`http://localhost:3000/api/post/${res.post.id}`)
                }).catch(error => {
                    console.log(error)
                 })
            },
            deletePost(){
                axios.delete(`http://localhost:3000/api/post/deletePost/${this.post.id}`, {
                }).then(res => {
                        this.posts = res.data.result
                }).catch(error => {
                        console.log(error)
                })
            }
        },
        
    }
</script>


<style lang="">
    
</style>



