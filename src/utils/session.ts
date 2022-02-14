import { Session } from 'next-auth';

export const isValidSession = (session: Session | null) => {
  if (session === null) {
    return false;
  }

  if (session === undefined) {
    return false;
  }

  const expiresDate = Date.parse(session.expires);

  if (expiresDate < Date.now()) {
    return false;
  }

  return true;
};
