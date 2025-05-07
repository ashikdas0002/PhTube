// Get Time String 
const getTimeString = (time) => {
    const hour = parseInt(time / 3600);
    let remainingSeconds = time % 3600;
    const minnutes = parseInt(remainingSeconds / 60);
    const second = remainingSeconds % 60;
    return `${hour} Hours ${minnutes} Minutes ${second} Seconds`;

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

const loadCategoryVideo = async (id) => {
    // alert(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`);
    const data = await res.json();
    return displayVideos(data.category);
}




// Show Categories button 
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((item) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
    <button onclick= "loadCategoryVideo(${item.category_id})" class="btn btn-outline">${item.category}</button>



`;

        categoryContainer.appendChild(buttonContainer);
    });

};

// Load Categories Videos




// Load Videos 

const loadVideos = async () => {

    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        const data = await res.json();
        const videos = data.videos;
        console.log(videos);
        return displayVideos(videos)
    }
    catch (err) {
        console.error("Error loading videos:", err);
    }
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
        const { title, thumbnail, authors, others } = video;
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
</div>

</div>
  
</div>

      
    `;


        videoContainer.appendChild(card);
    });



}




loadCategories();
loadVideos();

