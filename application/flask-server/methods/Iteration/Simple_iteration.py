import methods.Iteration.tools as tools

def simple_iteration(f, a, b, aprox, C,epsilon=1e-7, max_iter=100):
    """
    Realization of the simple iteration method for solving nonlinear equations on the segment [a, b]

    Parameters
    ----------
    f : str
        Function to solve
    a : float
        Left border of the segment
    b : float
        Right border of the segment
    C : float (0, 1)
        Constant of contractive function
    aprox : float
        Initial approximation
    epsilon : float, optional
        Accuracy of the solution

    Returns
    -------
    x : float
        Approximate solution of the equation
    """
    if abs(C) <= 0 or abs(C) >= 1:
        raise ValueError("C must be between 0 and 1")

    iter = 0

    #parse the function and its derivative
    func = tools.parse_expression(f, 'x')

    #the initial approximation
    x_approx = aprox
    
    #list of approximations
    x_list = [x_approx]

    while abs(float(func(x_approx))) > epsilon:
        delta = C*func(x_approx)
        delta = delta if (func(x_approx+epsilon) - func(x_approx-epsilon)) > 0 else -delta
        x_approx = x_approx - delta
        
        print(x_approx)
        x_list.append(x_approx)
        iter += 1

        if iter > max_iter:
            raise RuntimeError("The number of iterations exceeded the maximum")
        
    return {"func": f, 'a': a, 'b': b, "epsilon": epsilon,
            "x_approx": x_approx, "x_list": x_list,
            "method": "Simple iteration"}
