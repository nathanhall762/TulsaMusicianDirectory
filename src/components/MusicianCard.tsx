// MusicianCard.tsx
import React from 'react';
import styles from '../css/MusicianCard.module.css';

export type Musician = {
    bandcamp?: string;
    facebook?: string;
    genre: string[];
    instagram?: string;
    name: string;
    profileImage: string;
    spotify?: string;
};

interface MusicianCardProps {
    musician: Musician;
}

const MusicianCard: React.FC<MusicianCardProps> = ({ musician }) => {
    const { bandcamp, facebook, genre, instagram, name, profileImage, spotify } = musician;

    console.log(profileImage);

    return (
        <>
            <div className={styles.musicianCard}>
                <a href="">
                    <div>
                        <h2>{name}</h2>
                        <img className={styles.profileImage} src={profileImage} alt={name} />
                        <p>Genre: {genre.length !== 0 ? genre.join(", ") : "NA"}</p>
                        <div className={styles.socialLinks}>
                            {bandcamp && <a href={bandcamp} target="_blank" rel="noopener noreferrer"><i className="fa fa-bandcamp" aria-hidden="true"></i></a>}
                            {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer"><i className="fa fa-facebook" aria-hidden="true"></i></a>}
                            {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer"><i className="fa fa-instagram" aria-hidden="true"></i></a>}
                            {spotify && <a href={spotify} target="_blank" rel="noopener noreferrer"><i className="fa fa-spotify" aria-hidden="true"></i></a>}
                        </div>
                    </div>
                </a>
            </div>
        </>

    );
}

export default MusicianCard;
