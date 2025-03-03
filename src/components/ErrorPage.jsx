export default function ErrorPage({ closeError }) {
    return (
        <>
            <h2 className='error-message'>Sorry....Something went wrong. Please try again</h2>
            <span className="modal-actions">
                <button className="button" onClick={closeError}>Okay</button>
            </span>
        </>
    )
}