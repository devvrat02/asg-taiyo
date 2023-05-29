import {Controller,useForm} from 'react-hook-form'
import { useDispatch } from "react-redux";
import { adduser,deluser,edituser } from '../../../reducers/Contacts';
import { useState } from 'react';
function ContactCard({id='',firstname='',lastname='',Status='',editf=false,update=false,setcontact=()=>{}}:any) {
    const dispatch=useDispatch();
    type FormData={
        firstname:string,
        lastname:string,
        Status:string
    }
    // setting default values in contact Form
    const defaultValues={
        firstname:firstname,
        lastname:lastname,
        Status:Status
    }
    // Setting Form is editable
    const [edit,setedit]=useState(editf)
    
    // Declaring form Hook
    const {
        control,
        handleSubmit,
      } = useForm<FormData>({defaultValues})

    // onForm Submit
      const formsubmit=(e:any)=>{
        // Checking form is open in which mode like editable=update,add 
        if(!update){
            dispatch(adduser(e))
            setcontact(false)
        }else{
            // console.log(id)
            dispatch(edituser({...e,id:id}))
        }
        setedit(false)
      }
      const ondelete=()=>{
        // deleting the user in the array by calling redux function.
        dispatch(deluser(id))
      }

    return (  
        <div className='flex flex-row w-full bg-white p-4 border-1 brd-card  shadow-xl rounded-lg'>
            <div className="flex flex-col bg-white-900  " >
                <div className='flex flex-row my-3 '>
                  <div className='mr-4'>
                    First&nbsp;Name:
                    </div>
                    {!edit&&<div  className='w-48'>{firstname}</div>}

                     {edit&&<Controller
                                name="firstname"
                                control={control}
                                rules={{
                             required: true,
                            }}
                            render={({ field }) =>(
                                <input className='cursor-pointer  border-1 border-slate-900 bg-slate-100 rounded-lg pl-2' 
                                    id={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder='Enter Name'
                                />
                                )}
                            />}
                </div>   
                <div className='flex flex-row my-3'>
                  <div  className='mr-4'>
                    Last&nbsp;Name:
                  </div>
                  {!edit&&<div className='w-48'>{lastname}</div>}
                  {edit&&<Controller
                                name="lastname"
                                control={control}
                                rules={{
                                    required: true,
                                 }}
                            render={({ field }) =>(
                                <input className='cursor-pointer border-1 border-slate-400 bg-slate-100 rounded-lg pl-2' 
                                    id={field.name}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder='Enter LastName'
                                />
                                )}
                            />}
                  </div>   
                <div className='my-3'>
                    <div className='flex flex-row'>

                    <div className='mr-14'>
                        Status
                    </div>
                    {!edit&&<div>{Status}</div>}
                    {edit&&<div className='flex flex-col'>
                          <div className='flex flex-row'>
                             <Controller
                                name="Status"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) =>(
                                    <input className='cursor-pointer' 
                                    id={field.name}
                                    name={field.name}
                                    type='radio'
                                    value='true'
                                    checked={field.value === "true"}
                                    onChange={field.onChange}
                                    />
                                    )}
                                    />
                                    <div className='ml-2'>Active</div>
                            </div>
                            <div className='flex flex-row'>
                            <Controller
                                name="Status"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field }) =>(
                                    <input className='cursor-pointer' 
                                    id={field.name}
                                    name={field.name}
                                    type='radio'
                                    value='false'
                                    checked={field.value === "false"}
                                    onChange={field.onChange}
                                    />
                                    )}
                                    />
                                <div className='ml-2'>Deactive</div>
                            </div>
                        </div>}
                    </div>
                   {edit&&<div className='flex flex-row justify-center mt-2'>
                        <div className='flex justify-center mt-2 mr-2'>
                            <div className='text-white rounded-sm p-1 h-8 bg-blue-500 w-30 cursor-pointer' onClick={handleSubmit(formsubmit)}>Save&nbsp;Contact</div>
                        </div>
                        <div className='flex justify-center mt-2'>
                            <div className='text-white rounded-sm p-1 h-8 bg-yellow-500 w-30 cursor-pointer' onClick={()=>{setcontact(false);setedit(false)}}>Cancel</div>
                        </div>
                    </div>}
                    {!edit&&<div className='flex flex-row justify-center mt-2'>
                        <div className='flex justify-center mt-2 mr-2'>
                            <div className='text-white rounded-sm p-1 h-8 bg-blue-500 w-30 cursor-pointer' onClick={()=>setedit(true)}>Edit&nbsp;Number</div>
                        </div>
                        <div className='flex justify-center mt-2'>
                            <div className='text-white rounded-sm p-1 h-8 bg-red-500 w-30 cursor-pointer' onClick={ondelete}>Delete</div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default ContactCard;