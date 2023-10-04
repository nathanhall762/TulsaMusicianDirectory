class TrackFeatures {
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

  async getAllTrackFeatures(artistIds) {
    try {
      const trackFeatures = await Promise.all(
        artistIds.map(this.getFeaturesFromArtist.bind(this))
      );
      return trackFeatures;
    } catch (err) {
      console.error(err);
    }
  }

  async getFeaturesFromArtist(artistId) {
    try {
      const albumMap = async (albumId) => {
        const trackIds = await this.getTracksFromAlbum(albumId);
        const trackFeatures = await this.getTracksFeatures(trackIds);

        const correctedFeatures = trackFeatures.audio_features.map((track) => {
          return {
            id: track.id,
            acousticness: track.acousticness,
            danceability: track.danceability,
            energy: track.energy,
            instrumentalness: track.instrumentalness,
            liveness: track.liveness,
            loudness: track.loudness,
            valence: track.valence,
          };
        });

        return {
          albumId: albumId,
          trackFeatures: correctedFeatures,
        };
      };

      const albums = await this.getAlbumsFromArtist(artistId);

      const albumTracksFeatures = await Promise.all(albums.map(albumMap));
      // return trackFeatures;
      return {
        artistId: artistId,
        albumTracksFeatures: albumTracksFeatures,
      };
    } catch (err) {
      console.error(err);
    }
  }

  async getAlbumsFromArtist(artistId) {
    const url = `https://api.spotify.com/v1/artists/${artistId}/albums`;

    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          return data.items.map((album) => album.id);
        })
        .then((albumIds) => resolve(albumIds))
        .catch((err) => reject(err));
    });
  }

  async getTracksFromAlbum(trackId) {
    const url = `https://api.spotify.com/v1/albums/${trackId}/tracks`;

    return new Promise((resolve, reject) => {
      fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          return data;
        })
        .then((data) => data.items.map((track) => track.id))
        .then((trackIds) => resolve(trackIds))
        .catch((err) => reject(err));
    });
  }

  async getTracksFeatures(tracks) {
    // tracks must be an array
    const url = 'https://api.spotify.com/v1/audio-features';

    const urlParams = new URLSearchParams({
      ids: tracks.join(','),
    });

    return new Promise((resolve, reject) => {
      fetch(url + '?' + urlParams, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  }
}

export default TrackFeatures;
