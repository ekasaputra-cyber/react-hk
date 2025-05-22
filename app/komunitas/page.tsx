import CommunityPage from '../components/komunitas';
import BarBawah from '../components/barbottom';

export default function Home() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-16"> 
      <CommunityPage />
      <div className="">
          <BarBawah />
      </div>
    </div>
    
  );
}