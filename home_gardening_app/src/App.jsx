import { useState } from 'react'
import { plants } from './plants'
import './index.css'

function App() {
  const [category, setCategory] = useState(null)
  const [selected, setSelected] = useState({})

  const emailPlan = () => {
    const body = Object.keys(selected)
      .filter(k => selected[k])
      .map(name => `- ${name}`)
      .join('%0D%0A')
    window.location.href = `mailto:?subject=My%20Garden%20Plan&body=${body}`
  }

  const printPlan = () => {
    window.print()
  }

  const togglePlant = (name) => {
    setSelected(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const selectedPlants = Object.keys(selected).filter(k => selected[k])

  return (
    <div className="min-h-screen text-gray-800 bg-green-50/70 backdrop-blur-sm">
      <header className="bg-gradient-to-br from-green-700/80 to-lime-600/80 text-white py-20 text-center">
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
              <label key={item.name} className="flex items-center space-x-3 p-4 bg-white/80 rounded shadow">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={!!selected[item.name]}
                  onChange={() => togglePlant(item.name)}
                />
                <img src={item.image} alt={item.name} className="h-12 w-12 object-cover rounded" />
                <span>{item.name} <span className="text-sm text-gray-500">({item.season})</span></span>
              </label>
            ))}
          </div>
        </div>
      )}

        {selectedPlants.length > 0 && (
          <div className="mt-8 p-4 bg-white/80 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Your Plan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedPlants.map(name => {
                const plant = plants.flatMap(p => p.items).find(i => i.name === name)
                return (
                  <div key={name} className="flex items-center space-x-3 border rounded p-2 bg-white">
                    <img src={plant.image} alt={name} className="h-12 w-12 object-cover rounded" />
                    <span>{name}</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 space-x-2">
              <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={emailPlan}>Email Plan</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={printPlan}>Print</button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
