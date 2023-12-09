import requests
import json

track_features = [{'data': 'stuff'}, {'data': 'stuff'}, {'data': 'stuff'}]

json_data = json.dumps(track_features)


url = 'http://localhost:5000'
r = requests.post(url, json=json_data)

print(r.json())
