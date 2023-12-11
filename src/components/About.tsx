import styled from 'styled-components';

const About = () => {
  return (
    <Wrapper>
      <Title>About Us</Title>
      <Paragraph>
        The Tulsa Musician Directory is committed to highlighting the wealth of
        musical talent in Tulsa. Our mission is to link Tulsa's artists with
        fresh audiences, and we depend on community contributions to keep our
        directory up to date with a wide array of local artists. The directory
        celebrates and supports Tulsa's music community, emphasizing the
        importance of collaboration and user involvement to create a
        comprehensive resource for music enthusiasts and musicians alike.
      </Paragraph>
      <SmallTitle>How you can participate:</SmallTitle>
      <ul>
        <li>
          <strong>Submit Musician Information:</strong> Musicians, fans,
          supportive moms- anyone can fill out a few simple forms to add to the
          directory. Admins approve submissions to ensure directory quality.
        </li>
        <li>
          <strong>Spread the Word:</strong> Everyone can contribute by spreading
          the word about the Tulsa Musician Directory. The more people who know
          about our platform, the more vibrant our community becomes.
        </li>
        <li>
          <strong>Feedback and Suggestions:</strong> We value your input. Share
          your feedback, ideas, and suggestions with us. Your insights help us
          continuously improve and refine our platform.
        </li>
      </ul>
      <Paragraph>
        Our goal for the Tulsa Musician Directory is to create a scalable tool
        that can be replicated in any city or region with a small team and basic
        coding skills. This scalability will connect musicians and enthusiasts
        across the nation and beyond, fostering thriving local music scenes and
        celebrating unique city and regional cultures.
      </Paragraph>
      <a href='https://github.com/nathanhall762/TulsaMusicianDirectory'>
        Visit our Github!
      </a>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1400px;
  margin: 2em auto;
  padding: 0 1.5em;
`;

const Title = styled.h2`
  text-align: center;
`;

const SmallTitle = styled.h3`
  text-align: center;
`;

const Paragraph = styled.p`
  text-align: justify;
  margin: 1em 0;
`;

export default About;
