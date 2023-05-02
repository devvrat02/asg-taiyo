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
    const defaultValues={
        firstname:firstname,
        lastname:lastname,
        Status:Status
    }
    const [edit,setedit]=useState(editf)
    const {
        control,
        handleSubmit,
      } = useForm<FormData>({defaultValues})

      const formsubmit=(e:any)=>{
        if(!update){
            dispatch(adduser(e))
        }else{
            console.log(id)
            dispatch(edituser({...e,id:id}))
        }
        setedit(false)
      }
      const ondelete=()=>{
        dispatch(deluser(id))
      }

    return (  
        <div className='flex flex-row w-full bg-white p-4 border-1 w-full brd-card'>
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
                                <input className='in-field rounded pl-2' 
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
                                <input className=' border-1 in-field rounded pl-2' 
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
                                    <input className='' 
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
                                    <input className='' 
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
                            <div className='text-white rounded-lg p-1 h-8 bg-blue-500 w-30' onClick={handleSubmit(formsubmit)}>Save&nbsp;Contact</div>
                        </div>
                        <div className='flex justify-center mt-2'>
                            <div className='text-white rounded-lg p-1 h-8 bg-yellow-500 w-30' onClick={()=>{setcontact(false);setedit(false)}}>Cancel</div>
                        </div>
                    </div>}
                    {!edit&&<div className='flex flex-row justify-center mt-2'>
                        <div className='flex justify-center mt-2 mr-2'>
                            <div className='text-white rounded-lg p-1 h-8 bg-blue-500 w-30' onClick={()=>setedit(true)}>Edit&nbsp;Number</div>
                        </div>
                        <div className='flex justify-center mt-2'>
                            <div className='text-white rounded-lg p-1 h-8 bg-red-500 w-30' onClick={ondelete}>Delete</div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default ContactCard;