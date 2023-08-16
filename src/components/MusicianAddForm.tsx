import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 } from 'uuid';
import styles from '../css/MusicianAddForm.module.css';

type MusicianFormData = {
  name: string;
  bandcamp: string;
  spotify: string;
  youtube: string;
  soundcloud: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  threads: string;
  twitch: string;
  x: string;
  genre: string[];
};

interface musicianFormProps {
  setAddMusicianSelected: React.Dispatch<React.SetStateAction<boolean>>;
}



const MusicianForm: React.FC<musicianFormProps> = ({
  setAddMusicianSelected,
}) => {
  const [ImageUpload, setImageUpload] = useState<File>();
  const [formData, setFormData] = useState<MusicianFormData>({
    name: '',
    bandcamp: '',
    spotify: '',
    youtube: '',
    soundcloud: '',
    facebook: '',
    instagram: '',
    tiktok: '',
    threads: '',
    twitch: '',
    x: '',
    genre: [''],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // add image to firebase storage
      const url = await uploadImage();
      // add musician to firestore
      const musicianRef = doc(collection(db, 'musicians'));
      console.log(formData.spotify);
      const spotifyID = formData.spotify.split('/')[4];
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const uploadImage = async () => {
    if (!ImageUpload) {
      alert('please add a file');
      return;
    }
    const storageRef = ref(storage, `images/${ImageUpload.name + v4()}`);
    await uploadBytes(storageRef, ImageUpload);
    const url = await getDownloadURL(storageRef);
    return url;
  };

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
              value={formData.bandcamp}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Spotify:<br></br>
            <input
              type='url'
              name='spotify'
              value={formData.spotify}
              onChange={handleInputChange}
            />
          </label>
          <label>
            YouTube:
            <input
              type='url'
              name='youtube'
              value={formData.youtube}
              onChange={handleInputChange}
            />
          </label>
          <label>
            SoundCloud:
            <input
              type='url'
              name='soundcloud'
              value={formData.soundcloud}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Twitch:
            <input
              type='url'
              name='twitch'
              value={formData.twitch}
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
              value={formData.facebook}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Instagram:<br></br>
            <input
              type='url'
              name='instagram'
              value={formData.instagram}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Instagram:
            <input
              type='url'
              name='instagram'
              value={formData.instagram}
              onChange={handleInputChange}
            />
          </label>
          <label>
            TikTok:
            <input
              type='url'
              name='tiktok'
              value={formData.tiktok}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Threads:
            <input
              type='url'
              name='threads'
              value={formData.threads}
              onChange={handleInputChange}
            />
          </label>
          <label>
            X (Twitter):
            <input
              type='url'
              name='x'
              value={formData.x}
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
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default MusicianForm;
