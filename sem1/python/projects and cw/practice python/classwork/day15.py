# dictionary

l1=["cat","dog","lion","tiger","cow"]
d1={}

while len(l1[i])==len(l1[i+1]):
    d1[len(l1[i])]=l1[i]
    i+=1
    d1.update({len(l1[i]):l1[i]})
i=0
print(d1)