import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpotDetails, updateASpot } from '../../store/spots';
import '../CreateSpot/CreateSpot.css'; // Reuse the same CSS

export const UpdateSpot = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { spotId } = useParams();
	const spot = useSelector((state) => state.spots.spotDetails[spotId]);

	const [formData, setFormData] = useState({
		country: '',
		address: '',
		city: '',
		state: '',
		description: '',
		name: '',
		price: '',
	});

	const [errors, setErrors] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);

	useEffect(() => {
		dispatch(getSpotDetails(spotId));
	}, [dispatch, spotId]);

	useEffect(() => {
		if (spot) {
			setFormData({
				country: spot.country || '',
				address: spot.address || '',
				city: spot.city || '',
				state: spot.state || '',
				description: spot.description || '',
				name: spot.name || '',
				price: spot.price || '',
			});
		}
	}, [spot]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	};

	useEffect(() => {
		const newErrors = {};
		if (!formData.country) newErrors.country = 'Country is required';
		if (!formData.address) newErrors.address = 'Street Address is required';
		if (!formData.city) newErrors.city = 'City is required';
		if (!formData.state) newErrors.state = 'State is required';
		if (formData.description.length < 30)
			newErrors.description = 'Description needs 30 or more characters';
		if (!formData.name) newErrors.name = 'Title is required';
		if (!formData.price) newErrors.price = 'Price per night is required';

		setErrors(newErrors);
	}, [formData]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true);

		if (Object.keys(errors).length > 0) {
			return;
		}

		try {
			const updatedSpot = {
				address: formData.address,
				city: formData.city,
				state: formData.state,
				country: formData.country,
				name: formData.name,
				description: formData.description,
				price: parseFloat(formData.price),
			};

			const response = await dispatch(updateASpot(spotId, updatedSpot));
			if (response) {
				navigate(`/spots/${spotId}`);
			}
		} catch (res) {
			const data = await res.json();
			if (data && data.errors) {
				setErrors(data.errors);
			}
		}
	};

	return (
		<div className='create-spot-wrapper'>
			<form
				className='create-spot-form'
				onSubmit={handleSubmit}
			>
				<div className='create-spot-heading'>
					<h2>Update your Spot</h2>
					<h3>Where&apos;s your place located?</h3>
					<p>
						Guests will only get your address once they&apos;ve booked a
						reservation
					</p>
				</div>

				<div className='form-info form-div-structure'>
					<label htmlFor='country'>Country</label>
					<input
						id='country'
						placeholder='Country'
						type='text'
						value={formData.country}
						onChange={handleChange}
					/>
					{hasSubmitted && errors.country && (
						<p className='error'>{errors.country}</p>
					)}

					<label htmlFor='address'>Street Address</label>
					<input
						id='address'
						placeholder='Street Address'
						type='text'
						value={formData.address}
						onChange={handleChange}
					/>
					{hasSubmitted && errors.address && (
						<p className='error'>{errors.address}</p>
					)}

					<div className='form-city-state'>
						<div className='city-div'>
							<label htmlFor='city'>City</label>
							<input
								className='city-input'
								id='city'
								placeholder='City'
								type='text'
								value={formData.city}
								onChange={handleChange}
							/>
							{hasSubmitted && errors.city && (
								<p className='error'>{errors.city}</p>
							)}
						</div>

						<div className='state-div'>
							<label htmlFor='state'>State</label>
							<input
								id='state'
								placeholder='State'
								type='text'
								value={formData.state}
								onChange={handleChange}
							/>
							{hasSubmitted && errors.state && (
								<p className='error'>{errors.state}</p>
							)}
						</div>
					</div>
				</div>

				<div className='line-break'></div>

				<div className='form-description form-div-structure'>
					<div className='form-headers'>
						<h3>Describe your place to guests</h3>
						<p>
							Mention the best features of your space, any special amenities
							like fast wifi or parking, and what you love about the
							neighborhood.
						</p>
					</div>
					<textarea
						className='form-textarea'
						placeholder='Please write at least 30 characters'
						id='description'
						value={formData.description}
						onChange={handleChange}
					/>
					{hasSubmitted && errors.description && (
						<p className='error'>{errors.description}</p>
					)}
				</div>

				<div className='line-break'></div>

				<div className='form-title form-div-structure'>
					<div className='form-headers'>
						<h3>Create a title for your spot</h3>
						<p>
							Catch guests&apos; attention with a spot title that highlights
							what makes your place special
						</p>
					</div>
					<input
						className='input-title'
						placeholder='Name of your spot'
						type='text'
						id='name'
						value={formData.name}
						onChange={handleChange}
					/>
					{hasSubmitted && errors.name && (
						<p className='error'>{errors.name}</p>
					)}
				</div>

				<div className='line-break'></div>

				<div className='form-price form-div-structure'>
					<div className='form-headers'>
						<h3>Set a base price for your spot</h3>
						<p>
							Competitive pricing can help your listing stand out and rank
							higher in search results
						</p>
					</div>
					<label>
						$
						<input
							className='input-price'
							placeholder='Price per night (USD)'
							type='number'
							id='price'
							value={formData.price}
							onChange={handleChange}
						/>
					</label>
					{hasSubmitted && errors.price && (
						<p className='error'>{errors.price}</p>
					)}
				</div>

				<div className='line-break'></div>
				<button
					className='create-spot-btn-form'
					type='submit'
				>
					Update your Spot
				</button>
			</form>
		</div>
	);
};
