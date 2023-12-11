import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import recommendationRequest from './DiscoverTool/recommendationRequest';
import CardContainer from './MusicianCard/CardContainer';

const DiscoverPage = () => {
  const [selectedMode, setSelectedMode] = useState('Spotify');
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
  const SCOPES = ['user-top-read', 'playlist-read-private'];
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

  const handleCheckboxChange = (playlistId: string) => {
    setSpotifyPayload((prevPayload) => {
      if (
        prevPayload.some(
          (item) => item.objectID === playlistId && item.idType === 'playlist'
        )
      ) {
        // If already selected, remove from payload
        return prevPayload.filter(
          (item) => item.objectID !== playlistId || item.idType !== 'playlist'
        );
      } else {
        // If not selected, add to payload
        return [...prevPayload, { idType: 'playlist', objectID: playlistId }];
      }
    });
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
                      // const initialPlaylistPayload = data.items.map(
                      //   (playlist: { id: string }) => ({
                      //     idType: 'playlist',
                      //     objectID: playlist.id,
                      //   })
                      // );
                      // setSpotifyPayload((currentPayload) => [
                      //   ...currentPayload,
                      //   ...initialPlaylistPayload,
                      // ]);
                    })
                    .catch((error) =>
                      console.error('Error fetching user playlists', error)
                    );
                })
                .catch((error) =>
                  console.error('Error fetching user top artists', error)
                );
            })
            .catch((error) =>
              console.error('Error fetching user profile', error)
            );
        }
      });
    }
  }, []);

  const handleSubmit = () => {
    console.log('Spotify Payload:', spotifyPayload);
    // set loading message
    // set recommendation returned to true
    setRecommendationReturned(true);
    // set loading to true
    setRecommendationLoading(true);
    setLoadingMessage('Loading your recommendations...');
    // call the recommendationRequest function
    recommendationRequest(spotifyPayload)
      .then((response) => {
        // set the musicianIds to the response
        console.log(`Response: ${response}`);
        setMusicianIds(response);
        // timer to wait for the recommendationRequest function to finish
        setTimeout(() => {
          setRecommendationLoading(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error fetching recommendations', error);
        setLoadingMessage('Error fetching recommendations. Please try again.');
        setTimeout(() => {
          setRecommendationLoading(false);
        }, 5000);
      });
  };

  useEffect(() => {
    console.log(spotifyPayload); // This will log the updated state
  }, [spotifyPayload]); // Dependency array ensures this runs when artistIds changes

  return (
    <>
      <Title>Discover</Title>
      <DiscoverPageLanding>
        <PageNavigation>
          <ModeSelectButton
            className={selectedMode === 'Spotify' ? 'selected' : ''}
            onClick={() => setSelectedMode('Spotify')}
          >
            <StyledLink>
              <p>Spotify</p>
            </StyledLink>
          </ModeSelectButton>
          <ModeSelectButton
            className={selectedMode === 'Manual' ? 'selected' : ''}
            onClick={() => setSelectedMode('Manual')}
          >
            <StyledLink>
              <p>Manual</p>
            </StyledLink>
          </ModeSelectButton>
        </PageNavigation>
      </DiscoverPageLanding>
      {selectedMode === 'Spotify' && !recommendationReturned && (
        <SpotifyLogin>
          <ButtonBox>
            <h2>
              Get recommended Tulsa artists using your Spotify listening
              history.
            </h2>
            {authCode ? (
              <div>
                <ProfileImage src={profileImageUrl} />
                <LoadingMessage>{loadingMessage}</LoadingMessage>
                {/* for each object in playlistData display playlist name and image url */}
                <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
                <PlaylistSelect>
                  {playlistData.map((playlist: any) => (
                    <PlaylistRow
                      key={playlist.id}
                      onClick={() => handleCheckboxChange(playlist.id)}
                      checked={spotifyPayload.some(
                        (item) =>
                          item.objectID === playlist.id &&
                          item.idType === 'playlist'
                      )}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-evenly',
                          width: '100%',
                        }}
                      >
                        <Checkbox
                          type='checkbox'
                          checked={spotifyPayload.some(
                            (item) =>
                              item.objectID === playlist.id &&
                              item.idType === 'playlist'
                          )}
                          onClick={(e) => e.stopPropagation()}
                          readOnly
                        />
                        {playlist.images.length > 0 && (
                          <PlaylistImage
                            src={playlist.images[0].url}
                            alt={playlist.name}
                          />
                        )}
                        <PlaylistName>{playlist.name}</PlaylistName>
                      </div>
                    </PlaylistRow>
                  ))}
                </PlaylistSelect>
              </div>
            ) : (
              <SpotifyButton onClick={handleSpotifyLogin}>
                Login With Spotify
              </SpotifyButton>
            )}
          </ButtonBox>
        </SpotifyLogin>
      )}

      {selectedMode === 'Spotify' &&
        recommendationReturned &&
        recommendationLoading && (
          <ButtonBox>
            <LoadingMessage>{loadingMessage}</LoadingMessage>
            <Loader />
          </ButtonBox>
        )}

      {selectedMode === 'Spotify' &&
        recommendationReturned &&
        !recommendationLoading && <CardContainer musicianIds={musicianIds} />}

      {selectedMode === 'Manual' && (
        <ManualInput>
          <ButtonBox>
            <h2>Coming Soon!</h2>
          </ButtonBox>
        </ManualInput>
      )}
    </>
  );
};

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: block;
  position: relative;
  height: 3rem;
  width: 3rem;
  cursor: pointer;
  font-size: 22px;
  background-color: var(--color-background-alt);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  @media (max-width: 1000px) {
    margin: 0 1rem;
  }
