<template lang="">
    <div v-if="post.utilisateur != userId" v-on:click="redirectPost" >
        <img v-if="post.image != null" :src="post.image">
        <div class="row">
            <p>{{ post.utilisateur }}</p>
            <p> : {{ post.texte }}</p>
        </div>
        <p>{{ post.date_Creation }}</p>
    </div>

    <div v-else v-on:click="redirectPost" >
        <img v-if="post.image != null" :src="post.image">
        <div class="row">
            <p>{{ post.utilisateur }}</p>
            <p> : {{ post.texte }}</p>
        </div>    
        <p>{{ post.date_Creation }}</p>
        <button class="button_post" @click="deletePost"><font-awesome-icon icon="trash" /></button>
    </div>
</template>


<script>
import router from '../router'
import { mapState } from 'vuex'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

    export default {
        computed : mapState({
            userId : state => state.userId
        }),
        props: {
            post : Object
        },
        components: {
            FontAwesomeIcon
        },
        methods: {
            redirectPost(){
                router.push(`/post/edit/${this.post.id}`)
            },
            deletePost(){
                this.$parent.deletePost(this.comment.id)
            }
        },
    }
</script>


<style lang="">
    
</style>



