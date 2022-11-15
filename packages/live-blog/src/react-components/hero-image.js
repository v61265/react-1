import styled from 'styled-components'

const Img = styled.img`
  width: 100%;
  height: 484px;
  object-fit: cover;

  @media (max-width: 767px) {
    height: 250px;
  }
`

export default function HeroImage({ image }) {
  return (
    <div>
      <Img
        src={image.url}
        alt={image.name}
      />
    </div>
  )
}
