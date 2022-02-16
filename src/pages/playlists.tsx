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
import { fetcher } from '../utils/api';
import { useState, useEffect } from 'react';
import { isValidSession } from '../utils/session';

type PlaylistsProps = {
  session: Session;
};

const Playlists: NextPage<PlaylistsProps> = () => {
  const { data: session } = useSession();

  const { data, error } = useSWR('/api/spotify/playlists', (url) =>
    fetcher(url, session?.token.accessToken)
  );

  console.log({ data });

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
