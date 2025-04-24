'use client'

import { useEffect, useState } from "react"
import { collection, getDocs, doc, updateDoc  } from "firebase/firestore"
import { db } from "../firebase/firebase"
import useAuth from "../component/AuthenticationCheck"
import { useRouter } from "next/navigation"

export default function ItineraryList() {
  const router=useRouter();
  const [user,loading]= useAuth();
  const [itineraries, setItineraries] = useState([]);
  const [searchByDestin,setSearchByDestin]=useState("");
  const [searchByTripTyp,setSearchByTripTyp]=useState("");

  useEffect(() => {
    const fetchItineraries = async () => {
      const snapshot = await getDocs(collection(db, "itineraries"))
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      setItineraries(data)
    }
    fetchItineraries()
  }, [setSearchByDestin,setSearchByTripTyp])

const handleFavorite = async (id, currentStatus) => {
    console.log(id);
  const docRef = doc(db, "itineraries", id)
  
 
  await updateDoc(docRef, {
    isFavorite: !currentStatus
  })


  setItineraries(prev =>
    prev.map(item =>
      item.id === id ? { ...item, isFavorite: !currentStatus } : item
    )
  )
}


  const filterItineraries= itineraries.filter((item)=>
    item.destination.toLowerCase().includes(searchByDestin.toLowerCase()) &&
    item.tripType.toLowerCase().includes(searchByTripTyp.toLowerCase())
)

  return (
    <div className="p-4">
      <div className="flex justify-between">
      <h1 className="text-3xl font-bold mb-6">All Itineraries</h1>
      <button onClick={()=>user ? router.push("/add-itineraries") : alert("Login or Signup to use Functionality")}>Add one More trip</button>
      </div>
      <div className="flex gap-12">
      <input
        type="text"
        placeholder="Search by destination"
        value={searchByDestin}
        onChange={e => setSearchByDestin(e.target.value)}
        className="mb-4 p-2 border w-full rounded"
      />
      <input
        type="text"
        placeholder="Search by trip type"
        value={searchByTripTyp}
        onChange={e => setSearchByTripTyp(e.target.value)}
        className="mb-4 p-2 border w-full rounded"
      />

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterItineraries.map(itinerary => (
          <div key={itinerary.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{itinerary.destination}</h2>
            <p><strong>From:</strong> {itinerary.startDate}</p>
            <p><strong>To:</strong> {itinerary.endDate}</p>
            <p><strong>Activities:</strong> {itinerary.activities}</p>
            <p><strong>Type:</strong> {itinerary.tripType}</p>
            {filterItineraries.imageUrl && (
              <img src={`${itinerary.imageUrl}`} alt="Trip" className="mt-2 w-full h-48 object-cover rounded" />
            )}
            <button
            onClick={()=>user ? handleFavorite(itinerary.id, itinerary.isFavorite): alert("Login or Signup to use functionality")}
            className={`px-3 py-1 rounded ${itinerary.isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
             >
            {itinerary.isFavorite ? '❤️ Favorited' : '🤍 Add to Favorite'}
            </button>

          </div>
        ))}
      </div>
    </div>
  )
}
