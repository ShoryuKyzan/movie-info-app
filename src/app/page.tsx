import SearchBar from "@components/SearchBar";

export default function IndexPage() {
  return (
    <div>
      <div className="flex-row" >
        <div className="shrink p-4" style={{ background: "lightblue"}}>
          <div className="flex flex-column justify-between" style={{ width: "100%"}}>
            <h1 className="text-black grow">OMDB</h1>
            <SearchBar className="shrink"/>
          </div>
        </div>
        <div className="grow">
          <p>This is a test</p>
        </div>
      </div>
    </div>
  )
}