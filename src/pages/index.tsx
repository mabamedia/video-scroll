import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    const gradient = gsap.to(".gradient-overlay", {
      opacity: 1,
      scrollTrigger: {
        trigger: '.video-container',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    if (video) {
      const duration = video.duration;
      gsap.to(video, {
        scrollTrigger: {
          trigger: '.video-container',
          start: 'top top',
          end: `500+=${duration * 20}px`,
          scrub: true,
          pin: false,
          anticipatePin: 1,
        },
        currentTime: duration,
        ease: 'none',
      });
    }

    ScrollTrigger.create({
      trigger: '.website-content',
      start: 'top top',
      onEnter: () => gsap.to('.navbar', { mixBlendMode: 'difference', duration: 1 }),
      onLeaveBack: () => gsap.to('.navbar', { mixBlendMode: 'normal', duration: 1 })
    })

    ScrollTrigger.create({
      trigger: '.video-container',
      start: 'top top',
      end: 'bottom top',
      onEnterBack: () => gsap.to('.navbar', { mixBlendMode: 'normal', duration: 1 })
    })
  }, []);

  return (
    <>
      <nav className='navbar fixed top-0 w-screen z-[9999]'>
        <div className="container mx-auto px-11 lg:px-0 flex justify-between py-8 items-center">
          <div>
            <h1 className="font-bold text-3xl">Logo</h1>
          </div>
          <div className="text-white">
            Links
          </div>
        </div>
      </nav>

      <section className="video-container">
        <video ref={videoRef} src="/woman.mp4" className="w-full h-full object-cover" />
        <div className="gradient-overlay fixed top-0 left-0 w-full h-screen z-10 pointer-events-none"></div>
      </section>

      <section className="gradient [background:linear-gradient(180deg,_rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)] w-screen h-screen" />

      <section className="website-content h-screen">
        <div className="bg-black h-full pt-[107px]">
          <h1 className="text-8xl font-bold tracking-[-0.02em] text-white">Hallo!</h1>
        </div>

        <div className="bg-white h-full pt-[107px]">
          <h1 className="text-8xl font-bold tracking-[-0.02em] text-black">Hello!!!</h1>
        </div>
      </section>
    </>
  );
}

export default Home;
