import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";

class SearchAgenda extends React.Component {
	constructor() {
		super();
		this.state = {
			valueselect: ""
		};
	}
	change (e) {
		this.setState({
			valueselect: e
		});
	}

	render() {
		return (
			<div>
				
				<select  id="agenda" name = "valueselect" value={this.state.valueselect}  className="form-control" onChange={(e) => this.change(e.target.value)}>
					<option> Current agenda - {this.props.item} </option>
					<Context.Consumer>
						{
							({ store, actions }) => {
							if (this.state.valueselect !== "")
							{
								/* Sincronizo el estado local del select
								*  con el estado global
								*/
								actions.updateValueselect(this.state.valueselect);
								// el estado local lo coloco en blanco para evitar bucle
								this.setState({valueselect: ""});
								// llamo la funcion que muestra la data actual del estado global de la agenda
								actions.passgetConcat();
								
							} 
								return store.agenda.map((item, i) => (
									<option key={i} value={item}>{item}</option>
							));}          
						}
					</Context.Consumer>
				</select>
			</div>
		);
	}
}

/**
 * Define the data-types for
 * your component's properties
 **/
SearchAgenda.propTypes = {
	item: PropTypes.string
};
export default withRouter(SearchAgenda);