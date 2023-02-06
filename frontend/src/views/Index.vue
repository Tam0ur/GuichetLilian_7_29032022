<template>
        <div>
                <button @click="redirectPost"> + CREATE POST</button>
        </div>
        <div>
                <button @click="getAll"> DISPLAY POST</button>
        </div>
        <div class="div_post">ici : </div>

</template>

<script>
        import axios from 'axios'
        import router from '../router'
        export default {
                name : 'HomePage',
                methods : {
                        redirectPost(){
                                router.push('./post')
                        },
                        getAll(){
                                axios.get("http://localhost:3306/api/getAllPosts", {
                                }).then(res => {
                                        document.querySelector(".div_post").innerHTML +=
                                        `<div>
                                                <h2>User : ${res.utilisateur}</h5>
                                                <p>Texte : ${res.texte}</p>
                                                <p>Date : ${res.date_Création}</p>
                                        </div>`;
                                }).catch(error => {
                                        console.log(error)
                                })
                        }
                }
        }
</script>

<style>
</style>