import fs from 'fs';

class makeSongFeatureArray {
  constructor(credentials) {
    this.clientId = credentials.clientId;
    this.clientSecret = credentials.clientSecret;
    this.token = '';
  }

  async createToken() {
    // gets spotify api access token
    const url = 'https://accounts.spotify.com/api/token';

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    });
    const data = await response.json();
    this.token = data.access_token;
  }

  // function: topSongsFromArtist
  // Description: This function takes in an artist ID and returns an array of the top songs' track IDs from each artist
  // Parameters: artistId - an array of artist IDs
  // Returns: an array of track IDs
  async topSongsFromArtist(artistId) {
    try {
      // Ensure the token is available
      if (!this.token) {
        await this.createToken();
      }

      // Set up the headers for the request
      const headers = {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      };

      // Make a GET request to Spotify's API to fetch the top tracks of the artist
      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
        {
          headers: headers,
        }
      );

      const data = await response.json();

      // Extract the track IDs from the response
      const topTracks = data.tracks.map((track) => track.id);
      return topTracks;
    } catch (error) {
      console.error('Error fetching top songs:', error);
      return [];
    }
  }

  // function: getSongsFromPlaylist
  // Description: This function takes in a playlist ID and returns an array of track IDs
  // Parameters: playlistId - a playlist ID
  // Returns: an array of track IDs
  async getSongsFromPlaylist(playlistId) {
    try {
      // Ensure the token is available
      if (!this.token) {
        await this.createToken();
      }

      // Set up the headers for the request
      const headers = {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      };

      // Make a GET request to Spotify's API to fetch the tracks of the playlist
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          headers: headers,
        }
      );

      const data = await response.json();

      // Extract the track IDs from the response
      const tracks = data.items.map((item) => item.track.id);
      return tracks;
    } catch (error) {
      console.error('Error fetching songs from playlist:', error);
      return [];
    }
  }

  // function: getTracksAudioFeatures
  // Description: This function takes in an array of track IDs and returns an array of track objects with audio features
  // Parameters: trackIds - an array of track IDs
  // Returns: an array of track objects with audio features
  async getTracksAudioFeatures(trackIds) {
    try {
      // Ensure the token is available
      if (!this.token) {
        await this.createToken();
      }

      // Set up the headers for the request
      const headers = {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      };

      // Make a GET request to Spotify's API to fetch the audio features of the tracks
      const response = await fetch(
        `https://api.spotify.com/v1/audio-features/?ids=${trackIds.join(',')}`,
        {
          headers: headers,
        }
      );

      const data = await response.json();

      // Extract the audio features from the response
      const features = data.audio_features;
      return features;
    } catch (error) {
      console.error('Error fetching audio features:', error);
      return [];
    }
  }

  // function: makeSongFeatureArray
  // Description: This function takes in JSON files and returns an array of track objects with audio features
  // Parameters: trackIds - an array of track IDs
  // Returns: an array of track objects with audio features

  async makeSongFeatureArray() {
    try {
      // Ensure the token is available
      if (!this.token) {
        await this.createToken();
      }

      // Import the JSON files
      const NathanTopArtists = await import('./NathanTopArtists.json', {
        assert: { type: 'json' },
      });

      // Extract artist IDs from NathanTopArtists
      const artistIDs = NathanTopArtists.default.items.map(
        (artist) => artist.id
      );

      // Fetch top songs from each artist and flatten the array of arrays
      let trackIds = [];
      for (const artistId of artistIDs) {
        const topTracks = await this.topSongsFromArtist(artistId);
        trackIds = trackIds.concat(topTracks);
      }

      //   // Append track IDs from NathanSavedTracks
      const NathanSavedTracks = await import('./NathanSavedTracks.json', {
        assert: { type: 'json' },
      });
      const savedTrackIds = NathanSavedTracks.default.map(
        (item) => item.track.id
      );
      trackIds = trackIds.concat(savedTrackIds);

      //   // Remove duplicates
      trackIds = [...new Set(trackIds)];

      // Fetch audio features in batches of 50 (Spotify API limit)
      const allTrackFeatures = [];
      for (let i = 0; i < trackIds.length; i += 50) {
        const batch = trackIds.slice(i, i + 50);
        const features = await this.getTracksAudioFeatures(batch);
        allTrackFeatures.push(...features);
      }

      const parsedTrackFeatures = allTrackFeatures.map((track) => {
        const {
          danceability,
          energy,
          loudness,
          speechiness,
          acousticness,
          instrumentalness,
          liveness,
          valence,
        } = track;
        return {
          danceability,
          energy,
          loudness,
          speechiness,
          acousticness,
          instrumentalness,
          liveness,
          valence,
        };
      });

      return parsedTrackFeatures;
    } catch (error) {
      console.error('Error in makeSongFeatureArray:', error);
      return [];
    }
  }
}

import fetch from 'node-fetch';
global.fetch = fetch;

const credentials = {
  clientId: '770a806687ce48e5ab4c7e134c808978',
  clientSecret: 'fdb111df508f41ff82b50e5fcb080ef6',
};

const trackFeatures = new makeSongFeatureArray(credentials);

// Example of calling a method
trackFeatures
  .makeSongFeatureArray()
  .then((data) => {
    // export to JSON file
    const json = JSON.stringify(data);
    fs.writeFile('songFeatures.json', json, (err) => {
      if (err) {
        console.log('Error writing file', err);
      } else {
        console.log('Successfully wrote file');
      }
    });

    console.log(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
