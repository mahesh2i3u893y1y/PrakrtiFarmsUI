// hooks/useAuthInit.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails, clearUser } from '../utils/userSlice';
import { APP_CONTANTS } from '../components/constants';

const useAuthInit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); 
  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const res = await fetch(`${APP_CONTANTS.API_FOR_WEBSITE}/me`, {
            method: 'GET',
            credentials: 'include', 
          });

          if (!res.ok) throw new Error('Unauthorized');
          const data = await res.json();

          dispatch(setUserDetails(data.user));
        } catch (err) {
          console.log(err);
          dispatch(clearUser());
          // window.location.href = '/';
        }
      };

      fetchUser();
    }
  }, [dispatch, user]);
};

export default useAuthInit;
