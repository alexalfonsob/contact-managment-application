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
						const  id  = this.props.match.params.id;
						actions.passDetail(id);

						if(store.send === true ){
							this.props.history.goBack();
							actions.send();
						}
						if (store.error === true){
							alert("Error when trying to send the form");
							actions.error();
						}
						return (
							<div key="1">
								<h1 className="text-center mt-5">Edit a contact</h1>
								<form method = "post" onSubmit={(e)=> {actions.editData(e, id);} }>
									<div className="form-group">
										<label>Agenda</label>
										<input	type="text" 
												name="agenda_slug"  
												placeholder={store.detail.agenda_slug} 
												className={`form-control`}
												readOnly
										/>
									</div>
									<div className="form-group">
										<label>Full Name</label>
										<input	type="text" 
												name="full_name"  
												placeholder={store.detail.full_name} 
												autoComplete="off"  
												onChange={(e) => actions.handleInputChange(e)} 
												className={`form-control`}
										/>
									</div>
									<div className="form-group">
										<label>Email</label>
										<input	type="email" 
												name="email"  
												placeholder={store.detail.email} 
												className="form-control"
												readOnly
										/>
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input	type="phone"name="phone" 
												placeholder={store.detail.phone}  
												autoComplete="off" 
												onChange={(e) => actions.handleInputChange(e)}    
												className={`form-control`}

										/>
									</div>
									<div className="form-group">
										<label>Address</label>
										<input	type="text" 
												name="address"  
												placeholder={store.detail.address}  
												autoComplete="off" 
												onChange={(e) => actions.handleInputChange(e)}   
												className={`form-control`}
										/>
									</div>
									<button type="submit" className="btn btn-primary form-control" >save</button>
									<Link  className="mt-3 w-100 text-center" to="/" onClick={()=>{actions.resetError();}}>or get back to contacts</Link>
								</form>
							</div>
						);}
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