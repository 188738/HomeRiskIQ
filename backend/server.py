from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/members")
def members():
    return jsonify({
        "members": ["Member1", "Member2", "Member4"]
    })

if __name__ == "__main__":
    app.run(debug=True)
