from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def test():
    return 'hello'


@app.route('/', methods=['POST'])
def api():
    return handle_data(request)


def handle_data(request):
    data = request.json
    track_features = json.loads(data)
    box_return = sim_box(track_features)

    return jsonify(box_return)


def sim_box(track_features):
    print(track_features)
    return [12, 32, 69, 420]


app.run(host='localhost', port=5000)
