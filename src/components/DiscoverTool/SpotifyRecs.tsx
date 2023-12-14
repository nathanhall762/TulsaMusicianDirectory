import recommendationRequest from '../DiscoverTool/recommendationRequest';
import { Link } from 'react-router-dom';
import CardContainer from '../MusicianCard/CardContainer';
import PlaylistSelector from './PlaylistSelector';
import { useState, useEffect } from 'react';
import useBearStore from '../../bearStore';
import styled, { keyframes } from 'styled-components';

const SpotifyRecs: React.FC = () => {
  const musicians = useBearStore((state) => state.musicians);
  const [authCode, setAuthCode] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('Loading...');
  const [playlistData, setPlaylistData] = useState<any[]>([]);
  const [spotifyPayload, setSpotifyPayload] = useState<
    { idType: string; objectID: string }[]
  >([]);
  const [recommendationReturned, setRecommendationReturned] = useState(false);
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [musicianIds, setMusicianIds] = useState<string[]>([]); // Optional array of musician IDs
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
  const CLIENT_ID = '38f1ee602dbe4bffbb05672320a597f1';
  // const SCOPES = ['user-top-read', 'playlist-read-private']; gonna add back private playlists sometime in the future maybe
  const SCOPES = ['user-top-read'];
  const REACT_APP_CLIENT_SECRET = 'f0341666a7764b2dbe5dee8f8259812f';

  if (
    import.meta.env.MODE === 'production' &&
    import.meta.env.VITE_IS_LIVE === 'true'
  ) {
    var REDIRECT_URI = 'https://musicintulsa.com/callback';
  } else if (import.meta.env.MODE === 'production') {
    var REDIRECT_URI = 'http://localhost:4173/callback';
  } else {
    var REDIRECT_URI = 'http://localhost:5173/callback';
  }

  const handleSpotifyLogin = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${SCOPES.join('%20')}&response_type=code&show_dialog=true`;
    window.location.href = authUrl;
    // alert('Coming Soon!');
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      setAuthCode(code);

      // Function to fetch token
      const fetchToken = async () => {
        try {
          const response = await fetch(
            'https://accounts.spotify.com/api/token',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // Caution: Exposing client secret on the client side is not recommended
                Authorization: `Basic ${btoa(
                  `${CLIENT_ID}:${REACT_APP_CLIENT_SECRET}`
                )}`,
              },
              body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
            }
          );
          const data = await response.json();
          console.log(`Token: ${data.access_token}`);
          return data.access_token;
        } catch (error) {
          console.error('Error fetching token', error);
        }
      };

      // Fetch token and then user profile
      fetchToken().then((token) => {
        if (token) {
          setLoadingMessage('Loading your Spotify profile...');
          fetch('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data); // data contains the user's profile
              if (data.images[0]) {
                const profileImageUrl = data.images[0].url;
                setProfileImageUrl(profileImageUrl);
              }
              // Handle user profile data
            })
            .then(() => {
              setLoadingMessage(
                'Finding your most listened to artists on Spotify...'
              );
              // Get User's Top Items
              fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  const newPayload = data.items.map(
                    (artist: { id: string }) => ({
                      idType: 'artist',
                      objectID: artist.id,
                    })
                  );
                  setSpotifyPayload(newPayload);
                })
                .then(() => {
                  setLoadingMessage('Loading your playlist data...');
                  // Get User's Playlists
                  fetch('https://api.spotify.com/v1/me/playlists?limit=5', {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      setPlaylistData(data.items); // Set the entire array of playlists
                      setLoadingMessage(
                        'Select from your Spotify playlists to include in your recommendations.'
                      );
                    })
                    .catch((error) =>
                      console.error('Error fetching user playlists', error)
                    );
                })
                .catch((error) =>
                  console.error('Error fetching user top artists', error)
                );
            })
            .catch((error) => {
              setLoadingMessage('Error Fetching User Profile');
              console.error('Error fetching user profile', error);
            });
        }
      });
    }
  }, []);

  const handleSubmit = () => {
    console.log('hello hello');
    console.log('Spotify Payload:', spotifyPayload);
    // set loading message
    // set recommendation returned to true
    setRecommendationReturned(true);
    // set loading to true
    setRecommendationLoading(true);
    setLoadingMessage('Loading your recommendations...');
    // call the recommendationRequest function

    // structure for cloud function
    const data = { spotify: spotifyPayload, genres: [] };

    recommendationRequest(data)
      .then((response) => {
        // this is an array of [spotify IDs, match value]
        console.log(`Response Recs: `, response);

        // match spotify IDs to firestore IDs
        // from musicians global state
        // this code is attrocious
        // pls help
        const musicRecs: [string] = response.map((artist: [string, string]) => {
          const correctMusician = musicians.find((musician) =>
            musician.music.spotify.includes(artist[0])
          );
          return correctMusician?.id;
        });

        // set the musicianIds to the response
        setMusicianIds(musicRecs);
        setRecommendationLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recommendations', error);
        setLoadingMessage('Error fetching recommendations. Please try again.');
      });
  };

  return (
    <>
      {!recommendationReturned && (
        <>
          <SpotifyInstructionMessage>
            Get recommended Tulsa artists using your Spotify listening history.
          </SpotifyInstructionMessage>
          {authCode ? (
            <div>
              <ProfileImage src={profileImageUrl} />
              <LoadingMessage>{loadingMessage}</LoadingMessage>
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
              <h2>NOTICE</h2>
              <SpotifyInstructionMessage>
                Currently this feature depends on an application extension
                request from Spotify. This means until we pass a review you must
                first get in contact with a MusicinTulsa admin to gain access to
                this feature. You can Reach us <Link to='/about'>Here</Link>
              </SpotifyInstructionMessage>
              <PlaylistSelector
                playlistData={playlistData}
                spotifyPayload={spotifyPayload}
                setSpotifyPayload={setSpotifyPayload}
              />
            </div>
          ) : (
            <>
              <SpotifyButton onClick={handleSpotifyLogin}>
                Login With Spotify
              </SpotifyButton>
              <h2>NOTICE</h2>
              <SpotifyInstructionMessage>
                Currently this feature depends on an application extension
                request from Spotify. This means until we pass a review you must
                first get in contact with a MusicinTulsa admin to gain access to
                this feature. You can reach us <Link to='/about'>Here</Link>
              </SpotifyInstructionMessage>
            </>
          )}
        </>
      )}

      {recommendationReturned && recommendationLoading && (
        <>
          <LoadingMessage>{loadingMessage}</LoadingMessage>
          <Loader />
          <h2>NOTICE</h2>
          <SpotifyInstructionMessage>
            Currently this feature depends on an application extension request
            from Spotify. This means until we pass a review you must first get
            in contact with a MusicinTulsa admin to gain access to this feature.
            You can Reach us <Link to='/about'>Here</Link>
          </SpotifyInstructionMessage>
        </>
      )}

      {recommendationReturned && !recommendationLoading && (
        <CardContainer musicianIds={musicianIds} />
      )}
    </>
  );
};

export default SpotifyRecs;

const SpotifyInstructionMessage = styled.h2`
  color: var(--color-text-primary);
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1rem;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const SubmitButton = styled.button`
  // Add your styles here
  padding: 10px;
  margin: 15px;
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #1ed760;
  }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = styled.div`
  border: 5px solid var(--color-background-main); /* Light grey */
  border-top: 5px solid var(--color-accent); /* Blue */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
  margin: 20px auto;
`;

const SpotifyButton = styled.button`
  background-color: var(--spotify-color) !important;
  color: var(--color-text-inverse);
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  transition: all var(--animation-speed-fast) ease;
  &:hover {
    cursor: pointer;
    background-color: var(--color-background-main) !important;
  }
`;
