import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmbedSelector from '../components/EmbedSelector';

// Tests
describe('Renders embed selector correctly', async () => {
  it('Should render the bandcamp embed correctly', async () => {
    const music = {
      bandcamp:
        '<iframe style="border: 0; width: 100%; height: 120px;" src="https://bandcamp.com/EmbeddedPlayer/album=3828269243/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" seamless><a href="https://helenkelterskelter.bandcamp.com/album/chroma-crawl">CHROMA CRAWL by Helen Kelter Skelter</a></iframe>',
      spotify: '',
      soundcloud: '',
      youtube: '',
    };

    render(<EmbedSelector Music={music} />);

    expect(screen.findByText('Helen Kelter Skelter')).not.toBeNull();
    expect(screen.findByText('Bandcamp')).not.toBeNull();
  });
});
