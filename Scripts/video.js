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

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((item) => {
        const button = document.createElement('button');
        button.classList = "bg-slate-400 text-red-950 py-3 px-3 rounded font-bold ";
        button.innerText = item.category;
        categoryContainer.appendChild(button);
    })

}

loadCategories();