<template lang="">
    <div class="post" v-if="post.utilisateur != userId">
        <img v-if="post.image != null" :src="post.image">
        <p>{{ post.texte }}</p>      
        <h4>User :{{ post.utilisateur }}</h4>
        <p>Date : {{ post.date_Creation }}</p>
    </div>

    <div class="post" v-else>
        <form @submit.prevent="updatePost">
            <img v-if="post.image != null" :src="post.image">
            <div >
                <label for="inputText">Texte</label>
                <input type="text" id="inputText" v-model="texte">
            </div>
            <div>
                <input type="file" @change="onImageChange">
            </div>   
            
            <div>
                <button>Update post</button>
            </div>
                <h4>User :{{ post.utilisateur }}</h4>
                <p>Date : {{ post.date_Creation }}</p>
        </form>
    </div>
    <div class="border_bottom"></div>
        <form class="comment" @submit.prevent="createComment">
                <label for="inputCom">Commentaire</label>
                <input type="text" id="inputCom" v-model="commentTexte">
                <button>Comment</button>
        </form>
        <div class="border_bottom"></div>
        <component_comment class="style_comments"  v-for="comment in comments" :key="comment.id" :comment="comment"></component_comment>    
    
    
</template>

<script>

import axios from 'axios'
import router from '../router'
import { mapState } from 'vuex'
import component_comment from './component_comment.vue'

export default {
    computed : mapState({
            userId : state => state.userId
    }),
    data() {
        return {
            post: '',
            texte: '',
            FILE: null,

            commentTexte: '',
            postId: '',

            comments: '',
        };
    },
    components: {
        component_comment
    },
    methods: {
        getThisPost(){
                axios.get(`http://localhost:3000/api/post/getThisPost/${this.$route.params.id}`, {
                }).then(res => {
                    this.post = res.data.result[0] 
                    this.texte = res.data.result[0].texte
                }).catch(error => {
                    console.log(error)
                })
        },
        onImageChange(event) {
            this.FILE = event.target.files[0]
        },
        getAllComments(){
            axios.get(`http://localhost:3000/api/comment/getAllComments/${this.$route.params.id}`, {
            }).then(res => {
                this.comments = JSON.parse(JSON.stringify(res.data)) 
                console.log("test" , this.comments)
            }).catch(error => {
                console.log(error)
            })
        },
        updatePost(){
            const formData = new FormData();
            formData.append('image', this.FILE)
            formData.append('texte', this.texte)
            axios.put(`http://localhost:3000/api/post/updatePost/${this.post.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(res)
                router.push('/')
            }).catch(error => {
                console.log(error)
            })
        },
        createComment(){
            axios.post(`http://localhost:3000/api/comment/createComment`, {
                comText: this.commentTexte,
                postId: this.post.id,
            }).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        },
        deleteComment(id){
            axios.delete(`http://localhost:3000/api/comment/deleteComment/${id}`, {
            }).then(res => {
                const index = this.comments.findIndex( e => e.id === id )
                this.comments.splice(index, 1 )
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        },
    },

    
    mounted() {
        this.getThisPost();
        this.getAllComments();
    },
    
}
</script>



<style lang="scss">
form {
    width: auto;
}
input{
    width: 80%;
}
.border_bottom {
    width: 700px;
    border-bottom: 2px solid grey;
    align-self: center;
    margin-top: 25px;
    margin-bottom: 25px;
}

.style_comments {
    background-color: white;
    display: inline-flex;
    flex-flow: column nowrap;
    padding: 10px;
    margin: 0 auto;
    margin-bottom: 15px;
    text-align: center;
    width: 500px;
    border: 2px solid rgb(128, 128, 128);
    border-radius: 5px;
    &:hover{
        cursor: pointer;
        transition-duration: 0.3s;
        box-shadow: 0px 0px 10px 0px #7bb99d;
    }
}
.post { 
    padding:  25px;
    align-self: center;
    width: fit-content;
    border: 2px solid grey;
    border-radius: 5px;
    &:hover{
        cursor: pointer;
        transition-duration: 0.3s;
        box-shadow: 0px 0px 10px 0px #7bb99d;
    }
}
.comment {
    align-self: center;
    display: flex;
    flex-direction: row;
    width: 500px;
}
</style>