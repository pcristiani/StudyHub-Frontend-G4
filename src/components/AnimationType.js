import * as React from 'react';
import { TypeAnimation } from 'react-type-animation';

export default function MyAnimation() {
  const listItems = [
    { strAnimated: "Proyecto 2024 - Grupo 4" },
    { strAnimated: "Tecnólogo en Informática" },
    { strAnimated: "StudyHub" },
  ]

  return (
    <section className="text-gray-400 body-font">
      <div className="text-base leading-tight text-semibold dark:text-gray-300">
        <TypeAnimation
          preRenderFirstString={false}
          sequence={[
            100,
            listItems[0].strAnimated,
            2800,
            listItems[1].strAnimated,
            2800,
            listItems[2].strAnimated,
            3000,
          ]}
          speed={30}
          deletionSpeed={90}
          style={{
            height: '55px',
            fontSize: '0.8em',
            display: 'block',

            // overflow: 'hidden',
            //   wordBreak: 'break-all',
          }}
          repeat={3}
        />
      </div>
    </section>
  );
}