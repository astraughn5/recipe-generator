document.querySelector('#submit').addEventListener('click',getRecipe);

// Get API key and hosted data
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
		'X-RapidAPI-Key': config.MY_API_TOKEN
	}
};

// function to get recipe
// 1. starts by defining URL parameters by capturing the tag and food or ingredient to place in the URL
function getRecipe(){
	const vegetarian = document.querySelector('#vegetarian')
	let tag = ''
	if (vegetarian.checked == true){
		tag = '&tags=' + document.querySelector('#vegetarian').value
	}
	else {
		tag = ''
	}
	
	const foodOrIngredient = document.querySelector('#ingredient').value
	const url = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=2${tag}&q=${foodOrIngredient}`
	console.log(foodOrIngredient)
	console.log(tag)
	console.log(url)

	fetch(url, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));
}