`;

const LoadingMessage = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1rem;
`;

const PlaylistSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PlaylistRow = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 10px; // Add margin for spacing between rows
  background-color: var(--color-background-main);
  width: 100%;
  border-radius: 25px;
  transition: all var(--animation-speed-fast) ease-in-out;
  opacity: ${(props) => (props.checked ? '1' : '0.5')};
  background-color: ${(props) =>
    props.checked ? 'var(--color-primary)' : 'var(--color-background-main)'};
  &:hover {
    background-color: var(--color-accent) !important;
    cursor: pointer;
  }
`;

const PlaylistImage = styled.img`
  width: 200px; // Example size, adjust as needed
  height: 200px;
`;

const PlaylistName = styled.p`
  flex: 1; // Adjust as needed
  max-width: 10rem;
  @media (max-width: 1000px) {
    margin: 0 1rem;
  }
  // Add additional styles if needed
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  button {
    background-color: var(--color-accent);
    color: var(--color-text-inverse);
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    transition: all var(--animation-speed-fast) ease;
    &:hover {
      cursor: pointer;
      background-color: var(--color-background-main);
    }
  }
`;

const StyledLink = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-accent);
`;

const DiscoverPageLanding = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  height: 80%;
`;

export const PageNavigation = styled.ul`
  display: flex;
  align-items: center;
  background-color: var(--color-accent);
  height: 2.5rem;
  border-radius: 25px;
  list-style: none;
  padding: 0;
  font-size: 15px;
  font-weight: bold;
  margin: 0 10px;
`;

export const ModeSelectButton = styled.div`
  border-radius: 25px;
  padding: 0 1em;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  width: 4em;
  &:hover {
    /* transform: scale(1.1); */
    cursor: pointer;
    background-color: var(--color-primary) !important;
    color: var(--color-secondary) !important;
  }
  &.selected {
    transform: scale(1.1);
    cursor: pointer;
    background-color: var(--color-primary);
    color: var(--color-secondary);
  }
`;

const SpotifyLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-alt);
  border-radius: 25px;
  margin: 5rem;
  text-align: center;
  padding: 2rem;
  @media (max-width: 1000px) {
    margin: 3rem 1rem;
  }
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

const ManualInput = styled(SpotifyLogin)``;

export default DiscoverPage;
