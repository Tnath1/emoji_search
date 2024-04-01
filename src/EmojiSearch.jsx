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
      setIsSearching(true);
    }
  };

  return (
    <div>
      <h2>Favorite Emojis</h2>
      <input
        type="text"
        placeholder="Search for emojis"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {isSearching && (
        <div>
          {filteredEmojis.map((emoji, index) => (
            <div key={index}>{emoji.character}</div>
          ))}
        </div>
      )}
      {filteredEmojis.length === 0 && !error && (
        <p>
          search for your favourite emojis by searching for words like
          <span>"Love", "Music"</span>, and <span>"Sleep"</span>.
        </p>
      )}
    </div>
  );
}

export default EmojiSearch;
