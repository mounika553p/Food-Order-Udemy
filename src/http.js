export async function getMeals() {

    const response = await fetch("http://localhost:3000/meals");
    const meals = await response.json();
    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }
    return meals;
}

export async function createOrder(body){

    const response = await fetch("http://localhost:3000/orders",
        {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(body)
        }
    );
    // if(!response.ok)
    // {
    //     throw new Error('Failed to place order')
    // }
    return response;

}

