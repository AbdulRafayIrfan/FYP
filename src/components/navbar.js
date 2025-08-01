import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  rem,
  Transition,
  Paper,
  Menu,
  UnstyledButton,
  Text,
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import bshNavLogo from "../../public/logos/bsh-nav-logo-cropped.png";
import {
  ChevronDownIcon,
  Cog8ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useAuth } from "../Contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.gray[2],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.rgba("#E83D3C", 0.1),
      color: "#E83D3C",
    },
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function Navbar() {
  // current user details
  const { currentUser, logout } = useAuth();

  // Change links here
  const links = [
    { link: "home", label: "Home" },
    { link: "discussions", label: "Discussions" },
    { link: "time-management", label: "Time Management" },
    { link: "useful-links", label: "Useful Links" },
  ];

  const router = useRouter();

  function handleLogout() {
    logout().then(() => {
      router.push("/login");
    });
  }

  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={`/${link.link}`}
      className={cx(classes.link, {
        [classes.linkActive]: router.pathname.slice(1) === link.link,
      })}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header
      height={HEADER_HEIGHT}
      sx={{ backgroundColor: "#f8f9fa", border: "none", zIndex: "10" }}
      mb="1.5rem"
    >
      <Container className={classes.header}>
        {/* Navigation Bar Logo */}
        <Image
          onClick={() => router.push("/home")}
          src={bshNavLogo}
          width={230}
          alt="bsh-nav-logo"
          style={{ cursor: "pointer" }}
          priority
        />
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <>
              <Paper
                sx={{ zIndex: "1" }}
                className={classes.dropdown}
                withBorder
                style={styles}
              >
                {items}
                <Menu>
                  <Menu.Divider />
                  <Menu.Item
                    onClick={handleLogout}
                    icon={<ArrowLeftOnRectangleIcon className="h-4 w-4" />}
                  >
                    Logout
                  </Menu.Item>
                </Menu>
              </Paper>
            </>
          )}
        </Transition>

        <Menu
          width={260}
          position="bottom-end"
          transitionProps={{ transition: "pop-top-right" }}
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          withinPortal
          zIndex={100}
        >
          <Menu.Target>
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group spacing={0}>
                <Avatar
                  // Change here
                  src={currentUser && currentUser.photoURL}
                  alt={currentUser && currentUser.displayName}
                  radius="xl"
                  size={20}
                />
                {/* <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  {currentUser && currentUser.displayName}
                </Text> */}
                <ChevronDownIcon className="h-4 w-4" />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Settings</Menu.Label>
            <Menu.Item
              onClick={handleLogout}
              icon={<ArrowLeftOnRectangleIcon className="h-4 w-4" />}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Container>
    </Header>
  );
}
