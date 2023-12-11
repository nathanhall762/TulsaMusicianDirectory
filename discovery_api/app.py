from flask import Flask, request, jsonify
from flask_cors import CORS
from model import cosine_sim

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
    recommendations = cosine_sim.cosine_rec(data)
    return jsonify(recommendations)


app.run(host='localhost', port=5000)
