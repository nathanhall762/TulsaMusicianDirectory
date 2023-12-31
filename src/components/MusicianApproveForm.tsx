import React, { useEffect, useState } from 'react';
import { app } from '../firebase';
import { approveMusician } from '../cloudFunctions';
import { v4 } from 'uuid';
import { validateURLs } from '../utils';
import { useParams } from 'react-router-dom';
import styles from '../css/MusicianAddForm.module.css';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { getOnePending } from '../cloudFunctions';
import useBearStore from '../bearStore';

type MusicianFormData = {
  name: string;
  music: {
    bandcamp: string;
    spotify: string;
    youtube: string;
    soundcloud: string;
    twitch: string;
  };
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    threads: string;
  };
  genre: string[];
  profileImage?: string;
};

// Component
const MusicianApproveForm = () => {
  const user = useBearStore((state) => state.user);
  const [imageUpload, setImageUpload] = useState<File>();
  const [submitActive, setSubmitActive] = useState<boolean>(false);
  const { musicianId } = useParams<{ musicianId: string }>();
  const musicianName = musicianId?.replaceAll('_', ' ');
  const [formData, setFormData] = useState<MusicianFormData>({
    name: '',
    music: {
      bandcamp: '',
      spotify: '',
      youtube: '',
      soundcloud: '',
      twitch: '',
    },
    social: {
      facebook: '',
      instagram: '',
      tiktok: '',
      threads: '',
    },
    genre: [''],
  });
  const [isFetched, setIsFetched] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  console.log(musicianName); // output: good

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      if (!musicianName) {
        return;
      }
      e.preventDefault();

      if (!user?.userCredential) {
        alert('You must be logged in first');
        return;
      }

      // Ensure the logged-in user is an admin
      if (!user.isAdmin) {
        alert('Only admin can approve musicians.');
        return;
      }

      // Add image to firebase storage
      const url = await uploadImage();

      const response = await approveMusician({
        musicianName: musicianName.toLowerCase(),
        formData,
        profileImage: url,
      });

      if (response.data.success) {
        alert('Musician profile approved and uploaded.');
      } else {
        alert('Error approving musician profile.');
      }
      // Go back to homepage using React router
      window.location.href = '/';
    } catch (err) {
      console.log(err);
      alert('Error approving musician profile.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // if [name] is music or social, set the value to the appropriate object
    if (name.includes('music')) {
      setFormData((prevData) => ({
        ...prevData,
        music: { ...prevData.music, [name.split('.')[1]]: value },
      }));
    } else if (name.includes('social')) {
      setFormData((prevData) => ({
        ...prevData,
        social: { ...prevData.social, [name.split('.')[1]]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const uploadImage = async () => {
    const { ref, uploadBytes, getDownloadURL, getStorage } = await import(
      'firebase/storage'
    );

    const storage = getStorage(app);

    if (imageUpload) {
      // New image is uploaded
      const storageRef = ref(storage, `images/${formData.name + v4()}`);
      await uploadBytes(storageRef, imageUpload);
      const url = await getDownloadURL(storageRef);

      // dont know how to do this wthout hardcoding it idk
      // get the new url after the automatic image resizing
      const newUrl = url
        .replace('images%2F', 'images%2Fwebp%2F')
        .replace('?alt=media', '_300x300?alt=media')
        .replace(/&token=(.*)/, '');

      return newUrl;
    } else {
      // No new image uploaded, use existing image URL from formData
      if (formData.profileImage) {
        return formData.profileImage;
      } else {
        alert('No existing image found and no new image uploaded.');
        throw new Error('No image available');
      }
    }
  };

  const effectCallback = async () => {
    if (!musicianName) {
      return;
    }
    if (!isFetched) {
      const response = await getOnePending({
        name: musicianName?.toLowerCase(),
      });

      const musicianDoc = response.data.docData;

      if (musicianDoc) {
        setProfileImageUrl(musicianDoc.profileImage);
        // Set the fetched data to formData
        setFormData({
          name: musicianDoc.name,
          music: {
            bandcamp: musicianDoc.music.bandcamp,
            spotify: musicianDoc.music.spotify,
            youtube: musicianDoc.music.youtube,
            soundcloud: musicianDoc.music.soundcloud,
            twitch: musicianDoc.music.twitch,
          },
          social: {
            facebook: musicianDoc.social.facebook,
            instagram: musicianDoc.social.instagram,
            tiktok: musicianDoc.social.tiktok,
            threads: musicianDoc.social.threads,
          },
          genre: musicianDoc.genre,
          profileImage: musicianDoc.profileImage,
        });
        setIsFetched(true);
      }
    }

    // fetchMusician();

    if (
      formData.name !== '' &&
      formData.genre[0] !== '' &&
      // validateURLs(formData.music) &&
      validateURLs(formData.social)
    ) {
      setSubmitActive(true);
    } else {
      setSubmitActive(false);
    }
  };

  // if fields in formData.music and formData.social is not empty, set disabled to false
  useEffect(() => {
    effectCallback();
  }, [formData, imageUpload, musicianName, isFetched]);

  if (!user?.userCredential) {
    return (
      <div>
        <p>You Must Login to Add a Musician</p>
        <Login />
      </div>
    );
  }

  return (
    <div className={styles.musicianAddFormContainer}>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <h4>Musician/Artist/Band Name (required):</h4>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className={styles.formSection}>
          <h4>Music (must have at least one link)</h4>
          <label>
            Bandcamp Track or Album EMBED:<br></br>
            <input
              type='text'
              name='music.bandcamp'
              value={formData.music.bandcamp}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Spotify Artist Page URL:<br></br>
            <input
              type='url'
              name='music.spotify'
              value={formData.music.spotify}
              onChange={handleInputChange}
            />
          </label>
          <label>
            YouTube Channel URL:<br></br>
            <input
              type='url'
              name='music.youtube'
              value={formData.music.youtube}
              onChange={handleInputChange}
            />
          </label>
          <label>
            SoundCloud Track or Album EMBED:<br></br>
            <input
              type='text'
              name='music.soundcloud'
              value={formData.music.soundcloud}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Twitch Channel URL:<br></br>
            <input
              type='url'
              name='music.twitch'
              value={formData.music.twitch}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={styles.formSection}>
          <h4>Social (must have at least one link)</h4>
          <label>
            Facebook Artist/Page URL:<br></br>
            <input
              type='url'
              name='social.facebook'
              value={formData.social.facebook}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Instagram Profile URL:<br></br>
            <input
              type='url'
              name='social.instagram'
              value={formData.social.instagram}
              onChange={handleInputChange}
            />
          </label>
          <label>
            TikTok Profile URL:<br></br>
            <input
              type='url'
              name='social.tiktok'
              value={formData.social.tiktok}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Threads Profile URL:<br></br>
            <input
              type='url'
              name='social.threads'
              value={formData.social.threads}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={styles.formSection}>
          <label>
            <h4>Genre (at least one genre required):</h4>
            <input
              type='text'
              name='genre'
              value={formData.genre[0]}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  genre: [e.target.value],
                }))
              }
              required
            />
          </label>
        </div>
        <div className={styles.formSection}>
          {profileImageUrl && (
            <div>
              <h4>Current Profile Image:</h4>
              <img
                src={profileImageUrl}
                alt='Current Profile'
                width='100'
                loading='lazy'
              />{' '}
              {/* Adjust width as needed */}
            </div>
          )}
          <h4>Change Profile Image?</h4>
          <input
            type='file'
            onChange={(event) => {
              if (event.target.files) {
                setImageUpload(event.target.files[0]);
              }
            }}
          />
        </div>
        <button
          className={submitActive ? '' : styles.submitButton}
          type='submit'
          disabled={submitActive ? false : true}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MusicianApproveForm;
