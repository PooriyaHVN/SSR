import React , { useRef , useState , useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { 
 Brightness3 ,
 WbSunny ,
 } from '@material-ui/icons'
import { Link , Switch , Route } from 'react-router-dom'
import { changeNightMode } from '../../store/actions';
import '../assets/css/night/navigation.css'
import '../assets/css/night/footer.css'
import Registry from '../Registry/Registry'
import Main from '../main/Main'
function Home( { children , location } ){
	const night = useRef(null);
	const day = useRef(null);
	const [darkMode , setDarkMode ] = useState(true);
	const checked = ()=>{
		setDarkMode(!darkMode);
		day.current.classList.toggle("dayNightAnimation");
		night.current.classList.toggle("dayNightAnimation");
	}
	const navbar = useRef(null);
	const navToggler = (e)=>{
		e.currentTarget.classList.toggle("close-toggler");
		navbar.current.classList.toggle("scale")
	}
	const skillScroll = () => {
		const skill = document.querySelector("#skills");
		const top = skill.offsetTop;
		window.scrollTo({
			top,
			behavior : 'smooth'
		});
	}
	useEffect(()=>{
		darkMode === true ? document.body.id="dark" : document.body.id="day"
	},[darkMode]);
	return(
		<React.Fragment>
			<header id="header">
			<div id="nav-toggler" onClick={navToggler}>
				<span></span>
			</div>
					<nav ref={navbar}>
						<ul>
						<li id="registry"><Link to="/Registry">Registry</Link></li>
						<div>
							<input type="checkbox" onChange={checked} id="nightmode" />
							<label htmlFor="nightmode">
								<Brightness3 ref={night} className="dayNightAnimation" />
							</label>
							<label htmlFor="nightmode" >
								<WbSunny ref={day} />
							</label>
						</div>
					</ul>
					<ul>
						<li><Link to="/">home</Link></li>
						{
							location.pathname !== '/Registry' ?
							(
								<li><Link to="#skills" onClick={skillScroll} >skills</Link></li>
							)
							:
							null
						}
					</ul>
				</nav>
			</header>
				{children}
			<Switch>
				<Route path="/Registry" exact component={ Registry } />
				<Route path="/" exact component={Main} />
			</Switch>
			<footer id="footer" >
				<div>
					<p>
						<span>© All Right Reserved 2020</span>
					</p>
					<address>
						<li><a target="blank" href="https://www.linkedin.com/in/pooriya-peyvand-111759139/">Linkedin</a></li>
						<li><a target="blank" href="https://www.instagram.com/pooriiyya/">Instagram</a></li>
					<li><a href="t.me/HIVnegative">Telegram</a></li>
					</address>
				</div>
			</footer>
		</React.Fragment>
	)
}
const useDispatchToProps = {
	changeDayNight : ()=> changeNightMode
}
const useStateToProps = state=>{
	return{
		nightMode: state.DayNight
	}
}
export default connect(useStateToProps,useDispatchToProps)(withRouter(Home))