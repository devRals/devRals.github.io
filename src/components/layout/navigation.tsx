import { useCurrentBackground } from "@/stores/background-store";
import { ActionIcon, Center, Group, Tooltip } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useRoutes } from "@/stores/routes-store";

export default () => {
    const themeColor = useCurrentBackground().color
    const routes = useRoutes(s => s.routes)

    return <Center>
        <Group justify="space-evenly">
            {routes.map((r, i) =>
                <Tooltip label={r.name} key={i}>
                    <Link to={r.href}>
                        <ActionIcon color={themeColor} c={themeColor} variant="light">
                            <r.icon />
                        </ActionIcon>
                    </Link>
                </Tooltip>
            )}
        </Group>
    </Center>
}
