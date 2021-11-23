import '../css/componentes.css';

// import webpackLogo from '../assets/img/webpack-logo.png';

export const saludar = (nombre) => {
  console.log('Hola mundo, activo');
  const h1 = document.createElement('H1');
  h1.classList.add('title');
  h1.innerText = `Hola ${nombre}, como estas???`;

  document.body.append(h1);

  // Img
  // const img = document.createElement('IMG');
  // img.src = webpackLogo;

  // document.body.append(img);
};
