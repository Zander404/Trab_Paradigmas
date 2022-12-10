

// Constantes se objetivo ainda
let id = 1; 

let estoque = 100;

//Pokemon info 
let pokemonImage = ''
let pokemonName = ''
let pokemonlist = []



//Paginação
let next_page
let prev_page
let list = 'https://pokeapi.co/api/v2/pokemon'


// Tabela 1
const tdBodyTable = document.getElementById('body_table');
const tHead = document.getElementById('header_table');


//Tabela 2
const tdBodyTableInfo = document.getElementById('info_body_table');
const tHeadInfo = document.getElementById('info_header_table');



//Botões 
const saibaMais = document.getElementsByClassName("btn-info")
const prev = document.querySelector(".btn-prev")
const next = document.querySelector(".btn-next")



const fetchApi = async(list) => {
    const ApiResponse = await fetch(list)
    if(ApiResponse.status == 200){
        const data = await ApiResponse.json()
        return data

    }
}


// Povoar tabela com os Pokémons disponivéis
const renderList = async (lista) =>{
    const data = await fetchApi(lista)
    if(data.results){
        // console.log(data)
        next_page = data.next
        prev_page = data.previous
    
        
        tdBodyTable.innerHTML = ''

        let ps = id
        let indt = []


        data.results.forEach((element) => {
            const pokemon = `
            <tr>
            <th class="bg-black text-white border border-white border-radius rounded-md ">${ps}</th>
            <th class="bg-black text-white border border-white border-radius rounded-md ">${element.name}</th>
            <th><button data-info=${data.id} type="submit" class="btn btn-info  bg-white border-radius rounded-md border border-black">"Saber mais"</button></th>
            
            </tr>
            `
            ps += 1;
            tdBodyTable.innerHTML += pokemon


            //Paginação das Infos do Pokémon
            for(let j=0; j<saibaMais.length;j++){
                saibaMais[j].addEventListener("click", ()=>{
                    infoP = data.results[j].url
                    indt[j] = data-info
                     
                    estoque=estoque-1;
                    // console.log(estoque)
                    info = fetchApi(infoP).then(data =>{
                        // console.log(data)
                        
                        let flag = 0

                        if (data){
                            for(i=0;i<pokemonlist.length;i++){
                                if (pokemonlist[i].id == data['id']){
                                    flag = 1
                                }

                            }


                            if (flag != 1){
                                pokemonlist.push({id: data['id'], quant: 10})
                                console.log(pokemonlist)
                                pokemonName = data['name']
                                
                                pokemonImage =  data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

                                const info = `
                                    <tr>
                                        <td class="bg-black text-white border border-white border-radius rounded-md ">${pokemonName}</td>
                                        <td class="bg-black text-white border border-white border-radius rounded-md "><img src="${pokemonImage}" alt="pokemon-img" class="pokemon_image"></td>
                                    </tr>
                            `
                            tdBodyTableInfo.innerHTML += info
                            }else{
                                quantPokemon = 1
                                console.log('teste')
                                pokemonlist.forEach((element) => {
                                    if (element.id == data['id']){
                                        let car = element.id 
                                    }
                                    console.log(car)    
                                })
                                flag = 0 
                            }
                        }
                    })
                })
            }  
            
        });
    }else{
        alert("Erro")
    }
        
}


//Rederizar a primeira pagina 
renderList(list)


//Paginação 
prev.addEventListener("click", () => {
    event.preventDefault()
    if (prev_page != 'null'){
        renderList(prev_page)
        id -= 20;
    }else{
        alert("Página inicial")
    }
})


next.addEventListener("click", () => {
    event.preventDefault()
    if (next_page != 'null'){
        renderList(next_page)
        id += 20;
    }else{
        alert("Ultima pagina")
    }
})



// Info dos Pokemons

