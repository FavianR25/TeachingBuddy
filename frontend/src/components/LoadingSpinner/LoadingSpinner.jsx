export default function LoadingSpinner({ text = 'Generating with AI...' }) {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <span className="loading-text">{text}</span>
    </div>
  )
}
