document.querySelector('#submit').addEventListener('click',getRecipe);

// Get API key and hosted data
const key = config.MY_API_TOKEN;
const id = config.MY_API_ID;

// function to get recipe
// 1. starts by checking if an ingredient has been entered in the input, if yes the function will continue running, if no the function returns please add an ingredient.
// 2. then checks if vegetarian is checked, if yes then the value of vegetarian is appended to the health parameter, if no the healh parameter is empty
// 3. creates the URL using template literals
// 4. passes the URL into the fetch function to receive the data

function getRecipe(){
	// 1.
	const foodOrIngredient = document.querySelector('#ingredient').value

	if (!foodOrIngredient){
		document.querySelector('#ingredientError').style.display = 'none'
		return document.querySelector('#ingredientError').style.display = 'block' 

	}else {
		
		document.querySelector('#ingredientError').style.display = 'none'
	}
	// 2.
	const vegetarian = document.querySelector('#vegetarian')
	let health = ''
	if (vegetarian.checked == true){
		health = '&health=' + document.querySelector('#vegetarian').value
	}
	else {
		health = ''
	}

	// 3.
	const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${foodOrIngredient}&app_id=${id}&app_key=${key}${health}`
	// console.log(foodOrIngredient)
	// console.log(health)
	// console.log(url)

	// 4.
	fetch(url)
	.then(res => res.json()) // parse response as JSON
	.then(data => {
	  console.log(data)

	//  document.querySelector('h2').innerText = localStorage.getItem('books')

	})
	.catch(err => {
		console.log(`error ${err}`)
	});
}


