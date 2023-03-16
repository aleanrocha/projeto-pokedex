const url = "https://pokeapi.co/api/v2/pokemon?limit=10"

fetch(url)
.then(response => response.json())
.then(allpokemons => {

  let pokemons = []

  allpokemons.results.map((val) => {

    fetch(val.url)
    .then(response => response.json())
    .then(pokemonSingle => {


      pokemons.push({
        nome:val.name,
        imagem:pokemonSingle.sprites.front_default,
        info:pokemonSingle.types.map(info => info.type.name).join(" | ")
      })

      

      if (pokemons.length == 10) {
        // finalizamos nossa requisições
        let pokemonBoxe = document.querySelector("#pokemons")
        pokemonBoxe.innerHTML = ""
        
        pokemons.map((val) => {
          pokemonBoxe.innerHTML += `
          <div class="pokemon-box">
            <img src="${val.imagem}" alt="imagem do ${val.nome}">
            <p>${val.nome}</p>
            <p>${val.info}</p>
          </div> 
          `
        })

      }
    })

  })
})