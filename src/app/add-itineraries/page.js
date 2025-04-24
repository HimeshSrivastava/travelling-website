'use client'
import { useState } from "react"
import { db } from "../../firebase/firebase"
import { collection, addDoc } from "firebase/firestore"
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.imageUrl) {
      alert("Please provide a valid image URL.")
      return
    }

    try {
      await addDoc(collection(db, "itineraries"), {
        ...formData,
      })

      alert("Itinerary added!")
      router.push("/")
    } catch (error) {
      console.error("Error:", error)
      alert("Something went wrong.")
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto mt-3 bg-white rounded-xl shadow-lg">
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
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter a valid image URL"
            onChange={handleChange}
            value={formData.imageUrl}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
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
