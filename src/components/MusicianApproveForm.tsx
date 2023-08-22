import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 } from 'uuid';
import { validateURLs } from '../utils';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import styles from '../css/MusicianAddForm.module.css';
import { OutletContextProps } from '../types';
import Login from './login';

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
const MusicianApproveForm = () => {
  const { user } = useOutletContext<OutletContextProps>();
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

  console.log(musicianName); // output: good

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // add image to firebase storage
      const url = await uploadImage();
      // add musician to firestore
      // if logged in user is admin, set const targetCollection to 'musicians'
      // else set const targetCollection to 'pendingMusicians'
      const targetCollection =
        user?.user?.uid ===
        ('UeRplqnzeTTKZmFrZxSNKs6hlt62' || 'hbrLp0oqRCWkSmL9qAbfy4tGUdc2')
          ? 'musicians'
          : 'pendingMusicians';
      const musicianRef = doc(collection(db, targetCollection));
      await setDoc(musicianRef, {
        ...formData,
        profileImage: url,
      });
      if (targetCollection === 'pendingMusicians') {
        alert('musician profile uploaded for approval');
      } else {
        alert('musician profile uploaded');
      }
      // If musician was added to the 'musicians' collection, delete from 'pendingMusicians'
      if (targetCollection === 'musicians') {
        const pendingMusiciansCol = collection(db, 'pendingMusicians');
        const pendingMusicianSnapshot = await getDocs(pendingMusiciansCol);
        const pendingMusicianDoc = pendingMusicianSnapshot.docs.find(doc => doc.data().name.toLowerCase() === musicianName?.toLowerCase());

        if (pendingMusicianDoc) {
            await deleteDoc(pendingMusicianDoc.ref);
        }
    }
      // go back to homepage using React router
      window.location.href = '/';
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
    const storageRef = ref(storage, `images/${formData.name + v4()}`);
    await uploadBytes(storageRef, imageUpload);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // if fields in formData.music and formData.social is not empty, set disabled to false
  useEffect(() => {
    const fetchMusician = async () => {
      if (!isFetched) {
        const musiciansCol = collection(db, 'pendingMusicians');
        const musicianSnapshot = await getDocs(musiciansCol);
        const musicianDoc = musicianSnapshot.docs.find(
          (doc) => doc.data().name.toLowerCase() === musicianName?.toLowerCase()
        );

        if (musicianDoc) {
          // Set the fetched data to formData
          setFormData({
            name: musicianDoc.data().name,
            music: {
              bandcamp: musicianDoc.data().music.bandcamp,
              spotify: musicianDoc.data().music.spotify,
              youtube: musicianDoc.data().music.youtube,
              soundcloud: musicianDoc.data().music.soundcloud,
              twitch: musicianDoc.data().music.twitch,
            },
            social: {
              facebook: musicianDoc.data().social.facebook,
              instagram: musicianDoc.data().social.instagram,
              tiktok: musicianDoc.data().social.tiktok,
              threads: musicianDoc.data().social.threads,
            },
            genre: musicianDoc.data().genre,
          });
          setIsFetched(true);
        }
      }
    };

    fetchMusician();

    if (
      formData.name !== '' &&
      imageUpload instanceof File &&
      formData.genre[0] !== '' &&
      // validateURLs(formData.music) &&
      validateURLs(formData.social)
    ) {
      setSubmitActive(true);
    } else {
      setSubmitActive(false);
    }
  }, [formData, imageUpload, musicianName, isFetched]);

  if (!user) {
    return (
      <div>
        <p>You Must Login to Add a Musician</p>
        <Login />
      </div>
    );
  }

  return (
    <div className={styles.musicianAddFormContainer}>
      <Link to={'..'}>
        <button>Exit</button>
      </Link>
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
      </form>
    </div>
  );
};

export default MusicianApproveForm;
