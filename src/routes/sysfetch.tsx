import { useCurrentBackground } from '@/stores/background-store';
import { Divider, List, Stack, Text } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sysfetch')({
    component: RouteComponent,
})

type PcSpecification = {
    key: string;
    alt?: string
    value: React.ReactNode;
    innerSpecifications?: PcSpecification[];
};

const pcSpecifications: PcSpecification[] = [
    {
        key: "OS",
        value: "Arch Linux",
        alt: "Planning to switch NixOS"
    },
    {
        key: "CPU",
        value: "Intel Core",
        innerSpecifications: [
            {
                key: "Gen",
                value: "(3) 3230m",
            },
            {
                key: "Cores / Threads",
                value: "2 / 4",
            },
            {
                key: "Frequency",
                value: "2.60Ghz / 3.20Ghz",
            },
        ],
    },
    {
        key: "GPU",
        value: "AMD Radeon HD 7500M/7600M Series",
    },
    {
        key: "RAM",
        value: "8 GB",
        alt: "I got ram 😎"
    },
    {
        key: "Display",
        value: "1366x768",
    },
];

function RouteComponent() {
    const themeColor = useCurrentBackground().color

    return <><List>
        {pcSpecifications.map((s, i) => (
            <List.Item key={s.key + i}>
                <Text c={themeColor} fw="bold">
                    {s.key}
                </Text>
                {" : "}
                {s.innerSpecifications ? (
                    <List icon="-">
                        {s.innerSpecifications.map((s2, i) => (
                            <List.Item key={s2.key + i}>
                                <Text fw="bold" c={themeColor}>
                                    {s2.key}
                                </Text>
                                {" : "}
                                <Text>{s2.value}</Text>
                            </List.Item>
                        ))}
                    </List>
                ) : (
                    <Text>{s.value}{s.alt && <Text c="dimmed" span fz="sm">{" "}({s.alt})</Text>}</Text>
                )}{" "}
            </List.Item>
        ))}
    </List>
        <Divider />
        <Stack ta="center" gap={1}>
            <Text>I know it's not good.</Text>
            <Text>But this laptop carried me over 14 years!</Text>
        </Stack>
    </>
}
