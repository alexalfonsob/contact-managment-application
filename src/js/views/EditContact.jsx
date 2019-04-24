import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from 'prop-types';

class EditContact extends React.Component {
	render() {
		return (
			<div className="container">
				<Context.Consumer>
					{
						({ store, actions }) => {
						if(store.send === true ){
							this.props.history.goBack();
							actions.send();
						}
						if (store.error === true){
							alert("Error when trying to send the form");
							actions.error();
						}
						const  id  = this.props.match.params.id;
						return store.users.filter((users)  => users.id === id).map((users, i) => (
							<div key="1">
								<h1 className="text-center mt-5">Edit a contact</h1>
								<form method = "post" onSubmit={(e)=> {actions.editData(e, id);} }>
									<div className="form-group">
										<label>Agenda</label>
										<input	type="text" 
												name="agenda_slug"  
												defaultValue={users.agenda_slug} 
												className={`form-control ${store.Error_agenda_slug !== "" ? 'border-danger' : ''}`}
												readOnly
										/>
										<span className="text-danger font-italic"><small>{store.Error_agenda_slug}</small></span>
									</div>
									<div className="form-group">
										<label>Full Name</label>
										<input	required
												type="text" 
												name="full_name"  
												defaultValue={users.full_name} 
												autoComplete="off"  
												onChange={(e) => actions.handleInputChange(e)} 
												className={`form-control ${store.Error_full_name !== "" ? 'border-danger' : ''}`}
												placeholder="Full Name"
										/>
										<span className="text-danger font-italic"><small>{store.Error_full_name}</small></span>
									</div>
									<div className="form-group">
										<label>Email</label>
										<input	type="email" 
												name="email"  
												defaultValue={users.email} 
												className="form-control"
												readOnly
										/>
										<span className="text-danger font-italic"><small>{store.Error_email}</small></span>
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input	required 
												type="phone"name="phone" 
												defaultValue={users.phone}  
												autoComplete="off" 
												onChange={(e) => actions.handleInputChange(e)}    
												className={`form-control ${store.Error_phone !== "" ? 'border-danger' : ''}`}
												placeholder="Enter phone" 
										/>
										<span className="text-danger font-italic"><small>{store.Error_phone}</small></span>
									</div>
									<div className="form-group">
										<label>Address</label>
										<input	required 
												type="text" 
												name="address"  
												defaultValue={users.address}  
												autoComplete="off" 
												onChange={(e) => actions.handleInputChange(e)}   
												className={`form-control ${store.Error_address !== "" ? 'border-danger' : ''}`}
												placeholder="Enter address" 
										/>
										<span className="text-danger font-italic"><small>{store.Error_address}</small></span>
									</div>
									<button type="submit" className="btn btn-primary form-control" >save</button>
									<Link  className="mt-3 w-100 text-center" to="/" onClick={()=>{actions.resetError();}}>or get back to contacts</Link>
								</form>
							</div>
						));}
					}
				</Context.Consumer>
			</div>
		);
	}
}

EditContact.propTypes = {
	history: PropTypes.object,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string
		})
	})
};

export default EditContact;