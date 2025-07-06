export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-accent-primary">
          Session 1 Complete! ✅
        </h1>
        <p className="text-xl text-gray-300">
          Military/Tech Aesthetic Configured
        </p>
        <div className="space-y-4">
          <div className="glass p-6 rounded-lg max-w-md mx-auto">
            <p className="text-accent-secondary">Glassmorphism Effect</p>
          </div>
          <button className="glow-accent px-6 py-3 bg-accent-primary/20 text-accent-primary rounded-lg font-semibold">
            Neon Glow Button
          </button>
        </div>
      </div>
    </div>
  );
}
