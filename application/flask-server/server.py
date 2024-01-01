from flask import Flask, send_file, request
from flask_cors import CORS
import numpy as np
#methods
from methods.Iteration.Newtons_method import newtons_method
from methods.Iteration.Konashuk import konashuk_method
from methods.Iteration.Simple_iteration import simple_iteration
from methods.LinearSystems.Gauss_method import gauss_method
from methods.LinearSystems.Least_squeres_method import least_squeres
from methods.Interpolation.Lagrange import lagrange, plot_lagrange
from methods.Interpolation.Newton import newton_interpolation, plot_newton
from methods.Integration.NumericalIntegration import integral

#tools
from methods.Iteration.tools import create_plot_newtons, create_plot_konashuk, create_plot_simple_iteration

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
    try:
        response = newtons_method(str(f), str(df), float(a), float(b), float(x0), float(epsilon))
    except:
        response = {"method": "error", "error": "Failed to calculate the result"}
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
    try:
        response = konashuk_method(str(f), float(a), float(b), float(x0), float(x1), float(epsilon))
    except:
        response = {"method": "error", "error": "Failed to calculate the result"}
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
#Simple-iteration method
@app.route('/simple-iteration-method/', methods=['GET'])
def simple_iteration_method_server():

    #get parameters
    f = request.args.get('f')
    psi = request.args.get('psi')
    x0 = request.args.get('x')
    epsilon = request.args.get('epsilon')

    #test url
    #http://localhost:5000/simple-iteration-method/?f=x**3-4%20-3&psi=1/(3*x**2)&x=1&epsilon=1e-7
    try:
        response = simple_iteration(str(f), str(psi), float(x0),float(epsilon))
    except:
        response = {"method": "error", "error": "Failed to calculate the result"}
    return response

#plot Simple-iteration method
@app.route('/simple-iteration-method-plot/', methods=['GET'])
def plot_simple_iteration_method_server():

    f = request.args.get('f')
    x_list = request.args.get('x_list')
    
    #convert string to list of floats
    x_list = list(map(float, x_list.split(',')))

    return create_plot_simple_iteration(str(f), x_list)


    #test url
    #http://localhost:5000/simple-iteration-method-plot/?f=x**3-4%20-3&x_list=1.0,1.6,1.8904,1.9148443572736,1.9127419889261075,1.9129496638217682,1.9129293752829035,1.9129313595280073,1.9129311654871364,1.9129311844627435


#Gauss method
@app.route('/gauss-method/', methods=['GET'])
def gauss_method_server():
    #get parameters
    A = request.args.get('A')
    b = request.args.get('b')

    #convert string to list of lists of floats
    A = list(map(lambda x: list(map(float, x.split(','))), A.split(';')))
    b = list(map(float, b.split(',')))
    #test url
    #http://localhost:5000/gauss-method/?A=1,2,3;4,5,6;7,8,10&b=1,2,3
    try:
        response = gauss_method(np.array(A, dtype=float), np.array(b, dtype=float))
    except:
        response = {"method": "error", "error": "Failed to calculate the result"}
    return response

#Least squeres method
@app.route('/least-squeres-method/', methods=['GET'])
def least_squeres_method_server():
    #get parameters
    A = request.args.get('A')
    b = request.args.get('b')

    #convert string to list of lists of floats
    A = list(map(lambda x: list(map(float, x.split(','))), A.split(';')))
    b = list(map(float, b.split(',')))
   
    #test url
    #http://localhost:5000/least-squeres-method/?A=1,2,3;4,5,6;7,8,10&b=1,2,3
    try:
        response = least_squeres(np.array(A, dtype=float), np.array(b, dtype=float))
    except:
        response = {"method": "error", "error": "Failed to calculate the result"}
    return response

@app.route("/lagrange-method/", methods=["GET"])
def lagrange_method_server():
    x = request.args.get("x")
    y = request.args.get("y")
    x0 = request.args.get("x0")

    x = list(map(float, x.split(",")))
    y = list(map(float, y.split(",")))
    try:
        response = lagrange(x, y, float(x0))
    except:
        response = {"method": "error", "error": "Failed to calculate the result"}
    return response

    # test url
    # http://localhost:5000/lagrange-method/?x=1,2,3&y=1,2,3&x0=2

#plot Lagrange method
@app.route('/lagrange-method-plot/', methods=['GET'])
def plot_lagrange_method_server():

    x = request.args.get('x')
    y = request.args.get('y')
    
    #convert string to list of floats
    x = list(map(float, x.split(',')))
    y = list(map(float, y.split(',')))

    return plot_lagrange(x, y)

    #test url
    #http://localhost:5000/lagrange-method-plot/?x=1,2,3&y=1,2,3

#Newton interpolation method
@app.route('/newton-interpolation-method/', methods=['GET'])
def newton_interpolation_method_server():
    x = request.args.get('x')
    y = request.args.get('y')
    x0 = request.args.get('x0')

    x = list(map(float, x.split(",")))
    y = list(map(float, y.split(",")))
    try:
        response = newton_interpolation(x, y, float(x0))
    except:
        response = {"method": "error", "error": "Failed to calculate the result"}
    return response

    # test url
    # http://localhost:5000/newton-interpolation-method/?x=1,2,3&y=1,2,3&x0=2

#plot Newton interpolation method
@app.route('/newton-interpolation-method-plot/', methods=['GET'])
def plot_newton_interpolation_method_server():

    x = request.args.get('x')
    y = request.args.get('y')
    
    #convert string to list of floats
    x = list(map(float, x.split(',')))
    y = list(map(float, y.split(',')))

    return plot_newton(x, y)

    #test url
    #http://localhost:5000/newton-interpolation-method-plot/?x=1,2,3&y=1,2,3

#Numerical integration
@app.route('/numerical-integration/', methods=['GET'])
def numerical_integration_server():
    #get parameters
    method = request.args.get('method')
    f = request.args.get('f')
    a = request.args.get('a')
    b = request.args.get('b')
    n = request.args.get('n')

    #test url
    #http://localhost:5000/numerical-integration/?method=rectangle&f=x**2&n=100&a=0&b=2
    try:
        response = integral(method, str(f), float(a), float(b), int(n))
    except:
        response = {"method": "error", "error": "Failed to calculate the result"}
    return response

if __name__ == '__main__':
    app.run(debug=True)

