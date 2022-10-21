searchFormBtn.addEventListener('click',() => {
    location.hash='#search='+searchFormInput.value;
});

trendingBtn.addEventListener('click',() => {
    location.hash='#trends';
});

arrowBtn.addEventListener('click',() => {
    window.history.back();
    

    
    
});


window.addEventListener('DOMContentLoaded',navigator,false);
window.addEventListener('hashchange',navigator,false);

function navigator(){
   
    
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else if(location.hash.startsWith('#movie=')){
        movieDetailPage();
    }else if(location.hash.startsWith('#category=')){
        categoriesPage();
    }else {
        homePage();        
    }    
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
}



function homePage(){
    
    console.log('Home!');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerCategoryTitle.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');
    
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');


    getTrendingMoviesPreview('day');        
    getMoviesCategories();
}

function trendsPage(){
    console.log('Trends!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const periodo=tymeWindow.value;
    let periodo2=0;
    if (periodo=='day'){
        periodo2=' del Dia';
    }else{
        periodo2=' de la Semana';
    }
    headerCategoryTitle.innerHTML= 'Tendencias '+periodo2;
    getTrendingMovies(periodo);
}

function searchPage(){
    console.log('Seach!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    const [_, query]=location.hash.split('=');
    getMoviesBySearch(query);
}

function movieDetailPage(){
    console.log('Movie!');

    headerSection.classList.add('header-container--long');
    //headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');    
    searchForm.classList.add('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    const [_, movieId]=location.hash.split('=');
    getMovieById(movieId);
}

function categoriesPage(){
    console.log('Category!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background='';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_,categoryData]=location.hash.split('=');
    const[categoryId,categoryName]=categoryData.split('-');
    console.log('categoria: '+categoryId);
    getMoviesByCategory(categoryId,categoryName);
}