export default function InstagramCard() {
  const posts = [
    "https://www.instagram.com/p/DPDJPv_iXsJ/",
    "https://www.instagram.com/p/DPAjZxoEv7P/",
    "https://www.instagram.com/p/DOunwFFkvij/",
    "https://www.instagram.com/p/DPAh7kjkvTC/",
    "https://www.instagram.com/p/DO4uybGkraF/",
    "https://www.instagram.com/p/DO4sOCwEiLM/",
    "https://www.instagram.com/p/DOunwFFkvij/"
  ];

  // Duplicate posts for seamless loop
  const duplicatedPosts = [...posts, ...posts];

  return (
    <div className="py-8 w-full overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="flex animate-scroll">
        {duplicatedPosts.map((url, index) => (
          <div key={index} className="flex-shrink-0 mx-3">
            <div className="w-80 h-96 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <iframe
                src={`${url}embed`}
                width="328"
                height="400"
                allowTransparency={true}
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 'use client';

// import Marquee from 'react-fast-marquee';
// import { InstagramEmbed } from 'react-social-media-embed';

// export default function InstagramCard() {
//   return (
//     <div className="py-8 w-full">
//       <Marquee
//         speed={10}
//         gradient={false}
//         pauseOnHover={false}
//         pauseOnClick={false}
//         className='w-full'
//       >
//         <div className="mx-3">
//           <InstagramEmbed url="https://www.instagram.com/p/DPDJPv_iXsJ/" width={328} />
//         </div>
//         <div className="mx-3">
//           <InstagramEmbed url="https://www.instagram.com/p/DPAjZxoEv7P/" width={328} />
//         </div>
//         <div className="mx-3">
//           <InstagramEmbed url="https://www.instagram.com/p/DOunwFFkvij/" width={328} />
//         </div>
//         <div className="mx-3">
//           <InstagramEmbed url="https://www.instagram.com/p/DPAh7kjkvTC/" width={328} />
//         </div>
//         <div className="mx-3">
//           <InstagramEmbed url="https://www.instagram.com/p/DO4uybGkraF/" width={328} />
//         </div>
//         <div className="mx-3">
//           <InstagramEmbed url="https://www.instagram.com/p/DO4sOCwEiLM/" width={328} />
//         </div>
//         <div className="mx-3">
//           <InstagramEmbed url="https://www.instagram.com/p/DOunwFFkvij/" width={328} />
//         </div>
//       </Marquee>
//     </div>
//   );
// }