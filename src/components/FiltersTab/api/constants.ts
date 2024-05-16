type Tabs = {
  id: string;
  label: string;
  option: boolean | null;
};

export const TABS: Tabs[] = [
  {
    id: "42",
    label: "Все",
    option: null,
  },
  {
    id: "43",
    label: "Активные",
    option: false,
  },
  {
    id: "44",
    label: "Сделано",
    option: true,
  },
];
