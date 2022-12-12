const fetchApi = async(list) => {
    const ApiResponse = await fetch(list)
    if(ApiResponse.status == 200){
        const data = await ApiResponse.json()
        return data

    }
}


self.onmessage= ({data:buffer}) =>
{
    const view = new Int32Array(buffer);
    Atomics.wait(view,0,0);
    Atomics.store(view,0,0);
    
    let id = Math.floor(Math.random() * 4)
    id +=1 
    let url = [{url: `https://pokeapi.co/api/v2/pokemon/${id}`, info: 'pokemon'},{url: `https://pokeapi.co/api/v2/berry/${id}`, info: 'berry'},{url: `https://pokeapi.co/api/v2/contest-type/${id}`, info: 'constest'},{url: `https://pokeapi.co/api/v2/move/${id}`, info: 'moves'},{url: `https://pokeapi.co/api/v2/generation/${id}`, info: 'generation'},{url: `https://pokeapi.co/api/v2/item/${id}`, info: 'items'},{url: `https://pokeapi.co/api/v2/location/${id}`, info: 'location'}, ]
    
    
    buffer = fetchApi(url[id]['url']).then(data => {console.log(data);console.log(url[id]['info'])})
    Atomics.store(view,0,1);
}

