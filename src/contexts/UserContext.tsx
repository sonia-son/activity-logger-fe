import React, { useState, useEffect } from 'react';
import apiRequest from '../hooks/apiRequest';
import { useAuth } from '../hooks/useAuth';

interface IUserContext {
  user: string;
  isLogin: boolean;
  isInitializedUser: boolean;
  setUser: (value: string) => void;
  setIsLogin: (value: boolean) => void;
}

const UserContext = React.createContext<IUserContext>({
  user: '',
  isLogin: false,
  isInitializedUser: false,
  setUser: () => {},
  setIsLogin: () => {},
});

interface UserContextProviderProps {
  children: React.ReactNode;
}

const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isInitializedUser, setIsInitializedUser] = useState(false);
  const { checkSignIn } = useAuth();

  useEffect(() => {
    const init = async () => {
      try {
        const result = await checkSignIn();
        if (result) {
          setUser(result.user);
          apiRequest.setToken(result.token);
          setIsLogin(true);
        }
      } catch (e) {
        //
      } finally {
        setIsInitializedUser(true);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextPayload = React.useMemo(
    () => ({
      user,
      isLogin,
      isInitializedUser,
      setUser,
      setIsLogin,
    }),
    [user, isLogin, isInitializedUser]
  );

  return (
    <UserContext.Provider value={contextPayload}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => React.useContext(UserContext);

export default UserContextProvider;
export { useUserContext };
