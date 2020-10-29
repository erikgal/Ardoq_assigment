import random

def SAFE_Nmaxelements(list1, N):                #Slow safe test algorithm
    final_list = []
    for i in range(0, N):
        max1 = 0

        for j in range(len(list1)):
            if list1[j] > max1:
                max1 = list1[j];

        list1.remove(max1);
        final_list.append(max1)

    prod = 1
    for el in final_list:
        prod = prod * el
    return prod

def max_product_simple(lst):                    #Actual fast algorithm
    max_lst = [None]*3
    min_val = float('inf')

    for i in range(3):                          #Initates max_lst with first the integers, and saves min_val
        max_lst[i] = lst[i]
        if lst[i] < min_val:
            min_val = lst[i]
            min_i = i

    for int in lst[3:]:
        if int > min_val:
            max_lst[min_i] = int
            min_val = int
            for j, el in enumerate(max_lst):    #Finds new min_val in altered max_lst, med andre ord heapify
                if el < min_val:
                    min_val = el
                    min_i = j

    prod = max_lst[0]*max_lst[1]*max_lst[2]
    return prod


def test():
    k = 50
    test = [None]*k
    for i in range(len(test)):
        test[i] = random.randint(-10000, 10000)

    res = max_product_simple(test)
    answ = SAFE_Nmaxelements(test, 3)
    print("Correct Answer:", answ, "My Answer:", res, "Error:", abs(answ-res))

test()


"""
max_product_simple has optimal time complexity because k = 3. If the assigment would have been "find k-largest elements", it would be
faster to have a min-heap structure.
"""
