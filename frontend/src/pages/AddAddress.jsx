import { useState } from "react"
import { assets } from "../assets/assets"

// Input Field Component
const InputField = ({type, placeholder, name, handleChange, address})=> (
    <input 
    className="w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition"
    type={type} 
    placeholder={placeholder} 
    name={name} 
    onChange={handleChange} 
    value={address[name]} 
    required
    />
)

const AddAddress = () => {

    const [address,setAddress] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:'',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddress((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    }
  return (
    <div className="mt-16 pb-16">
        <p className="text-2xl md:text-3xl text-gray-500">Add Shipping <span className="font-semibold text-primary">Address</span> </p>

        <div className="flex flex-col-reverse md:flex-row justify-between mt-10">
            {/*-----------Left input field-----------*/}
            <div className="flex-1 max-w-md">
                <form 
                className="space-y-3 mt-6 text-sm"
                onSubmit={onSubmitHandler}>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField 
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        address = {address}
                        handleChange = {handleChange}
                        />
                        <InputField 
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        address = {address}
                        handleChange = {handleChange}
                        />
                    </div>
                    <InputField
                    type="email"
                    placeholder="Email address"
                    name="email"
                    address = {address}
                    handleChange = {handleChange}
                    />
                    <InputField
                    type="text"
                    placeholder="Street Address"
                    name="street"
                    address = {address}
                    handleChange = {handleChange}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                        type="text"
                        placeholder="City"
                        name="city"
                        address = {address}
                        handleChange = {handleChange}
                        />
                        <InputField
                        type="text"
                        placeholder="State"
                        name="state"
                        address = {address}
                        handleChange = {handleChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputField
                        type="text"
                        placeholder="Zip Code"
                        name="zipcode"
                        address = {address}
                        handleChange = {handleChange}
                        />
                        <InputField 
                        type="text"
                        placeholder="Country"
                        name="country"
                        address = {address}
                        handleChange = {handleChange}
                        />
                    </div>
                    <InputField
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    address = {address}
                    handleChange = {handleChange}
                    />
                    <button 
                    type="submit"
                    className="w-full bg-primary mt-6 text-white py-3 hover:bg-secondary transition cursor-pointer uppercase rounded-md"
                    >
                        Save Address
                    </button>
                </form>
            </div>
            {/*-----------Right image part-----------*/}
            <img 
            className="md:mr-16 mb-16 md:mt-0"
            src={assets.add_address_iamge} alt="address" />
        </div>
    </div>
  )
}

export default AddAddress