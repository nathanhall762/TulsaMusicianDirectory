import { SetStateAction } from 'react';
import styled from 'styled-components';

interface PlaylistSelectorProps {
  playlistData: any[];
  spotifyPayload: { idType: string; objectID: string }[];
  setSpotifyPayload: React.Dispatch<
    SetStateAction<{ idType: string; objectID: string }[]>
  >;
}

const PlaylistSelector: React.FC<PlaylistSelectorProps> = ({
  playlistData,
  spotifyPayload,
  setSpotifyPayload,
}) => {
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

  return (
    <>
      <div>
        {/* for each object in playlistData display playlist name and image url */}
        <PlaylistSelect>
          {playlistData.map((playlist: any) => (
            <PlaylistRow
              key={playlist.id}
              onClick={() => handleCheckboxChange(playlist.id)}
              checked={spotifyPayload.some(
                (item) =>
                  item.objectID === playlist.id && item.idType === 'playlist'
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
    </>
  );
};

export default PlaylistSelector;

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
