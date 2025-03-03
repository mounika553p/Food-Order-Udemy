export default function OrderSuccess({ closeSuccess }) {

    return (
        <div>
            <h1 className="success">Success, your order has been created</h1>
            <span className="modal-actions"> 
                <button className="button" onClick={closeSuccess}>Okay</button>
            </span>
        </div>
    )

}