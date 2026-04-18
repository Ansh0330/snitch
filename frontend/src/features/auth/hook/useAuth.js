import {setError,setLoading,setUser} from "../slice/auth.slice"
import {register} from "../service/auth.api"
import {useDispatch} from "react-redux"



export const useAuth = ()=>{
  const dispatch = useDispatch()

  const handleRegister = async ({email,contact,password,fullname,isSeller = false})=>{
    dispatch(setLoading(true))
    try {
      const data = await register({email,contact,password,fullname , isSeller})
      dispatch(setUser(data.user))
    } catch (error) {
      dispatch(setError(error))
    } finally {
      dispatch(setLoading(false))
    }
    
  } 



  return {handleRegister}
}