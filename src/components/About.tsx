import styled from 'styled-components';
import LinkItem from './MusicianCard/LinkItem';

const About = () => {
  return (
    <Wrapper>
      <AboveTheFold>
        <CopyContainer>
          <Title>
            About MusicInTulsa<br></br>.com
          </Title>
          <SmallTitle>The Tulsa Musician Directory:</SmallTitle>
          <Paragraph>
            <span>
              MusicInTulsa.com is the most complete directory of local musicians
              and bands in Tulsa, Oklahoma.
            </span>{' '}
            Our mission is to provide a curated catalog of local Tulsa musicians
            and bands, making it easier than ever for Tulsans to discover and
            support local music. MusicInTulsa.com is a free resource for
            musicians and fans alike. This catalog of local Tulsa music is built
            by the community and curated by our team of admins.
          </Paragraph>
          <SmallTitle>The Community (That's You):</SmallTitle>
          <ul>
            <li>
              <span>Submit Musician Information:</span> Musicians, fans,
              supportive moms- anyone can fill out a few simple forms to add to
              the directory. Admins approve submissions to ensure directory
              quality.
            </li>
            <li>
              <span>Spread the Word:</span> Everyone can contribute by spreading
              the word about the Tulsa Musician Directory. The more people who
              know about our platform, the more vibrant our community becomes.
            </li>
            <li>
              <span>Feedback and Suggestions:</span> We value your input. Share
              your feedback, ideas, and suggestions with us. Your insights help
              us continuously improve and refine our platform.
            </li>
          </ul>
          <SmallTitle>Not From Tulsa?</SmallTitle>
          <Paragraph>
            Tulsa is the perfect city to build a community tool like
            MusicInTulsa.com. That said, every city should have a directory of
            local musicians and bands.{' '}
            <span>
              If you are looking to start a directory for your city, we would
              love to help!
            </span>{' '}
            We are happy to share our codebase and help you get started.
          </Paragraph>
          <a href='https://github.com/nathanhall762/TulsaMusicianDirectory'>
            Visit our Github!
          </a>
        </CopyContainer>
        <div>
          <SmallTitle>The Contributors (Nerds):</SmallTitle>
          <ContributorPill>
            <ContributorInfo>
              <h3>Nathan Hall</h3>
              <p>Creator, Developer, and Admin</p>
              <LinkContainerBody>
                <LinkItem
                  url='https://github.com/nathanhall762'
                  iconClassName='fa fa-github'
                  styleClassName='github'
                />
                <LinkItem
                  url='https://www.linkedin.com/in/nathanrhall/'
                  iconClassName='fa fa-linkedin'
                  styleClassName='linkedin'
                />
                <LinkItem
                  url='https://www.linkedin.com/in/nathanrhall/'
                  iconClassName='fa fa-instagram'
                  styleClassName='instagram'
                />
              </LinkContainerBody>
            </ContributorInfo>
            <a href='https://www.linkedin.com/in/nathanrhall/'>
              <img
                src='https://avatars.githubusercontent.com/u/37547658?v=4'
                alt='Nathan Hall - Tulsa Musician Directory musicintulsa.com'
              />
            </a>
          </ContributorPill>
          <ContributorPill>
            <a href='https://www.linkedin.com/in/ethanwakeford/'>
              <img
                src='https://avatars.githubusercontent.com/u/90289314?v=4'
                alt='Ethan Wakeford - Tulsa Musician Directory musicintulsa.com'
              />
            </a>
            <ContributorInfo>
              <h3>Ethan Wakeford</h3>
              <p>Creator, Developer, and Admin</p>
              <LinkContainerBody>
                <LinkItem
                  url='https://github.com/EthanWakeford'
                  iconClassName='fa fa-github'
                  styleClassName='github'
                />
                <LinkItem
                  url='https://www.linkedin.com/in/ethanwakeford/'
                  iconClassName='fa fa-linkedin'
                  styleClassName='linkedin'
                />
              </LinkContainerBody>
            </ContributorInfo>
          </ContributorPill>
          <ContributorPill>
            <ContributorInfo>
              <h3>Brayden Vernon</h3>
              <p>Developer</p>
              <LinkContainerBody>
                <LinkItem
                  url='https://github.com/Vernon-444'
                  iconClassName='fa fa-github'
                  styleClassName='github'
                />
                <LinkItem
                  url='https://www.linkedin.com/in/brayden-vernon/'
                  iconClassName='fa fa-linkedin'
                  styleClassName='linkedin'
                />
              </LinkContainerBody>
            </ContributorInfo>
            <a href='https://www.linkedin.com/in/brayden-vernon/'>
              <img
                src='https://media.licdn.com/dms/image/D5635AQH__IwLZU7Q8A/profile-framedphoto-shrink_200_200/0/1700319083783?e=1703019600&v=beta&t=_PZul15TGSevF3EdZ7Hj3P-13db38sXHFPFMR67YJn4'
                alt='Brayden Vernon - Tulsa Musician Directory musicintulsa.com'
              />
            </a>
          </ContributorPill>
          <ContributorPill>
            <a href='https://www.linkedin.com/in/brayden-vernon/'>
              <img
                src='https://avatars.githubusercontent.com/u/100643249?v=4'
                alt='Aaron Manuel - Tulsa Musician Directory musicintulsa.com'
              />
            </a>
            <ContributorInfo>
              <h3>Aaron Manuel</h3>
              <p>Developer</p>
              <LinkContainerBody>
                <LinkItem
                  url='https://github.com/AaronManuel15'
                  iconClassName='fa fa-github'
                  styleClassName='github'
                />
                <LinkItem
                  url='https://www.linkedin.com/in/aaron-manuel/'
                  iconClassName='fa fa-linkedin'
                  styleClassName='linkedin'
                />
              </LinkContainerBody>
            </ContributorInfo>
          </ContributorPill>
        </div>
      </AboveTheFold>
    </Wrapper>
  );
};

const CopyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 3rem 0 0;
  box-sizing: border-box;
  @media (max-width: 1000px) {
    padding: 0;
  }
  span {
    font-weight: bold;
    color: var(--color-accent);
  }
  a {
    margin: 0 0 1rem 0;
  }
  ul {
    margin: 0 0 1rem 0;
    padding: 0 0 0 1rem;
  }
`;

const AboveTheFold = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: 1300px) {
    flex-direction: column;
  }
`;

const LinkContainerBody = styled.div`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  width: 100%;
  padding: 0 10px;
`;

const ContributorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 10rem;
  padding: 1rem;
  flex: 1;
  @media (max-width: 1000px) {
    padding: 0;
    p {
      margin: 0 1rem !important;
    }
    h3 {
      margin: 0 1rem !important;
    }
  }
`;

const ContributorPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 30vw;
  max-width: 430px;
  margin: auto;
  border-radius: 10rem;
  background-color: var(--color-secondary);
  margin-bottom: 1rem;

  img {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
  }
  h3 {
    color: var(--color-accent);
    margin: 0 1rem !important;
  }
  a {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 50%;
    display: flex;
  }
  @media (max-width: 1000px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 3rem auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  @media (max-width: 1000px) {
    margin: 1rem;
    padding: 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: var(--color-text-primary);
  word-wrap: break-word;
  margin: 0 0 1rem 0;
`;

const SmallTitle = styled.h3`
  text-align: center;
`;

const Paragraph = styled.p`
  text-align: justify;
  margin: 0 0 1rem 0;
  span {
    font-weight: bold;
    color: var(--color-accent);
  }
`;

export default About;
