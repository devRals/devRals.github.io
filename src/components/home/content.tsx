import { MY_AGE } from "@/data/constants";
import {
    Box,
    Group,
    Image,
    List,
    ListItem,
    Stack,
    Text,
    Tooltip,
} from "@mantine/core";
import { useTranslation } from "react-i18next";

export default function HomeContent() {
    const { t } = useTranslation();
    return (
        <Stack mt={"sm"} gap={6}>
            <ListItem>{t("home.items.0")}</ListItem>
            <ListItem>
                {t("home.items.1.prefix")}
                <Group display={"inline-flex"} gap={3} me={3}>
                    <Tooltip label="It's Turkiye!!! not Turkey">
                        <Text c={"red"} fw={700}>
                            Turkiye
                        </Text>
                    </Tooltip>{" "}
                    /{" "}
                    <Tooltip label={t("home.items.1.tooltip")}>
                        <Text c={"cyan"} fw={700}>
                            Isparta
                        </Text>
                    </Tooltip>
                    <Tooltip label="GMT +3 / UTC +3">
                        <Image
                            src={"/images/as-bayraklari-as.png"}
                            alt="Flag"
                            w={20}
                        />
                    </Tooltip>
                </Group>
                {t("home.items.1.suffix")}
            </ListItem>
            <ListItem>
                {t("home.items.2.prefix")}
                <Tooltip label="2006-04-11">
                    <Text c="yellow" fw={700}>
                        {MY_AGE}
                    </Text>
                </Tooltip>
                {t("home.items.2.suffix")}
            </ListItem>
            <ListItem>
                {t("home.items.3.prefix")}
                <Text c={"blue"} fw={700}>
                    NextJs
                </Text>
                ,{" "}
                <Text c={"green"} fw={700}>
                    C#
                </Text>
                {t("home.items.3.middle")}
                <Text
                    c={"gray"}
                    component="a"
                    href="https://deno.com"
                    target="_blank"
                    fw={700}
                >
                    DenoJs
                </Text>
                {t("home.items.3.suffix")}
            </ListItem>
            <ListItem>
                <Text>
                    {t("home.items.4.prefix")}
                    <Text
                        c={"blue"}
                        fw={700}
                        component="a"
                        href="https://archlinux.org"
                        target="_blank"
                    >
                        Arch Linux
                    </Text>{" "}
                    {t("home.items.4.suffix")}
                </Text>
            </ListItem>
            <ListItem>
                <Text>
                    {t("home.items.5.prefix")}
                    <Tooltip label="Obviously">
                        <Box display={"inline"}>
                            {" ("}
                            <Text
                                c={"orange"}
                                fw={700}
                                component="a"
                                href="https://undertale.com"
                                target="_blank"
                            >
                                Undertale
                            </Text>{" "}
                            /{" "}
                            <Text
                                c={"green"}
                                fw={700}
                                component="a"
                                href="https://deltarune.com"
                                target="_blank"
                            >
                                Deltarune
                            </Text>
                            {")"}
                        </Box>
                    </Tooltip>
                    {t("home.items.5.suffix")}
                </Text>
            </ListItem>
            <ListItem>
                <Text>
                    {t("home.items.6.prefix")}
                    <List icon="-" size="sm">
                        <List.Item>
                            <Text
                                c={"green"}
                                component="a"
                                href="https://minecraft.net"
                                fw={700}
                                target="_blank"
                            >
                                Minecraft
                            </Text>
                        </List.Item>
                        <List.Item>
                            <Tooltip
                                label={"I'm addicted to this game. Guess that's why I've less friends"}
                            >
                                <Text
                                    c={"pink"}
                                    fw={700}
                                    component="a"
                                    href="https://osu.ppy.sh"
                                    target="_blank"
                                >
                                    Osu!
                                </Text>
                            </Tooltip>
                        </List.Item>
                        <List.Item>
                            <Text
                                c={"yellow"}
                                fw={700}
                                component="a"
                                href="https://gamejolt.com/games/UndertaleYellow/136925"
                                target="_blank"
                            >
                                Undertale Yellow
                            </Text>
                        </List.Item>
                    </List>
                    {t("home.items.6.suffix")}
                </Text>
            </ListItem>
            <ListItem>
                <Text>
                    {t("home.items.7.prefix")}{" "}
                    <Text c="grape">{t("home.items.7.content")}</Text> 🥲
                </Text>
            </ListItem>
            <ListItem>{t("home.items.8")}</ListItem>
        </Stack>
    );
}
