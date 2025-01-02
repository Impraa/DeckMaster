import blueEyes from '@assets/blueEyes.png';
import pedestal from '@assets/pedestal.png';
import Link from '@components/Link';

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row w-[100dvw] min-h-[85dvh] justify-center items-center">
      <div className="flex flex-col items-center">
        <img src={blueEyes} className='z-10 h-[10em] w-[14em]'/>
        <img src={pedestal} className='mt-[-2em] h-[10em] w-[10em] z-0'/>
      </div>
      <div className="flex flex-col h-full w-[50%] justify-center space-y-5 mb-5">
        <h1 className='text-3xl font-semibold'>Master your deck, dominate the duel!</h1>
        <p className=''>
          Welcome to Deck master, the ultimate hub for Yu-Gi-Oh! deck-building enthusiasts! Whether you&apos;re
          a seasoned duelist or just starting your journey, our platform is designed to help you create, refine,
          and dominate with the perfect deck. Explore a vast database of cards and unleash your creativity with
          easy-to-use tools tailored for every strategy and playstyle. Join our community, share your builds,
          and stay ahead of the competition. Ready to summon victory? Let&apos;s build your masterpiece!
        </p>
        <Link URL='/manage-decklist'>Create deck</Link>
      </div>
  </div>
  );
};

export default Home;
