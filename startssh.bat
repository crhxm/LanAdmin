@echo off
start /B "SSH Agent" "D:\Program Files\Git\usr\bin\ssh-agent.exe"
ssh-add "C:\Users\Administrator\.ssh\id_rsa"