
<template>
	<div class="form">
		<div>
			<label for="inputEmail">E-mail</label>
			<input type="email" id="inputEmail" v-model="email" placeholder="john.doe@example.com" required>
		</div>
		<div>
			<label for="inputMdp">Mot de passe</label>
			<input type="password" id="inputMdp" v-model="mdp" placeholder="" required>
		</div>

		<button @click="login">Valider</button>
		<div id="alerte">
			<p>Mot de passe incorrect !</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import router from '../router'
	import { mapMutations } from 'vuex'
	export default {
		name: 'LoginForm',
		data (){
			return{
				email : null,
				mdp : null,
			}
		},
		/*computed : {
			mapState(['token'])
		},*/
		methods : {
			...mapMutations({
				setToken: "SET_TOKEN"
			}),
			login(){
				axios.post("http://localhost:3000/api/auth/login", {
					email : this.email,
					password : this.mdp
				}).then(response => {
					alert('Ok')
					this.setToken(response.data.token)
					router.push('/')
				}).catch(error => {
					document.getElementById('alert').style.display = "block";
					console.log(error)
				})
			}
		}
	}
</script>

<!-- HTML !-->
<button class="button-6" role="button">Button 6</button>



<style>
	#alerte{
		color: red;
		display: none;
	}
	button {
		border: 2px solid rgba(0, 0, 0);
		border-radius: 10px;
		background-color: white;
		margin: 10px;
		padding: 7px;
		cursor: pointer;
	}
	label {
		display: inline-flex;
		width: 100px;
	}

	label, input {
		margin: 5px;
		padding: 3px;
	}
</style>