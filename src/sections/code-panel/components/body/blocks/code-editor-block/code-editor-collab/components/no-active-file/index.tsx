import React from 'react'

const NoActiveFile: React.FC = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <div>
        <h1>No File Chosen</h1>
        <p>Please select a file to display its content.</p>
      </div>
    </div>
  )
}

export default NoActiveFile
