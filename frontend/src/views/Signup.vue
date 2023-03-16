
<template>
	<div class="form">
		<div>
				<label for="inputFName">Prénom</label>
				<input type="text" id="inputFName" v-model="fname" placeholder="John" required>
		</div>
		<div>
				<label for="inputLName">Nom </label>
				<input type="text" id="inputLName" v-model="name" placeholder="Doe" required>
		</div>
		<div>
			<label for="inputEmail">E-mail</label>
			<input type="email" id="inputEmail" v-model="email" placeholder="john.doe@example.com" required>
		</div>
		<div>
			<label for="inputMdp">Mot de passe</label>
			<input type="password" id="inputMdp" v-model="mdp" placeholder="" required>

		</div>

		<label>
			<input type="checkbox" v-model="isChecked">
			Admin
		</label>
		<button @click="signup">Valider</button>
	</div>
</template>

<script>
	import axios from 'axios'
	//import router from '../router/index'
	export default {
		name: 'SignupForm',
		data (){
			return{
				name : null,
				fname : null,
				email : null,
				mdp : null,
				isChecked : false,
			}
		},
		methods : {
			/*redirectLogin(){
				this.$router.push('/login')
			},*/
			signup(){
				axios.post("http://localhost:3000/api/auth/signup", {
					name: this.name,
					fname : this.fname,
					email : this.email,
					password : this.mdp,
					isAdmin : this.isChecked
				}).then(response => {
					alert('Ok')
					console.log(this.isChecked)
					console.log(response)
				}).catch(error => {
					alert('Pas ok')
					console.log(error)
				})
			}
		}
	}

</script>

<!-- HTML !-->
<style>
	input[type="checkbox"] {
		width: 15px;
	}
	label {
		width: 100px;
	}
	input{
		width: 200px;
	}
	label, input {
		margin: 5px;
		padding: 3px;
	}
</style>