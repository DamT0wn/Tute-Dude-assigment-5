from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    
    data = request.get_json(silent=True)
    if data is None:
        data = request.form.to_dict()

    name = data.get('name', '')
    email = data.get('email', '')
    message = data.get('message', '')

    processed = {
        'status': 'received',
        'name_upper': name.upper(),
        'email': email,
        'message_length': len(message)
    }
    return jsonify(processed), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
