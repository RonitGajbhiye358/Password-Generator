import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [password, setPassword] = useState("");
  const [length, setlength] = useState(8);
  const [IsNum, setIsNumAllowed] = useState(false);
  const [IsChar, setIsCharAllowed] = useState(false);
  const [IsLowerCase, setIsLowerCase] = useState(false);

  const passwordref = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (IsLowerCase) str += "abcdefghijklmnopqrstuvwxyz"
    if (IsNum) str += "0123456789"
    if (IsChar) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)


  }, [length, IsNum, IsChar, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
    document.querySelector(".copy").style.backgroundColor = "#254336";
    document.querySelector(".copy").style.color = "white";
    document.querySelector(".copy").innerHTML = "Copied";
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, IsNum, IsChar, passwordGenerator])

  return (
    <div className='w-[50%] sm:w-[30%]  py-5 mx-auto my-[10vh] rounded-lg   bg-[#6B8A7A] '>
      <h1 className='text-center text-[#DAD3BE] drop-shadow-xl text-4xl font-extrabold '>Password Generator</h1>

      <img className='rounded-lg aspect-2/4 w-[50%]  m-auto drop-shadow-2xl'
        src='src/assets/img.png' alt='image' />


      <div className=" h-12 w-4/5 mt-5 mx-auto inset-x-0 flex  shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3 text-lg"
          placeholder="Password"
          readOnly
          ref={passwordref}
        />
        <button
          onClick={copyPasswordToClipboard}

          className='copy outline-none text-lg bg-[#B7B597] text-black px-3 py-0.5 cursor-pointer hover:bg-[#254336] hover:text-white'
        >copy</button>


      </div>

      <div className=' flex flex-col justify-evenly items-center text-sm gap-x-2'>
        <label className='mb-2 text-lg' >Password Length : {length}</label>
        <input
          type="range"
          min={6}
          max={50}
          value={length}
          className='w-3/5 mb-2 cursor-pointer'
          onChange={(e) => { setlength(e.target.value) }}
        />


      </div>
      <div className="h-12 flex items-center justify-between gap-x-1 ">
        <label htmlFor="numberInput" className='ml-6 text-lg'>Numbers</label>
        <input
          type="checkbox"
          defaultChecked={IsNum}
          id="numberInput"
          className='w-4 h-4 m-4 mr-6 cursor-pointer'
          onChange={() => {
            setIsNumAllowed((prev) => !prev);
          }}
        />
      </div>


      <div className="h-12 flex items-center justify-between gap-x-1 ">
        <label htmlFor="characterInput" className='ml-6 text-lg '>Characters</label>
        <input
          type="checkbox"
          defaultChecked={IsChar}
          id="characterInput"
          className='w-4 h-4 m-4 mr-6 cursor-pointer'
          onChange={() => {
            setIsCharAllowed((prev) => !prev)
          }}
        />
      </div>
      <div className="h-12 flex items-center justify-between gap-x-1 ">
        <label htmlFor="characterInput" className='ml-6 text-lg '>Lowercase</label>
        <input
          type="checkbox"
          defaultChecked={IsLowerCase}
          id="characterInput"
          className='w-4 h-4 m-4 mr-6 cursor-pointer'
          onChange={() => {
            setIsLowerCase((prev) => !prev)
          }}
        />
      </div>
    </div>
  )

}

export default App
