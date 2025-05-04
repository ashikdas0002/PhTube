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



// Show Categories button 
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((item) => {
        const button = document.createElement('button');
        button.classList = "bg-slate-400 text-red-950 py-3 px-3 rounded font-bold      ";
        button.innerText = item.category;
        categoryContainer.appendChild(button);
    })

}


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

    videos.forEach((video) => {
        const { title, thumbnail, authors, others } = video;
        console.log(video);
        const card = document.createElement('div');
        card.innerHTML = `

<div class="card bg-base-100 w-96 ">
  <figure class="px-10 pt-10 h-[200px] relative">
    <img
      src=${thumbnail}
      alt="Video Thumbnail"
      class=" w-full h-full object-cover" />
    <span class="absolute  bottom-2 bg-black text-white rounded p-2 font-bold">${others.posted_date}</span>
  </figure>
  <div class="px-0 py-2 flex gap-2">
      <div> <img  class="w-[40px] h-[40px] rounded-full" src=${authors[0].profile_picture} /></div>
<div class="">
            <h2 class="text-[#171717] text-2xl font-bold font-[Inter]">${title} </h2>
            <p  class=" text-[#1717179a] text-[20px] font-normal flex items-center gap-3">${authors[0].profile_name}   ${authors[0].verified === true ? ` <img class="w-[20px]"  src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />
            <div>` : ""} </p>  
            <p  class=" text-[#17171779] text-[20px] font-normal">${others.views} Views </p>
           
</div>

    `;


        videoContainer.appendChild(card);
    });



}




loadCategories();
loadVideos();

