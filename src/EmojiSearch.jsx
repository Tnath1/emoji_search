import React, { useState } from 'react';

function EmojiSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [emojis, setEmojis] = useState([]);

  const accessKey = "fe64e9c28761bbe1724bdd3186ebb4a4db9d35c6"; // Your access key here
  const baseApiUrl = "https://emoji-api.com/emojis";

  const handleSearch = () => {
    // Make a GET request to the Emoji API using the Fetch API
    fetch(`${baseApiUrl}?search=${searchTerm}&access_key=${accessKey}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Update the emojis state with the fetched data
        setEmojis(data);
      })
      .catch(error => {
        console.error('Error fetching emojis:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for emojis"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {emojis.map((emoji, index) => (
          <div key={index}>
            {/* Display each emoji character */}
            {emoji.character}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmojiSearch;
