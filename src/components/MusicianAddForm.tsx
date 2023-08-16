import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 } from 'uuid';
import styles from '../css/MusicianAddForm.module.css';

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
    x: string;
  };
  genre: string[];
};

interface musicianFormProps {
  setAddMusicianSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

// Component
const MusicianForm: React.FC<musicianFormProps> = ({
  setAddMusicianSelected,
}) => {
  const [ImageUpload, setImageUpload] = useState<File>();
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
      x: '',
    },
    genre: [],
  });

  console.log(formData);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // add image to firebase storage
      const url = await uploadImage();
      // add musician to firestore
      const musicianRef = doc(collection(db, 'musicians'));
      console.log(formData.music.spotify);
      const spotifyID = formData.music.spotify.split('/')[4];
      console.log(spotifyID);
      await setDoc(musicianRef, {
        ...formData,
        profileImage: url,
      });
      alert('musician profile uploaded');
      setAddMusicianSelected(false);
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
        music: { ...prevData.music, [name]: value },
      }));
    } else if (name.includes('social')) {
      setFormData((prevData) => ({
        ...prevData,
        social: { ...prevData.social, [name]: value },
      }));
    } else if (name === 'genre') {
      setFormData((prevData) => ({
        ...prevData,
        genre: [value],
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const uploadImage = async () => {
    if (!ImageUpload) {
      alert('please add a file');
      throw new Error('no file added');
    }
    const storageRef = ref(storage, `images/${ImageUpload.name + v4()}`);
    await uploadBytes(storageRef, ImageUpload);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  // if fields in formData.music and formData.social is not empty, set disabled to false
  useEffect(() => {
    if (
      formData.music.bandcamp ||
      formData.music.spotify ||
      formData.music.youtube ||
      formData.music.soundcloud ||
      formData.music.twitch ||
      formData.social.facebook ||
      formData.social.instagram ||
      formData.social.tiktok ||
      formData.social.threads ||
      formData.social.x
    ) {
      document
        .querySelector('button[type="submit"]')!
        .removeAttribute('disabled');
    } else {
      document
        .querySelector('button[type="submit"]')!
        .setAttribute('disabled', 'true');
      // disable hover effect on button
    }
  });

  return (
    <div className={styles.musicianAddFormContainer}>
      <button onClick={() => setAddMusicianSelected(false)}>Exit</button>
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
            Bandcamp:<br></br>
            <input
              type='url'
              name='bandcamp'
              value={formData.music.bandcamp}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Spotify:<br></br>
            <input
              type='url'
              name='spotify'
              value={formData.music.spotify}
              onChange={handleInputChange}
            />
          </label>
          <label>
            YouTube:<br></br>
            <input
              type='url'
              name='youtube'
              value={formData.music.youtube}
              onChange={handleInputChange}
            />
          </label>
          <label>
            SoundCloud:<br></br>
            <input
              type='url'
              name='soundcloud'
              value={formData.music.soundcloud}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Twitch:<br></br>
            <input
              type='url'
              name='twitch'
              value={formData.music.twitch}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className={styles.formSection}>
          <h4>Social (must have at least one link)</h4>
          <label>
            Facebook:<br></br>
            <input
              type='url'
              name='facebook'
              value={formData.social.facebook}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Instagram:<br></br>
            <input
              type='url'
              name='instagram'
              value={formData.social.instagram}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Instagram:<br></br>
            <input
              type='url'
              name='instagram'
              value={formData.social.instagram}
              onChange={handleInputChange}
            />
          </label>
          <label>
            TikTok:<br></br>
            <input
              type='url'
              name='tiktok'
              value={formData.social.tiktok}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Threads:<br></br>
            <input
              type='url'
              name='threads'
              value={formData.social.threads}
              onChange={handleInputChange}
            />
          </label>
          <label>
            X (Twitter):<br></br>
            <input
              type='url'
              name='x'
              value={formData.social.x}
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
        <button className={styles.submitButton} type='submit' disabled>
          Submit
        </button>
      </form>
    </div>
  );
};

export default MusicianForm;
