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
  facebook: string;
  instagram: string;
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
    facebook: '',
    instagram: '',
    genre: [''],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      // add image to firebase storage
      const url = await uploadImage();
      console.log(formData);
      // add musician to firestore
      const musicianRef = doc(collection(db, 'musicians'));
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
    console.log(url);
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
