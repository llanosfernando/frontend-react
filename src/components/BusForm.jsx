export default function BusForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block font-medium">Código del bus</label>
        <input type="text" className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block font-medium">Descripción de la novedad</label>
        <textarea className="w-full border p-2 rounded" rows={4}></textarea>
      </div>
    </div>
  )
}
