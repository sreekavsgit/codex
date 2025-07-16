import { useState } from 'react'
import { plants } from './plants'
import './index.css'

function App() {
  const [category, setCategory] = useState(null)
  const [selected, setSelected] = useState({})

  const togglePlant = (name) => {
    setSelected(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const selectedPlants = Object.keys(selected).filter(k => selected[k])

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <header className="bg-green-700 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Grow Your Dream Garden</h1>
        <p className="mb-6">Plan what to grow at home</p>
        <div className="space-x-4">
          <button className="bg-white text-green-700 px-4 py-2 rounded shadow" onClick={() => setCategory(null)}>Start Planning</button>
        </div>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        {!category && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {plants.map(cat => (
              <div key={cat.category} className="p-6 bg-white rounded shadow hover:shadow-lg cursor-pointer" onClick={() => setCategory(cat)}>
                <h2 className="text-xl font-semibold">{cat.category}</h2>
              </div>
            ))}
          </div>
        )}

        {category && (
          <div>
            <button className="text-sm text-blue-600" onClick={() => setCategory(null)}>&larr; Back</button>
            <h2 className="text-2xl font-semibold mt-2 mb-4">{category.category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map(item => (
                <label key={item.name} className="flex items-center space-x-2 p-4 bg-white rounded shadow">
                  <input type="checkbox" className="h-4 w-4" checked={!!selected[item.name]} onChange={() => togglePlant(item.name)} />
                  <span>{item.name} <span className="text-sm text-gray-500">({item.season})</span></span>
                </label>
              ))}
            </div>
          </div>
        )}

        {selectedPlants.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Selected Plants</h3>
            <ul className="list-disc list-inside">
              {selectedPlants.map(name => (
                <li key={name}>{name}</li>
              ))}
            </ul>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded" onClick={() => alert('Email sent (simulated)!')}>Email Plan</button>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
