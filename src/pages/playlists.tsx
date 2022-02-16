import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {
  useSession,
  signIn,
  signOut,
  getSession,
  getCsrfToken,
} from 'next-auth/react';
import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import { useState, useEffect } from 'react';
import { isValidSession } from '../utils/session';
import useScrollPlaylists from '../hooks/useScrollPlaylists';

type PlaylistsProps = {
  session: Session;
};

const Playlists: NextPage<PlaylistsProps> = () => {
  const { data: session } = useSession();

  const { data, error, isLast, loadMore } = useScrollPlaylists(
    session?.token.accessToken
  );

  console.log({ data });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div>
      <button
        onClick={() => {
          signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default Playlists;
