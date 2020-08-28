import React , {Fragment , useState} from 'react'
import '../assets/css/night/skills.css'
import { ViewWeek , RadioButtonUnchecked } from '@material-ui/icons'
function Skills(props) {
   const [ type , setType ] = useState(true);//false column and true is circle 
    return (
        <Fragment>
            <div id="skills" className="skills" >
                <header><ViewWeek onClick={() => setType(false)} /><RadioButtonUnchecked onClick={() => setType(true)} /></header>
                <div className={`rowSkills ${type ? "d-none" : ""}`}>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
                <div><span className="percent"></span></div>
            </div>
                <div className={`circleSkills ${!type ? "d-none" : "d-flex"}`}>
                <div className="html">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="css">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="scss">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="js">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="react">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="nodejs">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="mongodb">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="mysql">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="Redux">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="GraphQl">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
                <div className="javascriptExperince">
                    <svg>
                        <circle cx="150" cy="75" r="110" />
                    </svg>
                <span className="percent"></span></div>
            </div>
            </div>
     </Fragment>
    )
}

export default Skills
