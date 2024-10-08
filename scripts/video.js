// Time function
function getTimesString(time) {
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInMonth = 30 * secondsInDay; // Assuming 30 days in a month
  const secondsInYear = 12 * secondsInMonth; // Assuming 12 months in a year

  // Calculate the number of years
  const year = parseInt(time / secondsInYear);
  let remainingSecond = time % secondsInYear;

  // Calculate the number of months
  const month = parseInt(remainingSecond / secondsInMonth);
  remainingSecond = remainingSecond % secondsInMonth;

  // Calculate the number of days
  const day = parseInt(remainingSecond / secondsInDay);
  remainingSecond = remainingSecond % secondsInDay;

  // Calculate the number of hours
  const hour = parseInt(remainingSecond / secondsInHour);
  remainingSecond = remainingSecond % secondsInHour;

  // Calculate the number of minutes
  const minute = parseInt(remainingSecond / secondsInMinute);
  remainingSecond = remainingSecond % secondsInMinute;

  // Construct the time string
  return `${year > 0 ? year + " year " : ""}${
    month > 0 ? month + " month " : ""
  }${day > 0 ? day + " day " : ""}${hour > 0 ? hour + " hour " : ""}${
    minute > 0 ? minute + " minute " : ""
  }${remainingSecond > 0 ? remainingSecond + " second " : ""} ago`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

//details function
const loadDetails = async (videoId) => {
  console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  console.log(video);
  const detailContainer = document.getElementById("modal-content");

  detailContainer.innerHTML = `
    <img class="h-full w-full object-cover"src=${video.thumbnail}/>
    <p>${video.description}</p>
    `;

  //way-1
  // document.getElementById("showModalData").click();
  //way-2
  document.getElementById("customModal").showModal();
};

// 1 - Fetch, Load and Show Categories on html
// Create loadCategories nav btn
const loadCategories = () => {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};
// btn
const loadCategoryVideos = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // All Active Button remove
      removeActiveClass();

      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

// Create displayCategories nav
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories");

  categories.forEach((element) => {
    console.log(element);
    //Create a button
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `<button id="btn-${element.category_id}" onclick="loadCategoryVideos(${element.category_id})" class="btn category-btn">${element.category}</button>`;

    //Add button to category container
    categoryContainer.appendChild(buttonContainer);
  });
};

// Create loadCategories videos
const loadVideos = (searchText = "") => {
  // fetch the data
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

// Create displayCategories video
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class ="main-h-[300px] flex justify-center gap-3 items-center flex-col text-center text-xl font-bold"> <img src="assets/Icon.png"
    <h2>No Content Here in this Category</h2>
    </div>
    `;
    return;
  } else {
    videoContainer.classList.add("grid");
  }

  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact ";
    card.innerHTML = `<figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="" />
      ${
        video.others.posted_date?.length === 0
          ? ""
          : `
      <span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimesString(
        video.others.posted_date
      )}</span>
      `
      }
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
      <img class="w-8 h-8 object-cover rounded-full" src= ${
        video.authors[0].profile_picture
      } />
    </div>
    <div>
     <h2 class="font-bold" >${video.title}</h2>
     <div class="flex items-center gap-2">
      <p class="text-gray-400">${video.authors[0].profile_name}</P>
      ${
        video.authors[0].verified === true
          ? `<img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/>`
          : ``
      }
     </div>
     <button onclick="loadDetails('${
       video.video_id
     }')" class="btn w-16 h-7 btn-error">details</button>
    </div>
  </div>`;
    videoContainer.appendChild(card);
  });
};

document.getElementById("search-input").addEventListener("keyup", (a) => {
  loadVideos(a.target.value);
});

loadCategories();
loadVideos();
