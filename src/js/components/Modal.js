import React from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Context } from "../store/appContext";

class Modal extends React.Component{
	render(){
		return (
			<div className="modal" tabIndex="-1" role="dialog" style={{display: (this.props.show) ? 'inline-block' : 'none'}}>
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Are you sure?{this.props.id}</h5>
							{ (this.props.onClose) ?
								<button onClick={() => this.props.onClose()} type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
									:''
							}
						</div>
						<div className="modal-body">
							<p>Warning: unknown consequences after this point... Kidding!</p>
						</div>
						<div className="modal-footer">
							<Context.Consumer>
								{
									({ store, actions }) => {
									if(store.send === true ){
										this.props.onClose();
										actions.send();
									}
									if (store.error === true){
										alert("Error when trying to DELETE the user");
										actions.error();
									}
									const  id  = store.target;
									return (
										<div>
											<button type="button" className="btn btn-primary" onClick={() => this.props.onClose()}>Oh no!</button>
											<button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={(e)=> actions.deleteUser(e, id)}>Do it!</button>
										</div>
									);}
								}
							</Context.Consumer>

						</div>
					</div>
				</div>
			</div>
		);
	}
		
}
/**
 * Define the data-types for
 * your component's properties
**/
Modal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.string
};

/**
 * Define the default values for
 * your component's properties
**/
Modal.defaultProps = {
	show: false,
	onClose: null
};
export default withRouter(Modal);