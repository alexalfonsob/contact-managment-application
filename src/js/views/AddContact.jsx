import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from 'prop-types';
import SearchAgenda from '../components/searchAgenda';

class AddContact extends React.Component {
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
						return (
							<div>
								<h1 className="text-center mt-5">Add a contact</h1>
								<form method = "post" onSubmit={(e)=> {actions.addData(e);}}>
									<div className="form-check">
										<input className="form-check-input" 
												type="checkbox"
												value=""
												id="defaultCheck1" 
												onChange={() => actions.handleCheckbox()}
												checked={store.isView}
										/>
										<label className="form-check-label" htmlFor="defaultCheck1">Current agenda</label>
									</div>
									<div  className={` ${store.isView ? 'Visible': 'noVisible'}`}>
										<Context.Consumer>
											{
												({ store, actions }) => {
													return(
														<SearchAgenda 
														item = {store.valueselect}
														/>
												);}
											}
										</Context.Consumer>
									</div>
									<div id="agenda" className={` ${store.isView ? 'noVisible': 'Visible'}`}>
										<label>Agenda</label>
										<input  type="text"
												name={`${store.isView ? '': 'agenda_slug'}`}
												autoComplete="off"  
												onChange={(e) => actions.handleInputChange(e)} 
												className={`form-control ${store.Error_agenda_slug !== "" ? 'border-danger' : ''}`}
												placeholder="My Agenda" 
										/>
										<span className="text-danger font-italic"><small>{store.Error_agenda_slug}</small></span></div>
									<div className="form-group">
										<label>Full Name</label>
										<input  type="text" 
												name="full_name"
												autoComplete="off"
												onChange={(e) => actions.handleInputChange(e)}
												className={`form-control ${store.Error_full_name !== "" ? 'border-danger' : ''}`}
												placeholder="Full Name" 
										/>
										<span className="text-danger font-italic"><small>{store.Error_full_name}</small></span>
									</div>
									<div className="form-group">
										<label>Email</label>
										<input  type="email" 
												name="email"  
												autoComplete="off" 
												onChange={(e) => {actions.handleInputChange(e); actions.checkEmailExist(e.target.value);}} 
												className={`form-control ${store.Error_email !== "" ? 'border-danger' : ''}`}
												placeholder="Enter email" 
										/>
										<span className="text-danger font-italic"><small>{store.Error_email}</small></span>
									</div>
									<div className="form-group">
										<label>Phone</label>
										<input  type="phone"
												name="phone" 
												autoComplete="off" 
												onChange={(e) => actions.handleInputChange(e)}
												className={`form-control ${store.Error_phone !== "" ? 'border-danger' : ''}`}
												placeholder="Enter phone" 
										/>
										<span className="text-danger font-italic"><small>{store.Error_phone}</small></span>
									</div>
									<div className="form-group">
										<label>Address</label>
										<input  type="text" 
												name="address" 
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
						);}
					}
				</Context.Consumer>
			</div>
		);
	}
}

AddContact.propTypes = {
	history: PropTypes.object,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string
		})
	})
};

export default AddContact;