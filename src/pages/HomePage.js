import Typography from '@mui/joy/Typography';
import logo from '../img/logo.png';
import Container from '@mui/joy/Container';
import Box from '@mui/joy/Box';
import { MyAnimationStudyHub } from '../components/common/AnimationType';
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Sheet from '@mui/joy/Sheet';
import { UI } from '../services/util/constants';

// debugger;

const HomePage = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // Puede iniciar la instancia de TsParticles (motor) aquí, agregando formas o preajustes personalizados
      // Esto carga el paquete del paquete TSParticles, es el método más fácil para preparar todo
      // A partir de V2 puede agregar solo las características que necesita reducir el tamaño del paquete
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    // console.log(container);

  };

  const options = useMemo(
    () => ({
      background: {
        color: {
          //  value: "#0b0d0e",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff",
        },
        links: {
          color: "#53a7b9",
          distance: 150,
          enable: true,
          opacity: 0.8,
          width: 1.4,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 6,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 5 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (init) {
    return (

      <Box sx={{ marginTop: UI.mtop, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
        <div sx={{ m: 19, bgcolor: 'secondary.main' }}>
          <img src={logo} className="scale-animation" alt="logo" />
        </div>

        <br></br>
        {/*   <h1 className="focus-ring-primary" component="h1" >
          StudyHub
        </h1>
        <h6 className="focus-ring-primary" component="h1" >
          Novedades
        </h6> */}
        <Sheet>
        </Sheet>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 className="focus-ring-primary" component="h1" >
            <div>
              <h1 className="focus-ring-primary" component="h1"
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '18px' }}>
                <MyAnimationStudyHub />
              </h1>
            </div>
          </h1>
        </Box>


      </Box>
    );
  }

  return <></>;
};
export default HomePage;

// <>
//   <div id="demo_dark-mode-by-default">
//     <Container component="main" maxWidth="xs">
//       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
//         <div sx={{ m: 19, bgcolor: 'secondary.main' }}>
//           <img src={logo} className="scale-animation" alt="logo" />
//         </div>
//         <br></br>
//         <Typography className="text-dark focus-ring-primary" component="h1" >
//           <MyAnimation />
//         </Typography>
//       </Box>
//     </Container>
//   </div>
// </>