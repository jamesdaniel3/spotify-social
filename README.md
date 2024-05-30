# Spotify Stats

## Table of contents 
- [Overview](#overview)
- [Setup Instructions](#setup-instructions)
- [Data Models](#data-models)
- [Credits](#credits)


## Overview
This project is a web-based music social media app that allows users to login through Spotify and sync their Spotify data. Users can create customizable profiles that include their favorite songs and artists, interact with other users via forums and messaging, and view their Spotify liked songs, top songs, and top artists.

### Key Features

- **Liked Songs Page**: Displays user’s liked songs with album pictures. Clicking on the song opens the song on Spotify.
	- Status: Complete
- **User’s Top Artists Page**: Displays the user’s top artists for the last 4 weeks, the last 6 months, and the last twelve months. Clicking on an artist's picture opens the artist's profile on Spotify.
	- Status: Complete
- **User’s Top Songs Page:**: Displays the user’s top songs for the last 4 weeks, the last 6 months, and the last twelve months. Clicking on the album picture opens the album on Spotify. 
- Status: Complete
- **User Profile Page:** Allows users to view and edit their profile. They can choose to display artists and songs from their Top/Liked pages. They can also make their profile private (different from their Spotify profile). 
- Status: Not functional
- **Discover Page:**: Allows searching for users in the database with links to view their profiles, and displays recently searched users.
- Status: Not functional
- **Forums Page:**: Displays all discussion boards, which users can click on to access the posts. Forums can also be public or private, have moderators, and allow users to reply and react to posts.
- Status: Not functional
- **Messages Page**: Displays chats with other users on the website and allows users to send messages.
	- Status: Functional with a few bugs 


## Setup Instructions
### Prerequisites
- Node.js
- npm
- A Firebase project setup for database management
- A Spotify for Developers account

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/jamesdaniel3/week-two-project.git
```
2. **Install dependencies**

Using npm, install the project's dependencies in both the backend and frontend:
```bash
cd backend
npm install
```
```bash
cd frontend/spotify-project
npm install
```

3. **Spotify Develop Account Creation**

To run this project, you must have access to a set of credentials from Spotify for developers. To get these credentials, start by navigating to Spotify for developers and either logging in with your Spotify account or making a new account to log in with. After that, go to the developer dashboard and create a project. In the project settings, you should be able to find a client ID and a client secret. 
Create a .env file in the backend directory of your project under the names CLIENT_ID and CLIENT_SECRET. Additionally, add REDIRECT_URI to the file with the value http://localhost:8888/callback
After adding the callback URI to your .env file, make sure to copy and paste the URI under the redirect URIs section of the project in settings and save.
Finally, navigate to the user management section of settings and add your name and the email associated with your spotify account, as well as the emails and names of any other users you would like to be able to log in.  
4. **Firebase Configuration**
Navigate to the Firebase console and set up a new project if you haven't already.
Register your app with Firebase and obtain your project's Firebase configuration object. Save this file as permissions.js in your backend directory. 
5. **Start the development server**

Open two different terminals. In the first, run the following commands:
```bash
cd backend
npm start
```

In the second terminal, run the following commands:
```bash
cd frontend/spotify-project
npm run dev
```
The backend server should now be running on port 8888, and the development server should be running on post 5173.


## Data Models
### chats
```javascript
{
  messages:[
    0: “Example1”,
    1: “Example2”,
    2: “Example3”,
]
  participants: {
    0: "/users/reference1",
    1: "/users/reference2"
  }
}
```
### messages
```javascript
{
  content: “ExampleContent”,
  sender: “/users/reference1”,
  timestamp: “ISOString”
}
```
### forums
```javascript
{
  user: “/users/reference1”,
  subject: “ExampleSubject”,
  message: “ExampleMessage”,
  upvotes: 0,
  replies: {
    0: {
      user: “/users/reference1”,
      message: “ExampleReply”,
      upvotes: 1
    }
  }
}
```

### users
```javascript
{
  display_name:  “ExampleName”,
  displayed_artists:[
    0: “ExampleArtist1”,
    1: “ExampleArtist2”,
    2: “ExampleArtist3”,
],
  displayed_songs:[
    0: “ExampleSong1”,
    1: “ExampleSong2”,
    2: “ExampleSong3”,
],
  followers: 0,
  open_for_messages: false,
  private_page: false,
  recently_seen:[
    0: “ExampleUser1”,
    1: “ExampleUser2”,
    2: “ExampleUser3”,
]

}
```


## Credits 
- James Daniel, https://github.com/jamesdaniel3 
- Margaret Laflam, https://github.com/mlaflam 
- Moiassr Mohamed, https://github.com/Moiassr 
- Nazifa Rahman, https://github.com/cxx5qn 
- Stella Tsogtjargal, https://github.com/stellatsogtjargal 