api=axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params:{
        'api_key': '6e89fe370fb9926f3567fd7939c8fbb9',
        'language':'es',
    }
});


//Utils
function createMovies(movies,container){
    container.innerHTML='';

    movies.forEach(movie => {
       
        const movieContainer= document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click',()=>{
            location.hash='#movie='+movie.id;
        });

        const movieImg= document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt',movie.title);
        movieImg.setAttribute(
            'src',
            'https://image.tmdb.org/t/p/w300' + movie.poster_path,
            );
        
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
        
    });
}

function createCategories(categories, container){
    container.innerHTML='';
    categories.forEach(category => {       
        const categoryContainer=`
                            <div class="category-container">
                                <h3 id="id${category.id}" class="category-title" onclick="irCategorias(${category.id},'${category.name}');">${category.name} </h3>
                            </div>                            
        `;
        const html = container.innerHTML;
        container.innerHTML=categoryContainer+html;                
    });

}


//Llamados a la API
async function getTrendingMoviesPreview(tipo){
    
    const {data} =await api(`trending/movie/${tipo}`);
    const movies=data.results;
    createMovies(movies,trendingMoviesPreviewList)    
}

async function getMoviesCategories(){    
    const {data} =await api(`genre/movie/list`);    
    console.log(data);
    let categories=data.genres;
    cambiarEspaniolCategoria(categories);        
    createCategories(categories,categoriesPreviewList);    
}

async function getMoviesByCategory(id,name){
    const {data} =await api(`discover/movie`,{
        params:{
            with_genres: id,
        },
    });
    headerCategoryTitle.innerHTML=decodeURI(name);
    movies=data.results;
    createMovies(movies,genericSection);    
}


function irCategorias(id,nombre){
    const nombreNormalizado=decodeURI(nombre);
    console.log(nombreNormalizado);
    location.hash=`#category=${id}-${nombreNormalizado}`;
}

async function getMoviesBySearch(query){    
    queryNormazilado=decodeURI(query);
    console.log(queryNormazilado);
    const {data} =await api(`search/movie`,{
        params:{
            query:queryNormazilado,
        },
    });
    
    headerCategoryTitle.innerHTML=queryNormazilado;
    movies=data.results;
    createMovies(movies,genericSection);        

}

async function getTrendingMovies(tipo){
    
    const {data} =await api(`trending/movie/${tipo}`);
    const movies=data.results;
    createMovies(movies,genericSection);
}
async function getMovieById(id){
    
    const {data:movie} =await api(`movie/${id}`);   
    
    const movieImgUrl='https://image.tmdb.org/t/p/w500'+movie.poster_path;
    headerSection.style.background=`
    linear-gradient(
        180deg,
        rgba(0,0,0,0.35) 19.27%,
        rgba(0,0,0,0) 29.17%
    ),
    url(${movieImgUrl})`;

    movieDetailTitle.textContent=movie.title;
    movieDetailDescription.textContent=movie.overview;
    movieDetailScore.textContent=movie.vote_average;    
    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMovieById(id);
}

async function getRelatedMovieById(id){
    console.log(id);
    url=`movie/${id}/recommendations`;
    const { data } = await api(url);
    console.log(url);
    console.log('data:'+data);
    const relatedMovies = data.results;
    console.log('related movies:'+relatedMovies);

    createMovies(relatedMovies,relatedMoviesContainer);


}


//Utilidades
function cambiarPeriodo(){    
   
    const periodo=tymeWindow.value;
    const trendingMoviesPreviewList  = document.querySelector('#trendingPreview .trendingPreview-movieList');    
    if (periodo=='day'){
        console.log('Entro a day');
        trendingMoviesPreviewList .innerText=('');
        getTrendingMoviesPreview('day');        
    }else{
        trendingMoviesPreviewList .innerText=('');
        getTrendingMoviesPreview('week');        
    }
}

function cambiarEspaniolCategoria(categories){
    categories.forEach(category =>{
        switch(category.name){
            case 'Western':
                category.name='Viejo Oeste';
            break;
            case 'Thriller':
                category.name='Suspenso';
            break;
            case 'Science Fiction':
                category.name='Ciencia Ficción';
            break;
            break;
            case 'Mystery':
                category.name='Misterio';
            break;
            case 'Horror':
                category.name='Terror';
            break;
            case 'Fantasy':
                category.name='Fantasía';
            break;
            case 'Crime':
                category.name='Crimen';
            break;
            case 'Animation':
                category.name='Animación';
            break;
            case 'Action':
                category.name='Acción';
            break;
            case 'War':
                category.name='Guerra';
            break;
            case 'TV Movie':
                category.name='Películas TV';
            break;
            case 'Music':
                category.name='Musical';
            break;
            case 'History':
                category.name='Historia';
            break;
            case 'Family':
                category.name='Familia';
            break;
            case 'Documentary':
                category.name='Documentales';
            break;
            case 'Comedy':
                category.name='Comedia';
            break;
            case 'Adventure':
                category.name='Aventura';
            break;

            
            
            
        }
    });
}

function borrarTextoInput(){
    const input=document.querySelector('#searchForm input');
    input.placeholder='';
}

function colocarTextoInput(){
    const input=document.querySelector('#searchForm input');    
    input.placeholder='Buscar...';
}



