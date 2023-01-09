<template>
        <div>
                <button @click="redirectPost"> + CREATE POST</button>
        </div>
        <div>
                <button @click="getAllPosts"> DISPLAY POST</button>
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
                        getAllPosts(){
                                axios.get("http://localhost:3000/api/post/getAll", {
                                }).then(res => {
                                        document.querySelector(".div_post").innerHTML +=
                                        `<div>
                                                <h2>User : ${res.utilisateur}</h5>
                                                <p>Texte : ${res.texte}</p>
                                                <p>Texte : ${res.date_Création}</p>
                                        </div>`;
                                        console.log(res)
                                }).catch(error => {
                                        console.log(error)
                                })
                        }
                }
        }
</script>

<style>

</style>