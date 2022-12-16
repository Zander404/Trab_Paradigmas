self.onmessage = (e) => {
    const arrayView = new Int32Array(e.data.vetor);
    const flagview = new Int32Array(e.data.flag);

    // Plano para gerar concorrencia
    // Cada Worker vai gerar 1 pokemon e adicionar no vetor
    

    //Sorteia um pokemon entre os 1032 disponiveis
    let pokemon = Math.ceil(Math.random() * 1032);
  

     //Espera que o vertor esteja desponivel
     Atomics.wait(flagview, 0, 0);
     Atomics.store(flagview, 0, 0);
     let i = 0;
     let retornar = 0;
 
     retornar = Math.ceil(Math.random()*2);
     console.log(retornar)
     //Se deve retornar ou não
     if(retornar == 1){
  
      while(true){
        pokemon = Math.ceil(Math.random() * 10);
        
        //Verifica se na memoria compartilhada já existe o pokemon
        

        if(arrayView[i] == pokemon){
            //Se existir sorteia outro
            pokemon = Math.ceil(Math.random() * 10);
            console.log('sorteou')
            i=0;
        }
        //Se não existir adiciona no vetor
        if(arrayView[i] == 0){
            Atomics.store(arrayView, i, pokemon);
              console.log('adicionou') 
            break;
            
        }
      i++
      }
    }

    //Libera o vetor
    Atomics.store(flagview, 0, 1);
    Atomics.notify(flagview, 0, 1); 
              
  
  };


