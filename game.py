'''This is a multiline
comment'''
#This is a single line comment

import random,os
'''Random is used to choose a random option from list of options.
       OS is used to access operting system properties.'''

opt=["rock","paper","scissor"]
p1c=0
p2c=0
os.system('cls' if os.name == 'nt' else 'clear') #Clears command prompt screen for better user experience

print("*"*30, " ROCK | PAPER | SCISSOR ", "*"*30, "\n"*2) #Game Banner

#User input for names of player one and two. With Empty name validation
p1_name = str(input(" "*30+"Enter Player 1 Name:"))
while len(p1_name)==0:
    p1_name = str(
        input(" "*30+"Name cannot be empty! Please Enter Player 1 Name:"))
p2_name = str(input(" "*30+"Enter Player 2 Name:"))
while len(p2_name)==0:
    p2_name = str(
        input(" "*30, "Name cannot be empty! Please Enter Player 2 Name:"))

'''Three Rounds in total'''
for i in range(0,3):
    p1=random.choice(opt)
    p2=random.choice(opt)
    os.system('cls' if os.name == 'nt' else 'clear')
    print("*"*30, " ROCK | PAPER | SCISSOR ", "*"*30,"\n"*2)
    print(" "*30,"="*10,"Round ",i+1,"="*10)
    print(" "*30,p1_name,": ",p1," ",p2_name,": ",p2)
    if ["rock", "paper"] == [p1, p2]:
        p2c+=1
        print(" "*30,p2_name," Wins!")
    elif ["rock", "scissor"] == [p1, p2]:
        p1c+=1
        print(" "*30,p1_name," Wins!")
    elif ["scissor", "paper"] == [p1, p2]:
        p1c+=1
        print(" "*30, p1_name, " Wins!")
    elif ["scissor", "rock"] == [p1, p2]:
        p2c+=1
        print(" "*30,p2_name, " Wins!")
    elif ["paper", "rock"] == [p1, p2]:
        p1c+=1
        print(" "*30,p1_name, " Wins!")
    elif ["paper", "scissor"] == [p1, p2]:
        p2c+=1
        print(" "*30, p2_name, " Wins!")
    else:
        print(" "*30,"Match Drawn!")
    if i == 2:
        break
    inp=str(input(" "*30+"Are you ready for next game? (y/n) "))
    if inp=='y':
        continue
    else:
        break
if(p1c>p2c):
    print(" "*30,"Hooray ",p1_name," wins the series!")
elif(p2c>p1c):
    print(" "*30,"Hooray ",p2_name," wins the series!")
else:
    print(" "*30, "Series Drawn!")
