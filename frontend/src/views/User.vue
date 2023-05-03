<template lang="">
    <div>
        <button @click="logout">Logout</button>
    </div>
    <div>
        <p>Supprimer votre compte :</p>
        <button @click="deleteUser"></button>
    </div>
</template>
<script>

import axios from 'axios'
import router from '../router'
import { mapActions } from 'vuex';

export default {
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