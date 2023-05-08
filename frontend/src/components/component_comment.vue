<template lang="">
    
    <div v-if="comment.utilisateur_id != userId">
        <p>{{ comment.texte }}</p>
        <h4>User :{{ comment.utilisateur_id }}</h4>
        <p>Date : {{ comment.date_Creation }}</p>
    </div>

    <div v-else>
        <form @submit.prevent="updateComment">
            <div >
                <h4>User :{{ comment.utilisateur_id }}</h4>
                <input type="text" id="inputCom" v-model="texte">
            </div>
            <p>Date : {{ comment.date_Creation }}</p>
            <div class="button_flex">
                <button class="button_edit"><font-awesome-icon icon="fa-solid fa-pen" /></button>
                <button class="button_delete" @click="deleteComment"><font-awesome-icon icon="trash" /></button>
            </div>
        </form>
    </div>
        
</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)
library.add(faPen)

    export default {
        computed : mapState({
            userId : state => state.userId
        }),
        data(){
            return {
                commentTxt: '',
                texte: '',
            }
        },
        props: {
            comment : Object
        },
        components: {
            FontAwesomeIcon
        },
        methods: {
            getThisComment(){
                axios.get(`http://localhost:3000/api/comment/getThisComment/${this.$route.params.id}`, {
                }).then(res => {
                    this.commentTxt = res.data.result[0] 
                    this.texte = res.data.result[0].texte
                }).catch(error => {
                    console.log(error)
                })
            },
            updateComment(){
                const formData = new FormData();
                formData.append('texte', this.texte)
                axios.put(`http://localhost:3000/api/comment/updateComment/${this.commentTxt.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            },
            deleteComment(){
                this.$parent.deleteComment(this.comment.id)
            },
        },
        mounted() {
            this.getThisComment();
        },
    }
</script>


<style lang="scss">
input{
    width: 80%;
}
.row{
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
}
.button_flex {
    display: flex;
    flex-flow: row nowrap;
    align-self: flex-end;
}
.button_edit{
    position: absolute;
    right: 0;
    bottom: 30%;
}
.button_delete{
    position: absolute;
    right: 0;
    bottom: 10px;
}
</style>



