import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addANewSpot } from '../../store/spots';
import './CreateSpot.css';

export const CreateSpot = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		country: '',
		address: '',
		city: '',
		state: '',
		description: '',
		title: '',
		price: '',
		image1: '',
		image2: '',
		image3: '',
		image4: '',
		image5: '',
	});
	const [errors, setErrors] = useState({});
	const [hasSubmitted, setHasSubmitted] = useState(false);

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
		if (!formData.title) newErrors.title = 'Title is required';
		if (!formData.price) newErrors.price = 'Price per night is required';
		if (!formData.image1) newErrors.image1 = 'Preview Image URL is required';

		setErrors(newErrors);
	}, [formData]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setHasSubmitted(true);

		if (Object.keys(errors).length > 0) {
			return;
		}

		const spot = {
			country: formData.country,
			address: formData.address,
			city: formData.city,
			state: formData.state,
			description: formData.description,
			name: formData.title,
			price: formData.price,
			images: [
				formData.image1,
				formData.image2,
				formData.image3,
				formData.image4,
				formData.image5,
			].filter((url) => url),
		};

		const newSpot = await dispatch(addANewSpot(spot));
		if (newSpot) {
			navigate(`/spots/${newSpot.id}`);
		}
	};

	return (
		<div className='create-spot-wrapper'>
			<form
				className='create-spot-form'
				action='POST'
				onSubmit={handleSubmit}
			>
				<div className='create-spot-heading'>
					<h2>Create a New Spot</h2>
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
						id='title'
						value={formData.title}
						onChange={handleChange}
					/>
					{hasSubmitted && errors.title && (
						<p className='error'>{errors.title}</p>
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

				<div className='image-inputs form-div-structure'>
					<div className='form-headers'>
						<h3>Liven up your spot with photos</h3>
						<p>Submit a link to at least one photo to publish your spot</p>
					</div>

					<input
						placeholder='Image URL'
						type='url'
						id='image1'
						value={formData.image1}
						onChange={handleChange}
					/>
					{hasSubmitted && errors.image1 && (
						<p className='error'>{errors.image1}</p>
					)}

					<input
						placeholder='Image URL'
						type='url'
						id='image2'
						value={formData.image2}
						onChange={handleChange}
					/>

					<input
						placeholder='Image URL'
						type='url'
						id='image3'
						value={formData.image3}
						onChange={handleChange}
					/>

					<input
						placeholder='Image URL'
						type='url'
						id='image4'
						value={formData.image4}
						onChange={handleChange}
					/>

					<input
						placeholder='Image URL'
						type='url'
						id='image5'
						value={formData.image5}
						onChange={handleChange}
					/>
				</div>

				<div className='line-break'></div>
				<button
					className='create-spot-btn-form'
					type='submit'
				>
					Create Spot
				</button>
			</form>
		</div>
	);
};
