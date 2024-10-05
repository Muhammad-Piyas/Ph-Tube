// 1 - Fetch, Load and Show Categories on html

// Create loadCategories
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Create displayCategories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((element) => {
    console.log(element);
    //Create a button
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = element.category;

    //Add button to category container
    categoryContainer.appendChild(button);
  });
};

loadCategories();
