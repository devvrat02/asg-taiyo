import { createSlice } from '@reduxjs/toolkit'
type contact={
      firstname:string,
      lastname:string,
      Status:string
    } 

interface Userstate {
  users:contact[],
}
const initialState:Userstate={
  users:[],
}

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    adduser:(state,action)=>{
      let data=action.payload
      state.users.push(data)
    },
    edituser:(state,action)=>{
      let id=action.payload.id
      state.users[id]={...action.payload}   
    },
    deluser:(state,action)=>{
      let id=action.payload
      state.users.splice(id,1) 
    }
  },
})

// Action creators are generated for each case reducer function
export const { adduser,edituser,deluser} = contactsSlice.actions

export default contactsSlice.reducer