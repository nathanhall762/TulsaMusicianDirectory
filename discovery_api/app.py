from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from model import cosine_sim

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def test():
    return 'hello'


@app.route('/', methods=['POST'])
def api():
    print('I got hit')
    return handle_data(request)


def handle_data(request):
    data = request.json
    print('preloaded data', data)
    track_features = json.loads(data)
    recommendations = cosine_sim.cosine_rec(track_features)
    print('my recommendations', recommendations)
    return jsonify(recommendations)


app.run(host='localhost', port=5000)
