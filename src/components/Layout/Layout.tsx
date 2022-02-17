import {
  Button,
  Flex,
  IconButton,
  useColorMode,
  Spacer,
} from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export type LayoutProps = {
  currentPath: string;
};

const Layout = (props: LayoutProps) => {
  const { currentPath } = props;

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {currentPath === '/' ? (
        <IconButton
          // _focus={{_focus: "none"}} //周りの青いアウトラインが気になる場合に消す方法
          mb={10}
          aria-label="DarkMode Switch"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} //自分の好みでSunアイコンはreact-iconsを使用しています
          onClick={toggleColorMode}
        />
      ) : (
        <Flex>
          <IconButton
            // _focus={{_focus: "none"}} //周りの青いアウトラインが気になる場合に消す方法
            mb={10}
            aria-label="DarkMode Switch"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} //自分の好みでSunアイコンはreact-iconsを使用しています
            onClick={toggleColorMode}
          />
          <Spacer />
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Layout;
