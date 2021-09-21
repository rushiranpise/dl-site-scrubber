.ss-btn {
    display: inline-block;
    padding: 0.75rem 1.25rem;
    border-radius: 10rem;
    border:unset;
    color: #fff;
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: 0.15rem;
    transition: all 0.1s;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }
  .ss-btn:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00b0dc;
    border-radius: 10rem;
    transition: all 0.1s;
    z-index: -2;
  }
  .ss-btn:active {
    transform:scale(0.975);
    transition: all 0.3s linear;
  }
  .ss-btn:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #008fb3;
    transition: all 0.1s linear;
    border-radius: 10rem;
    z-index: -1;
  }
  .ss-btn:hover {
    color: #fff;
  }
  .ss-btn:hover:before {
    width: 100%;
    transition: all 2s linear;
  }