from flask import Flask, request, send_from_directory, url_for, redirect, jsonify
import checkUser

app = Flask(__name__, static_folder='../client/dist', template_folder='../client/dist')

@app.route('/', methods=['GET'])
def root():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

@app.route('/check-key', methods=['GET'])
def check_key():
    key = request.args.get('key')
    per = checkUser.check(key)
    if per > 0:
        return jsonify({"exist": per, "name": key.split('-')[0], "key": key.split('-')[1]})
    else:
        return jsonify({"exist": 0})

@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('root'))

if __name__ == "__main__":
    app.run(debug=True)