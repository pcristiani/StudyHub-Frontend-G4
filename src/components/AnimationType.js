// import React from 'react';
import { TypeAnimation } from 'react-type-animation';

export function MyAnimation() {
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
            // wordBreak: 'break-all',
          }}
          repeat={3}
        />
      </div>
    </section>
  );
}


export function MyAnimation2() {
  const listItemss = [
    { strAnimated: "StudyHub" },
    { strAnimated: "Este proyecto fue realizado por el Grupo 4 del Tecnólogo en Informática." },
    { strAnimated: "Integrantes:" },]

  let integrantes = {
    "name1": `Camila Firpo `, "name2": `Enzo Gularte `, "name3": `Facundo Alvez `, "name4": ` Javier Rydel `,
    "name5": ` Pablo Cristiani `, "name6": ` Pedro Aldama `, "name7": ` Sebastián González `,
  };

  return (
    <section className="text-gray-400 body-font">
      <div className="text-base leading-tight text-semibold dark:text-gray-300">
        <TypeAnimation
          preRenderFirstString={false}
          sequence={[
            100,
            listItemss[0].strAnimated,
            2800,
          ]}
          speed={50}
          deletionSpeed={90}
          style={{
            height: '55px',
            fontSize: '1.1em',
            marginTop: '50px',
            display: 'block',
            fontStyle: 'bold',
          }}
          repeat={1}
        />
        <TypeAnimation
          preRenderFirstString={false}
          sequence={[
            1800,
            listItemss[1].strAnimated,
            2500,
          ]}
          speed={50}
          deletionSpeed={90}
          style={{
            height: '45px',
            fontSize: '0.4em',
            display: 'block',
            marginTop: '10px',
          }}
          cursor={false}
          repeat={1}
        />
        <TypeAnimation
          sequence={[
            1800,
            listItemss[2].strAnimated,
            2800,
          ]}
          speed={50}
          deletionSpeed={90}
          cursor={false}
          style={{ fontSize: '0.4em', display: 'block', }}
          repeat={1}
        />

        {/* INTEGRANTES GRUPO 4 */}
        <TypeAnimation
          sequence={[3100,
            integrantes.name1,
            // 2000,
          ]}
          speed={150}
          cursor={false}
          style={{ marginTop: '10px', fontSize: '0.4em', display: 'block', }}
        />
        <TypeAnimation
          sequence={[3100,
            integrantes.name2,
            // 2000,
          ]}
          cursor={false}
          speed={150} style={{ fontSize: '0.4em', display: 'block', }}
        />
        <TypeAnimation
          sequence={[3100,
            integrantes.name3,
            // 2000,
          ]}
          cursor={false}
          speed={150} style={{ fontSize: '0.4em', display: 'block', }}
        />
        <TypeAnimation
          sequence={[3100,
            integrantes.name4,
            // 2000,
          ]}
          cursor={false}
          speed={150} style={{ fontSize: '0.4em', display: 'block', }}
        />
        <TypeAnimation
          sequence={[3100,
            integrantes.name5,
            // 2000,
          ]}
          speed={150} style={{ fontSize: '0.4em', display: 'block', }}
          cursor={false}

        />
        <TypeAnimation
          sequence={[3100,
            integrantes.name6,
            // 2000,
          ]}
          speed={150} style={{ fontSize: '0.4em', display: 'block', }}
          cursor={false}

        />
        <TypeAnimation
          cursor={false}
          sequence={[3100,
            integrantes.name7,
            // 2000,
          ]}
          speed={150} style={{ fontSize: '0.4em', display: 'block', }} />
      </div>
    </section>
  );
}

// export default { MyAnimation2, MyAnimation };