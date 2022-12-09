# Cheat-Chat App

A Full Stack Chatting App with OTP based(passwordless) authentication and uses Socket.io for real time communication.

An application requires passwordless authentication backend module.

Link for authentication Module: 
https://github.com/Gopi1422/SMS-based-Passwordless-Authentication.git

## Tech Stack

**Client:** React JS

**Server:** Node JS, Express JS

**Database:** Mongo DB
  
## Run Locally

### 1. Start Authentication Module:

Clone the Passwordless Authentication Project

```bash
  git clone https://github.com/Gopi1422/SMS-based-Passwordless-Authentication.git
```

Go to the project directory

```bash
  cd SMS-based-Passwordless-Authentication
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

### 2. Start Main(Chatroom) Module:

Clone the project

```bash
  git clone https://github.com/Gopi1422/CheatChat.git
```

Go to the project directory

```bash
  cd CheatChat
```

Install dependencies

```bash
  npm install
```

```bash
  cd frontend/
  npm install
```

Start the server

```bash
  npm run start
```
Start the Client

```bash
  //open new terminal
  cd frontend
  npm start
```

### 3. Start Nginx:

Download latest stable version of Nginx from http://nginx.org/en/download.html. Here I have downloaded nginx-1.22.0.

Unzip the folder and go to the nginx-1.22.0 directory and start the cmd in the same location.

Go to the /conf directory and replace nginx.conf file with file: [nginx.conf](https://github.com/Gopi1422/CheatChat/blob/7b45ea5c40abc01eae43e305b54d2001626070ee/nginx.conf)

To Start Nginx, run below command in cmd

```bash
start nginx
```

### 4. Run Project in Browser:

Open any browser and run project on http://localhost
  
# Features

#### Authenticaton
Login:


![Output-1](https://github.com/Gopi1422/CheatChat/blob/651c5d5566a987add57e35f857e5005ee56a3caa/output/1.png)

SignUp: 

![Output-2](https://github.com/Gopi1422/CheatChat/blob/651c5d5566a987add57e35f857e5005ee56a3caa/output/2.png)

#### Real Time Chatting with Typing indicators

![Output-4](https://github.com/Gopi1422/CheatChat/blob/651c5d5566a987add57e35f857e5005ee56a3caa/output/4.png)

#### One to One chat

![Output-3](https://github.com/Gopi1422/CheatChat/blob/651c5d5566a987add57e35f857e5005ee56a3caa/output/3.png)

#### Search Users

![Output-8](https://github.com/Gopi1422/CheatChat/blob/651c5d5566a987add57e35f857e5005ee56a3caa/output/8.png)

#### Create Group Chats

![Output-5](https://github.com/Gopi1422/CheatChat/blob/651c5d5566a987add57e35f857e5005ee56a3caa/output/5.png)

#### Add or Remove users from group

![Output-6](https://github.com/Gopi1422/CheatChat/blob/651c5d5566a987add57e35f857e5005ee56a3caa/output/6.png)

#### View Other user Profile

![Output-9](https://github.com/Gopi1422/CheatChat/blob/651c5d5566a987add57e35f857e5005ee56a3caa/output/9.png)
  
