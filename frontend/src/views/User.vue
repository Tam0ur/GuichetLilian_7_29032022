<template lang="">
    <div>
        <button @click="logout">Logout</button>
    </div>
    <div>
        <p>Supprimer votre compte :</p>
        <button @click="deleteUser"><font-awesome-icon icon="trash" /></button>
    </div>
</template>
<script>

import axios from 'axios'
import router from '../router'
import { mapActions } from 'vuex';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash)

export default {
    components: {
            FontAwesomeIcon
    },
    methods : {
        ...mapActions(['logout']),
        deleteUser(id){
            axios.delete(`http://localhost:3000/api/user/deleteUser/${id}`, {
            }).then(res => {
                console.log(res)
                router.push('./')
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>
<style lang="">
    
</style>