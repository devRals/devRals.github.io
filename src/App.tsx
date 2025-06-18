import {
    AppShell,
    Avatar,
    Center,
    Container,
    Group,
    Overlay,
    Paper,
    Space,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
// import AppRenderer from "./AppRenderer.tsx";
import { useEffect, useState, useTransition } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { PageLoader } from "./components/Loader.tsx";
import Spamton from "./components/Spamton.tsx";
import PageSwitcher from "./components/PageSwitcher.tsx";
import { useHotkeys } from "@mantine/hooks";
import i18n from "./i18n.ts";
import { LangAffix } from "./components/home/languageAffix.tsx";
import { usePage } from "./components/context/page/index.tsx";
import { useMusicPlayer } from "./components/musicPlayer/index.tsx";
import { GODDAMMITKRISWHERETHEHELLAREWE } from "./components/GODDAMMITKRISWHERETHEHELLAREWE.tsx";
import { DeltaruneProphecies } from "./components/bg/index.tsx";

const App = () => {
    const { pathname } = useLocation();
    const { setSong, play, error, disableError } = useMusicPlayer();
    const [firstInteraction, setFirstInteraction] = useState(true);
    const theme = useMantineTheme();

    const [pending, startTransition] = useTransition();
    const { pageLabel } = usePage();

    useEffect(() => {
        const handleUserInteraction = () => {
            disableError();
            play();
            document.removeEventListener("click", handleUserInteraction);
        };

        const musicId = localStorage.getItem("musicId");
        if (!musicId || musicId === "null") {
            setFirstInteraction(false);
            return;
        }
        setSong(Number(musicId));
        play();

        document.addEventListener("click", handleUserInteraction);

        return () => {
            document.removeEventListener("click", handleUserInteraction);
        };
    }, [error, firstInteraction]);

    useHotkeys([
        ["1", () => i18n.changeLanguage("en")],
        ["2", () => i18n.changeLanguage("tr")],
    ]);

    return (
        <AppShell header={{ height: 80, offset: true }}>
            {firstInteraction && (
                <Overlay
                    backgroundOpacity={0.8}
                    blur={6}
                    pos="fixed"
                    onClick={() => {
                        disableError(), setFirstInteraction(false);
                    }}
                >
                    <Center h="100vh">
                        <Text c="#fff" fz="h1">
                            Please press any where to play the song
                        </Text>
                    </Center>
                </Overlay>
            )}
            <DeltaruneProphecies />
            <AppShell.Header withBorder={false}>
                <Group align="center" h={"100%"} justify="space-around">
                    <Group>
                        <Avatar
                            src={"https://cdn.discordapp.com/avatars/718798893445283863/3a146ccc94dd2c6e917dc6eb3ce62276.webp?size=128"}
                            alt="me :3"
                            size="lg"
                            radius={0}
                            style={{ cursor: "pointer" }}
                        />
                        <Title ta={"center"} order={3} c={theme.primaryColor}>
                            Developer Ralsei
                        </Title>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Main px={{ md: "xs" }}>
                <PageSwitcher startTranitionFunc={startTransition} />
                <Group w="100%" justify="center">
                    <Title
                        c={theme.primaryColor}
                        mt={5}
                        mx="auto"
                        order={3}
                        display={"inline-block"}
                        className={"glass"}
                        p="xs"
                        ta="center"
                    >
                        {pageLabel}
                    </Title>
                </Group>
                <Container
                    pt={30}
                    size={pathname === "/desktop"
                        ? "xl"
                        : pathname === "/projects"
                            ? "lg"
                            : "sm"}
                >
                    {pending ? <PageLoader /> : <Outlet />}
                </Container>
                <Space h="30vh" />
            </AppShell.Main>
            <span
                id="Confetti1"
                style={{
                    position: "absolute",
                    bottom: 0,
                    right: 30,
                }}
            />
            <span
                id="Confetti2"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 30,
                }}
            />
            <Spamton />
            <LangAffix />
        </AppShell>
    );
};

export default App;
