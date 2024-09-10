$(() => {
  console.log("pokemon ready");
  let offset =0

  var tl = gsap.timeline()
  var tlMain = gsap.timeline()
  var tlCard = gsap.timeline()


  //  Function to fetch individual Pokémon details (including image)
  const fetchPokemonDetails = async (pokemonName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    return data.sprites.front_default; // Return the front image URL
  };

  //fetchPokemonDetails("bulbasaur")

  //Show Pokemon Data
  const CreatePokemonData = async (data)=>{
    let Pokemon = data.results;
    Pokemon.forEach(async element => {
      const FlipCard = document.createElement("div");
      FlipCard.className = "flip-card";
      const CharaInner = document.createElement("div");
      CharaInner.className = "chara-card-inner";
      const CharacterCard = document.createElement("div");
      CharacterCard.className = "chara-card-front";
      const CharacterCardBack = document.createElement("div");
      CharacterCardBack.className = "chara-card-back";
      let PoekeImage = await fetchPokemonDetails(element.name)
      $(CharacterCard).append(`<h2>${element.name}</h2>`)
      $(CharacterCard).append(`<img src="../resource/PokemonCard.png" alt="card" class="pokemonCard">`)
      $(".PokemonGrid").append(FlipCard);
      $(FlipCard).append(CharaInner)
      $(CharaInner).append(CharacterCard);
      $(CharaInner).append(CharacterCardBack);
      $(CharacterCardBack).append(`<h2>${element.name}</h2>`)
      $(CharacterCardBack).append(`<img src="${PoekeImage}" alt="" class="PokemonIMG">`)      

      tlCard.from(FlipCard,{
        y:"-=150vh",
        x:"-=100vw",
        duration:0.2,
        ease: 'power4.out',
      })

      $(FlipCard).on("click",()=>{
        
      })
    });

  }
   
  // Fetch data from the PokeAPI
  const fetchPokemonData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`
    );
    let FetchData = await response.json();
    offset+=10
    return FetchData
  };

  //Running Part
  const RunningFanction = async ()=>{
    const FetchPokemon = await fetchPokemonData()
    CreatePokemonData(FetchPokemon)
  }

  RunningFanction()

  //Add Pokemon Data
  $(`.FetchBtn`).on("click",()=>{
    RunningFanction()
    tl.to(".MonsterBall",{
      duration:2,
      rotation: 1800,
      ease: "power4.out"
    })
    tl.restart()
  })

  //Animation
  tlMain.to(".veryFirstAnimation",{
    x:"-=100vw",
    duration:1,
    ease: "power4.out",
  }).to(".veryFirstAnimation",{
      x:"-=100vw",
      duraion:2,
      ease: "exposcale",
      delay: 0.5
  })

});
