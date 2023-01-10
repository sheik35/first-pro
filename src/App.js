import { Button, Card, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { ethers } from "ethers";
import Lock from "./artifacts/contracts/Lock.sol/Lock.json";

const greeterAdd = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const App = () => {
  const [msg, setMsg] = useState({});
  const [callId,setCallId]= useState(0)
  // console.log(msg, "msg");

  const onFormChage=(e)=>{
    let id = e.target.id
    let val=e.target.value
     setMsg({...msg,[id]:val})
  }

  const requestAccount = async () => {
    const acc = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(acc, "acc");
  };

  const fetchGreeting = async () => {
    if (
      typeof window.ethereum !== "undefined" ||
      typeof window.web3 !== "undefined"
    ) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAdd, Lock.abi, signer);
      try{
        const data = await contract.get(callId);
        console.log(data.toString(),'data');
      }catch(error){
        console.log(error,'error');
      }
    }
  };
  const setGreet = async () => {
    if (!msg) return;

    if (typeof window.ethereum !== "undefined") {
      const{userName,userAge}=msg
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const singer = provider.getSigner();
      const contract = new ethers.Contract(greeterAdd, Lock.abi, singer);
      
      try{
        const data = await contract.updateperson(userName,userAge)
        console.log(data,'data');
      }catch(error){
        console.log(error,'error');
      }
    }
  };

  return (
    <div className="w-full h-screen  flex justify-center items-center">
      <Card className="w-1/2 h-fit  ">
       <TextInput
          id="callId"
          placeholder="Id"
          onChange={(e) => setCallId(e.target.value)}
          className=" w-3/4 self-center"
        />
          <Button
            className=" w-3/12 self-center "
            gradientDuoTone="purpleToPink"
            onClick={fetchGreeting}
          >
            fetchGreet
          </Button>
        
        <TextInput
          id="userName"
          placeholder="Name"
          onChange={(e) => onFormChage(e)}
          className=" w-3/4 self-center"
        />
        <TextInput
          id="userAge"
          placeholder="Age"
          onChange={(e) => onFormChage(e)}
          className=" w-3/4 self-center"
        />
          <Button
            className=" w-3/12 self-center "
            gradientDuoTone="tealToLime"
            onClick={setGreet}
          >
            setGreet{" "}
          </Button>
        
      </Card>
    </div>
  );
};

export default App;

// / function App() {
//   const [first, setfirst] = useState("")

//   const walletfnc= async()=>{
//     if(window.ethereum){
//       setfirst(await window.ethereum.enable())
//       const provider=new ethers.providers.Web3Provider(window.ethereum);
//       const singer = provider.getSigner();
//       console.log(provider,await singer.getAddress());
//       const balance = await provider.getBalance("ethers.eth")
//       // const sign = singer.signMessage("Wellcome")
//       console.log("fsdafsadfsad",balance);
//       const block= await provider.getBlockNumber()
//       const blockdetails=await provider.getBlock(block)
//       console.log("blockdetails",block,blockdetails);
//     }
//   }
//   return (
//     <div className="flex flex-col min-h-screen justify-center ">
//       <h1 className=' absolute right-5 top-5'>{first}</h1>
//       <button onClick={walletfnc} className="  border-2 self-center font-bold tracking-wider drop-shadow-2xl shadow-gray-200 hover:text-white  rounded-lg hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-10 p-5 ">
//           Connect Wallet
//          </button>
//          <form>

//            <input type="text"
//               pattern="[a-zA-Z]+"
//               oninvalid={'Please enter Alphabets.'}
//               // onchange={try{setCustomValidity('')}catch(e){}}
//               />
//               <button>dsadfsadfsd</button>
//           </form>

//     </div>
//   );
// }
