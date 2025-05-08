// Get Time String 
const getTimeString = (time) => {
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minnutes = parseInt(remainingSeconds / 60);
    const second = remainingSeconds % 60;
    return `${hour} Hours ${minnutes} Minutes ${second} Seconds`;

}

// Remove Active Calss 

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons)
    for (let btn of buttons) {
        btn.classList.remove('activeBtn')
    }
}

// Load Categories 
const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
        const data = await res.json();
        return displayCategories(data.categories);

    }
    catch (err) {
        console.error("Error loading categories:", err);

    }

}
// Load Category Videos

const loadCategoryVideo = async (id) => {
    // alert(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    removeActiveClass();
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add('activeBtn')
    displayVideos(data.category);
}




// Show Categories button 
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((item) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick= "loadCategoryVideo(${item.category_id})" class="btn btn-outline  category-btn">${item.category}</button>



`;

        categoryContainer.appendChild(buttonContainer);
    });

};






// Load Videos 

const loadVideos = async (searchText = "") => {

    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`);
        const data = await res.json();
        const videos = data.videos;
        console.log(videos);
        return displayVideos(videos)
    }
    catch (err) {
        console.error("Error loading videos:", err);
    }
}

// Load Details 

const loadDetails = async (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);


}

const displayDetails = (video) => {
    const { title, thumbnail, authors, others, description } = video;
    console.log(video);
    const detailsContainer = document.getElementById('modal-content');
    // way-1 
    // document.getElementById('showModal').click();
    // way-2 
    document.getElementById('customModal').showModal();
    detailsContainer.innerHTML = `
    <img src=${thumbnail} /> 
    <p>${description} </p>
    `;


}

// Show Videos 

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos-container');
    videoContainer.innerHTML = ""; // Clear previous videos
    if (videos.length === 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class = "min-h-[300px] w-full flex flex-col items-center justify-center gap-5" > 
        <img src="img/icon.png"  /> 
        <h1 class = "md:w-[433px] text-[#171717] text-[32px] font-bold text-center ">
        
        Oops!! Sorry, There is no  content here
        </h1>
        
        </div>
        
        
        `;
        return;

    }
    else {
        videoContainer.classList.add('grid');
    }
    videos.forEach((video) => {
        const { title, thumbnail, authors, others, } = video;
        console.log(video);
        const card = document.createElement('div');
        card.innerHTML = `
<div class="card bg-base-100 w-96 shadow-sm]">
  <figure class="px-10 pt-10 h-[200px] relative">
    <img
      src=${thumbnail}
      alt="Shoes"
      class=" w-full h-full object-cover " />

 
  ${others.posted_date?.length === 0 ? "" : ` <p class="absolute text-xs  bottom-2 bg-[#17171788] text-white font-semibold p-2 rounded-md"> ${getTimeString(others.posted_date)}</p>`}
  </figure>
<div class="flex gap-3">
<div> <img class="w-12 h-12 rounded-full" src=${authors[0].profile_picture}/> </div>
<div> 
<h2 class="text-[#171717] text-2xl font-bold "> ${title}</h2>
<p class=" text-[#17171777] text-[20px] font-normal  flex items-center gap-2">${authors[0].profile_name} ${authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""} </p>
<p class="text-[#17171777] text-[20px] font-normal">${others.views} Views </p>
<div> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Details</button> </div> 
</div>

</div>
  
</div>

      
    `;


        videoContainer.appendChild(card);
    });



}

document.getElementById('search-input').addEventListener('keyup', (event) => {
    loadVideos(event.target.value);
})


loadCategories();
loadVideos();



