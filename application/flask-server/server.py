from flask import Flask, send_file, request
from flask_cors import CORS
import io
#methods
from methods.Iteration.Newtons_method import newtons_method
from methods.Iteration.Konashuk import konashuk_method

#tools
from methods.Iteration.tools import create_plot_newtons, create_plot_konashuk

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

    response = newtons_method(str(f), str(df), float(a), float(b), float(x0), float(epsilon))
    return response

#plot Newton's method
@app.route('/newtons-method-plot/', methods=['GET'])
def plot_newtons_method_server():

    f = request.args.get('f')
    df = request.args.get('df')
    a = request.args.get('a')
    b = request.args.get('b')
    x_list = request.args.get('x_list')
    
    #convert string to list of floats
    x_list = list(map(float, x_list.split(',')))

    return create_plot_newtons(str(f), str(df), x_list, float(a), float(b))


    #test url
    #http://localhost:5000/newtons-method-plot/?f=x**3-4%20-3&df=3*(x**2)&x_list=1.0,2.0,1.9166666666666667,1.9129384583070783,1.9129311828000604&a=0&b=2

#Konashuk's method
@app.route('/konashuk-method/', methods=['GET'])
def konashuk_method_server():
    #get parameters
    f = request.args.get('f')
    a = request.args.get('a')
    b = request.args.get('b')
    x0 = request.args.get('x0')
    x1 = request.args.get('x1')
    epsilon = request.args.get('epsilon')

    response = konashuk_method(str(f), float(a), float(b), float(x0), float(x1), float(epsilon))

    #test url
    #http://localhost:5000/konashuk-method/?f=x**3-4*x-3&x0=1&x1=2&a=0&b=2&epsilon=1e-7

    return response

#plot Konashuk's method
@app.route('/konashuk-method-plot/', methods=['GET'])
def plot_konashuk_method_server():

    f = request.args.get('f')
    a = request.args.get('a')
    b = request.args.get('b')
    x_list = request.args.get('x_list')
    
    #convert string to list of floats
    x_list = list(map(float, x_list.split(',')))

    return create_plot_konashuk(str(f), x_list, float(a), float(b))

    #test url
    #http://localhost:5000/konashuk-method-plot/?f=x**3-4*x-3&x_list=1.0,2.0,3.0,2.2,2.27007299270073,2.3048474471924383,2.302735801866057,2.3027755898951936,2.3027756377331,2.302775637731995&a=0&b=2

   

if __name__ == '__main__':
    app.run(debug=True)