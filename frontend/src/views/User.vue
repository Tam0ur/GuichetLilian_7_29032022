<template lang="">
    <div class="div_suppression">
        <p>Supprimer votre compte :</p>
        <button @click="deleteUser"><font-awesome-icon icon="trash" /></button>
    </div>
</template>
<script>

import axios from 'axios'
import router from '../router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { mapState } from 'vuex'
import { mapActions } from 'vuex';

library.add(faTrash)

export default {
    computed : mapState({
            userId : state => state.userId,
    }),
    components: {
            FontAwesomeIcon
    },
    methods : {
        ...mapActions(['logout']),
        deleteUser(){
            if(confirm('Voulez-vous supprimer votre compte ?')){
                axios.delete(`http://localhost:3000/api/auth/deleteUser/${this.userId}`, {
                }).then(res => {
                    console.log(res)
                    this.logout();
                    router.push('/login')
                }).catch(error => {
                    console.log(error)
                })
            }
            
        }
    }
}
</script>
<style lang="scss">
.div_suppression {
    display: flex;
    margin-top: 35vh;
	align-self: center;
	justify-content: center;
	border: 2px solid rgb(167, 167, 167);
	width: fit-content;
	padding: 10px;
	border-radius: 5px;
	&:hover{
        cursor: pointer;
        transition-duration: 0.3s;
        box-shadow: 0px 0px 10px 0px #7bb99d;
    }
}
</style>