import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GiAstronautHelmet } from 'react-icons/gi';
import { RxHamburgerMenu } from 'react-icons/rx';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import '../Navigation/ProfileButton.css';
import { useNavigate } from 'react-router-dom';

function ProfileButton({ user }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		closeMenu();
		navigate('/');
	};

	const ulClassName = 'profile-dropdown' + (showMenu ? '' : ' hidden');

	return (
		<>
			<button
				className='profile-btn'
				onClick={toggleMenu}
			>
				<RxHamburgerMenu />
				<GiAstronautHelmet />
			</button>
			<ul
				className={ulClassName}
				ref={ulRef}
			>
				{user ? (
					<>
						<li>{user.username}</li>
						<li>
							{user.firstName} {user.lastName}
						</li>
						<li>{user.email}</li>
						<li>
							<button
								className='logout-btn'
								onClick={logout}
							>
								Log Out
							</button>
						</li>
					</>
				) : (
					<>
						<OpenModalMenuItem
							itemText='Log In'
							onItemClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
						<OpenModalMenuItem
							itemText='Sign Up'
							onItemClick={closeMenu}
							modalComponent={<SignupFormModal />}
						/>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;