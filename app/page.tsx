import Image from "next/image";
import BlurText from '@/components/BlurText';
import Squares  from '@/components/Squares';
import MotionWrapper from "@/components/MotionWrapper";
import Link from "next/link";
import TaskCard from "@/components/TaskCard";
import InstagramCard from "@/components/InstagramCard";
import SplitText from "@/components/SplitText";
import { FaAddressBook } from "react-icons/fa";
import { MdTrackChanges } from "react-icons/md";

export default function Home() {
  return (
      <main className="">
        <MotionWrapper direction="up">
        <section id="banner" className="flex flex-col items-center justify-center h-screen bg-radial from-[#031A65] to-[#00061B]">
          <div className="h-screen w-full absolute">
            <Squares 
              speed={0.1} 
              squareSize={40}
              direction='diagonal' // up, down, left, right, diagonal
              borderColor='#45678c'
              hoverFillColor='#4768fc'
              />
          </div>
         
          <h1 className="font-bold text-4xl sm:text-6xl max-w-4xl text-center text-white">
              <BlurText
                text="BIDANG PERSANDIAN"
                delay={500}
                animateBy="words"
                direction="left"
                className="my-blur-text text-center justify-center" 
                animationFrom={null}
                animationTo={null}
                onAnimationComplete={null}
              />
          </h1> 

          <h1 className="z-20 font-regular max-w-4xl text-center text-white">
          <SplitText
            text="Dinas Komunikasi, Informatika dan Persandian Kabupaten Barito Utara"
            className="text-xl font-thin text-center"
            delay={100}
            duration={0.9}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={null}
          />
          </h1>
         
          <MotionWrapper direction="up">
          <div className="flex gap-2 justify-center pt-6 px-2 ">
            <Link href="/tte" className="flex gap-2 items-center z-10 bg-blues text-white border px-4 py-6 rounded-md  hover:cursor-pointer hover:scale-98 animation-all duration-300 hover:bg-yellows hover:text-blues hover:rounded-xl hover:border-yellows">
              <FaAddressBook size={40} />
              <h5 className="text-sm">
                Layanan Tanda Tangan elektronik (TTE)
              </h5>
            </Link>
            <Link href="/tracking" className="flex gap-2 items-center z-10 bg-blues text-white border px-4 py-6 rounded-md  hover:cursor-pointer hover:scale-98 animation-all duration-300 hover:bg-yellows hover:text-blues hover:rounded-xl hover:border-yellows">
              <MdTrackChanges size={40} />
              <h5 className="text-sm">
                Tracking Tanda Tangan elektronik (TTE)
              </h5>
            </Link>
          </div>
          </MotionWrapper>
          
          <div className="my-2"></div>
          <MotionWrapper direction="up">
          <div className="flex justify-center pt-6 ">
            <Link href="/#task" className="btn-alpha z-10 bg-yellows text-blues px-4 py-1 rounded-full  hover:cursor-pointer hover:px-10 hover:font-bold">
              View More
            </Link>
          </div>
          </MotionWrapper>

        </section>
</MotionWrapper>

<MotionWrapper direction="up">
        <section id="task" className="flex flex-col items-center pb-10 px-10 pt-30 bg-[#FAFAFA]">
          <h1 className="text-bold font-black text-2xl">TUGAS BIDANG</h1>

          <TaskCard />
          
        </section>
</MotionWrapper>

<MotionWrapper direction="up">
        <section id="visi" className="items-center gap-8 justify-center py-20 px-10 bg-radial from-[#031A65] to-[#00061B]">
          <h1 className="font-bold text-4xl text-center text-white mb-4">
              Visi
          </h1>
          <h2 className="font-thin text-center text-white under italic">
            &quot;
            Terwujudnya Masyarakat Barito Utara yang religius, mandiri dan 	sejahtera melalui percepatan peningkatan pembangunan di bidang 	sumber daya manusia, Infrastruktur dan ekonomi kerakyatan
            &quot;
          </h2>
          
        </section>
</MotionWrapper>

<MotionWrapper direction="up">
        <section id="infografis" className="flex flex-col items-center py-10 px-10 bg-[#FAFAFA]">

          <div className="flex items-center gap-6">
            <h1 className="font-bold text-4xl">INFOGRAFIS</h1>
          </div>
          
          <InstagramCard />
          
        </section>
</MotionWrapper>

<MotionWrapper direction="up">
         <section id="our-team" className="flex-col items-center gap-8 justify-center py-20 px-10 bg-radial from-[#031A65] to-[#00061B]">
          <h1 className="font-bold text-4xl text-center text-white">
            OUR TEAM
          </h1>
           <div className="w-full my-4 relative h-[200px] md:h-[300px] lg:h-[400px]">
              <Image 
                src="/assets/images/foto-team.jpg" 
                alt="Foto Team Persandian dan Statistik" 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                className="object-cover"
                priority={true}
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />
            </div>
        </section>
</MotionWrapper>

<MotionWrapper direction="up">

        <section id="activities" className="flex flex-col items-center py-10 px-10 bg-[#FAFAFA]">

          <div className="gap-6 text-center">
            <h1 className="font-bold text-4xl">KEGIATAN</h1>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:grid-cols-4 md:gap-4 p-2 max-w-4xl mt-10 ">
           
              <div className="relative h-[200] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105 hover:rounded-xl">
                <Image
                  src="/assets/images/carousel/carousel-1.jpg" 
                  alt="images"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <div className="relative h-[200] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105 hover:rounded-xl">
                <Image
                  src="/assets/images/carousel/carousel-2.jpg" 
                  alt="images"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <div className="relative h-[200] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105 hover:rounded-xl">
                <Image
                  src="/assets/images/carousel/carousel-3.jpg" 
                  alt="images"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <div className="relative h-[200] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105 hover:rounded-xl">
                <Image
                  src="/assets/images/carousel/carousel-4.jpg" 
                  alt="images"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <div className="relative h-[200] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105 hover:rounded-xl">
                <Image
                  src="/assets/images/carousel/carousel-5.jpg" 
                  alt="images"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <div className="relative h-[200] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105 hover:rounded-xl">
                <Image
                  src="/assets/images/carousel/carousel-6.jpg" 
                  alt="images"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <div className="relative h-[200] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105 hover:rounded-xl">
                <Image
                  src="/assets/images/carousel/carousel-7.jpg" 
                  alt="images"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>
              <div className="relative h-[200] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105 hover:rounded-xl">
                <Image
                  src="/assets/images/carousel/carousel-8.jpg" 
                  alt="images"
                  fill
                  className="object-cover"
                  quality={100}
                />
              </div>

          </div>
        </section>
</MotionWrapper>

      </main>
  );
}
