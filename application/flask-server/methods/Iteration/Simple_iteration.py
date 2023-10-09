import methods.Iteration.tools as tools
import sympy as sp

def simple_iteration(f, psi, aprox, epsilon=1e-7, max_iter=100):
    """
    Realization of the simple iteration method for solving nonlinear equations on the segment [a, b]

    Parameters
    ----------
    f : str
        Function to solve
    psi : str
        Function of the iteration method
    a : float
        Left border of the segment
    b : float
        Right border of the segment
    aprox : float
        Initial approximation
    epsilon : float, optional
        Accuracy of the solution

    Returns
    -------
    x : float
        Approximate solution of the equation
    """

    iter = 0

    #parse the function
    func = tools.parse_expression(f, 'x')
    psifunc = tools.parse_expression(psi, 'x')

    #the initial approximation
    x_approx = aprox
    
    #list of approximations
    x_list = [x_approx]

    while abs(float(func(x_approx))) > epsilon:
        delta = func(x_approx)*psifunc(x_approx)

        x_approx = x_approx - delta
        
        x_list.append(x_approx)
        iter += 1

        if iter > max_iter:
            return { "error" : "The number of iterations exceeded the maximum", "method" : "error"}
        
    return {"func": f, "psi" : psi, "epsilon": epsilon,
            "x_approx": x_approx, "x_list": x_list,
            "method": "Simple Iteration"}
