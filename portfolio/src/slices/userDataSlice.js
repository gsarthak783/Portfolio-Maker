import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from 'axios'; 

 
export const userLoginPromiseStatus = createAsyncThunk('get-data',async (email,thunkApi)=>{
   try{
     let res = await axios.get(`http://localhost:4000/user/get-data/${email}`)
  
    if(res.data.message==='No user found'){
        // localStorage.setItem('token',res.data.token)
        return thunkApi.rejectWithValue(res.data.message);
    }
    return res.data;
   }
   catch(err){
return thunkApi.rejectWithValue(err);
   }
   
})




 
 
export let userDataSlice = createSlice({
    name: 'userData',
    initialState:{
        currentUser:{},
        loginStatus:false,
        errorMessage:'',
        isPending:false
    },
    reducers: {

        clearState :(state, action) =>{
            state.currentUser = {};
            state.loginStatus = false;
            state.errorMessage = '';
            state.isPending = false;
            
        },


    },
    extraReducers: builder => builder
    .addCase(userLoginPromiseStatus.pending, (state, action) => {
        
        state.isPending = true;
    })
    .addCase(userLoginPromiseStatus.fulfilled, (state, action) => {
       
        state.currentUser = action.payload.payload;
        state.loginStatus = true;
        state.errorMessage = '';
        state.isPending = false;
    })
    .addCase(userLoginPromiseStatus.rejected, (state, action) => {
        
        state.currentUser = {};
        state.loginStatus = false;
        state.errorMessage = action.payload;
        state.isPending = false;
    })
    
});
 
//export actions
export const {clearState} = userDataSlice.actions;
//expot root reducer
export default userDataSlice.reducer;