<template lang="">
    
    <div class="comment" v-if="comment.utilisateur_id != userId">
        <p>{{ comment.texte }}</p>
        <h4>User :{{ comment.utilisateur_id }}</h4>
        <p class="date_Creation">{{ formatDate(comment.date_Creation) }}</p>
        <p class="date_Modification" v-if="comment.date_Modification != null">modifié le : {{ comment.date_Modification }}</p>
    </div>

    <div class="comment" v-else>
        <form @submit.prevent="updateComment">
            <div >
                <h4>User :{{ comment.utilisateur_id }}</h4>
                <input type="text" v-model="texte">
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
            formatDate(date){
                date = new Date(date)
                return date.toLocaleDateString('en-GB');
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

.comment {
    position: relative;
    width: 100%;
    & .utilisateur {
        font-weight: bold;
    }
    & .date_Creation {
        font-weight: bold;
        text-align: end;
        color: rgb(125, 125, 125);
    }
    & .date_Modification {
        font-weight: bold;
        text-align: end;
        color: rgb(125, 125, 125);
        font-size: 13px;
    }
    & .button_flex {
        display: flex;
        flex-flow: row nowrap;
        align-self: flex-end;
    }
    & .button_edit{
        position: absolute;
        right: 0;
        bottom: 30%;
    }
    & .button_delete{
        position: absolute;
        right: 0;
        top: 2vh;
    }
}
</style>



