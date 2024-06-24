import logo from '../img/logohd.png'
import Box from '@mui/joy/Box';
import { MyAnimationStudyHub } from '../components/common/AnimationType';
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Sheet from '@mui/joy/Sheet';
import { UI } from '../services/util/constants';


///
// debugger;
const HomePage = () => {
  const [init, setInit] = useState(false);


  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
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
  //    fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          push: {
            quantity: 2,
          },
          grab: {
            "distance": 250,
            "line_linked": {
              "opacity": 1
            }
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
          speed: 2,
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
      <Box sx={{ display: 'flex',verticalAlign:'center', flexDirection: 'column', alignItems: 'center', }}>
        <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <div sx={{ m: 10, bgcolor: 'secondary.main' }}>
            <img src={logo} className="scale-animation" alt="logo" />
          </div>
          {/* <br></br> */}
          <Sheet sx={{ background: 'none', flexDirection: 'column', alignItems: 'center', }}>
            <h1 className="focus-ring-primary" component="h1" >
              <MyAnimationStudyHub />
            </h1>
          </Sheet>
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