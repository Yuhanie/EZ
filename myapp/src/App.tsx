import ReactSearchBox from "react-search-box";

export default function App() {
  return (
    <ReactSearchBox
      placeholder="Search for 業界資源,專題相關,修課心得,課堂筆記,其他"
      data={[
        {
          key: "業",
          value: "業界資源"
        },
        {
          key: "專",
          value: "專題相關"
        },
        {
          key: "修",
          value: "修課心得"
        },
        {
          key: "課",
          value: "課堂筆記"
        },
        {
          key: "其他",
          value: "其他"
        }
      ]}
      onSelect={(record: any) => console.log(record)}
      onFocus={() => {
        console.log("This function is called when is focussed");
      }}
      onChange={(value) => console.log(value)}
      autoFocus
      leftIcon={<>🎨</>}
      iconBoxSize="48px"
    />
  );
}