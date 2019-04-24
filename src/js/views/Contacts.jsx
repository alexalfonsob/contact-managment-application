import React from "react";
import { Link } from "react-router-dom";
import SearchAgenda from '../components/searchAgenda';
import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';
import { Context } from "../store/appContext";

export default class Contacts extends React.Component {
	constructor(){
		super();
		this.state = {
			showModal: false
		};
	}
	render() {
	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">Add new contact</Link>
				</p>
				<div className="m-2">
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
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						<Context.Consumer>
							{
								({ store }) => {
									return store.users.map((users, i) => (
										<ContactCard
											onDelete={() => this.setState({ showModal: true})}
											full_name={ users.full_name }
											email={ users.email }
											address={ users.address }
											phone={ users.phone }
											id= {users.id}
											key={i}
										/>
								));}          
							}
						</Context.Consumer>
					</ul>
				</div>
			</div>
			<Modal show={this.state.showModal} onClose={() => this.setState({showModal: false})} />
		</div>
		);
	}
}