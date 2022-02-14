import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { isValidSession } from './utils/session';
import { useEffect } from 'react';

const Auth = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isValidSession(session)) {
      router.push('hoge');
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return null;
};

export default Auth;
