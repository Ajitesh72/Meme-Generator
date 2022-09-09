import React from "react"

export default function meme(){
  const [meme,setMeme]=React.useState({
    toptext:"",
    bottomtext:"",
    randomimage:"http://i.imgflip.com/1bij.jpg"
    // image:"troll.png"
    // image :"public\troll.png"

  })

  const[allmemes,setallMemes]=React.useState([])

  React.useEffect(function(){
    fetch("https://api.imgflip.com/get_memes")
    .then(res=>res.json())
    .then(data=>setallMemes(data.data.memes))
  },[])
  
  function getMemeImage(){
    const random=Math.floor(Math.random()*allmemes.length)
    const url=allmemes[random].url
    setMeme(prevMeme=>({
      ...prevMeme,
      randomimage:url
    }))
  }

  function handleChange(event){
    const{name,value}=event.target
    setMeme(prevMeme=>({
      ...prevMeme,
      [name]:value
    }))
  }
    return(
       <main>
        <div className="form">
          <input
              type="text"
              placeholder="Top Text"
              className="form--input"
              name="toptext"
              value={meme.toptext}
              onChange={handleChange}
          />

          <input
              type="text"
              placeholder="Bottom Text"
              className="form--input"
              name="bottomtext"
              value={meme.bottomtext}
              onChange={handleChange}
          />
          
          <button onClick={getMemeImage} className="form--button">Get a new Meme Image</button>


        <div className="meme">
          <img src={meme.randomimage} className="meme--image"  />
        
          <h2 className="meme--text top">{meme.toptext}</h2>
          <h2 className="meme--text bottom">{meme.bottomtext}</h2>
        </div> 

          
        </div>
       </main>
      
    )
  }