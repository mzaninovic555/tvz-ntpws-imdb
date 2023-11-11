
const Footer = () => {
  return (
    <footer className='mt-5 mb-2 pt-3 border-top-1 text-300'>
      <div className='container text-600 flex justify-content-center align-content-center'>
        <p className='mr-2'>Flixverse, 2023: </p>
        <p>Powered by </p>
        <img className='footer-img ml-2'
          src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg'
          alt='TMDB logo' />
      </div>
    </footer>);
};

export default Footer;
