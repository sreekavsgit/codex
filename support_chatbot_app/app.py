from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/support', methods=['POST'])
def support():
    data = request.get_json(force=True)
    message = data.get('message', '')
    # In the future, integrate with the OpenAI API here using `message`.
    response_text = "Thanks for your message. A support agent will contact you soon."
    return jsonify({'response': response_text})


if __name__ == '__main__':
    app.run(port=5000)
