'''This is a multiline
comment'''
#This is a single line comment

import random,os
'''Random is used to choose a random option from list of options.
       OS is used to access operting system properties.'''

opt=["rock","paper","scissor"]
p1c=0
p2c=0
p3c=0
#os.system('cls' if os.name == 'nt' else 'clear') #Clears command prompt screen for better user experience

print("*"*30, " ROCK | PAPER | SCISSOR ", "*"*30, "\n"*2) #Game Banner
num=raw_input(" "*30+"Enter a number greater than 1!")
n=int(num)
if(n==2):
#User input for names of player one and two. With Empty name validation
   p1_name =str(raw_input(" "*30+"Enter Player 1 Name:"))
   while len(p1_name)==0:
       p1_name = str(raw_input(" "*30+"Name cannot be empty! Please Enter Player 1 Name:"))
   p2_name = "A"
   #str(input(" "*30+"Enter Player 2 Name:"))
   while len(p2_name)==0:
       p2_name = str(raw_input(" "*30, "Name cannot be empty! Please Enter Player 2 Name:"))

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

elif(n==3):
   p1_name =str(raw_input(" "*30+"Enter Player 1 Name:"))
   while len(p1_name)==0:
       p1_name = str(raw_input(" "*30+"Name cannot be empty! Please Enter Player 1 Name:"))
   p2_name = str(raw_input(" "*30+"Enter Player 2 Name:"))
   while len(p2_name)==0:
       p2_name = str(raw_input(" "*30, "Name cannot be empty! Please Enter Player 2 Name:"))
   p3_name = str(raw_input(" "*30+"Enter Player 3 Name:"))
   while len(p3_name)==0:
       p3_name = str(raw_input(" "*30, "Name cannot be empty! Please Enter Player 3 Name:"))
   '''Three Rounds in total'''
   for i in range(0,3):
    p1=random.choice(opt)
    p2=random.choice(opt)
    p3=random.choice(opt)
    os.system('cls' if os.name == 'nt' else 'clear')
    print("*"*30, " ROCK | PAPER | SCISSOR ", "*"*30,"\n"*2)
    print(" "*30,"="*10,"Round ",i+1,"="*10)
    print(" "*30,p1_name,": ",p1," ",p2_name,": ",p2," ",p3_name,": ",p3)
    if ["rock", "paper","paper"] == [p1, p2,p3]:
    	p2=random.choice(opt)
    	p3=random.choice(opt)
        if ["rock", "paper"] == [p3, p2]:
          p2c+=1
          print(" "*30,p2_name," Wins!")
        elif ["rock", "scissor"] == [p3, p2]:
          p3c+=1
          print(" "*30,p3_name," Wins!")
        elif ["scissor", "paper"] == [p3, p2]:
          p3c+=1
          print(" "*30, p3_name, " Wins!")
        elif ["scissor", "rock"] == [p3, p2]:
          p2c+=1
          print(" "*30,p2_name, " Wins!")
        elif ["paper", "rock"] == [p3, p2]:
          p3c+=1
          print(" "*30,p3_name, " Wins!")
        elif ["paper", "scissor"] == [p3, p2]:
          p2c+=1
          print(" "*30, p2_name, " Wins!")
        else:
          print(" "*30,"Match Drawn!")
    elif ["rock", "rock","scissor"] == [p1, p2,p3]:
    	p1=random.choice(opt)
    	p2=random.choice(opt)
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
    elif ["rock", "scissor","scissor"] == [p1, p2,p3]:
        p1c+=1
        print(" "*30, p1_name, " Wins!")
    elif ["rock", "paper","rock"] == [p1, p2,p3]:
        p2c+=1
        print(" "*30,p2_name, " Wins!")
    elif ["rock", "rock","paper"] == [p1, p2,p3]:
        p3c+=1
        print(" "*30,p3_name, " Wins!")
    elif ["paper", "paper", "scissor"] == [p1, p2, p3]:
        p3c+=1
        print(" "*30, p3_name, " Wins!")
    elif ["paper", "scissor", "paper"] == [p1, p2, p3]:
        p2c+=1
        print(" "*30, p2_name, " Wins!")    
    elif ["paper", "rock", "rock"] == [p1, p2, p3]:
        p1c+=1
        print(" "*30, p1_name, " Wins!")    
    elif ["scissor", "paper","paper"] == [p1, p2,p3]:
        p1c+=1
        print(" "*30, p1_name, " Wins!")
    elif ["scissor", "scissor","rock"] == [p1, p2,p3]:
        p3c+=1
        print(" "*30,p3_name, " Wins!")
    elif ["scissor", "rock","scissor"] == [p1, p2,p3]:
        p2c+=1
        print(" "*30,p2_name, " Wins!")
    elif ["paper", "paper", "scissor"] == [p1, p2, p3]:
        p3c+=1
        print(" "*30, p3_name, " Wins!")
    elif ["paper", "scissor", "paper"] == [p1, p2, p3]:
        p2c+=1
        print(" "*30, p2_name, " Wins!")    
    elif ["paper", "rock", "rock"] == [p1, p2, p3]:
        p1c+=1
        print(" "*30, p1_name, " Wins!")  
    elif ["rock", "scissor","rock"] == [p1, p2,p3]:
    	p1=random.choice(opt)
    	p3=random.choice(opt)
    	if ["rock", "paper"] == [p1, p3]:
          p3c+=1
          print(" "*30,p3_name," Wins!")
        elif ["rock", "scissor"] == [p1, p3]:
          p1c+=1
          print(" "*30,p1_name," Wins!")
        elif ["scissor", "paper"] == [p1, p3]:
          p1c+=1
          print(" "*30, p1_name, " Wins!")
        elif ["scissor", "rock"] == [p1, p3]:
          p3c+=1
          print(" "*30,p3_name, " Wins!")
        elif ["paper", "rock"] == [p1, p3]:
          p1c+=1
          print(" "*30,p1_name, " Wins!")
        elif ["paper", "scissor"] == [p1, p3]:
          p3c+=1
          print(" "*30, p3_name, " Wins!")
        else:
          print(" "*30,"Match Drawn!")
    elif ["paper", "paper", "rock"] == [p1, p2, p3]:
    	p1=random.choice(opt)
    	p2=random.choice(opt)
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
    elif ["paper", "scissor","scissor"] == [p1, p2,p3]:
    	p2=random.choice(opt)
    	p3=random.choice(opt)
    	if ["rock", "paper"] == [p3, p2]:
          p2c+=1
          print(" "*30,p2_name," Wins!")
        elif ["rock", "scissor"] == [p3, p2]:
          p3c+=1
          print(" "*30,p3_name," Wins!")
        elif ["scissor", "paper"] == [p3, p2]:
          p3c+=1
          print(" "*30, p3_name, " Wins!")
        elif ["scissor", "rock"] == [p3, p2]:
          p2c+=1
          print(" "*30,p2_name, " Wins!")
        elif ["paper", "rock"] == [p3, p2]:
          p3c+=1
          print(" "*30,p3_name, " Wins!")
        elif ["paper", "scissor"] == [p3, p2]:
          p2c+=1
          print(" "*30, p2_name, " Wins!")
        else:
          print(" "*30,"Match Drawn!")
    elif ["paper", "rock", "paper"] == [p1, p2, p3]:
    	p1=random.choice(opt)
    	p3=random.choice(opt)
    	if ["rock", "paper"] == [p1, p3]:
          p3c+=1
          print(" "*30,p3_name," Wins!")
        elif ["rock", "scissor"] == [p1, p3]:
          p1c+=1
          print(" "*30,p1_name," Wins!")
        elif ["scissor", "paper"] == [p1, p3]:
          p1c+=1
          print(" "*30, p1_name, " Wins!")
        elif ["scissor", "rock"] == [p1, p3]:
          p3c+=1
          print(" "*30,p3_name, " Wins!")
        elif ["paper", "rock"] == [p1, p3]:
          p1c+=1
          print(" "*30,p1_name, " Wins!")
        elif ["paper", "scissor"] == [p1, p3]:
          p3c+=1
          print(" "*30, p3_name, " Wins!")
        else:
          print(" "*30,"Match Drawn!")
    elif ["scissor", "paper","scissor"] == [p1, p2,p3]:
    	p1=random.choice(opt)
    	p3=random.choice(opt)
    	if ["rock", "paper"] == [p1, p3]:
          p3c+=1
          print(" "*30,p3_name," Wins!")
        elif ["rock", "scissor"] == [p1, p3]:
          p1c+=1
          print(" "*30,p1_name," Wins!")
        elif ["scissor", "paper"] == [p1, p3]:
          p1c+=1
          print(" "*30, p1_name, " Wins!")
        elif ["scissor", "rock"] == [p1, p3]:
          p3c+=1
          print(" "*30,p3_name, " Wins!")
        elif ["paper", "rock"] == [p1, p3]:
          p1c+=1
          print(" "*30,p1_name, " Wins!")
        elif ["paper", "scissor"] == [p1, p3]:
          p3c+=1
          print(" "*30, p3_name, " Wins!")
        else:
          print(" "*30,"Match Drawn!")
    elif ["scissor", "scissor","paper"] == [p1, p2,p3]:
    	p1=random.choice(opt)
    	p2=random.choice(opt)
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
    elif ["scissor", "rock", "rock"] == [p1, p2, p3]:
    	p2=random.choice(opt)
    	p3=random.choice(opt)
    	if ["rock", "paper"] == [p3, p2]:
          p2c+=1
          print(" "*30,p2_name," Wins!")
        elif ["rock", "scissor"] == [p3, p2]:
          p3c+=1
          print(" "*30,p3_name," Wins!")
        elif ["scissor", "paper"] == [p3, p2]:
          p3c+=1
          print(" "*30, p3_name, " Wins!")
        elif ["scissor", "rock"] == [p3, p2]:
          p2c+=1
          print(" "*30,p2_name, " Wins!")
        elif ["paper", "rock"] == [p3, p2]:
          p3c+=1
          print(" "*30,p3_name, " Wins!")
        elif ["paper", "scissor"] == [p3, p2]:
          p2c+=1
          print(" "*30, p2_name, " Wins!")
        else:
          print(" "*30,"Match Drawn!")
    else:
        print(" "*30,"Match Drawn!")
    if i == 2:
        break
    inp=str(raw_input(" "*30+"Are you ready for next game? (y/n) "))
    if inp=='y':
        continue
    else:
        break
   if((p1c>p2c)&(p1c>p3c)):
       print(" "*30,"Hooray ",p1_name," wins the series!")
   elif((p2c>p1c)&(p2c>p3c)):
       print(" "*30,"Hooray ",p2_name," wins the series!")
   elif((p3c>p1c)&(p3c>p2c)):
       print(" "*30,"Hooray ",p3_name," wins the series!")
   else:
       print(" "*30, "Series Drawn!")
