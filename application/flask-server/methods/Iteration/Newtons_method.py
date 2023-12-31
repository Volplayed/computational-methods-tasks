import methods.Iteration.tools as tools

def newtons_method(f, df, a, b, aprox, epsilon=1e-7, max_iter=100):
    """
    Realization of the newtons method for solving nonlinear equations on the segment [a, b]

    Parameters
    ----------
    f : str
        Function to solve
    df : str
        Derivative of the function
    a : float
        Left border of the segment
    b : float
        Right border of the segment
    epsilon : float, optional
        Accuracy of the solution

    Returns
    -------
    x : float
        Approximate solution of the equation
    """

    iter = 0

    #parse the function and its derivative
    func = tools.parse_expression(f, 'x')
    dfunc = tools.parse_expression(df, 'x')

    #the initial approximation
    x_approx = aprox
    if dfunc(x_approx) == 0:
        return {"error" : "The derivative of the function is zero at the initial point, division by zero", "method" : "error"}

    #list of approximations
    x_list = [x_approx]

    while abs(float(func(x_approx))) > epsilon:
        x_approx = x_approx - func(x_approx) / dfunc(x_approx)

        if x_approx < a:
            x_approx = a
        elif x_approx > b:
            x_approx = b

        x_list.append(x_approx)

        iter += 1

        if iter > max_iter:
            return {"error" : "The number of iterations exceeded the maximum", "method" : "error"}
        
    return {"func": f, "deriv" : df, 'a': a, 'b': b, "epsilon": epsilon,
            "x_approx": x_approx, "x_list": x_list,
            "method": "Newtons"}



