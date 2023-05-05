const Skill = props => {
  const {eachItem} = props
  const {imageUrl, name} = eachItem
  return (
    <li key={name}>
      <div className="skill-card1">
        <img className="skill-img1" src={imageUrl} alt={name} />
        <h1 className="skill-heading">{name}</h1>
      </div>
    </li>
  )
}
export default Skill
