// frontend/src/components/Navigation/Navigation.jsx

import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosPlanet } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const navigate = useNavigate();
	const sessionUser = useSelector((state) => state.session.user);

	const handleClick = () => {
		navigate('/spots/new');
	};

	return (
		<IconContext.Provider value={{ className: 'react-icons' }}>
			<div className='navigation-div'>
				<ul className='navigation-ul'>
					<li className='nav-logo'>
						<NavLink
							to='/'
							className='navigation-logo'
						>
							<IoIosPlanet size='2em' />
							Planetbnb
						</NavLink>
					</li>
					<div className='nav-btn-div'>
						{sessionUser ? (
							<button
								onClick={handleClick}
								className='create-spot-btn'
							>
								Create a new spot
							</button>
						) : (
							''
						)}
						{isLoaded && (
							<li>
								<ProfileButton user={sessionUser} />
							</li>
						)}
					</div>
				</ul>
			</div>
		</IconContext.Provider>
	);
}

export default Navigation;
