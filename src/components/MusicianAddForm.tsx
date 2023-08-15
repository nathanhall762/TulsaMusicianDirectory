import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 } from 'uuid';

type MusicianFormData = {
  name: string;
  bandcamp: string;
  spotify: string;
  facebook: string;
  instagram: string;
  genre: string[];
};

const MusicianForm: React.FC = () => {
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
    try {
      const storageRef = ref(storage, `images/${ImageUpload.name + v4()}`);
      await uploadBytes(storageRef, ImageUpload);
      const url = await getDownloadURL(storageRef);
      console.log(url);
      return url;
    } catch (e) {
      console.log(e);
      alert('error uploading musician profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name (required):
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>

      <div>
        <h4>Music (must have at least one link)</h4>
        <label>
          Bandcamp:
          <input
            type='url'
            name='bandcamp'
            value={formData.bandcamp}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Spotify:
          <input
            type='url'
            name='spotify'
            value={formData.spotify}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div>
        <h4>Social (must have at least one link)</h4>
        <label>
          Facebook:
          <input
            type='url'
            name='facebook'
            value={formData.facebook}
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
      </div>

      <div>
        <label>
          Genre (at least one genre required):
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

      <div>
        <input
          type='file'
          onChange={(event) => {
            if (event.target.files) {
              setImageUpload(event.target.files[0]);
            }
          }}
        />
        <button onClick={uploadImage}> Upload Image</button>
      </div>

      <button type='submit'>Submit</button>
    </form>
  );
};

export default MusicianForm;
