import './ConfirmDeleteReview.css';

const ConfirmDeleteModal = ({ onConfirm, onCancel }) => {
	return (
		<div className='confirm-delete-modal'>
			<h2>Confirm Delete</h2>
			<p>Are you sure you want to delete this review?</p>
			<div className='confirm-delete-buttons'>
				<button
					className='delete-button'
					onClick={onConfirm}
				>
					Yes (Delete Review)
				</button>
				<button
					className='cancel-button'
					onClick={onCancel}
				>
					No (Keep Review)
				</button>
			</div>
		</div>
	);
};

export default ConfirmDeleteModal;
