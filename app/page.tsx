import NameCard from './components/namecard';
import NamOrt from './components/namort';
import MenuBox from './components/menukotak';
import MenuBox2 from './components/menukotak2';
import Diskusi from './components/frdiskusi';
import BarBawah from './components/barbottom';

export default function Home() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen"> 
      <NamOrt />
      <div className="px-4">
        <NameCard />
      </div>
      <div className="px-4">
        <MenuBox />
      </div>
      <div className="px-4">
        <MenuBox2 />
      </div>
      <div className="px-4">
        <Diskusi />
      </div>
      <BarBawah />
    </div>
  );
}