import { useCallback, useEffect, useRef, useState } from 'react'



function App() {
 

  const [Password,SetPassword]=useState("")
  const [length,SetLength]=useState(8)
  const [numbers,SetNumbers]=useState(false)
  const [char,Setchar] = useState(false)
  
  const PassRef=useRef(null)
  
  const CopyToClip=useCallback(()=>{
    PassRef.current?.select();
    window.navigator.clipboard.writeText(Password)
  },[Password])
  
  let PassWordGenerate=useCallback(()=>{
    let pascode=""
    let alphabets="ABCDEFGHIJKLMNOPQRSTUVQXYZabcdefghijklmnopqrstuvwxyz"
    if(numbers)
    {
      alphabets+="123456789"
    }
    if(char)
    {
      alphabets+="!@#$%^&*-_+=[]{}~`"
    }

    for(let i=0;i<=length-1;i++)
    {
      let rand=Math.floor(Math.random()*alphabets.length+1)
      pascode+=alphabets.charAt(rand);
    }

    SetPassword(pascode)
  }
  ,[length,numbers,char,SetPassword])
  
  useEffect(()=>{
    PassWordGenerate();
  },[length,numbers,char,PassWordGenerate])
  return (
    <>


      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-5 bg-gray-800 text-orange-500">
        <h1 className=' text-center my-4'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text"
           className='outline-none w-full py-1 px-3 text-black'
            readOnly
            ref={PassRef}
            value={Password}
             />
          <button  onClick={CopyToClip} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-3'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={4} max={22} className='cursor-pointer'
          value={length}
          onChange={(e)=>{
            SetLength(e.target.value)
          }} />
          <label>Length:{length}</label>
        </div>
          <div className='flex items-center gap-x-1'>
          <input type="checkbox" id='NumberTrue'
          defaultChecked={numbers}
          onChange={()=>{
            SetNumbers((prevnum)=>!prevnum)
          }} />
          <label >Numbers</label>
          </div>
          

          <div className='flex items-center gap-x-1'>
          <input type="checkbox" id='CharTrue' defaultChecked={char} onChange={()=>{
            Setchar((PrevChar)=>!PrevChar)
          }} />
          <label >Charaters</label>
          </div>



          

        </div>
        </div>

       

      
    </>
  )
}

export default App
