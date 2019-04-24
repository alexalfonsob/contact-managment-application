const getState = ({ getStore, setStore }) => {
	return {
		store: {
			/*
			*	 Principal state
			*/

			agenda:[],
			users: [],
			user: [],
			
			// Pincipal Array data
			formData: [],
			
			/*
			*	Communication between components 
			*/
			send: false,
			error: false,
			target: "",
			valueselect: "",
			
			// state princial for forms Error
			isView: true,
			errorInput: false,
			Error_full_name: "",
			Error_email: "",
			Error_phone: "",
			Error_address: "",
			Error_agenda_slug: "",
			
			// values form
			agenda_slug: "",
			full_name: "",
			email: "",
			phone: "",
			address: ""

			
		},
		actions: {

			sniperTarget: (id)=>{
				setStore({
					target: id
				});
			},
			updateValueselect: (value)=>{
				setStore({
					valueselect: value
				});
			},
			error: () => {
				setStore({
					error: false
				});
			},			
			send: () => {
				setStore({
					send: false
				});
			},
			passgetConcat (){
				const store = getStore();
				if (store.valueselect !== ""){
					this.getConcat(store.valueselect);
				}
			},
			change (e) {
				setStore({
					valueselect: e
				});
				this.passgetConcat();
			},

			
			getAgendas() {
				const store = getStore();

				fetch(`https://assets.breatheco.de/apis/fake/contact/agenda`)
				.then(res => res.json())
				.then(data => {
					setStore({
						agenda: data.reverse()
					});
					if (store.valueselect === ""){
						setStore({
							valueselect: data[0]
						});
					}

					this.passgetConcat();
				})
				.catch(error => {
					return error;
				});
			},
			
			getConcat (e){
				fetch(`https://assets.breatheco.de/apis/fake/contact/agenda/${e}`)
				.then(res => res.json())
				.then(data => {
					setStore({
						users: data.reverse()
					});
				})
				.catch(error => {
					return error;
				});
			},
			
			getUser(id) {
				const store = getStore();
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`)
				.then(res => res.json())
				.then(data => {
					setStore({
						user: data
						
					});
					console.log(store.user);
				})
				.catch(error => {
					return error;
				});
			},
			
			handleCheckbox(){
				const store = getStore();
				setStore({
					isView: !store.isView
				});
			},
			
			checkEmailExist (email){
				const store = getStore();
				let found = store.users.find(element => element.email === email);
				if (found !== undefined){
					setStore({errorInput:true, Error_email:"Email registered"});
				}else if (found === undefined){
					setStore({ Error_email:""});
				}
			},
					
			validation(){
				const store = getStore();
				if (store.isView === false){
					if (!store.agenda_slug){
						setStore({errorInput:true, Error_agenda_slug:"Is Requiered"});
					}else{
						setStore({errorInput:false, Error_agenda_slug:""});
					}
				}
				if (!store.full_name){
					setStore({errorInput:true, Error_full_name:"Is Requiered"});
				}else{
					setStore({Error_full_name:""});
				}
				if (!store.email){
					setStore({errorInput:true, Error_email:"Is Requiered"});
				}else{
					let found = store.users.find(element => element.email == store.email);
					if (found !== undefined){
						setStore({errorInput:true, Error_email:"Email registered"});
					}else if (found === undefined){
						setStore({ errorInput:false, Error_email:""});
					}
				}
				if (!store.phone){
					setStore({errorInput:true, Error_phone:"Is Requiered"});
				}else{
					setStore({ Error_phone:""});
				}
				if (!store.address){
					setStore({errorInput:true, Error_address:"Is Requiered"});
				}else{
					setStore({Error_address:""});
				}
			},
			
			resetError: () =>{
				setStore({
					//form state
					isView: true,
					errorInput: false,
					Error_full_name: "",
					Error_email: "",
					Error_phone: "",
					Error_address: "",
					Error_agenda_slug: "",
					agenda_slug: "",
					full_name: "",
					email: "",
					phone: "",
					address: ""
				});	
			},

			handleInputChange: (e) => {
				const store = getStore();
				const name = e.target.name;
				const value = e.target.value;
				const newData = { ...store.formData, [name]: value };
				setStore({
					[name]: [value]
				});
				setStore({
					formData: newData
				});
			},
			
			editData(e, id) {
				e.preventDefault();
				const store = getStore();
				

				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(store.formData)
					})
					.then(res => res.json())
					.then(data => {
						setStore({
							formData: [],
							send: true,
							error: false
						});
						this.getAgendas();
						this.passgetConcat();
						this.resetError();
					})
					.catch(error => {
						setStore({
							send: false,
							error: true
						});
						return error;
					});
			},
			
			addData(e) {
				e.preventDefault();
				const store = getStore();
				this.validation();
				
				if (store.errorInput === false){

					let data;
	
					if (store.isView === false){
						data = store.formData;
					}else if (store.isView === true){
						data = { ...store.formData, agenda_slug: store.valueselect };
					}

					fetch(`https://assets.breatheco.de/apis/fake/contact/`, {
						method: "POST",
						body: JSON.stringify(data),
						headers: {
							"Content-Type": "application/json"
						}
					})
					.then(res => res.json())
					.then(data => {
						setStore({
							formData: [],
							send: true,
							error: false
						});
					this.getAgendas();
					this.passgetConcat();
					this.resetError();
					})
					.catch(error => {
						setStore({
							send: false,
							error: true
						});
						return error;
					});
				}
			},
			
			deleteUser (e, id) {
				e.preventDefault();

				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "DELETE"
				})
				.then(res => res.json())
				.then(data => {
					setStore({
						send: true,
						error: false,
						target: ""
					});
					this.getAgendas();
					this.passgetConcat();
					this.resetError();
				})
				.catch(error => {
					setStore({
						send: false,
						error: true
					});
					return error;
				});
			}
		}
	};
};

export default getState;
