import { useState } from 'react'
import { sections } from './data'
import './index.css'

function App() {
  const [current, setCurrent] = useState(sections[0])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">AI Insight Dashboard</h1>
        </div>
      </header>
      <nav className="bg-white shadow">
        <ul className="flex flex-wrap justify-center p-2">
          {sections.map((sec) => (
            <li key={sec.title} className="mx-1">
              <button
                className={`px-3 py-1 rounded ${current.title === sec.title ? 'bg-indigo-600 text-white' : 'text-indigo-600 hover:bg-indigo-50'}`}
                onClick={() => setCurrent(sec)}
              >
                {sec.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">{current.title}</h2>
        <ul className="space-y-2">
          {current.items.map((item, i) => (
            <li key={i} className="bg-white p-4 rounded shadow">
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {item.name}
                </a>
              ) : (
                <span>{item.name}</span>
              )}
              {item.description && (
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}

export default App
