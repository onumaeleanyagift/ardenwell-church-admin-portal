from flask import Flask, jsonify
from flask_cors import CORS

# Initialise Flask application
app = Flask(__name__)

# Allow requests from our React development server
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "http://localhost:5173"
        }
    }
)


# Health check endpoint
@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "success",
        "message": "Ardenwell API is running"
    }), 200


# Run the development server
if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )