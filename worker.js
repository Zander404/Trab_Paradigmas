self.onmessage = (e) => {
    const arrayView = new Int32Array(e.data.vetor);
    const flagview = new Int32Array(e.data.flag);

    // Plano para gerar concorrencia
    // Cada Worker vai gerar 1 time de 6 pokemons
    // Cada time vai ser armazenado em um vetor de 6 posições

    //Sorteia um pokemon entre os 1032 disponiveis
    let pokemon = Math.ceil(Math.random() * 1032);
  

     //Espera que o vertor esteja desponivel
     Atomics.wait(flagview, 0, 0);
     Atomics.store(flagview, 0, 0);
     let i = 0;
 

  while(true){
  
    //Verifica se na memoria compartilhada já existe o pokemon
    for(let i=0; i<arrayView.length; i++){
        if(arrayView[i] == pokemon){
            //Se existir sorteia outro
            pokemon = Math.ceil(Math.random() * 1032);
            // console.log('sorteou')
            i=0;
        }
        //Se não existir adiciona no vetor
        if(arrayView[i] == 0){
            Atomics.store(arrayView, i, pokemon);
             console.log('adicionou')
            
        }
    }

    if(i == arrayView.length-1){      
      break
    }
    
  i++
  } 

  //Libera o vetor
  Atomics.store(flagview, 0, 1);
  Atomics.notify(flagview, 0, 1); 
            
  
  };


