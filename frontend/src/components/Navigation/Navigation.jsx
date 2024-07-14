// frontend/src/components/Navigation/Navigation.jsx

import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IoIosPlanet } from 'react-icons/io';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className='navigation-div'>
			<ul className='navigation-ul'>
				<li>
					<NavLink
						to='/'
						className='navigation-logo'
					>
						<IoIosPlanet />
						Planetbnb
					</NavLink>
				</li>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
