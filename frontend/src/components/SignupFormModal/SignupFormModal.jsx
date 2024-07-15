import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import '../SignupFormModal/SignupFormModal.css';

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const { closeModal } = useModal();

	useEffect(() => {
		const disabled = {};
		if (
			!email &&
			!username &&
			!firstName &&
			!lastName &&
			!password &&
			!confirmPassword
		) {
			disabled.form = 'please fill out the sign-up form';
		}
		if (username.length < 4) {
			disabled.username = 'Username must be longer than 4 characters';
		}
		if (password.length < 6) {
			disabled.password = 'Password must be longer than 6 characters';
		}
		if (!confirmPassword) {
			disabled.confirmPassword =
				'password and confirm-password must not be empty';
		}
		setErrors(disabled);
	}, [email, username, firstName, lastName, password, confirmPassword]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setHasSubmitted(true);
		if (password === confirmPassword) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					username,
					firstName,
					lastName,
					password,
				})
			)
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data?.errors) {
						setErrors(data.errors);
					}
				});
		}
		return setErrors({
			confirmPassword:
				'Confirm Password field must be the same as the Password field',
		});
	};

	return (
		<div className='signup-wrapper'>
			<h1>Sign Up</h1>
			<form
				className='signup-form'
				onSubmit={handleSubmit}
			>
				<label>
					Email
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				{errors.email && hasSubmitted && <p>{errors.email}</p>}
				<label>
					Username
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				{errors.username && hasSubmitted && <p>{errors.username}</p>}
				<label>
					First Name
					<input
						type='text'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</label>
				{errors.firstName && hasSubmitted && <p>{errors.firstName}</p>}
				<label>
					Last Name
					<input
						type='text'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</label>
				{errors.lastName && hasSubmitted && <p>{errors.lastName}</p>}
				<label>
					Password
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				{errors.password && hasSubmitted && <p>{errors.password}</p>}
				<label>
					Confirm Password
					<input
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{errors.confirmPassword && hasSubmitted && (
					<p>{errors.confirmPassword}</p>
				)}
				<button
					className='signup-btn'
					type='submit'
					disabled={Object.values(errors).length > 0}
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
