import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { isValidSession } from './utils/session';
import { useEffect, ReactNode } from 'react';

const Auth = ({ children }: { children: any }) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isValidSession(session)) {
      router.push('playlists');
    } else {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return children;
};

export default Auth;
