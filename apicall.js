

// Constantes se objetivo ainda
let id = 1; 
const type = 'pokemon';
let estoque = 100;


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
const saibaMais = document.querySelector(".btn-info")
const prev = document.querySelector(".btn-prev")
const next = document.querySelector(".btn-next")




const getPokemon = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = response.json();
    return data;
}


const fetchApi = async(list) => {
    const ApiResponse = await fetch(list)
    if(ApiResponse.status == 200){
        const data = await ApiResponse.json()
        return data

    }
}



const getInfo = async (url) => {
    const data = await fetchApi(url)

    
    for(let j=0; j<saibaMais.length;j++){
        saibaMais[j].addEventListener("click", ()=>{
        infoP = data.results[j].url
        estoque=estoque-1;
        console.log(estoque)

        info = getInfo(infoP).then(data =>{

            console.log(data)
            if (data){
            tdBodyTableInfo.innerHTML = ''
            const info = `
                <tr>
                <td class="bg-black text-white border border-white border-radius rounded-md ">${data.name}</td>
                <td class="bg-black text-white border border-white border-radius rounded-md ">${data.abilities[0].ability.name} & ${data.abilities[1].ability.name}</td>
                
                
                </tr>
            `
            tdBodyTableInfo.innerHTML += info
            }
            
        })
        })
    }
    
    
}


// // Povoar tabela com os Pokémons disponivéis



const renderList = async (lista) =>{
    const data = await fetchApi(lista)
    if(data.results){
        console.log(data)
        next_page = data.next
        prev_page = data.previous
    
        
    tdBodyTable.innerHTML = ''

    let ps = id
    data.results.forEach((element) => {
        const pokemon = `
        <tr>
        <th class="bg-black text-white border border-white border-radius rounded-md ">${ps}</th>
        <th class="bg-black text-white border border-white border-radius rounded-md ">${element.name}</th>
        <th><button type="submit" class="btn btn-info  bg-white border-radius rounded-md border border-black btn-info">"Saber mais"</button></th>
        
        </tr>
        `
        ps += 1;
        tdBodyTable.innerHTML += pokemon

        
    });

    }
        
}


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



saibaMais.addEventListener('click', () => {
    event.preventDefault()
    if(pinfo != 'null'){
        alert("Clicko")
    }else{

    }
})

