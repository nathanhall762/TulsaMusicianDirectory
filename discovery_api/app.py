from flask import Flask, request, jsonify
from flask_cors import CORS
from model import cosine_sim
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

    metrics = data.get('metrics')
    genres = data.get('genres')

    # only either metrics or genres should exist at one time
    # for now at least will probably break if thats not true
    if len(metrics) > 0:
        recommendations = cosine_sim.cosine_rec(metrics)
    else:
        genre_metrics = cosine_sim.get_genre_data(genres)
        recommendations = cosine_sim.cosine_rec(genre_metrics)

    return jsonify(recommendations)


app.run(host='localhost', port=5000)
