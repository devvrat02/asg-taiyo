import { useState } from "react";
import ContactCard from "./ContactCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
function Contacts() {
    // for showing contact form
    const [contact,setcontact]=useState(false)
    // fetching users from redux store
    const {users}=useSelector((state:RootState)=>{return state.contacts})
    return ( 
        <div className="flex justify-center items-center w-full flex-col" >
            <div>
                Contact List
            </div>
            <div className="flex flex-col justify-center items-center">

                <div className="flex justify-center items-center m-auto">
                    {contact&&<ContactCard setcontact={setcontact} editf={true}/>}
                </div>
                <div className="">
                    {!contact&&<div className="w-full bg-blue-500 p-2 m-2 flex justify-center items-center rounded text-white cursor-pointer" onClick={()=>setcontact(true)}>
                        Create Contact
                    </div>}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3">
                {users.length>0&&users.map((user,index)=>{
                    return(
                    <div key={index} className="m-6 ">
                        <ContactCard id={index}  firstname={user.firstname} lastname={user.lastname} Status={user.Status} editf={false} update={true}/>
                    </div>
                    )
                })}
            </div>
        </div>
     );
}

export default Contacts;