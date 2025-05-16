( async () => {
  const r = await fetch('/monsters')
  const data = await r.json()
  window.MONSTERS = data.monsters
})()