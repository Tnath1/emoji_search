import { useEffect } from "react";
import React, { useState } from "react";

function EmojiSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allEmojis, setAllEmojis] = useState([]); // Stores all emojis
  const [filteredEmojis, setFilteredEmojis] = useState([]); // Stores filtered emojis
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false); // State to track if searching is in progress

  const accessKey = "fe64e9c28761bbe1724bdd3186ebb4a4db9d35c6"; // Your access key here
  const baseApiUrl = "https://emoji-api.com/emojis";

  // Fetch all emojis once on component mount
  useEffect(() => {
    fetch(`${baseApiUrl}?access_key=${accessKey}`)
      .then((response) => response.json())
      .then((data) => {
        setAllEmojis(data);
      })
      .catch((error) => console.error("Error fetching all emojis:", error));
  }, [searchTerm]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setError("Input field cannot be empty.");
      setFilteredEmojis([]);
      setIsSearching(false);
      return;
    }

    const filtered = allEmojis.filter((emoji) =>
      emoji.unicodeName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length === 0) {
      setError(`No emoji is found with the name "${searchTerm}".`);
      setFilteredEmojis([]);
    } else {
      setError("");
      setFilteredEmojis(filtered);
      // setFilteredEmojis([<div key="container">{filtered}</div>])
      setIsSearching(true);
    }
  };

  return (
    <div className="container">
      <h2>Favorite Emojis</h2>
     <div className="inputfield">
     <input
     className="input"
        type="text"
        placeholder="Search for emojis"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
     </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isSearching && (
        <div className="emojiContainer">
          {filteredEmojis.map((emoji, index) => (
            <div className="display" key={index}>{emoji.character}</div>
          ))}
        </div>
      )}
      {filteredEmojis.length === 0 && !error && (
        <p className="bottom-text">
          search for your favourite emojis by searching/typing words like:
          <span> "Love" </span>, <span>"Music"</span>, and <span>"Sleep"</span>, and we'll show you matching emoji.
        </p>
      )}
    </div>
  );
}

export default EmojiSearch;
