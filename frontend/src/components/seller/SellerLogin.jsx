import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const SellerLogin = () => {
    const {isSeller, setIsSeller, navigate} = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setIsSeller(true);
    }

    useEffect(()=>{
        if(isSeller){
            navigate("/seller");
        }
    },[isSeller])

  return !isSeller && (
    <form 
    onSubmit={onSubmitHandler}
    className="min-h-screen flex items-center text-sm text-gray-600"
    >

    </form>
  )
}

export default SellerLogin