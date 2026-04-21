import { setError, setLoading, setUser } from "../state/auth.slice";
import { register, login , getMe } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();

  const handleRegister = async ({
    email,
    contact,
    password,
    fullname,
    isSeller = false,
  }) => {
    dispatch(setLoading(true));
    try {
      const data = await register({
        email,
        contact,
        password,
        fullname,
        isSeller,
      });
      dispatch(setUser(data.user));
      return data.user
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async ({ email, password }) => {
    dispatch(setLoading(true));
    try {
      const data = await login({ email, password });
      dispatch(setUser(data.user));
      return data.user;
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGetMe = async () => {
    dispatch(setLoading(true));
    try {
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { handleRegister, handleLogin, handleGetMe };
};
