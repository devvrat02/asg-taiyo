import { createSlice } from '@reduxjs/toolkit'
type contact={
      firstname:string,
      lastname:string,
      Status:string
    } 
// Setting type of Userstate.
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
    // add the value of contact in array
    adduser:(state,action)=>{
      let data=action.payload
      state.users.push(data)
    },
    // edit the value of contact in array
    edituser:(state,action)=>{
      let id=action.payload.id
      state.users[id]={...action.payload}   
    },
    // delete the contact in array
    deluser:(state,action)=>{
      let id=action.payload
      state.users.splice(id,1) 
    }
  },
})

// Action creators are generated for each case reducer function
export const { adduser,edituser,deluser} = contactsSlice.actions

export default contactsSlice.reducer