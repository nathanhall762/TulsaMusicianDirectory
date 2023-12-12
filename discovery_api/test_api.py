import requests
import json


track_features = {"metrics": [{"danceability": 0.451, "energy": 0.0223, "loudness": -26.117, "acousticness": 0.993, "instrumentalness": 0.768, "liveness": 0.13, "valence": 0.0573}, {"danceability": 0.558, "energy": 0.0259, "loudness": -30.016, "acousticness": 0.996, "instrumentalness": 0.871, "liveness": 0.0969, "valence": 0.37}, {
    "danceability": 0.159, "energy": 0.071, "loudness": -27.109, "acousticness": 0.911, "instrumentalness": 0.856, "liveness": 0.107, "valence": 0.0602}, {"danceability": 0.828, "energy": 0.61, "loudness": -7.305, "acousticness": 0.00104, "instrumentalness": 0.894, "liveness": 0.0792, "valence": 0.566},], "genres": []}

json_data = json.dumps(track_features)

# genre_data = {"metrics": [], "genres": ["R&B", "Alternative"]}
# json_data = json.dumps(genre_data)


# url = 'https://discoveryapi-7hkc33yowq-uc.a.run.app'
url = 'http://localhost:5000'
r = requests.post(url, json=json_data)

print(r.json())
