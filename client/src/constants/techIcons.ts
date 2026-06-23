import {
  FaReact,
  FaNodeJs,
  FaGithub,
  FaRegFileCode,
  FaCss3,
} from "react-icons/fa";

import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiRedux,
  SiNextdotjs,
  SiShadcnui,
  SiAxios,
  SiReactrouter,
  SiThemoviedatabase,
  SiNetlify,
  SiStyledcomponents,
  SiSocketdotio,
  SiTailwindcss,
  SiTheweatherchannel,
  SiVercel,
  SiRender,
} from "react-icons/si";

import {
  TbApi,
  TbBrandFramerMotion,
  TbIcons,
  TbBrandReact,
} from "react-icons/tb";

import { MdCatchingPokemon } from "react-icons/md";

export const techIcons: Record<string, React.ElementType> = {
  React: FaReact,

  NodeJs: FaNodeJs,

  CSS: FaCss3,

  CSS3: FaCss3,

  "Node.js": FaNodeJs,

  JavaScript: SiJavascript,

  TypeScript: SiTypescript,

  MongoDB: SiMongodb,

  ExpressJs: SiExpress,

  Redux: SiRedux,

  NextJs: SiNextdotjs,

  TailwindCSS: SiTailwindcss,

  "Tailwind CSS": SiTailwindcss,

  "Shadcn UI": SiShadcnui,

  GitHub: FaGithub,

  API: TbApi,

  "Rest API": TbApi,

  "Rest APIs": TbApi,

  Axios: SiAxios,

  "react-router-dom": SiReactrouter,

  "react-router": SiReactrouter,

  "framer-motion": TbBrandFramerMotion,

  "TMDB API": SiThemoviedatabase,

  "TMDB APIs": SiThemoviedatabase,

  Netlify: SiNetlify,

  Vercel: SiVercel,

  Render: SiRender,

  Icons: TbIcons,

  "react-icons": TbBrandReact,

  "styled-components": SiStyledcomponents,

  "File Handling": FaRegFileCode,

  "Socket.io": SiSocketdotio,

  "OpenWeatherMap API": SiTheweatherchannel,

  PokéAPI: MdCatchingPokemon,
};
