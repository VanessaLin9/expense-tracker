function dateStyle(date) {
  return date.toLocaleDateString({ year: 'numeric', month: '2-digit', day: '2-digit' })
}



module.exports = dateStyle