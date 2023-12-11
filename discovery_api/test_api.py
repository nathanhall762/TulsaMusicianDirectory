import requests
import json

track_features = [{"danceability": 0.352, "energy": 0.911, "loudness": -5.23, "speechiness": 0.0747, "acousticness": 0.00121, "instrumentalness": 0, "liveness": 0.0995, "valence": 0.236},
                  {"danceability": 0.497, "energy": 0.97, "loudness": -4.851, "speechiness": 0.0836, "acousticness": 0.0000904, "instrumentalness": 0.000674, "liveness": 0.101, "valence": 0.689},]

json_data = json.dumps(track_features)


url = 'https://discoveryapi-7hkc33yowq-uc.a.run.app'
r = requests.post(url, json=json_data)

print(r.json())
