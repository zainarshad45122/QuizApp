import React, { Component } from 'react';
import SellerRegisterPage from './SellerRegisterPage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerSeller } from '../../actions/providerAction';

class SellerRegister extends Component {
	constructor() {
		super();
		this.state = {
			seller_experience: '',
			seller_description: '',
			ingredients: [],
			ingredientsText: '',
			seller_language: '',

			errors: {},
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			if (this.props.auth.user.user.role == 2) {
				this.props.history.push('/');
			} else {
				window.scrollTo(0, 0);
			}
		} else {
			window.scrollTo(0, 0);
		}
	}
	

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors.errors });
		}
	}
	handleChange = input => e => {
		this.setState({ [e.target.name]: e.target.value }, () => console.log('state', this.state));
	};
	handleKeyPress(target) {
		if (target.charCode == 13) {
			if (this.state.ingredientsText !== '') {
				let arr = this.state.ingredients;
				arr = arr.concat(this.state.ingredientsText);

				this.setState({ ingredients: arr }, () => console.log('state', this.state));
				this.setState({ ingredientsText: '' }, () => console.log('state', this.state));
				this.setState({
					isIngredientAdded: true,
				});
			}
		}
	}
	handleMultiInputs = input => e => {
		if (this.state.ingredientsText !== '') {
			let arr = this.state.ingredients;
			arr = arr.concat(this.state.ingredientsText);

			this.setState({ ingredients: arr }, () => console.log('state', this.state));
			this.setState({ ingredientsText: '' }, () => console.log('state', this.state));
			this.setState({
				isIngredientAdded: true,
			});
		}
	};
	remove = input => e => {
		const ingredients = this.state.ingredients;
		const newList = ingredients.slice(0, input).concat(ingredients.slice(input + 1, ingredients.length));
		this.setState({
			ingredients: newList,
		});
		if (ingredients.length == 0)
			this.setState({
				isIngredientAdded: false,
			});
	};
	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			seller_experiance: this.state.seller_experience,
			seller_description: this.state.seller_description,
			seller_language: this.state.seller_language,
			skillname: this.state.ingredients,
		};

		this.props.registerSeller(newUser, this.props.history);
	}
	render() {
		console.log(this.state);
		const { errors } = this.state;
		return (
			<SellerRegisterPage
				onSubmit={this.onSubmit}
				onChange={this.onChange}
				handleMultiInputs={this.handleMultiInputs}
				handleChange={this.handleChange}
				handleKeyPress={this.handleKeyPress}
				fields={{ ...this.state }}
				remove={this.remove}
				errors={errors}
			/>
		);
	}
}

SellerRegister.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(
	mapStateToProps,
	{ registerSeller }
)(withRouter(SellerRegister));
