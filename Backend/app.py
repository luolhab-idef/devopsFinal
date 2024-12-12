from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

  # This will allow cross-origin requests from your frontend

app = Flask(__name__)
CORS(app)
@app.route('/predict', methods=['POST'])
def svm_service():
    data = request.get_json()
    response = requests.post('http://localhost:5000/predict', json=data)
    return jsonify(response.json())

@app.route('/vgg19_service', methods=['POST'])
def vgg19_service():
    data = request.get_json()
    response = requests.post('http://localhost:5001/vgg19_service', json=data)
    return jsonify(response.json())
@app.route("/")
def home():
    return "Hello, Flask!"
if __name__ == "__main__":
    app.run(debug=True)
