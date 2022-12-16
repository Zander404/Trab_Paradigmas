

// Constantes se objetivo ainda
let id = 1; 

//Pokemon info 
let pokemonImage = ''
let pokemonName = ''
let pokemonlist = []


//Paginação
let next_page
let prev_page
let list = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0.' 


// Tabela 1
const tdBodyTable = document.getElementById('body_table');
const tHead = document.getElementById('header_table');


//Tabela 2
const tdBodyTableInfo = document.getElementById('info_body_table');
const tHeadInfo = document.getElementById('info_header_table');
const tdTime = document.getElementById('time')


//Botões 
const saibaMais = document.getElementsByClassName("btn-info")
const prev = document.querySelector(".btn-prev")
const next = document.querySelector(".btn-next")
const finalizar = document.querySelector(".btn-finalizar")


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
       
        next_page = data.next
        prev_page = data.previous
    
        
        tdBodyTable.innerHTML = ''

        let ps = id
        let indt = []
        let quant = []


        data.results.forEach((element) => {
          
            const pokemon = `
            <tr>
            <th class="bg-black text-white border border-white border-radius rounded-md ">${ps}</th>
            <th class="bg-black text-white border border-white border-radius rounded-md ">${element.name}</th>
            <th><button onclick="add()" data-info=${ps} type="submit" class="btn btn-info  bg-white border-radius rounded-md border border-black">"Adicionar"</button></th>
            
            </tr>
            `
            ps += 1;
            tdBodyTable.innerHTML += pokemon


            //Paginação das Infos do Pokémon
            for(let j=0; j<saibaMais.length;j++){
                saibaMais[j].addEventListener("click", ()=>{
                    infoP = data.results[j].url
                    indt[j] = saibaMais[j].dataset.info
                    indt[j] = parseInt(indt[j])
                    
                    info = fetchApi(infoP).then(data =>{
                        let flag = 0

                        if (data){
                            for(i=0;i<pokemonlist.length;i++){
                                if (pokemonlist[i].id == data['id']){
                                    alert("Pokemon já foi adicionado a equipe, selecione outro")
                                    flag = 1
                                }

                            }
                            size = pokemonlist.length
                            if (size < 6){
                                if (flag != 1){
                                    console.log(pokemonlist)
                                    console.log(data)
                                    
                                    pokemonName = data['name']
                                    pokemonlist.push({id: data['id'], nome: pokemonName, type: data['types'], weight: data['weight'], height: data['height']})
                                    
                                    // pokemonImage =  data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

                                    const info = `
                                        <tr>
                                            <td class="bg-black text-white border border-white border-radius rounded-md ">${pokemonName}</td>
                                        </tr>
                                    `
                                    tdBodyTableInfo.innerHTML += info
                                    const time = `
                                        <tr>
                                            <td class="bg-black text-white border border-white border-radius rounded-md ">${pokemonlist.length}/6</td>
                                        </tr>
                                    `
                                    tdTime.innerHTML=time
                                

                                }else{
                                    
                                    console.log('teste')
                                    

                                    for (let k = 0;k<pokemonlist.length; k++){
                                            if (pokemonlist[k].id == indt[j-1]){
                                                console.log(pokemonlist)
                                                break
                                            }
                                            

                                    }
                                    flag = 0 
                                }
                            }else{
                                alert("O time está cheio")
                                window.location.href = "http://localhost:8090/teste.html"
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
    if (prev_page != null){
        renderList(prev_page)
        id -= 20;
    }else{
        alert("Página inicial")
    }
})


next.addEventListener("click", () => {
    event.preventDefault()
    if (next_page != null){
        renderList(next_page)
        id += 20;
    }else{
        alert("Ultima pagina")
    }
})


// finalizar.addEventListener("click", () => {
//     event.preventDefault()
//     alert("Time finalizado")
// })
const fin = () => {
    event.preventDefault()
    alert("Time finalizado")
}


const add = () =>{

}

 
// //Workers
const worker = () => {

    const flag = new SharedArrayBuffer(4);
    const vetor = new SharedArrayBuffer(100 * 4);
  
    const flagView = new Int8Array(flag);
    
    
  
    flagView[0] = 1;
  
    let workers = [];
  
    for (let i = 0; i < 10; i++) {
      workers.push(new Worker("worker.js"));
      workers[i].postMessage({ flag, vetor });
    }
  };
worker();
