import { Link } from 'react-router-dom';

export default function ErrorElement() {
  return (
    <>
      <h1>404 NOT FOUND</h1>
      <p>
        <b>You have defeated the Tulsa Musician Directory</b>
      </p>
      <Link to='/'>
        <button>Go Back</button>
      </Link>
    </>
  );
}
