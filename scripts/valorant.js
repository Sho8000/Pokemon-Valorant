$(() => {
  let  isAnimationPlaying = false;

  console.log("valorant ready");

  var tlChara = gsap.timeline()

  // Fetch data from the ValAPI
  const fetchValData = async () => {
    const response = await fetch(
      `https://valorant-api.com/v1/agents`
    );
    let FetchData = await response.json();
    return FetchData
  };

  //Create CharacterData
  const CreateValCharaData = (CharaData)=>{
    console.log("ValData",CharaData.data);
    CharaData.data.forEach(CharaInfo => {
      console.log(CharaInfo)
      if(CharaInfo.fullPortrait){
        const ValCharaInfo = document.createElement("div");
        ValCharaInfo.className = "ValCharaInfo";
        const CharaBox = document.createElement("div");
        CharaBox.className = "CharaBox hide";
        $(".ValCharaContainer").append(ValCharaInfo);
        $(ValCharaInfo).append(`<h2>${CharaInfo.displayName}</h2>`)
        $(ValCharaInfo).append(CharaBox)
        $(CharaBox).append(`<img src="${CharaInfo.background
        }" alt="chara" class="charaBack">`)
        $(CharaBox).append(`<img src="${CharaInfo.fullPortrait
        }" alt="chara" class="charaImg">`)

        $(ValCharaInfo).on("click",function(){
          if(isAnimationPlaying==false){
            $(CharaBox).toggleClass("hide");
            if(!$(CharaBox).hasClass("hide")){
              tlChara.from($(CharaBox).find(".charaImg"),{
                scale: 3,
                duration:1.5,
                ease: "power4.out",
                delay: -0.1,
                onUpdate: ()=>{
                  isAnimationPlaying=true;
                  console.log('isAnimationPlaying:', isAnimationPlaying)
                },
                onComplete: ()=>{
                  isAnimationPlaying=false;
                  console.log('isAnimationPlaying:', isAnimationPlaying)
                },
              })
            }  
          }
        })
      }
    });
    
  }

  const Valrunning = async ()=>{
    const ValFetch = await fetchValData();
//    console.log("ValData",ValFetch.data[0].displayName);
    CreateValCharaData(ValFetch);
}

  Valrunning()

});
