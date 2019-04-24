import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";

class SearchAgenda extends React.Component {

	render() {
		return (
			<div>
				<Context.Consumer>
					{
						({ store, actions }) => {
						
							return (
								<div>
									<div><h6> Current agenda - {store.valueselect}</h6></div>
									<select  id="agenda" name = "valueselect" value={this.props.item}  className="form-control" onChange={(e) => actions.change(e.target.value)}>
										<Context.Consumer>
											{
												({ store, actions }) => {
		
													return store.agenda.map((item, i) => (
														<option key={i} value={item}>{item}</option>
												));}          
											}
										</Context.Consumer>
									</select>
								</div>);
							}          
						}
				</Context.Consumer>
	
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
