'use client'

import { useState } from "react"
import { db, storage } from "../../firebase/firebase" 
import { collection, addDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useRouter } from "next/navigation"

export default function AddItinerary() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: '',
    tripType: 'adventure',
    imageUrl: ''
  })
  const [image, setImage] = useState(null) 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file) 
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!image) {
      alert("Please select an image.");
      return;
    }
  
    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image); // NO resumable
  
      const downloadURL = await getDownloadURL(snapshot.ref);
  
      await addDoc(collection(db, "itineraries"), {
        ...formData,
        imageUrl: downloadURL,
      });
  
      alert("Itinerary added!");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };
  

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Plan Your Travel Itinerary</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Destination</label>
          <input
            type="text"
            name="destination"
            placeholder="Enter your destination"
            onChange={handleChange}
            value={formData.destination}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            value={formData.startDate}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            onChange={handleChange}
            value={formData.endDate}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Activities</label>
          <textarea
            name="activities"
            placeholder="List of activities"
            onChange={handleChange}
            value={formData.activities}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Trip Type</label>
          <select
            name="tripType"
            onChange={handleChange}
            value={formData.tripType}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="adventure">Adventure</option>
            <option value="leisure">Leisure</option>
            <option value="work">Work</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Itinerary
        </button>
      </form>
    </div>
  )
}
