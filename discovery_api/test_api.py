import requests
import json

# track_features = [{"danceability": 0.352, "energy": 0.911, "loudness": -5.23, "acousticness": 0.00121, "instrumentalness": 0, "liveness": 0.0995, "valence": 0.236},
#   {"danceability": 0.497, "energy": 0.97, "loudness": -4.851, "acousticness": 0.0000904, "instrumentalness": 0.000674, "liveness": 0.101, "valence": 0.689},]

track_features = [{"danceability": 0.451, "energy": 0.0223, "loudness": -26.117, "acousticness": 0.993, "instrumentalness": 0.768, "liveness": 0.13, "valence": 0.0573}, {"danceability": 0.558, "energy": 0.0259, "loudness": -30.016, "acousticness": 0.996, "instrumentalness": 0.871, "liveness": 0.0969, "valence": 0.37},
                  {"danceability": 0.159, "energy": 0.071, "loudness": -27.109, "acousticness": 0.911, "instrumentalness": 0.856, "liveness": 0.107, "valence": 0.0602}, {"danceability": 0.828, "energy": 0.61, "loudness": -7.305, "acousticness": 0.00104, "instrumentalness": 0.894, "liveness": 0.0792, "valence": 0.566},]

json_data = json.dumps(track_features)


url = 'https://discoveryapi-7hkc33yowq-uc.a.run.app'
r = requests.post(url, json=json_data)

print(r.json())
