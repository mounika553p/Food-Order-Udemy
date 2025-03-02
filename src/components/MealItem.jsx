export default function MealItem({ meal, addItem }) {
    return (
        <div className="meal-item">
            <img src={`http://localhost:3000/${meal.image}`} alt='' />
            <h3>{meal.name}</h3>
            <span className="meal-item-price">{meal.price}</span>
            <article id="article">
                <span className="meal-item-description">{meal.description}</span>
            </article>
            <button className="button meal-item-actions" onClick={() => addItem(meal.id,meal.name,meal.price)}>Add to Cart</button>
        </div>
    )
}