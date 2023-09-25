from flask import Flask, send_file, request
from flask_cors import CORS
#methods
from methods.Iteration.Newtons_method import newtons_method

#tools
from methods.Iteration.tools import create_plot_iteration

app = Flask(__name__)
CORS(app)
#Newton's method
@app.route('/newtons-method/', methods=['GET'])
def newtons_method_server():

    #get parameters
    f = request.args.get('f')
    df = request.args.get('df')
    a = request.args.get('a')
    b = request.args.get('b')
    x0 = request.args.get('x')
    epsilon = request.args.get('epsilon')

    #test url
    #http://localhost:5000/newtons-method/?f=x**3-4%20-3&df=3*(x**2)&x=1&a=0&b=2&epsilon=1e-7
    print(newtons_method(str(f), str(df), float(a), float(b), float(x0), float(epsilon)))
    response = newtons_method(str(f), str(df), float(a), float(b), float(x0), float(epsilon))
    return response

#plot Newton's method
@app.route('/plot-newtons-method/', methods=['GET'])
def plot_newtons_method_server():

    f = request.args.get('f')
    df = request.args.get('df')
    a = request.args.get('a')
    b = request.args.get('b')
    x_list = request.args.get('x_list')
    
    #convert string to list of floats
    x_list = list(map(float, x_list.split(',')))

    bytes_img = create_plot_iteration(str(f), str(df), x_list, float(a), float(b))

    #test url
    #http://localhost:5000/plot-newtons-method/?f=x**3-4%20-3&df=3*(x**2)&x_list=1.0,2.0,1.9166666666666667,1.9129384583070783,1.9129311828000604&a=0&b=2

    response = send_file(bytes_img, download_name='plot.png', mimetype='image/png')
    return response


if __name__ == '__main__':
    app.run(debug=True)