import { useNavigate } from 'react-router-dom';

export default function ErrorElement() {
  const navigate = useNavigate();

  return (
    <>
      <h1>404 NOT FOUND</h1>
      <p>
        <b>You have defeated the Tulsa Musician Directory</b>
      </p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </>
  );
}
