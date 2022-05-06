//adding three event listeners for when the 3 buttons are clicked
document.querySelector('#submit').addEventListener('click',getRecipe);
document.querySelector('#nextRecipe').addEventListener('click',nextRecipe);
document.querySelector('#prevRecipe').addEventListener('click',previousRecipe);

// Get API key and hosted data
const key = config.MY_API_TOKEN;
const id = config.MY_API_ID;

//define global variables
let recipes
let currentRecipe = 0 

//add recipe count when Next is clicked and passes the recipe count to the recipe data grabber
function nextRecipe(){
	if (currentRecipe < recipes.length - 1){
		currentRecipe++;
		recipeDataGrabber(recipes[currentRecipe])
	}
	else{
		alert('Search a new ingredient for more recipes.')
	}
};

//subtract recipe count when Previous is clicked and passes the recipe count to the recipe data grabber
function previousRecipe(){
	if (currentRecipe > 0){
		currentRecipe--;
		recipeDataGrabber(recipes[currentRecipe])
	}
	else{
		alert('You are at the beginning of the recipe list.')
	}	
}

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
	

	// 4.
	fetch(url)
	.then(res => res.json()) // parse response as JSON
	.then(data => recipes = data.hits)
	.then(() => {
		recipeDataGrabber(recipes[currentRecipe])
	}
	)
	.catch(err => {
		console.log(`error ${err}`)
	});
}

//function to take the current Recipe and place it in the DOM
function recipeDataGrabber(recipes){
	document.querySelector('h2').innerText = recipes.recipe.label.toUpperCase()
	document.querySelector('a').setAttribute('href',recipes.recipe.url)
	document.querySelector('img').src = recipes.recipe.image

	document.querySelector('#source').innerText = recipes.recipe.source
	document.querySelector('#cuisine').innerText = recipes.recipe.cuisineType
	document.querySelector('#mealType').innerText = recipes.recipe.mealType[0]
};










// function nextRecipe(){
// 	if (i < array.length){
// 		i += 1
// 		console.log(i)
// 	}
// 	// document.querySelector('h2').innerText = data.hits[i].recipe.label
// 	// document.querySelector('a').setAttribute('href',data.hits[i].recipe.url)
// 	// document.querySelector('img').src = data.hits[i].recipe.image

// 	// document.querySelector('#source').innerText = data.hits[i].recipe.source
// 	// document.querySelector('#cuisine').innerText = data.hits[i].recipe.cuisineType
// 	// document.querySelector('#mealType').innerText = data.hits[i].recipe.mealType[0]
	
// 	// if (i = i % data.length){
// 	// 	return i = 0
// 	}
