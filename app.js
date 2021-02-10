const searchSong = async() => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    const Response = await fetch(url)
    const data = await  Response.json()
    displaySongs(data.data)
}

const displaySongs = song => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
    song.forEach(songs => {
        const songsDiv = document.createElement('div');
        songsDiv.className = "single-result row align-items-center my-3 p-3";
        songsDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${songs.title}</h3>
                <p class="author lead">Album by <span>${songs.artist.name}</span></p>
                <p><a target="_blank" class = " download-link " href="${songs.link}">Download This Song</a></p>
             </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick = "getLyric('${songs.artist.name}', '${songs.title}')"  class="btn btn-success">Get Lyrics</button>
                
         </div>
         `
        songContainer.appendChild(songsDiv)
    });
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    const res = await fetch (url)
    const data = await res.json()
    displayLyric(data)

}


const displayLyric = data => {
    const lyricsDiv = document.getElementById('display-lyrics')
    
  
    if (data.lyrics == "") {
        lyricsDiv.innerText = ('Sorry, We Cannot Find This Lyrics Right Now. Try Again Latter')
    }
    else{
        lyricsDiv.innerText = data.lyrics;
    }
    
}


