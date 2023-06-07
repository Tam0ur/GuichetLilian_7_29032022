<template >
    <div class="poste" v-if="post.utilisateur_id != userId" v-on:click="redirectPost">
        <img v-if="post.image != null" :src="post.image">
        <div>
            <p class="utilisateur">{{ post.prenom }} {{ post.nom }} </p>
            <p>{{ post.texte }}</p>
        </div>
        <p class="date_Creation">{{ formatDate(post.date_Creation) }}</p>
        <p class="date_Modification" v-if="post.date_Modification != null">modifié le : {{ post.date_Modification }}</p>
    </div>

    <div class="poste" v-else v-on:click="redirectPost">
        <img v-if="post.image != null" :src="post.image">
        <div >
            <p class="utilisateur">{{ post.prenom }} {{ post.nom }}</p>
            <p>{{ post.texte }}</p>
        </div>    
        <p class="date_Creation">{{ formatDate(post.date_Creation) }}</p>
        <p class="date_Modification" v-if="post.date_Modification != null">modifié le : {{ post.date_Modification }}</p>
        <button @click="deletePost($event)"><font-awesome-icon icon="trash" /></button>
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
            formatDate(date){
                date = new Date(date)
                return date.toLocaleDateString('en-GB');
            },
            redirectPost(){
                console.log(this.post.id)
                router.push(`/post/edit/${this.post.id}`)
            },
            deletePost(event){
                event.stopPropagation();
                this.$parent.deletePost(this.post.id)
            }
        },
    }
</script>


<style lang="scss">
    
.poste {
    position: relative;
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
}

</style>



