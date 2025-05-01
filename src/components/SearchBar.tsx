export default function SearchBar() {
    return (
        <div className="flex-column space-between">
        <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded p-2"
            style={{background: "white", color:"black"}}
        />
        <button className="bg-blue-500 text-white rounded p-2" style={{width: "100px"}}>Search</button>
        </div>
    );
}