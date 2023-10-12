import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db, analytics } from '../firebase';
import { v4 } from 'uuid';
// import { validateURLs } from '../utils';
import styles from '../css/MusicianAddForm.module.css';
import { useNavigate } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import useBearStore from '../bearStore';
import Login from './Login';
import { Link } from 'react-router-dom';
import { BackButton } from './MusicianPage/MusicianPage';

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
};

// Component
const MusicianForm = () => {
  const user = useBearStore((state) => state.user);
  const [imageUpload, setImageUpload] = useState<File>();
  const [submitActive, setSubmitActive] = useState<boolean>(false);
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
  const navigate = useNavigate();

  const handleSubmitToFirestore = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // add image to firebase storage
      const url = await uploadImage();
      // add musician to firestore
      // if logged in user is admin, set const targetCollection to 'musicians'
      // else set const targetCollection to 'pendingMusicians'

      if (!user.userCredential) return;
      const targetCollection =
        user.isAdmin === true ? 'musicians' : 'pendingMusicians';
      const musicianRef = doc(collection(db, targetCollection));
      await setDoc(musicianRef, {
        ...formData,
        profileImage: url,
      });
      if (targetCollection === 'pendingMusicians') {
        alert('musician profile uploaded for approval');
        logEvent(analytics, 'musician_added_pending');
      } else {
        alert('musician profile uploaded');
        logEvent(analytics, 'musician_added');
      }
      // go back to homepage using React router
      navigate(-1);
    } catch (err) {
      console.log(err);
      alert('error uploading musician profile');
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
    if (!imageUpload) {
      alert('please add a file');
      throw new Error('no file added');
    }

    // file type validation
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.exec(imageUpload.name)) {
      alert('invalid file type, must be .jpg, .jpeg, or .png');
      throw new Error('invalid file type');
    }
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
  };

  // if fields in formData.music and formData.social is not empty, set disabled to false
  useEffect(() => {
    if (
      formData.name !== '' &&
      imageUpload instanceof File &&
      formData.genre[0] !== ''
      // validateURLs(formData.music) &&
      // validateURLs(formData.social)
    ) {
      setSubmitActive(true);
    } else {
      setSubmitActive(false);
    }
  }, [formData, imageUpload]);

  if (!user.userCredential) {
    return (
      <div>
        <Link to='/'>
          <BackButton>Go Back</BackButton>
        </Link>
        <Login message={'You Must Login to Add a Musician'} />
      </div>
    );
  }

  return (
    <div className={styles.musicianAddFormContainer}>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <form onSubmit={handleSubmitToFirestore}>
        <div
          className={
            formData.name == '' ? styles.formSection : styles.formSectionGood
          }
        >
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
        <div
          className={
            formData.music.bandcamp == '' &&
            formData.music.spotify == '' &&
            formData.music.soundcloud == ''
              ? styles.formSection
              : styles.formSectionGood
          }
        >
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
        <div
          className={
            formData.social.threads == '' &&
            formData.social.instagram == '' &&
            formData.social.facebook == '' &&
            formData.social.tiktok == ''
              ? styles.formSection
              : styles.formSectionGood
          }
        >
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
        <div
          className={
            formData.genre[0] == ''
              ? styles.formSection
              : styles.formSectionGood
          }
        >
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
        <div
          className={
            imageUpload == undefined
              ? styles.formSection
              : styles.formSectionGood
          }
        >
          <h4>Add a profile image</h4>
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
        <p className={styles.submitHelper}>
          {formData.name == '' ? 'must add name' : ''}
        </p>
        <p className={styles.submitHelper}>
          {formData.music.bandcamp == '' &&
          formData.music.spotify == '' &&
          formData.music.soundcloud == ''
            ? 'must add music link or embed'
            : ''}
        </p>
        <p className={styles.submitHelper}>
          {formData.social.threads == '' &&
          formData.social.instagram == '' &&
          formData.social.facebook == '' &&
          formData.social.tiktok == ''
            ? 'must add social link'
            : ''}
        </p>
        <p className={styles.submitHelper}>
          {formData.genre[0] == '' ? 'must add genre' : ''}
        </p>
        <p className={styles.submitHelper}>
          {imageUpload == undefined ? 'must add image' : ''}
        </p>
      </form>
    </div>
  );
};

export default MusicianForm;
