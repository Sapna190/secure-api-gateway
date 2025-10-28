from flask import Flask, request, jsonify
from models.anomaly_detector import AnomalyDetector

app = Flask(__name__)
anomaly_detector = AnomalyDetector()

@app.route('/detect', methods=['POST'])
def detect_anomaly():
    data = request.json
    if not data or 'payload' not in data:
        return jsonify({'error': 'Invalid input'}), 400

    payload = data['payload']
    result = anomaly_detector.detect(payload)

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)