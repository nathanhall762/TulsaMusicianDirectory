#!/usr/bin/python3.11
"""Module for calculating the cosine similarity between two vectors."""
import numpy as np
import pandas as pd
import json
from pkg_resources import resource_string
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MinMaxScaler


def cosine_rec(dataFromUser: dict) -> list:
    """
    Returns the cosine similarity between two vectors formed from the user's
    information and the artist's information.
    Args:
        dataFromUser: A dictionary of the user's playlists audio features.
    Returns:
        A list of tuples containing the artist's id and the cosine similarity
        between the user's audio features and the artist's audio features.
    """

    scaler = MinMaxScaler()

    json_data = resource_string(__name__, 'artistAverageAudioFeatures.json')
    ArtistAverages = json.loads(json_data.decode('utf-8'))

    TMDArtists = pd.DataFrame.from_dict(ArtistAverages, orient='columns')
    TMDArtists.sort_index(inplace=True)

    TMDAnorm = pd.DataFrame(scaler.fit_transform(TMDArtists),
                            columns=TMDArtists.columns,
                            index=TMDArtists.index)

    userDF = pd.DataFrame.from_dict(dataFromUser, orient='columns')
    userDF.sort_index(axis=1, inplace=True)
    # userDF.drop(columns=['speechiness'], inplace=True)
    userDFnorm = pd.DataFrame(scaler.fit_transform(userDF),
                              columns=userDF.columns,
                              index=userDF.index)
    userValues = userDFnorm.mean().values

    cosineDict = {}
    for artist_id, features in TMDAnorm.items():
        cosineDict[artist_id] = cosine_similarity(
            userValues.reshape(1, -1), features.values.reshape(1, -1))[0][0]

    sorted_dict = sorted(cosineDict.items(),
                         key=lambda item: item[1], reverse=True)

    return sorted_dict[:5]
