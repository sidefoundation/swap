export default function TabItem({
  tab,
  setTab,
  title,
  value,
}: {
  tab: string;
  setTab: Function;
  title: string;
  value: string;
}) {
  return (
    <div
      className={`tab tab-sm px-4  ${
        tab === value
          ? 'bg-primary text-white rounded-full'
          : 'dark:text-gray-400'
      }`}
      onClick={() => {
        setTab(value);
      }}
    >
      {title}
    </div>
  );
}
