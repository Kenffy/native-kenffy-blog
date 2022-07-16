import { useSelector } from 'react-redux';
import AuthStack from './AppStack';
import UnAuthStack from './UnAuthStack';

export default function AppStacks() {
  const user  = useSelector((state) => state.auth.user);
  return (
    <>
    {user?
    <AuthStack />
    :
    <UnAuthStack />
    } 
    </>
  )
}
