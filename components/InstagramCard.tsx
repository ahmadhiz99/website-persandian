'use client';

import Marquee from 'react-fast-marquee';
import { InstagramEmbed } from 'react-social-media-embed';

export default function InstagramCard() {
  return (
    <div className="py-8 w-full">
      <Marquee
        speed={10}
        gradient={false}
        pauseOnHover={false}
        pauseOnClick={false}
        className='w-full'
      >
        <div className="mx-3">
          <InstagramEmbed url="https://www.instagram.com/p/DPDJPv_iXsJ/" width={328} />
        </div>
        <div className="mx-3">
          <InstagramEmbed url="https://www.instagram.com/p/DPAjZxoEv7P/" width={328} />
        </div>
        <div className="mx-3">
          <InstagramEmbed url="https://www.instagram.com/p/DOunwFFkvij/" width={328} />
        </div>
        <div className="mx-3">
          <InstagramEmbed url="https://www.instagram.com/p/DPAh7kjkvTC/" width={328} />
        </div>
        <div className="mx-3">
          <InstagramEmbed url="https://www.instagram.com/p/DO4uybGkraF/" width={328} />
        </div>
        <div className="mx-3">
          <InstagramEmbed url="https://www.instagram.com/p/DO4sOCwEiLM/" width={328} />
        </div>
        <div className="mx-3">
          <InstagramEmbed url="https://www.instagram.com/p/DOunwFFkvij/" width={328} />
        </div>
      </Marquee>
    </div>
  );
}