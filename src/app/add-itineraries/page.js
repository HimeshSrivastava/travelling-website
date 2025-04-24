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
    try {
      await addDoc(collection(db, "itineraries"), formData)
      alert("Itinerary added!")
      router.push('/') 
    } catch (err) {
      console.error("Error adding itinerary:", err)
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Itinerary</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="destination" placeholder="Destination" onChange={handleChange} value={formData.destination} className="w-full p-2 border" required />
        <input type="date" name="startDate" onChange={handleChange} value={formData.startDate} className="w-full p-2 border" required />
        <input type="date" name="endDate" onChange={handleChange} value={formData.endDate} className="w-full p-2 border" required />
        <textarea name="activities" placeholder="Activities" onChange={handleChange} value={formData.activities} className="w-full p-2 border" required />
        <select name="tripType" onChange={handleChange} value={formData.tripType} className="w-full p-2 border">
          <option value="adventure">Adventure</option>
          <option value="leisure">Leisure</option>
          <option value="work">Work</option>
        </select>
        <input type="text" name="imageUrl" placeholder="Image URL (optional)" onChange={handleChange} value={formData.imageUrl} className="w-full p-2 border" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Itinerary</button>
      </form>
    </div>
  )
}
