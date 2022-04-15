class WimbledonToggle extends React.Component {
 constructor(props) {
  super(props);
  this.state = { on: false };
  this._tl = new TimelineMax();
  
 }

 toggle = e => {
  if(this._tl.isActive()){return}
  this.setState({ on: !this.state.on });
 };

 componentDidMount() {
  this.toggle();
 
 }

 componentDidUpdate = e => {
  
  this._tl = new TimelineMax().timeScale(1.62);
  let _xSpin = this.state.on ? '+=' + ((Math.random()*50)) : '-=' + ((Math.random()*50));
  let _ySpin = this.state.on ? '+=' + ((Math.random()*25)+15) : '-=' + ((Math.random()*25)-15)

  this._tl
  .set('.ballHitRing', {
   x:this.state.on ? 23 : -23
  })  
   .to([this.mainBall, this.ballShadow], 1, {
    x: this.state.on ? 84 : 0,
    
    ease: Power1.easeOut
   })
   .to(
    this.toggleBg,
    1,
    {
     ease: Power2.easeInOut
    },
    "-=1"
   )
.to(this.mainBall, 0.5, {
   scale:0.4,
   ease:Power2.easeIn,
   transformOrigin: "50% 50%"
  },'-=1')  

  .to(this.ballShadow, 0.5,{
   scale:0.3,
   ease:Power2.easeIn,
   transformOrigin: "50% 0%"
  },'-=1')  
  .to('#dribbbleShadowAmount', 0.5, {
   attr:{
    stdDeviation:0
   },
   ease:Power2.easeIn
  },'-=1')

  .staggerFromTo('.ballHitRing', 0.8, {
   strokeWidth:10,
   attr:{
    r:0
   },
   alpha:0.5
  },{
   strokeWidth:0,
   attr:{
    r:32
   },
   alpha:0,
   ease:Power2.easeOut
  },0.1,0.45)
  
.to(this.mainBall, 0.5, {
   scale:1,
   ease:Power2.easeOut
  },0.5)  
.to(this.ballShadow, 0.5,{
   scale:1,
   ease:Power2.easeOut,
   
   transformOrigin: "50% 0%"
  },0.5)   
.to('#dribbbleShadowAmount', 0.5, {
   attr:{
    stdDeviation:4
   },
   ease:Power2.easeOut
  },0.5)
  
  .to(this.dribbbleBallPattern, 1.1,{
   attr:{
    x:_xSpin,
    y:_ySpin
   },
   ease:Power2.easeInOut,   
   transformOrigin: "50% 0%"
  },0)  

 };

 render() {
  return (
   <svg
    viewBox="0 0 800 600"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    preserveAspectRatio="xMidYMid slice"
   >
    <defs>
     <radialGradient
      id="dribbbleShineGrad"
      cx={350}
      cy={290}
      r={30}
      gradientUnits="userSpaceOnUse"
     >
      <stop offset="0.01" stopColor="#fff" stopOpacity="0.25" />
      <stop className="ballShineTint" offset="0.5" stopColor="#FFF" stopOpacity="0" />
     </radialGradient>
     
     <radialGradient
      id="dribbbleGrad"
      cx={358}
      cy={298}
      r={30}
      gradientUnits="userSpaceOnUse"
     >
      <stop offset="0.5" 
       stopColor="#FABE2B" 
       stopOpacity={0} 
       />
      <stop offset="0.8" 
       className="dribbbleGradStopColor"
       stopColor="#CCE256"
       stopOpacity="0.15"
      />
      <stop
       offset={1}
       className="dribbbleGradStopColor"
       stopColor="#9BB522"
       stopOpacity="0.65"
      />
     </radialGradient>
     <filter
      id="dribbbleShadow"
      width="350%"
      height="350%"
      colorInterpolationFilters="sRGB"
     >
      <feGaussianBlur id="dribbbleShadowAmount" stdDeviation="4" result="coloredBlur" />
      <feOffset dx="0" dy="23" result="offsetblur" />
      <feFlood id="dropShadowAlpha" floodColor="#000" floodOpacity="0.21" />
      <feComposite in2="offsetblur" operator="in" />
      <feMerge>
       <feMergeNode />
      </feMerge>
     </filter>

     <pattern
      id="dribbbleBallPattern"
      ref={dribbbleBallPattern => {
       this.dribbbleBallPattern = dribbbleBallPattern;
      }}      
      width="92"
      height="92"
      patternTransform="translate(38 -16)"
      patternUnits="userSpaceOnUse"
      viewBox="0 0 92 92"
      x={0}
      y={0}      
     >
      <rect width="92" height="92" fill="none" />

      <g>

        <path className="ballLine" d="M0,6.9C24.84,6.9,36.21,25.35,36.21,46S23.61,85.1,0,85.1" fill="none" stroke="#C6D4CF" strokeMiterlimit="10" strokeWidth="3.4"/>
        <path className="ballLine" d="M92,85.1C69.72,85.1,55.79,66.65,55.79,46S71.93,6.9,92,6.9" fill="none" stroke="#C6D4CF" strokeMiterlimit="10" strokeWidth="3.4"/>
 
      </g>
  
     </pattern>
     <filter id="insetShadow">
      <feOffset dx="0" dy="-4" />

      <feGaussianBlur stdDeviation="2.5" result="offset-blur" />

      <feComposite
       operator="out"
       in="SourceGraphic"
       in2="offset-blur"
       result="inverse"
      />

      <feFlood floodColor="black" floodOpacity="0.5" result="color" />

      <feComposite operator="in" in="color" in2="inverse" result="shadow" />

      <feComposite operator="over" in="shadow" in2="SourceGraphic" />
     </filter>

     <filter
      id="dropShadow"
      width="350%"
      height="350%"
      colorInterpolationFilters="sRGB"
     >
      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
      <feOffset dx="0" dy="3" result="offsetblur" />
      <feFlood id="dropShadowAlpha" floodColor="#000" floodOpacity="0.4" />
      <feComposite in2="offsetblur" operator="in" />
      <feMerge>
       <feMergeNode />
       <feMergeNode in="SourceGraphic" />
      </feMerge>
     </filter>
    <rect id="court"
     x={320}
     y={260}
     width={160}
     height={80}
     rx={40}
     ry={40}
     stroke="#FFF"
    />  
     <clipPath id="courtMask">
      <use
       xlinkHref="#court"     
       fill="#186735"
      />      
     </clipPath>
<path id="heart" d="M12.32,0A4.67,4.67,0,0,0,8.5,2,4.67,4.67,0,0,0,0,4.67C0,11.05,6.63,17,8.5,17S17,11.05,17,4.67A4.67,4.67,0,0,0,12.32,0Z" fill="#FFF" stroke="#FFF" strokeWidth="0"/>    
      <g id="tennisNet">
        <line x1={2} y1={2} x2={2} y2={102} fill="none" stroke="#FFF" strokeDasharray="10 5" strokeWidth="1"/>
        <circle cx={2} cy={2} r={2} fill="#fbb03b"/>
        <circle cx={2} cy={102} r={2} fill="#fbb03b"/>
      </g> 
<path id="fifteen" d="M2.81,2.85.58,3.39,0,1.09,3.67,0H5.58V12.86H2.81ZM8,11.16l1.7-2a4.48,4.48,0,0,0,3,1.38c1.31,0,2.13-.63,2.13-1.77v0C14.92,7.62,14,7,12.66,7a5.47,5.47,0,0,0-2.14.47L8.9,6.38,9.27.09h7.84V2.55H11.67l-.14,2.21a6.09,6.09,0,0,1,1.67-.22c2.49,0,4.47,1.21,4.47,4.09v0c0,2.7-1.91,4.42-4.85,4.42A6.56,6.56,0,0,1,8,11.16Z"/>		
    </defs>

    <use id="courtFill"
     xlinkHref="#court"     
     fill="#186839"
     strokeWidth={0}
    />         
    <g clipPath="url(#courtMask)">
    <g filter="url(#insetShadow)"
     opacity={0.23}
     ref={toggleBg => {
      this.toggleBg = toggleBg;
     }}
     >
     <line x1={400}
     x2={400}
     y1={260}
     y2={340}
     stroke="#FFF"
     /> 
     <line x1={360}
     x2={360}
     y1="275"
     y2="325"
     stroke="#FFF"
     /> 
     <line x1={440}
     x2={440}
     y1="275"
     y2="325"
     stroke="#FFF"
     /> 
     <line x1={360}
     x2={440}
     y1={300}
     y2={300}
     stroke="#FFF"
     /> 
     <line x1={320}
     x2="480"
     y1="275"
     y2="275"
     stroke="#FFF"
     />
     <line x1={320}
     x2="480"
     y1="325"
     y2="325"
     stroke="#FFF"
     />
     <rect
       x={373}
       y={273}
       width={54}
       height={54}
       rx={80}
       ry={80}

       fill="none"
      />
    </g>
    </g>
    <use id="courtOutline"
     xlinkHref="#court"     
     fill="none"
     strokeWidth={3}
    />   
    <use 
     xlinkHref="#tennisNet"
     x={398}
     y={248}
     />
    <circle
     filter="url(#dribbbleShadow)"
     ref={ballShadow => {
      this.ballShadow = ballShadow;
     }}
     
     cx={358}
     cy={314}
     
     r={30}
     fill="#000"
     opacity={1}
    />    
			<use 
				xlinkHref="#fifteen"
				fill="#FFF"
				x={332}
				y={293}
				></use>
{/*     <text className="invites-text-label"
     x={341} 
     y={307}
     >15
    </text>  */ }  
{/*    <text className="invites-text-label"
     x={440} 
     y={307}
     >
    </text>  */ }   
     <use xlinkHref="#heart"
      x={450} 
      y={290}
      fill="#FFF"
     >
    </use>     
    
    <circle className='ballHitRing'
     cx={400}
     cy={300}
     
     r={0}
     fill="none"
     stroke="#FFF"
     strokeWidth={30}
     opacity={1}
    />
 <circle className='ballHitRing'
     cx={400}
     cy={300}
     
     r={0}
     fill="none"
     stroke="#FFF"
     strokeWidth={30}
     opacity={1}
    />
    <g>
     <g
      ref={wholeBall => {
       this.wholeBall = wholeBall}}>
     <g
      ref={mainBall => {
       this.mainBall = mainBall;
      }}
     >


      <circle ref={ballBg =>{this.ballBg = ballBg}}
       cx={358} cy={300} r={30} fill="#DDED56" />

      <circle cx={358} cy={300} r={30} fill="url(#dribbbleBallPattern)"  strokeMiterlimit="10" strokeWidth="4.98"/>
      <circle cx={358} cy={300} r={30} fill="url(#dribbbleGrad)" />
      <circle
       cx={358}
       cy={300}
       r={30}
       fill="url(#dribbbleShineGrad)"
       /*       ref={dotGrad => {
       this.dotGrad = dotGrad;
      }} */
      />
     </g>
     </g>
    </g>
{/*     <text className="invites-text"
     x={395}
     y={240}
     opacity={1}
     >WIMBLEDON
    </text> */}
    <rect
     onClick={this.toggle}
     ref={hit => {
      this.hit = hit;
     }}
     className="hit"
     x="321"
     y="263"
     width="158"
     height="74"
     rx="37"
     ry="37"
     fill="transparent"
    />
   </svg>
  );
 }
}

ReactDOM.render(<WimbledonToggle />, document.querySelector("#app"));
//TweenMax.globalTimeScale(0.2)
