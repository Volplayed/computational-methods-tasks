import methods.Iteration.tools as tools

def konashuk_method(f, a, b, aprox1, aprox2, epsilon=1e-7, max_iter=100):
    """
    Realization of the Konashuk method for solving nonlinear equations on the segment [a, b]

    Parameters
    ----------
    f : str
        Function to solve
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

    #parse the function
    func = tools.parse_expression(f, 'x')

    #list of approximations
    x_list = [aprox1, aprox2]

    while abs(func(x_list[-1]) - func(x_list[-2])) > epsilon:
        x_list.append(x_list[-1] - (x_list[-1] - x_list[-2]) * func(x_list[-1]) / (func(x_list[-1]) - func(x_list[-2])))

        if x_list[-1] < a:
            x_list[-1] = a
        elif x_list[-1] > b:
            x_list[-1] = b

        iter += 1

        if iter > max_iter:
            raise RuntimeError("The number of iterations exceeded the maximum")
        
    return {"func": f, 'a': a, 'b': b, "epsilon": epsilon,
            "x_approx": x_list[-1], "x_list": x_list,
            "method": "Konashuk"}