import NameCard from './components/namecard';
import NamOrt from './components/namort';
import MenuBox from './components/menukotak';
import MenuBox2 from './components/menukotak2';
import Diskusi from './components/frdiskusi';
import BarBawah from './components/barbottom';


export default function Home() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-16"> 
      <NamOrt />
      <div className="">
        <NameCard />
      </div>
      <div className="">
        <MenuBox />
      </div>
      <div className="pt-8">
        <MenuBox2 />
      </div>
      <div className="">
        <Diskusi />
      </div>
      <div className="">
        <BarBawah />
      </div>
    </div>
  );
}
