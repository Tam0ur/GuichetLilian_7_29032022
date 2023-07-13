<template lang="">

    <div class="poste_2" v-if="post.utilisateur_id == userId || isAdmin == 1">
        <form @submit.prevent="updatePost">
            <img v-if="post.image != null" :src="post.image">
            <div>
                <label for="inputText"></label>
                <input type="text" id="inputText" v-model="texte">
            </div>
            <div>
                <input type="file" @change="onImageChange">
            </div>   
            
            <div>
                <button>Mettre à jour</button>
            </div>
                <h4>{{ post.prenom }} {{ post.nom }}</h4>
                <p class="date_Creation">{{ formatDate(post.date_Creation) }}</p>
                <p class="date_Modification" v-if="post.date_Modification != null">modifié le : {{ formatDate(post.date_Modification) }}</p>
        </form>
    </div>

    <div class="poste_2" v-else>
        <img v-if="post.image != null" :src="post.image">
        <p>{{ post.texte }}</p>      
        <h4>{{ post.prenom }} {{ post.nom }}</h4>
        <p class="date_Creation">{{ formatDate(post.date_Creation) }}</p>
        <p class="date_Modification" v-if="post.date_Modification != null">modifié le : {{ formatDate(post.date_Modification) }}</p>
    </div>

    <div class="border_bottom"></div>

    <form class="add_comment" @submit.prevent="createComment">
        <label for="inputCom">Commentaire</label>
        <input type="text" id="inputCom" v-model="commentTexte">
        <button>Commenter</button>
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
            userId : state => state.userId,
            isAdmin : state => state.isAdmin,
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
        formatDate(date){
            date = new Date(date)
            return date.toLocaleDateString('en-GB');
        },
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
                axios.get(`http://localhost:3000/api/comment/getThisComment/${res.data.insertId}`, {
                }).then(res => {
                    this.comments.push(res.data.result[0])
                    this.commentTexte= ''
                }).catch(error => {
                    console.log(error)
                })
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


.border_bottom {
    width: 700px;
    border-bottom: 2px solid grey;
    align-self: center;
    margin-top: 25px;
    margin-bottom: 25px;
}

.style_comments {
    position: relative;
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

.poste_2 {
    margin: 0px;
    margin-top: 25px;
    position: relative;
    padding:  25px;
    align-self: center;
    text-align: center;
    width: 500px;
    border: 2px solid grey;
    border-radius: 5px;
    &:hover{
        cursor: pointer;
        transition-duration: 0.3s;
        box-shadow: 0px 0px 10px 0px #7bb99d;
    }
    & .utilisateur {
        font-weight: bold;
    }
    & .date_Creation {
        margin: 0;
        font-weight: bold;
        text-align: end;
        color: rgb(125, 125, 125);
    }
    & .date_Modification {
        margin: 0;
        font-weight: bold;
        text-align: end;
        color: rgb(125, 125, 125);
        font-size: 13px;
    }
}
.add_comment {
    align-self: center;
    display: flex;
    flex-direction: row;
    width: 500px;
}
</style>