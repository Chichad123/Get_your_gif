let button = document.querySelector(".search_bar>button");
let input = document.querySelector("input");

let allgif = document.getElementById("allGif");

button.addEventListener("click", async () => {
  if(allgif.innerHTML!='')
  allgif.innerHTML='';
  let q = input.value;
  console.log(q);
  let gifLimit = 25;
  let key = "xHJwves5OVHpzsd43Ln0zWzKTMRmNy4s";
  let url = `https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${q}&limit=${gifLimit}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  const res = await fetch(url);
  try {
    const data = await res.json();  
    console.log(data);
    const arr = data.data;
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      let gif = document.createElement("div");
      gif.classList.add("gif");

      let iframe = document.createElement("img");
      iframe.src = arr[i].images.original.url;
      gif.appendChild(iframe); // Append iframe directly
      
      let btn = document.createElement("button");
      btn.innerHTML = `<i class="fa-solid fa-link"></i> Copy Link`;
      gif.appendChild(btn); // Append button directly

      allgif.appendChild(gif);
    } 
    if(arr.length===0)
    {
      document.querySelector('p').style.display='block';
    }
    document.querySelectorAll('.gif>button').forEach((ele)=>{
      ele.addEventListener('click',(e)=>{
        var text=ele.parentElement.children[0].getAttribute('src');
        console.log(text);
        // text.select();
        navigator.clipboard.writeText(text);
        ele.innerText="Copied!"
        setTimeout(()=>{
           ele.innerHTML='<i class="fa-solid fa-link"></i> Copy Link';
        },1000);
        
      })
    })
} catch (error) {
    document.querySelector('p').style.display='block';
  }
  
});
let open=false;
document.querySelector('.list').addEventListener('click',()=>{
  if(!open)
  {
    document.querySelector('.sidebar').style.display='flex';
    document.querySelector('.list').innerHTML='<i class="fa-solid fa-x"></i>';
    open=true;
  }
  else{
    document.querySelector('.list').innerHTML='<i class="fa-solid fa-list"></i>';
    document.querySelector('.sidebar').style.display='none';
    open=false;
  }
  
});


document.querySelectorAll('.sidebar>a').forEach((ele)=>{
  ele.addEventListener('click',()=>{
    document.querySelector('.sidebar').style.display='none';
    document.querySelector('.list').innerHTML='<i class="fa-solid fa-list"></i>';
    
  })
});
