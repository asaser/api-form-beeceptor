#!/bin/bash  
  
# Read the user input   
  
echo "Enter name Branch: "  
read git_branch  
echo "Enter commit Message: "
read git_message  
echo  
git add .
git commit -m "$git_message"
git push origin $git_branch