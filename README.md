# ✈️ Travel Itinerary Planner

A full-stack travel itinerary planner built using **Next.js**, **Firebase (Firestore )**, and **Tailwind CSS**. This project allows users to plan their trips by adding destination details, travel dates, activities, and uploading an image for each trip.

## 📸 Demo

> 🧭 View a sample trip card [https://travelling-website-2vf1akaat-himeshsrivastavas-projects.vercel.app/].

## 🚀 Features

- only authenticate user can use functionality.
- not authenticate can only view it.
- Add itinerary with:
  - Destination
  - Start and end dates
  - Trip type (Adventure, Leisure, Work)
  - Activities
  - Image upload (external valid URL)
- Store itineraries in **Firebase Firestore**
- use image URL
- Display trips with responsive UI using Tailwind CSS
- Authenticate user can save trip to favorite.


## 🛠️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Firebase
- **Database:** Firebase Firestore

## 🔧 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/HimeshSrivastava/travelling-website.git
   cd travelling-website
   npm install
2. Setup Firebase

* Create a Firebase project.
* Enable Firestore and Storage.
* Add web app credentials to firebase.js.

3. Environment Variables

  Create a .env.local file with:
  ```js
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
     NEXT_PUBLIC_API_URL=http://localhost:3000
  ```
4. Run the app
  ```js
      npm run dev
  ```

## 🧑‍💻 Author
* Himesh Srivastava



