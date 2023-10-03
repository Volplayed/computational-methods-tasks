import numpy as np

def swap_zero_diagonal(A, b):
    """
    Swap zero diagonal elements with non-zero elements


    Parameters
    ----------
    A : numpy.ndarray
        Matrix of coefficients
    b : numpy.ndarray
        Vector of free members  
    """

    for i in range(len(A)):
        if A[i][i] == 0:
            for j in range(len(A)):
                if A[j][i] != 0 and i != j:
                    A[[i, j]] = A[[j, i]]
                    b[[i, j]] = b[[j, i]]
                    break

    
    return A, b

def least_squeres(A, b, epsilon=1e-7, max_iter=100):
    """
    Least squeres method


    Parameters
    ----------
    A : numpy.ndarray
        Matrix of coefficients
    b : numpy.ndarray
        Vector of free members  


    Returns
    -------
    numpy.ndarray
        Solution of the system
    """

    A, b = swap_zero_diagonal(A, b)

    n = len(A)
    x = np.zeros(n)
    while np.sum(np.dot(A, x) - b) < epsilon:
        for i in range(len(x)):
            x[i] = b[i]
            for j in range(len(x)):
                if j != i:
                    x[i] -= (A[i][j]*x[j])

    return x
