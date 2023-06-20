<template lang="">
    
    <div class="comment" v-if="comment.utilisateur_id != userId">
        <p class="utilisateur">{{ comment.prenom }} {{ comment.nom }}</p>
        <p class="comment_txt">{{ comment.texte }}</p>
        <p class="date_Creation">{{ formatDate(comment.date_Creation) }}</p>
        <p class="date_Modification" v-if="comment.date_Modification != null">modifié le : {{ comment.date_Modification }}</p>
    </div>

    <div class="comment" v-else>
        <form @submit.prevent="updateComment">
            <div >
                <p class="utilisateur">{{ comment.prenom }} {{ comment.nom }}</p>
            </div>
            <div>
                <input type="text" id="inputText" v-model="commentTxt">
            </div>
            <p class="date_Creation">{{ formatDate(comment.date_Creation) }}</p>
            <p class="date_Modification" v-if="comment.date_Modification != null">modifié le : {{ comment.date_Modification }}</p>
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
            }
        },
        props: {
            comment : Object
        },
        components: {
            FontAwesomeIcon
        },
        methods: {
            formatDate(date){
                date = new Date(date)
                return date.toLocaleDateString('en-GB');
            },
            getThisComment(){
                axios.get(`http://localhost:3000/api/comment/getThisComment/${this.$route.params.id}`, {
                }).then(res => {
                    this.commentTxt = res.data.texte 
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
                this.$parent.deleteComment(this.comment.id);
            },
        },

        mounted() {
            this.getThisComment();
        },
    }
</script>


<style lang="scss">
.input_com{
    width: 95%;
}
.row{
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
}

.comment {
    position: relative;
    width: 100%;
    & .utilisateur {
        font-weight: bold;
        align-self: flex-start;
    }
    & #inputText {
        align-self: flex-start;
    }
    & .date_Creation {
        font-weight: bold;
        text-align: end;
        color: rgb(125, 125, 125);
        margin-right: 10px;
    }
    & .date_Modification {
        font-weight: bold;
        text-align: end;
        color: rgb(125, 125, 125);
        margin-right: 10px;
        font-size: 13px;
    }
    & .button_flex {
        display: flex;
        flex-flow: row nowrap;
        align-self: flex-end;
    }
    & .button_edit{
        position: absolute;
        left: 10px;
        bottom: 0.75vh;
    }
    & .button_delete{
        position: absolute;
        left: 45px;
        bottom: 0.75vh;
    }
}
</style>



