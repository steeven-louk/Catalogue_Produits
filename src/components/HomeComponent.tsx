import HeaderComponent from './HeaderComponent'
import FiltreComponent from './FiltreComponent'
import CardComponent from './CardComponent'

const HomeComponent = () => {
  return (
    <div>
        <HeaderComponent/>
        <div className="flex">
            <FiltreComponent/>
            <CardComponent/>
        </div>
    </div>
  )
}

export default HomeComponent