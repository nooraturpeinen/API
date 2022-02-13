import './App.css';
import { useState } from 'react';

const URL = "https://api.lyrics.ovh/v1";

function App() {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [lyrics, setLyrics] = useState("");

  async function getLyrics(e) {
    e.preventDefault();
    try {
      const address = URL + "/" + artist + "/" + title;
      const response = await fetch(address);
      if (response.ok) {
        const json = await response.json();
        const lyrics = json.lyrics;
        const correctedLyrics = lyrics.substring(22);
        const finalLyrics = correctedLyrics.replace("par", "by");
        if (lyrics.substring(0, 22) === "Paroles de la chanson ") {
          setLyrics(finalLyrics);
        } else {
          setLyrics(lyrics);
        }
      } else {
        alert("Lyrics not found.");
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <form onSubmit={getLyrics}>
        <div>
          <h2>Song Lyrics</h2><hr/>
        </div>
        <div style={{marginTop: "25px", marginBottom: "10px"}}>
          <label for="artist">Artist:</label>
          <input value={artist} onChange={e => setArtist(e.target.value)}/>
        </div>
        <div style={{marginTop: "15px", marginBottom: "10px"}}>
          <label for="title">Song Title:</label>
          <input value={title} onChange={e => setTitle(e.target.value)}/>
        </div>
        <div style={{marginTop: "20px", marginBottom: "35px"}}>
          <button>Show Lyrics</button>
        </div>
        <div style={{whiteSpace: "pre-wrap", marginTop: "25px", marginBottom: "30px"}}>
          <p>{lyrics}</p>
        </div>
      </form>
    </div>
  );
}

export default App;
